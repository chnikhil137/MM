"use client";

import { motion } from "framer-motion";

export function Location() {
    return (
        <section id="location" className="py-24 bg-dark-900 relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-display font-bold mb-4"
                    >
                        Find Your <span className="text-gold-gradient">Destination</span>
                    </motion.h2>
                    <div className="section-divider" />
                </div>

                <div className="grid lg:grid-cols-3 gap-8 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-1 space-y-8 p-8 glass-card border border-dark-600 rounded-2xl"
                    >
                        <div>
                            <h3 className="text-xl font-bold text-gold-500 mb-2">Address</h3>
                            <p className="text-gray-300">
                                {process.env.NEXT_PUBLIC_HALL_ADDRESS || "123 Main Street, City Center, 00000"}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-gold-500 mb-2">Contact</h3>
                            <p className="text-gray-300 block mb-1">
                                Phone: {process.env.NEXT_PUBLIC_PHONE_NUMBER || "+91 98765 43210"}
                            </p>
                            <p className="text-gray-300 block">
                                WhatsApp: {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+91 98765 43210"}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-gold-500 mb-2">Parking</h3>
                            <p className="text-gray-300">
                                Ample valet parking available for up to 500 vehicles.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 h-[400px] w-full rounded-2xl overflow-hidden glass-card p-2"
                    >
                        {/* Embedded Google Maps iFrame placeholder (realistic implementation for maps) */}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15224.96541676!2d78.475!3d17.445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI2JzQyLjAiTiA3OMKwMjgnMzAuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0, borderRadius: '0.75rem' }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="grayscale invert-[90%] hue-rotate-180 opacity-80 transition-all duration-500 hover:grayscale-0 hover:invert-0 hover:opacity-100"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
