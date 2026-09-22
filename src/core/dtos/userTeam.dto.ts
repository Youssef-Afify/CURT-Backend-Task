import { z } from "zod";

export const UserTeamSchema = z.object({
    userId: z.string().uuid(),
    teamId: z.string().uuid(),
});
export type CreateUserTeamDto = z.infer<typeof UserTeamSchema>;
export type DeleteUserTeamDto = z.infer<typeof UserTeamSchema>;
