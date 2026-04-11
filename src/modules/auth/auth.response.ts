import { User } from "../../generated/prisma/client"

export interface AuthResponse {
  id: string
  email: string
}

export function toAuthResponse(user: Pick<User, 'id' | 'email'>): AuthResponse {
    return {
        id: user.id,
        email: user.email
    }
}