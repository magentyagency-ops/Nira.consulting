"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

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
        <section className="py-24 md:py-32 relative bg-nira-dark text-white overflow-hidden">
            {/* Background Glows subtils */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-nira-blue/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-white/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

                    {/* Colonne Titre (Gauche) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="w-full lg:w-1/2"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                            L'automatisation<br />
                            <span className="text-nira-blue">par des experts.</span>
                        </h2>
                        <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-lg">
                            Les outils no-code sont accessibles, mais créer des systèmes robustes, scalables et sécurisés requiert une expertise d'ingénierie.
                        </p>

                        <div className="flex items-center gap-4 text-sm font-medium text-gray-300">
                            <div className="flex -space-x-3">
                                {/* Avatars placeholders */}
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-nira-dark bg-gray-800 flex items-center justify-center overflow-hidden">
                                        <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-600"></div>
                                    </div>
                                ))}
                            </div>
                            <span>Une équipe de passionnés.</span>
                        </div>
                    </motion.div>

                    {/* Colonne Piliers (Droite) */}
                    <div className="w-full lg:w-1/2 space-y-8">
                        {pillars.map((pillar, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                className="flex gap-4 md:gap-6 bg-white/5 p-6 md:p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors"
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
