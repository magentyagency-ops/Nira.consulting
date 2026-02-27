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

function MarqueeRow({ direction = "left", speed = 25 }: { direction?: "left" | "right"; speed?: number }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [contentWidth, setContentWidth] = useState(0);

    useEffect(() => {
        if (!containerRef.current) return;

        // Mesurer la largeur d'un seul jeu de logos après rendu
        const firstSet = containerRef.current.querySelector("[data-set='first']") as HTMLElement;
        if (firstSet) {
            setContentWidth(firstSet.offsetWidth);
        }

        // Recalculer en cas de resize
        const handleResize = () => {
            const el = containerRef.current?.querySelector("[data-set='first']") as HTMLElement;
            if (el) setContentWidth(el.offsetWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const duration = contentWidth > 0 ? contentWidth / speed : 30;

    return (
        <div className="relative overflow-hidden">
            {/* Masques latéraux */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div ref={containerRef} className="flex w-max">
                {/* Jeu 1 */}
                <motion.div
                    data-set="first"
                    className="flex shrink-0"
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
                        <div key={`a-${i}`} className="shrink-0 flex items-center justify-center px-8 md:px-14 lg:px-16">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={logo.src}
                                alt={logo.name}
                                loading="eager"
                                className="h-16 md:h-24 lg:h-28 w-auto max-w-[200px] md:max-w-[280px] object-contain select-none grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                                draggable={false}
                            />
                        </div>
                    ))}
                </motion.div>

                {/* Jeu 2 — copie identique pour la boucle */}
                <motion.div
                    className="flex shrink-0"
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
                        <div key={`b-${i}`} className="shrink-0 flex items-center justify-center px-8 md:px-14 lg:px-16">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={logo.src}
                                alt={logo.name}
                                loading="eager"
                                className="h-16 md:h-24 lg:h-28 w-auto max-w-[200px] md:max-w-[280px] object-contain select-none grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
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

            {/* 2 rangées qui défilent */}
            <div className="space-y-10 md:space-y-16">
                <MarqueeRow direction="left" speed={25} />
                <MarqueeRow direction="right" speed={20} />
            </div>
        </section>
    );
}
