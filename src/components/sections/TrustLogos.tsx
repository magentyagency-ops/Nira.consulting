"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const logos = [
    { name: "Client 1", src: "/images/logos/1.png" },
    { name: "Client 2", src: "/images/logos/2.png" },
    { name: "Client 3", src: "/images/logos/3.png" },
    { name: "Client 4", src: "/images/logos/4.png" },
    { name: "Client 5", src: "/images/logos/5.png" },
    { name: "Client 6", src: "/images/logos/6.png" },
];

function MarqueeRow({ direction = "left", speed = 35 }: { direction?: "left" | "right"; speed?: number }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [contentWidth, setContentWidth] = useState(0);

    useEffect(() => {
        if (!containerRef.current) return;

        // Mesurer la largeur précise d'un seul jeu de logos (le conteneur 'data-set')
        const measureWidth = () => {
            const firstSet = containerRef.current?.querySelector("[data-set='first']") as HTMLElement;
            if (firstSet) {
                // Utilisation de getBoundingClientRect pour être ultra-précis au sous-pixel près
                setContentWidth(firstSet.getBoundingClientRect().width);
            }
        };

        measureWidth();

        // Attendre que les images soient chargées pour remesurer (évite les problèmes de font/image loading)
        setTimeout(measureWidth, 500);

        window.addEventListener("resize", measureWidth);
        return () => window.removeEventListener("resize", measureWidth);
    }, []);

    const duration = contentWidth > 0 ? contentWidth / speed : 40;

    return (
        <div className="relative overflow-hidden w-full">
            {/* Masques latéraux */}
            <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div ref={containerRef} className="flex w-max">
                {/* 
                  Utilisation de 'gap' au lieu de 'px' margin pour un calcul de largeur parfait. 
                  pr-X ajoute l'espacement entre la fin de la set 1 et le début de la set 2.
                */}
                <motion.div
                    data-set="first"
                    className="flex shrink-0 items-center justify-center gap-12 md:gap-24 lg:gap-32 pr-12 md:pr-24 lg:pr-32"
                    animate={contentWidth > 0 ? {
                        x: direction === "left" ? [0, -contentWidth] : [-contentWidth, 0],
                    } : undefined}
                    transition={contentWidth > 0 ? {
                        x: {
                            duration: duration,
                            repeat: Infinity,
                            ease: "linear",
                            repeatType: "loop",
                        },
                    } : undefined}
                >
                    {logos.map((logo, i) => (
                        <div key={`a-${i}`} className="shrink-0 flex items-center justify-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={logo.src}
                                alt={logo.name}
                                loading="eager"
                                className="h-20 sm:h-24 md:h-32 lg:h-40 w-auto max-w-[280px] md:max-w-[380px] object-contain select-none grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                                draggable={false}
                            />
                        </div>
                    ))}
                </motion.div>

                {/* Jeu 2 — copie identique */}
                <motion.div
                    className="flex shrink-0 items-center justify-center gap-12 md:gap-24 lg:gap-32 pr-12 md:pr-24 lg:pr-32"
                    animate={contentWidth > 0 ? {
                        x: direction === "left" ? [0, -contentWidth] : [-contentWidth, 0],
                    } : undefined}
                    transition={contentWidth > 0 ? {
                        x: {
                            duration: duration,
                            repeat: Infinity,
                            ease: "linear",
                            repeatType: "loop",
                        },
                    } : undefined}
                >
                    {logos.map((logo, i) => (
                        <div key={`b-${i}`} className="shrink-0 flex items-center justify-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={logo.src}
                                alt={logo.name}
                                loading="eager"
                                className="h-20 sm:h-24 md:h-32 lg:h-40 w-auto max-w-[280px] md:max-w-[380px] object-contain select-none grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                                draggable={false}
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}

export function TrustLogos() {
    return (
        <section className="py-24 md:py-32 relative">

            {/* Titre */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16 md:mb-24"
            >
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-nira-dark tracking-tight">
                    Ils nous font confiance.
                </h2>
            </motion.div>

            {/* 2 rangées qui défilent */}
            <div className="space-y-12 md:space-y-20">
                <MarqueeRow direction="left" speed={35} />
                <MarqueeRow direction="right" speed={30} />
            </div>
        </section>
    );
}
