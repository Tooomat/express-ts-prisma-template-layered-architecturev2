export interface AuthResponse {
  id: string
  email: string
}

export function toAuthResponse(user: User): AuthResponse {
    return {
        id: user.id,
        email: user.email
    }
}