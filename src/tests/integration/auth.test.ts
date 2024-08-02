// src/tests/integration/auth.test.ts

import request from "supertest";
import app from "../../app";
import User from "../../models/userModel";
import { connectDB, closeDB } from "../../config/db";

// Mock the database connection and disconnection
jest.mock("../../config/db", () => ({
  connectDB: jest.fn(),
  closeDB: jest.fn(),
}));

// Mock the User model
jest.mock("../../models/userModel");

describe("Auth Integration Tests", () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await closeDB();
  });

  beforeEach(async () => {
    (User.deleteMany as jest.Mock).mockResolvedValue({});
  });

  describe("POST /api/v1/auth/register", () => {
    it("should register a new user successfully", async () => {
      (User.create as jest.Mock).mockResolvedValue({
        _id: "someUserId",
        username: "testuser",
        email: "test@example.com",
        password: "hashedpassword",
        name: "Test User",
      });

      const res = await request(app).post("/api/v1/auth/register").send({
        username: "testuser",
        email: "test@example.com",
        password: "password123",
        name: "Test User",
      });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("token");
      expect(res.body.user).toHaveProperty("username", "testuser");
      expect(res.body.user).toHaveProperty("email", "test@example.com");
      expect(res.body.user).not.toHaveProperty("password");
    });

    it("should not register a user with an existing email", async () => {
      (User.create as jest.Mock).mockRejectedValue(
        new Error("Email already exists")
      );

      const res = await request(app).post("/api/v1/auth/register").send({
        username: "newuser",
        email: "existing@example.com",
        password: "password123",
        name: "New User",
      });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toMatch(/email already exists/i);
    });
  });

  describe("POST /api/v1/auth/login", () => {
    beforeEach(async () => {
      (User.findOne as jest.Mock).mockResolvedValue({
        _id: "someUserId",
        username: "loginuser",
        email: "login@example.com",
        password: "hashedpassword",
        name: "Login User",
        isEmailVerified: true,
        comparePassword: jest.fn().mockResolvedValue(true),
      });
    });

    it("should login a user with correct credentials", async () => {
      const res = await request(app).post("/api/v1/auth/login").send({
        email: "login@example.com",
        password: "password123",
      });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("accessToken");
      expect(res.body).toHaveProperty("refreshToken");
      expect(res.body.user).toHaveProperty("email", "login@example.com");
    });

    it("should not login a user with incorrect password", async () => {
      (User.findOne as jest.Mock).mockResolvedValue({
        _id: "someUserId",
        username: "loginuser",
        email: "login@example.com",
        password: "hashedpassword",
        name: "Login User",
        isEmailVerified: true,
        comparePassword: jest.fn().mockResolvedValue(false),
      });

      const res = await request(app).post("/api/v1/auth/login").send({
        email: "login@example.com",
        password: "wrongpassword",
      });

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty("message", "Invalid email or password");
    });
  });

  describe("GET /api/v1/auth/current-user", () => {
    let token: string;

    beforeEach(async () => {
      (User.findOne as jest.Mock).mockResolvedValue({
        _id: "someUserId",
        username: "currentuser",
        email: "current@example.com",
        password: "hashedpassword",
        name: "Current User",
        isEmailVerified: true,
      });

      const loginRes = await request(app).post("/api/v1/auth/login").send({
        email: "current@example.com",
        password: "password123",
      });

      token = loginRes.body.accessToken;
    });

    it("should return the current user's data", async () => {
      const res = await request(app)
        .get("/api/v1/auth/current-user")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data.user).toHaveProperty("username", "currentuser");
      expect(res.body.data.user).toHaveProperty("email", "current@example.com");
    });

    it("should not allow access without a token", async () => {
      const res = await request(app).get("/api/v1/auth/current-user");

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty("message", "No token provided");
    });
  });

  describe("PUT /api/v1/auth/current-user", () => {
    let token: string;

    beforeEach(async () => {
      (User.findOne as jest.Mock).mockResolvedValue({
        _id: "someUserId",
        username: "updateuser",
        email: "update@example.com",
        password: "hashedpassword",
        name: "Update User",
        isEmailVerified: true,
      });

      const loginRes = await request(app).post("/api/v1/auth/login").send({
        email: "update@example.com",
        password: "password123",
      });

      token = loginRes.body.accessToken;
    });

    it("should update the current user's data", async () => {
      (User.findByIdAndUpdate as jest.Mock).mockResolvedValue({
        _id: "someUserId",
        username: "updateuser",
        email: "update@example.com",
        name: "Updated Name",
      });

      const res = await request(app)
        .put("/api/v1/auth/current-user")
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "Updated Name" });

      expect(res.status).toBe(200);
      expect(res.body.data.user).toHaveProperty("name", "Updated Name");
    });
  });

  describe("DELETE /api/v1/auth/current-user", () => {
    let token: string;

    beforeEach(async () => {
      (User.findOne as jest.Mock).mockResolvedValue({
        _id: "someUserId",
        username: "deleteuser",
        email: "delete@example.com",
        password: "hashedpassword",
        name: "Delete User",
        isEmailVerified: true,
      });

      const loginRes = await request(app).post("/api/v1/auth/login").send({
        email: "delete@example.com",
        password: "password123",
      });

      token = loginRes.body.accessToken;
    });

    it("should delete the current user", async () => {
      (User.findByIdAndDelete as jest.Mock).mockResolvedValue({
        _id: "someUserId",
        username: "deleteuser",
        email: "delete@example.com",
      });

      const res = await request(app)
        .delete("/api/v1/auth/current-user")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("message", "User deleted successfully");

      expect(User.findByIdAndDelete).toHaveBeenCalledWith("someUserId");
    });
  });
});
