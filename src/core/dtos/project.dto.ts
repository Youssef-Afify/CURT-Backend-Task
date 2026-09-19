import { z } from "zod";

export const CreateProjectSchema = z.object({
    name: z.string().min(2).max(100),
    description: z.string().max(500).optional(),
});
export type CreateProjectDto = z.infer<typeof CreateProjectSchema>;

export const UpdateProjectSchema = z.object({
    name: z.string().min(2).max(100).optional(),
    description: z.string().max(500).optional(),
    progress: z.enum(["To Do", "In Progress", "Done"]).optional(),
});
export type UpdateProjectDto = z.infer<typeof UpdateProjectSchema>;
