"use client";

import { motion } from "framer-motion";
import { Users, FileText, Headphones, Database, RefreshCw, Zap } from "lucide-react";

const useCases = [
    {
        title: "Leads & CRM",
        description: "Enrichissement automatique des leads, qualification par IA et synchronisation instantanée dans votre CRM.",
        icon: <Users className="w-5 h-5 text-nira-blue" />,
        accent: "bg-blue-500/10 border-blue-500/20",
    },
    {
        title: "Documents & Data",
        description: "Extraction intelligente des données depuis vos PDF, factures et contrats vers vos bases de données.",
        icon: <FileText className="w-5 h-5 text-indigo-500" />,
        accent: "bg-indigo-500/10 border-indigo-500/20",
    },
    {
        title: "Support Client",
        description: "Qualification des tickets, réponses suggérées par IA et escalade intelligente vers vos agents.",
        icon: <Headphones className="w-5 h-5 text-violet-500" />,
        accent: "bg-violet-500/10 border-violet-500/20",
    },
    {
        title: "Opérations Internes",
        description: "Onboarding fluide, gestion des congés automatisée et synchronisation entre tous vos départements.",
        icon: <Database className="w-5 h-5 text-emerald-500" />,
        accent: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
        title: "Reporting & Veille",
        description: "Génération automatique de rapports consolidés et alertes sur mesure basées sur vos KPIs.",
        icon: <RefreshCw className="w-5 h-5 text-amber-500" />,
        accent: "bg-amber-500/10 border-amber-500/20",
    },
    {
        title: "Handoffs inter-outils",
        description: "La glu intelligente entre vos logiciels qui ne se parlent pas. Finies les doubles saisies.",
        icon: <Zap className="w-5 h-5 text-rose-500" />,
        accent: "bg-rose-500/10 border-rose-500/20",
    },
];

export function UseCases() {
    return (
        <section className="py-16 md:py-32 relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-3xl mx-auto mb-12 md:mb-24"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-nira-dark tracking-tight mb-4 md:mb-6">
                        Des cas d'usage concrets.
                    </h2>
                    <p className="text-base md:text-xl text-nira-gray px-2">
                        Nous automatisons les processus critiques de chaque département pour rendre votre organisation plus agile.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {useCases.map((useCase, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="group relative bg-white/60 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-nira-gray/10 hover:border-nira-gray/20 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >
                            {/* Accent Glow de fond au hover */}
                            <div className={`absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border ${useCase.accent}`} />

                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${useCase.accent}`}>
                                {useCase.icon}
                            </div>

                            <h3 className="text-xl font-semibold text-nira-dark mb-3 relative z-10">
                                {useCase.title}
                            </h3>
                            <p className="text-nira-gray text-sm md:text-base leading-relaxed relative z-10">
                                {useCase.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
