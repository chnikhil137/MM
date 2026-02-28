"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isScrolled ? "bg-dark-900/90 backdrop-blur-md border-b border-dark-600" : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
                <Link href="/" className="text-2xl font-display font-bold tracking-widest text-gold-gradient">
                    {process.env.NEXT_PUBLIC_HALL_NAME || "MM FUNCTION HALL"}
                </Link>
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="#gallery" className="text-sm tracking-widest hover:text-gold-400 transition-colors uppercase">
                        Gallery
                    </Link>
                    <Link href="#location" className="text-sm tracking-widest hover:text-gold-400 transition-colors uppercase">
                        Location
                    </Link>
                    <Link
                        href="#book"
                        className="px-6 py-2 border border-gold-500 text-gold-500 rounded hover:bg-gold-500 hover:text-dark-900 transition-colors uppercase text-sm tracking-widest"
                    >
                        Book Now
                    </Link>
                </nav>
            </div>
        </motion.header>
    );
}
