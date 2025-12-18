import { APIError, betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/index"; // your drizzle instance
import { config } from 'dotenv'
import * as schema from '../db/schema'

config();

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema,
    }),
    socialProviders: {
        google: {
            prompt: "select_account", 
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }
    },
    account: {
        accountLinking: {
            enabled: true,
            trustedProviders: ["google"],
        }
    },
    databaseHooks: {
        user: {
            create: {
                before: async () => {
                    // Block all new user creation via sign-in
                    // Only pre-registered users (added directly to database by admin) can sign in
                    // If user exists, better-auth won't call create - it will just sign them in
                    throw new APIError("FORBIDDEN", {
                        message: "Account not authorized. Please contact an administrator.",
                    });
                }
            }
        }
    }
});