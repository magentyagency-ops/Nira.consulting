"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { Search, Calculator, Cpu, LineChart } from "lucide-react";

const steps = [
    {
        title: "Audit & Découverte",
        description: "Nous cartographions vos processus actuels pour identifier les goulots d'étranglement et les opportunités d'automatisation.",
        icon: <Search className="w-5 h-5 text-nira-blue" />
    },
    {
        title: "Priorisation ROI",
        description: "Nous ciblons les automatisations qui généreront le plus de valeur immédiate avec le moins d'effort technique.",
        icon: <Calculator className="w-5 h-5 text-nira-blue" />
    },
    {
        title: "Mise en place (IA)",
        description: "Développement sur-mesure de vos workflows en intégrant l'IA là où elle apporte une vraie différence.",
        icon: <Cpu className="w-5 h-5 text-nira-blue" />
    },
    {
        title: "Suivi & Optimisation",
        description: "Monitoring continu de vos automatisations avec ajustements proactifs pour maximiser la performance.",
        icon: <LineChart className="w-5 h-5 text-nira-blue" />
    }
];

export function Approche() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section className="py-24 md:py-32 relative border-t border-nira-gray/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16 md:mb-24"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-nira-dark tracking-tight mb-6">
                        Notre approche en 4 étapes
                    </h2>
                    <p className="text-lg text-nira-gray max-w-2xl mx-auto">
                        Une méthodologie claire et éprouvée pour transformer votre entreprise sans friction, de l'audit initial au déploiement final.
                    </p>
                </motion.div>

                {/* Timeline Container */}
                <div ref={containerRef} className="relative max-w-3xl mx-auto">
                    {/* Ligne de fond (grise) */}
                    <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-px bg-nira-gray/10 -translate-x-1/2 md:-translate-x-px"></div>

                    {/* Ligne de progression dynamique (bleue) */}
                    <motion.div
                        className="absolute left-8 md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-nira-blue via-nira-blue to-transparent -translate-x-1/2 md:-translate-x-px origin-top rounded-full"
                        style={{ scaleY }}
                    ></motion.div>

                    {steps.map((step, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <div key={index} className="relative flex flex-col md:flex-row items-start md:items-center justify-between mb-16 last:mb-0">

                                {/* Contenu (Gauche sur Desktop, toujours à droite sur Mobile) */}
                                <motion.div
                                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className={`w-full md:w-[45%] pl-20 md:pl-0 ${isEven ? 'md:text-right md:pr-12' : 'md:order-2 md:pl-12'}`}
                                >
                                    <h3 className="text-xl md:text-2xl font-semibold text-nira-dark mb-3">
                                        <span className="text-nira-blue mr-2 text-sm font-bold uppercase tracking-wider">0{index + 1}.</span>
                                        {step.title}
                                    </h3>
                                    <p className="text-nira-gray leading-relaxed text-balance">
                                        {step.description}
                                    </p>
                                </motion.div>

                                {/* Icône centrale */}
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.4, delay: 0.2, type: "spring" }}
                                    className="absolute left-8 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white/60 backdrop-blur-md border border-nira-gray/10 shadow-sm flex items-center justify-center z-10 md:order-1"
                                >
                                    <div className="w-8 h-8 rounded-full bg-nira-blue/10 flex items-center justify-center">
                                        {step.icon}
                                    </div>
                                </motion.div>

                                {/* Espace vide pour équilibrer la flexbox sur Desktop */}
                                <div className={`hidden md:block w-[45%] ${isEven ? 'order-2' : ''}`}></div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
