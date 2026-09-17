import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const searchSchema = z.object({
  city: z.string().optional(),
  date: z.string().optional(),
  guests: z.string().optional(),
});

export type SearchValues = z.infer<typeof searchSchema>;

export const inquirySchema = z.object({
  date: z.string().min(1, "Pick a date"),
  guests: z.coerce.number().min(1, "Add at least one guest"),
  message: z.string().max(400, "Keep it under 400 characters").optional(),
});

export type InquiryValues = z.infer<typeof inquirySchema>;
