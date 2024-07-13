import jwt from "jsonwebtoken";
import env from "../config/env";

const generateResetToken = (userId: string): string => {
  const token = jwt.sign({ userId }, env.JWT_SECRET, { expiresIn: "1h" });
  return token;
};

// const generateVerificationToken = (userId: string): string => {
//   const token = jwt.sign({ userId }, env.JWT_SECRET, { expiresIn: "1d" });
//   return token;
// };

// export { generateResetToken, generateVerificationToken };
