import { z } from "zod";

export const UserTaskSchema = z.object({
    userId: z.string().uuid(),
    taskId: z.string().uuid(),
});
export type CreateUserTaskDto = z.infer<typeof UserTaskSchema>;
export type DeleteUserTaskDto = z.infer<typeof UserTaskSchema>;
