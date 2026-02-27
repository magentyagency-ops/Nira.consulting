"use client";

import { motion } from "framer-motion";

/*
 * MARQUEE APPROACH:
 *   - Use raw <img> tags (no Next.js Image lazy-load interference)
 *   - Exactly 2 identical copies side-by-side
 *   - CSS translates from 0 to -50% → seamless because both halves are identical
 *   - Fixed row height prevents layout shifts
 *   - will-change: transform → GPU compositing, buttery smooth
 */

const logos = [
    { name: "Client 1", src: "/images/logos/1.png" },
    { name: "Client 2", src: "/images/logos/2.png" },
    { name: "Client 3", src: "/images/logos/3.png" },
    { name: "Client 4", src: "/images/logos/4.png" },
    { name: "Client 5", src: "/images/logos/5.png" },
    { name: "Client 6", src: "/images/logos/6.png" },
];

function MarqueeRow({ direction = "left" }: { direction?: "left" | "right" }) {
    const animClass = direction === "left" ? "marquee-left" : "marquee-right";

    return (
        <div className="relative overflow-hidden">
            {/* Masques latéraux */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            {/* Bande qui défile — contient 2x le jeu de logos */}
            <div className={`flex will-change-transform ${animClass}`}>
                {/* Copie 1 */}
                {logos.map((logo, i) => (
                    <div key={`a-${i}`} className="shrink-0 flex items-center justify-center px-6 md:px-10 lg:px-14">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={logo.src}
                            alt={logo.name}
                            loading="eager"
                            decoding="async"
                            className="h-14 md:h-20 lg:h-24 w-auto object-contain select-none grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                            draggable={false}
                        />
                    </div>
                ))}
                {/* Copie 2 — identique */}
                {logos.map((logo, i) => (
                    <div key={`b-${i}`} className="shrink-0 flex items-center justify-center px-6 md:px-10 lg:px-14">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={logo.src}
                            alt={logo.name}
                            loading="eager"
                            decoding="async"
                            className="h-14 md:h-20 lg:h-24 w-auto object-contain select-none grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                            draggable={false}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export function TrustLogos() {
    return (
        <section className="py-20 md:py-32 relative">

            {/* Titre */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="text-center mb-14 md:mb-20"
            >
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-nira-dark tracking-tight">
                    Ils nous font confiance.
                </h2>
            </motion.div>

            {/* 2 rangées qui défilent en sens inverse */}
            <div className="space-y-8 md:space-y-12">
                <MarqueeRow direction="left" />
                <MarqueeRow direction="right" />
            </div>
        </section>
    );
}
