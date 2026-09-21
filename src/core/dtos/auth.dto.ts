import { z } from "zod";

export const SignupSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    password: z.string().min(8),
}).strict();
export type SignupDto = z.infer<typeof SignupSchema>;

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
}).strict();
export type LoginDto = z.infer<typeof LoginSchema>;