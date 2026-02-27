"use client";

import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const logos = [
    { name: "Client 1", src: "/images/logos/1.png" },
    { name: "Client 2", src: "/images/logos/2.png" },
    { name: "Client 3", src: "/images/logos/3.png" },
    { name: "Client 4", src: "/images/logos/4.png" },
    { name: "Client 5", src: "/images/logos/5.png" },
    { name: "Client 6", src: "/images/logos/6.png" },
];

function MarqueeRow({ direction = "left", speed = 40 }: { direction?: "left" | "right"; speed?: number }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [contentWidth, setContentWidth] = useState(0);

    // Fonction de mesure ultra-robuste
    const measureWidth = () => {
        if (!containerRef.current) return;
        const firstSet = containerRef.current.querySelector("[data-set='first']") as HTMLElement;
        if (firstSet) {
            const width = firstSet.getBoundingClientRect().width;
            if (width > 0) {
                setContentWidth(width);
            }
        }
    };

    useEffect(() => {
        measureWidth();

        // Multiples tentatives de mesure car les images peuvent charger de façon asynchrone
        const timer1 = setTimeout(measureWidth, 100);
        const timer2 = setTimeout(measureWidth, 500);
        const timer3 = setTimeout(measureWidth, 1000);
        const timer4 = setTimeout(measureWidth, 3000);

        window.addEventListener("resize", measureWidth);

        // Observer les changements de taille (au cas où les images chargent tardivement)
        const observer = new ResizeObserver(measureWidth);
        if (containerRef.current) observer.observe(containerRef.current);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
            window.removeEventListener("resize", measureWidth);
            observer.disconnect();
        };
    }, []);

    const duration = contentWidth > 0 ? contentWidth / speed : 50;

    return (
        <div className="relative overflow-hidden w-full py-4">
            {/* Masques latéraux plus profonds pour une meilleure immersion */}
            <div className="absolute left-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

            <div ref={containerRef} className="flex w-max items-center">
                {/* 
                  IMPORTANT: 'gap' + 'pr' doivent être identiques pour que la jonction 
                  soit invisible mathématiquement.
                */}
                <motion.div
                    data-set="first"
                    className="flex shrink-0 items-center gap-16 md:gap-32 lg:gap-48 pr-16 md:pr-32 lg:pr-48"
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
                                onLoad={measureWidth}
                                className="h-24 sm:h-32 md:h-44 lg:h-56 w-auto max-w-[300px] md:max-w-[450px] object-contain select-none grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                                draggable={false}
                            />
                        </div>
                    ))}
                </motion.div>

                {/* Jeu 2 — copie identique */}
                <motion.div
                    className="flex shrink-0 items-center gap-16 md:gap-32 lg:gap-48 pr-16 md:pr-32 lg:pr-48"
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
                                className="h-24 sm:h-32 md:h-44 lg:h-56 w-auto max-w-[300px] md:max-w-[450px] object-contain select-none grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
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
        <section className="py-24 md:py-40 relative">

            {/* Titre */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="text-center mb-20 md:mb-32"
            >
                <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-nira-dark tracking-tighter">
                    Ils nous font confiance.
                </h2>
                <div className="w-24 h-1.5 bg-nira-blue mx-auto mt-8 rounded-full opacity-40 shadow-[0_0_20px_rgba(15,141,230,0.5)]"></div>
            </motion.div>

            {/* 2 rangées qui défilent */}
            <div className="space-y-16 md:space-y-28">
                <MarqueeRow direction="left" speed={45} />
                <MarqueeRow direction="right" speed={40} />
            </div>
        </section>
    );
}
