import { z } from "zod";

export const CreateTaskSchema = z.object({
    title: z.string().min(2).max(100),
    description: z.string().max(500).optional(),
    priority: z.enum(["Low", "Medium", "High"]),
    projectId: z.string().uuid(),
});
export type CreateTaskDto = z.infer<typeof CreateTaskSchema>;

export const UpdateTaskSchema = z.object({
    title: z.string().min(2).max(100).optional(),
    description: z.string().max(500).optional(),
    priority: z.enum(["Low", "Medium", "High"]).optional(),
    status: z.enum(["To Do", "In Progress", "Done"]).optional(),
    projectId: z.string().uuid(),
});
export type UpdateTaskDto = z.infer<typeof UpdateTaskSchema>;
