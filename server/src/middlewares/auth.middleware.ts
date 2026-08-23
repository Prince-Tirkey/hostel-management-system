import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError.js";

export interface AuthenticatedRequest extends Request {
  user?: { userId: string; role: string };
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    // Pass the missing token error to global hanlder
    return next(new AppError("Authentication required", 401, "UNAUTHORIZED"));
  }

  try {
    req.user = jwt.verify(header.substring(7), process.env.JWT_SECRET ?? "development-secret") as {
      userId: string;
      role: string;
    };

    return next();
  } catch {
    return next(new AppError("Invalid or expired token", 401, "INVALID_TOKEN"));
  }
}
