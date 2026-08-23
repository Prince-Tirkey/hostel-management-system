import { email, z } from "zod";

export const registerSchema = z.object({
    fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name cannot exceed 100 characters")
    .trim(),

    email: z
    .email("Please provide a valid email address")
    .trim()
    .toLowerCase(),

    password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password cannot exceed 100 characters")
});

export const loginSchema = z.object({
    email: z
    .email("Please provide a valid email address")
    .trim()
    .toLowerCase(),

    password: z
    .string()
    .min(1, "Password is required")
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;