import { z } from "zod";
import { HelpCategory } from "./help-request.types.js";

export const createHelpRequestSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(120, "Title cannot exceed 120 characters"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description cannot exceed 2000 characters"),

  category: z.enum(
    Object.values(HelpCategory) as [
      HelpCategory,
      ...HelpCategory[]
    ]
  ),
});