"use client";

import { motion } from "framer-motion";

const images = [
    "https://images.unsplash.com/photo-1544078755-9a86db2543dd?q=80&w=2669&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2669&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507504031003-b417219a0fde?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1505366518717-b64ee35160bb?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=2670&auto=format&fit=crop",
];

export function Gallery() {
    return (
        <section id="gallery" className="py-24 bg-dark-800">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-display font-bold mb-4"
                    >
                        A Glimpse of <span className="text-gold-gradient">Elegance</span>
                    </motion.h2>
                    <div className="section-divider" />
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Explore the majestic archways, expansive seating, and breathtaking decor that make our hall the absolute best in the city.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((src, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            className="group relative overflow-hidden rounded-xl aspect-[4/3] glass-card cursor-pointer"
                        >
                            <img
                                src={src}
                                alt={`Gallery image ${idx + 1}`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
