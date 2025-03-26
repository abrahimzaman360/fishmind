export interface User {
    id: string
    name: string
    username: string
    email: string
    image?: string | null
    createdAt: string
    emailVerified?: string | null
}

export interface Session {
    user: User
    expires: string
}

export interface LoginCredentials {
    email: string
    password: string
}

export interface RegisterCredentials {
    name: string
    username: string
    email: string
    password: string
}

export interface ForgotPasswordCredentials {
    email: string
}

export interface ResetPasswordCredentials {
    token: string
    password: string
}

