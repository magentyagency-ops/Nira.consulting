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

// On duplique pour boucler sans trou
const row1 = [...logos, ...logos, ...logos, ...logos];
const row2 = [...logos, ...logos, ...logos, ...logos];

function LogoItem({ logo }: { logo: { name: string; src: string } }) {
    return (
        <div className="shrink-0 px-8 md:px-12">
            <Image
                src={logo.src}
                alt={logo.name}
                width={200}
                height={80}
                priority
                className="h-16 md:h-24 lg:h-32 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            />
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

            {/* Carousel — overflow uniquement sur le wrapper, pas la section */}
            <div className="space-y-10 md:space-y-14">

                {/* Ligne 1 — gauche */}
                <div className="relative overflow-hidden">
                    {/* Masques de fondu */}
                    <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                    <div className="flex animate-scroll-left">
                        {row1.map((logo, i) => (
                            <LogoItem key={`a-${i}`} logo={logo} />
                        ))}
                    </div>
                </div>

                {/* Ligne 2 — droite */}
                <div className="relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                    <div className="flex animate-scroll-right">
                        {row2.map((logo, i) => (
                            <LogoItem key={`b-${i}`} logo={logo} />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
