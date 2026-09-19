import { z } from "zod";

export const CreateUserSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().max(100),
    password: z.string().max(500),
});
export type CreateUserDto = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = z.object({
    name: z.string().min(2).max(100).optional(),
});
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
