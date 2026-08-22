import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "./user.model.js";
export async function registerUser(fullName: string, email: string, password: string) {
  if (await User.findOne({ email })) throw new Error("Email already registered");
  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ fullName, email, passwordHash });
  return token(user.id, user.role);
}
export async function loginUser(email: string, password: string) {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.passwordHash)))
    throw new Error("Invalid email or password");
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
