import { z } from "zod";

export const createHelpOfferSchema = z.object({
  message: z
    .string()
    .trim()
    .min(5, "Message must be at least 5 characters")
    .max(100, "Message cannot exceed 500 characters"),
});

export type CreateHelpOfferInput = z.infer<typeof createHelpOfferSchema>;
