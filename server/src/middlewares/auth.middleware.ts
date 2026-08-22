import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: { userId: string; role: string };
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer "))
    return res.status(401).json({
      success: false,
      message: "Authentication required",
      data: null,
      timestamp: new Date().toISOString(),
    });
  try {
    req.user = jwt.verify(header.substring(7), process.env.JWT_SECRET ?? "development-secret") as {
      userId: string;
      role: string;
    };
    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      data: null,
      timestamp: new Date().toISOString(),
    });
  }
}
