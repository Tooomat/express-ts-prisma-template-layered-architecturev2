import { ZodType, z } from "zod";

export class AuthValidation {
    static readonly REGISTER_SCHEMA = z.object({
        email: z
            .string()
            .email(),
        password: z
            .string()
            .min(8)
    })
}

// Export type dari schema
export type RegisterRequest = z.infer<typeof AuthValidation.REGISTER_SCHEMA>;