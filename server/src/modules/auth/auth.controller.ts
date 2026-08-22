import type { Request, Response } from "express";
import { loginUser, registerUser } from "./auth.service.js";
export async function register(req: Request, res: Response) {
  try {
    const { fullName, email, password } = req.body;
    const data = await registerUser(fullName, email, password);
    res.status(201).json({
      success: true,
      message: "Registration successful",
      data,
      timestamp: new Date().toISOString(),
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e instanceof Error ? e.message : "Registration failed",
      data: null,
      timestamp: new Date().toISOString(),
    });
  }
}
export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const data = await loginUser(email, password);
    res.json({
      success: true,
      message: "Login successful",
      data,
      timestamp: new Date().toISOString(),
    });
  } catch (e) {
    res.status(401).json({
      success: false,
      message: e instanceof Error ? e.message : "Login failed",
      data: null,
      timestamp: new Date().toISOString(),
    });
  }
}
