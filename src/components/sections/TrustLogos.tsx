"use client";

import { motion } from "framer-motion";

/* ────────────────────────────────────────────────────────
   Logos clients — SVG inline pour un rendu pro et net.
   Chaque logo est un placeholder réaliste (texte stylisé).
   ──────────────────────────────────────────────────────── */

const logos = [
    {
        name: "TechFlow",
        svg: (
            <svg viewBox="0 0 160 40" className="h-8 md:h-10 w-auto">
                <text x="0" y="30" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="28" fill="currentColor" letterSpacing="-1">
                    Tech<tspan fill="currentColor" opacity="0.5">Flow</tspan>
                </text>
            </svg>
        ),
    },
    {
        name: "InnovaCorp",
        svg: (
            <svg viewBox="0 0 180 40" className="h-8 md:h-10 w-auto">
                <text x="0" y="30" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="26" fill="currentColor" letterSpacing="-0.5">
                    INNOVA<tspan fontWeight="300">CORP</tspan>
                </text>
            </svg>
        ),
    },
    {
        name: "Dataviz",
        svg: (
            <svg viewBox="0 0 140 40" className="h-8 md:h-10 w-auto">
                <rect x="0" y="10" width="20" height="20" rx="4" fill="currentColor" opacity="0.3" />
                <text x="28" y="30" fontFamily="system-ui, sans-serif" fontWeight="600" fontSize="26" fill="currentColor">
                    dataviz
                </text>
            </svg>
        ),
    },
    {
        name: "ScaleUp",
        svg: (
            <svg viewBox="0 0 160 40" className="h-8 md:h-10 w-auto">
                <text x="0" y="30" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="28" fill="currentColor" letterSpacing="-1">
                    Scale<tspan fontWeight="300" opacity="0.6">Up</tspan>
                </text>
            </svg>
        ),
    },
    {
        name: "NovaPay",
        svg: (
            <svg viewBox="0 0 160 40" className="h-8 md:h-10 w-auto">
                <circle cx="14" cy="20" r="10" fill="currentColor" opacity="0.2" />
                <text x="30" y="30" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="26" fill="currentColor" letterSpacing="-0.5">
                    NovaPay
                </text>
            </svg>
        ),
    },
    {
        name: "CloudNest",
        svg: (
            <svg viewBox="0 0 170 40" className="h-8 md:h-10 w-auto">
                <text x="0" y="30" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="26" fill="currentColor" letterSpacing="2">
                    CLOUD<tspan fontWeight="400" letterSpacing="0">nest</tspan>
                </text>
            </svg>
        ),
    },
    {
        name: "FinEdge",
        svg: (
            <svg viewBox="0 0 150 40" className="h-8 md:h-10 w-auto">
                <text x="0" y="30" fontFamily="system-ui, sans-serif" fontWeight="600" fontSize="28" fill="currentColor" letterSpacing="-1">
                    Fin<tspan fontWeight="800">Edge</tspan>
                </text>
            </svg>
        ),
    },
    {
        name: "Mentora",
        svg: (
            <svg viewBox="0 0 150 40" className="h-8 md:h-10 w-auto">
                <text x="0" y="30" fontFamily="system-ui, sans-serif" fontWeight="300" fontSize="28" fill="currentColor" letterSpacing="3">
                    MENTORA
                </text>
            </svg>
        ),
    },
];

// On double les logos pour l'effet de boucle infinie
const doubledLogos = [...logos, ...logos];

export function TrustLogos() {
    return (
        <section className="py-12 md:py-20 relative overflow-hidden">

            {/* Titre subtil */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="text-center mb-10 md:mb-14"
            >
                <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-nira-gray/60">
                    Ils nous font confiance
                </p>
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
                    className="mb-8 md:mb-10"
                >
                    <div className="flex animate-scroll-left">
                        {doubledLogos.map((logo, index) => (
                            <div
                                key={`row1-${index}`}
                                className="flex items-center justify-center shrink-0 mx-8 md:mx-14 text-nira-dark/20 hover:text-nira-dark/50 transition-all duration-500 cursor-default"
                            >
                                {logo.svg}
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
                                className="flex items-center justify-center shrink-0 mx-8 md:mx-14 text-nira-dark/20 hover:text-nira-dark/50 transition-all duration-500 cursor-default"
                            >
                                {logo.svg}
                            </div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
