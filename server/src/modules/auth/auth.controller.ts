import type { NextFunction, Request, Response } from "express";
import { loginUser, registerUser } from "./auth.service.js";
import { loginSchema, registerSchema } from "./auth.validation.js";
import { success, z } from "zod";
import { AppError } from "../../utils/appError.js";

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      const validationError = new AppError("Validation failed", 400, "VALIDATION_ERROR");

      (validationError as any).data = z.flattenError(result.error);

      return next(validationError);
    }

    const { fullName, email, password } = result.data;
    const data = await registerUser(fullName, email, password);

    res.status(201).json({
      success: true,
      message: "Registration successful",
      data,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      const validationError = new AppError("Validation failed", 400, "VALIDATION_ERROR");

      (validationError as any).data = z.flattenError(result.error);

      return next(validationError);
    }

    const { email, password } = result.data;
    const data = await loginUser(email, password);

    res.json({
      success: true,
      message: "Login successful",
      data,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    next(err);
  }
}
