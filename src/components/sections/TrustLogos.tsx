"use client";

import { motion } from "framer-motion";

import Image from "next/image";

const logos = [
    { name: "Client 1", src: "/images/logos/1.png" },
    { name: "Client 2", src: "/images/logos/2.png" },
    { name: "Client 3", src: "/images/logos/3.png" },
    { name: "Client 4", src: "/images/logos/4.png" },
    { name: "Client 5", src: "/images/logos/5.png" },
    { name: "Client 6", src: "/images/logos/6.png" },
];

// Quadrupler la liste pour que la width de base soit paire (essentiel pour un `translateX(-50%)` parfaitement fluide) et couvre les très grands écrans
const doubledLogos = [...logos, ...logos, ...logos, ...logos];

export function TrustLogos() {
    return (
        <section className="py-24 md:py-32 relative overflow-hidden">

            {/* Titre */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16 md:mb-24"
            >
                <h2 className="text-3xl md:text-5xl font-bold text-nira-dark tracking-tight">
                    Ils nous font confiance.
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-nira-blue to-transparent mx-auto mt-6 rounded-full opacity-30"></div>
            </motion.div>

            {/* Carousel wrapper */}
            <div className="relative">

                {/* Masque dégradé gauche */}
                <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />

                {/* Masque dégradé droit */}
                <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

                {/* Ligne 1 — défilement vers la gauche */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-10 md:mb-14"
                >
                    <div className="flex animate-scroll-left">
                        {doubledLogos.map((logo, index) => (
                            <div
                                key={`row1-${index}`}
                                className="flex items-center justify-center shrink-0 mx-10 md:mx-20 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default"
                            >
                                <Image
                                    src={logo.src}
                                    alt={logo.name}
                                    width={240}
                                    height={100}
                                    priority={true}
                                    className="h-12 md:h-20 lg:h-28 w-auto object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Ligne 2 — défilement vers la droite (sens inverse + vitesse diff.) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="flex animate-scroll-right">
                        {doubledLogos.map((logo, index) => (
                            <div
                                key={`row2-${index}`}
                                className="flex items-center justify-center shrink-0 mx-10 md:mx-20 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default"
                            >
                                <Image
                                    src={logo.src}
                                    alt={logo.name}
                                    width={240}
                                    height={100}
                                    priority={true}
                                    className="h-12 md:h-20 lg:h-28 w-auto object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
