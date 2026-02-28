import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Admin Login",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "admin@mmfunctionhall.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }

                // Hardcoded admin for initial setup (matching .env values)
                const adminEmail = process.env.ADMIN_EMAIL;
                const adminHash = process.env.ADMIN_PASSWORD_HASH;

                // If .env values exist, use them as bypass
                if (adminEmail && adminHash && credentials.email === adminEmail) {
                    const isPasswordValid = await bcrypt.compare(credentials.password, adminHash);

                    if (isPasswordValid) {
                        return {
                            id: "admin-1",
                            email: adminEmail,
                            name: "Admin"
                        };
                    }
                }

                // Otherwise check database for dynamic admins
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });

                if (!user) throw new Error("Invalid credentials");

                const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

                if (!isPasswordValid) throw new Error("Invalid credentials");

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name || "Admin"
                };
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 Days
    },
    pages: {
        signIn: "/admin/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id;
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
};
