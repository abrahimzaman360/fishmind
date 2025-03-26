import type {
    LoginCredentials,
    RegisterCredentials,
    ForgotPasswordCredentials,
    ResetPasswordCredentials,
} from "@/lib/types";

// These functions would be replaced with actual API calls to your auth endpoints

export async function loginUser(credentials: LoginCredentials) {
    // Simulate API call
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // For demo purposes, accept any credentials with valid format
            if (credentials.email && credentials.password.length >= 8) {
                // Create a mock session
                const user = {
                    id: "1",
                    name: "John Doe",
                    username: "johndoe",
                    email: credentials.email,
                    createdAt: new Date().toISOString(),
                }

                const session = {
                    user,
                    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                }

                // Store in cookie
                document.cookie = `session=${btoa(JSON.stringify(session))}; path=/; max-age=${30 * 24 * 60 * 60}`

                resolve(session)
            } else {
                reject(new Error("Invalid email or password"))
            }
        }, 1000)
    })
}

export async function registerUser(credentials: RegisterCredentials) {
    // Simulate API call
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // For demo purposes, accept any credentials with valid format
            if (credentials.name && credentials.username && credentials.email && credentials.password.length >= 8) {
                resolve({ success: true })
            } else {
                reject(new Error("Invalid registration data"))
            }
        }, 1000)
    })
}

export async function forgotPassword(credentials: ForgotPasswordCredentials) {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            // Always return success to prevent email enumeration
            resolve({ success: true })
        }, 1000)
    })
}

export async function resetPassword(credentials: ResetPasswordCredentials) {
    // Simulate API call
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // For demo purposes, accept any token and valid password
            if (credentials.token && credentials.password.length >= 8) {
                resolve({ success: true })
            } else {
                reject(new Error("Invalid or expired token"))
            }
        }, 1000)
    })
}

export async function oauthSignIn(provider: "google" | "github") {
    // Simulate OAuth flow
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Create a mock session
            const user = {
                id: "1",
                name: provider === "google" ? "Google User" : "GitHub User",
                username: provider === "google" ? "googleuser" : "githubuser",
                email: `user@${provider}.com`,
                image: "/placeholder.svg?height=80&width=80",
                createdAt: new Date().toISOString(),
            }

            const session = {
                user,
                expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            }

            // Store in cookie
            document.cookie = `session=${btoa(JSON.stringify(session))}; path=/; max-age=${30 * 24 * 60 * 60}`

            resolve(session)
        }, 1500)
    })
}

export async function logout() {
    // Clear the session cookie
    document.cookie = "session=; path=/; max-age=0"
    window.location.href = "/login"
}

