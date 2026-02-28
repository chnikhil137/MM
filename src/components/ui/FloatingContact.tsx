"use client";

import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

export function FloatingContact() {
    const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER || "+919876543210";
    const watsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+919876543210";

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
            {/* Phone Button */}
            <a
                href={`tel:${phone}`}
                className="group relative flex items-center justify-center w-14 h-14 bg-dark-800 border border-dark-600 rounded-full shadow-2xl hover:bg-gold-500 hover:border-gold-500 transition-all duration-300 animate-float"
                aria-label="Call Now"
            >
                <span className="absolute right-full mr-4 bg-dark-900 text-white text-xs whitespace-nowrap px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Call Now
                </span>
                <FaPhoneAlt className="text-xl text-gold-500 group-hover:text-dark-900 transition-colors" />
            </a>

            {/* WhatsApp Button */}
            <a
                href={`https://wa.me/${watsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-lg shadow-[#25D366]/20 transition-transform duration-300 hover:scale-110"
                aria-label="WhatsApp"
            >
                <span className="absolute right-full mr-4 bg-dark-900 text-white text-xs whitespace-nowrap px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    WhatsApp Us
                </span>
                <FaWhatsapp className="text-3xl text-white" />
            </a>
        </div>
    );
}
