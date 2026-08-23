import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "./user.model.js";
import { AppError } from "../../utils/appError.js";

export async function registerUser(fullName: string, email: string, password: string) {
  if (await User.findOne({ email })) {
    throw new AppError("Registration failed: Email already registered", 409, "EMAIL_ALREADY_EXISTS");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await User.create({ fullName, email, passwordHash, role: "STUDENT" });

  return token(user.id, user.role);
}

export async function loginUser(email: string, password: string) {
  const normalizedEmail = email.toLowerCase().trim();

  const user = await User.findOne({ email: normalizedEmail });
  if (!user || !(await bcrypt.compare(password, user.passwordHash)))
    throw new AppError("Login failed: Invalid email or password", 401, "INVALID_CREDENTIALS");

  return token(user.id, user.role);
}

function token(userId: string, role: string) {
  return {
    accessToken: jwt.sign({ userId, role }, process.env.JWT_SECRET ?? "development-secret", {
      expiresIn: "7d",
    }),
    user: { id: userId, role },
  };
}
