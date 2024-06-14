// src/services/userService.ts
import UserRepository from "../repositories/userRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {
  async createUser(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await UserRepository.createUser({
      ...data,
      password: hashedPassword,
    });
    return user;
  }

  // src/services/userService.ts

  async authenticateUser(email: string, password: string) {
    const user = await UserRepository.findUserByEmail(email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    return { token, user };
  }

  async logout() {
    // Logic for invalidating the token or removing it from session store
  }
}

export default new UserService();
