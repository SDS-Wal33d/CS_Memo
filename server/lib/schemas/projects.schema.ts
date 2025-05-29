import { z } from "zod";

const memberSchema = z.object({
  memberId: z.string().min(1),
  fullname: z.string().min(1),
  email: z.string().email(),
});

export const createProjectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  techStack: z.string().min(1),
  teamName: z.string().min(1),
  members: z.array(memberSchema).min(1).max(2).optional(),
});

export type CreateProject = z.infer<typeof createProjectSchema>;
