import { z } from "zod";

export const loginSchema = z.object({
  id: z.string({ required_error: "ID is required" }).trim(),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(10, "Password must be at least 10 characters long")
    .max(70, "Password must be less than 70 characters long"),
});

export type Login = z.infer<typeof loginSchema>;
