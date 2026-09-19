import { z } from "zod";

export const CreateTeamSchema = z.object({
    name: z.string().min(2).max(100),
    description: z.string().max(500).optional(),
});
export type CreateTeamDto = z.infer<typeof CreateTeamSchema>;

export const UpdateTeamSchema = z.object({
    name: z.string().min(2).max(100).optional(),
    description: z.string().max(500).optional(),
});
export type UpdateTeamDto = z.infer<typeof UpdateTeamSchema>;
