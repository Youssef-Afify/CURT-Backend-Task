import { z } from "zod";

export const CreateUserSchema = z.object({
    userId: z.string().uuid(),
    name: z.string().min(2).max(100),
    email: z.string().email(),
    password: z.string().min(8),
});
export type CreateUserDto = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = z.object({
    name: z.string().min(2).max(100).optional(),
});
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
