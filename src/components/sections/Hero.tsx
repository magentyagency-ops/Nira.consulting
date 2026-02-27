"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { ArrowRight, Play, ShieldCheck, Zap, LineChart } from "lucide-react";
import { Button } from "../ui/button";
import { HeroAnimatedText } from "../animations/HeroAnimatedText";
import { useRef } from "react";

import { useAuditModal } from "@/store/useAuditModal";
import { useSimulationModal } from "@/store/useSimulationModal";

export function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const { openModal } = useAuditModal();
    const { openModal: openSimulationModal } = useSimulationModal();

    // Parallax léger pour le contenu entier lors du scroll
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.5, 0]);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2, // laisse le Navbar finir son entrée
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 20,
                mass: 0.8
            },
        },
    };

    // Titre animé — le mot dynamique est géré par DynamicWord
    const staticWords = "vos processus".split(" ");

    return (
        <section
            ref={containerRef}
            className="relative pt-24 pb-16 md:pt-48 md:pb-32 overflow-hidden min-h-[100svh] flex items-center"
        >

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    style={{ y, opacity }}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="max-w-4xl mx-auto text-center"
                >


                    {/* Headline */}
                    <div className="mb-8 leading-[1.15] text-center">
                        {/* Ligne 1 : [Mot dynamique] vos processus */}
                        <div className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight text-nira-dark">
                            Automatisez vos processus
                        </div>
                        {/* Ligne 2 : grace à l'ia. */}
                        <div className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight text-nira-dark mt-1 sm:mt-2">
                            <motion.span variants={itemVariants} className="inline-block">
                                <HeroAnimatedText />
                            </motion.span>
                        </div>
                    </div>

                    {/* Subtext */}
                    <motion.p
                        variants={itemVariants}
                        className="text-lg md:text-xl text-nira-gray mb-12 max-w-2xl mx-auto text-balance"
                    >
                        Audit, conception et déploiement d’automatisations sur mesure.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 relative z-20"
                    >
                        <Button variant="primary" size="lg" className="w-full sm:w-auto group relative overflow-hidden" onClick={openModal}>
                            <span className="relative z-10 flex items-center">
                                Demander un audit
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                            {/* Effet au survol interne (glow sweep) implémenté dans le composant Button ou géré ici */}
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={openSimulationModal}
                            className="w-full sm:w-auto group bg-white/50 backdrop-blur-sm shadow-[0_0_0_1px_rgba(0,0,0,0.05)_inset] hover:shadow-[0_0_0_1px_rgba(15,141,230,0.3)_inset] transition-all duration-300 text-sm sm:text-base"
                        >
                            <Play className="mr-2 w-4 h-4 text-nira-blue-600 transition-transform group-hover:scale-110" />
                            Voir comment ça fonctionne
                        </Button>
                    </motion.div>

                    {/* Reassurance Tags */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-medium text-nira-gray/80"
                    >
                        {[
                            { icon: Zap, text: "Déploiement rapide" },
                            { icon: ShieldCheck, text: "100% Sécurisé" },
                            { icon: LineChart, text: "ROI Mesurable" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 group cursor-default">
                                {i > 0 && <div className="hidden sm:block w-1 h-1 rounded-full bg-nira-gray/30" />}
                                <div className="flex items-center gap-2 group-hover:-translate-y-0.5 transition-transform duration-300">
                                    <item.icon className="w-4 h-4 text-nira-blue-500 group-hover:text-nira-blue-600 transition-colors" />
                                    <span className="group-hover:text-nira-dark transition-colors">{item.text}</span>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
