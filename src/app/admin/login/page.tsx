"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaLock } from "react-icons/fa";

export default function AdminLogin() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError("Invalid credentials. Access denied.");
            } else {
                router.push("/admin/dashboard");
            }
        } catch {
            setError("An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center bg-dark-900 py-12 px-4 sm:px-6 lg:px-8">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gold-500/5 blur-[150px] rounded-full" />
                <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gold-500/5 blur-[150px] rounded-full" />
            </div>

            <div className="relative max-w-md w-full glass-card p-10 mt-10 shadow-2xl border border-dark-600">
                <div className="text-center mb-10">
                    <div className="mx-auto h-16 w-16 bg-dark-800 rounded-full flex items-center justify-center border border-dark-600 gold-glow mb-4">
                        <FaLock className="text-gold-500 text-2xl" />
                    </div>
                    <h2 className="text-3xl font-display font-bold text-white mb-2">Admin Portal</h2>
                    <p className="text-sm text-gray-400 uppercase tracking-widest">Restricted Access Only</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/50 rounded text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-t-md relative block w-full px-4 py-3 border border-dark-600 bg-dark-800 text-white focus:outline-none focus:ring-gold-500 focus:border-gold-500 focus:z-10 sm:text-sm transition-colors"
                                placeholder="Admin Email"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-b-md relative block w-full px-4 py-3 border border-dark-600 bg-dark-800 text-white focus:outline-none focus:ring-gold-500 focus:border-gold-500 focus:z-10 sm:text-sm transition-colors"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold uppercase tracking-widest rounded-md text-dark-900 bg-gold-500 hover:bg-gold-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 focus:ring-offset-dark-900 disabled:opacity-50 transition-colors"
                        >
                            {isLoading ? "Authenticating..." : "Sign In"}
                        </button>
                    </div>
                </form>

                <div className="mt-8 text-center">
                    <Link href="/" className="text-gold-500 hover:text-white text-sm transition-colors">
                        &larr; Return to Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
}
