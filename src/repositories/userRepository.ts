// src/repositories/userRepository.ts

import { User } from "../models/userModel";

class UserRepository {
  async createUser(data: any) {
    const user = new User(data);
    await user.save();
    return user;
  }

  async findUserByEmail(email: string) {
    return await User.findOne({ email }).exec();
  }
}

export default new UserRepository();
