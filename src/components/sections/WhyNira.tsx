"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

const pillars = [
    {
        title: "Sur-mesure",
        description: "Nous ne vendons pas d'usines à gaz préconçues. Chaque automatisation est taillée pour vos logiciels et la réalité de votre métier."
    },
    {
        title: "IA Utile & Maîtrisée",
        description: "L'intelligence artificielle n'est pas un gadget. Nous l'utilisons là où elle a un réel impact : extraction, analyse, génération de brouillons."
    },
    {
        title: "Résultats mesurables",
        description: "Avant d'écrire une ligne de code, nous définissons avec vous le ROI attendu : heures gagnées, erreurs évitées, délais raccourcis."
    }
];

export function WhyNira() {
    return (
        <section className="py-16 md:py-32 relative bg-nira-dark text-white overflow-hidden">
            {/* Background Glows subtils */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-nira-blue/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-white/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-24 items-center">

                    {/* Colonne Titre (Gauche) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="w-full lg:w-1/2"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-4 md:mb-6">
                            L'automatisation<br />
                            <span className="text-nira-blue">par des experts.</span>
                        </h2>
                        <p className="text-base md:text-xl text-gray-400 mb-6 md:mb-8 max-w-lg">
                            Les outils no-code sont accessibles, mais créer des systèmes robustes, scalables et sécurisés requiert une expertise d'ingénierie.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-8 md:gap-12 group">
                            <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-3xl border-2 border-white/10 bg-white/5 overflow-hidden transition-all duration-700 group-hover:border-nira-blue/50 group-hover:scale-[1.02] shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                                <Image
                                    src="/images/experts/alexandre.jpg"
                                    alt="Alexandre Lin"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                {/* Placeholder gradient back-up */}
                                <div className="absolute inset-0 bg-gradient-to-br from-nira-blue/20 to-purple-500/20 -z-10" />
                            </div>
                            <div className="flex flex-col gap-2 items-center sm:items-start text-center sm:text-left">
                                <span className="text-white font-bold text-2xl md:text-4xl leading-tight tracking-tight">Alexandre Lin</span>
                                <span className="text-nira-blue text-sm md:text-lg font-bold uppercase tracking-[0.2em]">Head of Tech & Innovation</span>
                                <div className="w-16 h-1 bg-nira-blue mt-3 opacity-60 rounded-full"></div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Colonne Piliers (Droite) */}
                    <div className="w-full lg:w-1/2 space-y-4 md:space-y-8">
                        {pillars.map((pillar, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                className="flex gap-4 bg-white/5 p-5 md:p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors"
                            >
                                <div className="shrink-0 mt-1">
                                    <CheckCircle2 className="w-6 h-6 text-nira-blue" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">{pillar.title}</h3>
                                    <p className="text-gray-400 leading-relaxed text-balance">
                                        {pillar.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
