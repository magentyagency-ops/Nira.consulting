"use client";

import { motion } from "framer-motion";
import { Mail, BrainCircuit, Database, FileSpreadsheet, MessageSquare, Zap } from "lucide-react";

// Exemple 1: Traitement d'emails entrants
// Exemple 2: Sync CRM & Notifications

const workflows = [
    {
        title: "Tri & Extraction d'Emails",
        description: "Analyse automatique des pièces jointes, extraction des données clés et intégration ERP.",
        nodes: [
            { icon: <Mail className="w-5 h-5 text-gray-700" />, label: "Email Reçu", bg: "bg-gray-100" },
            { icon: <BrainCircuit className="w-5 h-5 text-nira-blue" />, label: "Analyse IA", bg: "bg-nira-blue/10" },
            { icon: <Database className="w-5 h-5 text-indigo-600" />, label: "ERP Mis à jour", bg: "bg-indigo-50" }
        ],
        particleColor: "bg-nira-blue"
    },
    {
        title: "Qualification de Leads",
        description: "Scoring immédiat des prospects entrants et notification ciblée à l'équipe commerciale.",
        nodes: [
            { icon: <FileSpreadsheet className="w-5 h-5 text-emerald-600" />, label: "Nouveau Lead (Typeform)", bg: "bg-emerald-50" },
            { icon: <Zap className="w-5 h-5 text-amber-500" />, label: "Scoring & Routage", bg: "bg-amber-50" },
            { icon: <MessageSquare className="w-5 h-5 text-rose-500" />, label: "Alerte Slack", bg: "bg-rose-50" }
        ],
        particleColor: "bg-amber-500"
    }
];

export function WorkflowShowcase() {
    return (
        <section className="py-16 md:py-32 border-t border-nira-gray/5 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-3xl mx-auto mb-12 md:mb-24"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-nira-dark tracking-tight mb-4 md:mb-6">
                        Anatomie d'une automatisation.
                    </h2>
                    <p className="text-base md:text-xl text-nira-gray px-2">
                        Découvrez comment nous connectons vos outils disparates en écosystèmes fluides et intelligents.
                    </p>
                </motion.div>

                <div className="space-y-12 md:space-y-20">
                    {workflows.map((flow, flowIndex) => (
                        <motion.div
                            key={flowIndex}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: flowIndex * 0.2 }}
                            className="bg-white/60 backdrop-blur-lg rounded-2xl md:rounded-3xl p-6 md:p-12 border border-nira-gray/10 shadow-sm relative"
                        >
                            <div className="mb-10 md:mb-14 text-center md:text-left">
                                <h3 className="text-2xl font-bold text-nira-dark mb-2">{flow.title}</h3>
                                <p className="text-nira-gray">{flow.description}</p>
                            </div>

                            {/* Le Flux Visuel */}
                            <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">

                                {/* Ligne de connexion globale (visible derrière les nodes, desktop only) */}
                                <div className="absolute top-1/2 left-[10%] right-[10%] h-[2px] bg-gray-100 hidden md:block -translate-y-1/2 z-0"></div>

                                {flow.nodes.map((node, nodeIndex) => (
                                    <div key={nodeIndex} className="relative z-10 flex flex-col items-center group w-full md:w-auto">

                                        {/* Particule animée desktop */}
                                        {nodeIndex < flow.nodes.length - 1 && (
                                            <div className="hidden md:block absolute top-8 left-1/2 w-full h-[2px] overflow-hidden -z-10 translate-x-[2rem] lg:translate-x-[3rem]">
                                                <motion.div
                                                    initial={{ x: "-100%" }}
                                                    animate={{ x: "100%" }}
                                                    transition={{
                                                        duration: 2.5,
                                                        repeat: Infinity,
                                                        ease: "linear",
                                                        delay: flowIndex * 0.5 + nodeIndex
                                                    }}
                                                    className={`h-full w-1/3 rounded-full opacity-60 ${flow.particleColor}`}
                                                    style={{ background: `linear-gradient(90deg, transparent, currentColor, transparent)` }}
                                                />
                                            </div>
                                        )}

                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${node.bg} border border-[rgba(0,0,0,0.05)] shadow-sm flex items-center justify-center mb-3 md:mb-4 transition-transform`}
                                        >
                                            {node.icon}
                                        </motion.div>
                                        <span className="text-xs md:text-sm font-medium text-nira-dark text-center px-2 md:px-0">
                                            {node.label}
                                        </span>

                                        {/* Flèche de connexion verticale mobile */}
                                        {nodeIndex < flow.nodes.length - 1 && (
                                            <div className="md:hidden flex flex-col items-center my-2">
                                                <div className="w-px h-4 bg-nira-gray/20"></div>
                                                <div className="w-2 h-2 border-b border-r border-nira-gray/30 rotate-45 -mt-1"></div>
                                            </div>
                                        )}
                                    </div>
                                ))}

                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
