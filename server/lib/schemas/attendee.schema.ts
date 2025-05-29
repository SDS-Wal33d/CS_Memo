import { z } from "zod";

export const attendeeSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  department: z.string(),
  type: z.string(),
});
