import request from "supertest";
import mongoose from "mongoose";
import app from "../../app";
import User from "../../models/userModel";
import { connectDB, closeDB } from "../../config/db";

describe("Auth Integration Tests", () => {
  let server: any;

  beforeAll(async () => {
    await connectDB();
    server = app.listen(4000);
  });

  afterAll(async () => {
    await closeDB();
    await server.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("POST /api/auth/register", () => {
    it("should register a new user", async () => {
      const res = await request(app).post("/api/auth/register").send({
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("token");
      expect(res.body.user).toHaveProperty("username", "testuser");
      expect(res.body.user).toHaveProperty("email", "test@example.com");
    });

    it("should not register a user with existing email", async () => {
      await User.create({
        username: "existinguser",
        email: "existing@example.com",
        password: "password123",
      });

      const res = await request(app).post("/api/auth/register").send({
        username: "newuser",
        email: "existing@example.com",
        password: "password123",
      });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message", "Email already exists");
    });
  });

  describe("POST /api/auth/login", () => {
    beforeEach(async () => {
      await User.create({
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      });
    });

    it("should login a user with correct credentials", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
        password: "password123",
      });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("token");
      expect(res.body.user).toHaveProperty("email", "test@example.com");
    });

    it("should not login a user with incorrect password", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
        password: "wrongpassword",
      });

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty("message", "Invalid email or password");
    });
  });

  describe("GET /api/auth/current-user", () => {
    let token: string;

    beforeEach(async () => {
      const user = await User.create({
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      });

      const loginRes = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
        password: "password123",
      });

      token = loginRes.body.token;
    });

    it("should get current user information", async () => {
      const res = await request(app)
        .get("/api/auth/current-user")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.user).toHaveProperty("email", "test@example.com");
      expect(res.body.user).toHaveProperty("username", "testuser");
    });

    it("should not get user information without token", async () => {
      const res = await request(app).get("/api/auth/current-user");

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty("message", "No token provided");
    });
  });
});
