import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db"; // your drizzle instance
import { username, twoFactor, emailOTP, admin, organization, apiKey, captcha, openAPI } from "better-auth/plugins"
import { passkey } from "better-auth/plugins/passkey"

export const auth = betterAuth({
    appName: "FishMind",
    database: drizzleAdapter(db, {
        provider: "pg",
    }),
    emailAndPassword: {
        enabled: true
    },
    plugins: [
        username({
            usernameValidator(username) {
                if (username === "sudo-man") {
                    return false
                }
                return true
            },
        }),
        twoFactor(),
        emailOTP({
            sendVerificationOTP: async (email, otp) => {
                console.log("TODO: send email with otp", email, otp);
            }
        }),
        passkey(),
        openAPI(),
        admin({
            adminRoles: ["super-admin"],
            adminUserIds: ["mrtux360", "abrahimzaman360"],
            bannedUserMessage: "You are banned from using this app",
            bannedUserRedirect: "/banned",
            defaultBanExpiresIn: 60 * 60 * 24 * 365,  // 1 year
            defaultRole: "regular",
            impersonationSessionDuration: 60 * 60 * 24, // 1 day
            defaultBanReason: "spamming",
        }),
        organization(),
        apiKey({
            enableMetadata: true,
            defaultPrefix: "fishmind_"
        }),
        // captcha({
        //     provider: "cloudflare-turnstile", // or "google-recaptcha"
        //     secretKey: process.env.TURNSTILE_SECRET_KEY!,
        // }),
    ],
    secret: process.env.JWT_SECRET!,
    advanced: {
        defaultCookieAttributes: {
            path: "/",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 30, // 30 days
        },
        useSecureCookies: process.env.NODE_ENV === "production",
        cookiePrefix: "fishmind-",
        cookies: {
            session_token: {
                name: "custom_session_token",
                attributes: {
                    // Set custom cookie attributes
                }
            },
        }
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
        freshAge: 0, // 5 minutes (the session is fresh if created within the last 5 minutes)
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60 // Cache duration in seconds
        }
    }
})