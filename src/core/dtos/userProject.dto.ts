import { z } from "zod";

export const UserProjectSchema = z.object({
    userId: z.string().uuid(),
    projectId: z.string().uuid(),
});
export type CreateUserProjectDto = z.infer<typeof UserProjectSchema>;
export type DeleteUserProjectDto = z.infer<typeof UserProjectSchema>;
