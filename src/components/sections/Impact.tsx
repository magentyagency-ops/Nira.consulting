"use client";

import { motion } from "framer-motion";
import { Clock, ShieldCheck, TrendingUp } from "lucide-react";

const impacts = [
    {
        title: "Temps libéré",
        description: "Automatisez les tâches chronophages et redondantes. Vos équipes se concentrent enfin sur l'essentiel et la valeur ajoutée.",
        icon: <Clock className="w-6 h-6 text-nira-blue" />,
        delay: 0.1,
    },
    {
        title: "Zéro erreur",
        description: "L'IA ne fatigue pas. Éliminez les erreurs de saisie, les oublis et sécurisez vos processus critiques de bout en bout.",
        icon: <ShieldCheck className="w-6 h-6 text-nira-blue" />,
        delay: 0.2,
    },
    {
        title: "Visibilité totale",
        description: "Connectez vos outils. Obtenez des dashboards en temps réel et prenez des décisions basées sur des données fiables.",
        icon: <TrendingUp className="w-6 h-6 text-nira-blue" />,
        delay: 0.3,
    }
];

export function Impact() {
    return (
        <section className="py-16 md:py-32 relative z-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-center max-w-3xl mx-auto mb-12 md:mb-24"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-nira-dark tracking-tight mb-4 md:mb-6">
                        L'impact immédiat sur votre entreprise.
                    </h2>
                    <p className="text-base md:text-xl text-nira-gray px-2">
                        L'automatisation intelligente n'est pas qu'une question de technologie, c'est un levier de croissance massif et instantané.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12">
                    {impacts.map((impact, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: impact.delay, ease: "easeOut" }}
                            whileHover={{ y: -8 }}
                            className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-nira-gray/10 shadow-sm hover:shadow-xl hover:border-nira-blue/20 transition-all duration-300 group"
                        >
                            <div className="w-14 h-14 rounded-full bg-nira-blue/10 flex items-center justify-center mb-6 group-hover:bg-nira-blue/15 transition-colors duration-300">
                                {impact.icon}
                            </div>
                            <h3 className="text-xl md:text-2xl font-semibold text-nira-dark mb-4">
                                {impact.title}
                            </h3>
                            <p className="text-nira-gray leading-relaxed">
                                {impact.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
