"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, Clock } from "lucide-react";
import { Button } from "../ui/button";

export function FinalCta() {
    return (
        <section className="py-16 md:py-32 relative overflow-hidden">
            {/* Dégradé radial subtil en arrière plan pour faire pop le formulaire */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-nira-blue/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
                <div className="bg-nira-dark rounded-2xl md:rounded-[2.5rem] p-6 md:p-16 shadow-2xl overflow-hidden relative">

                    {/* Motif décoratif top right */}
                    <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                        <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 0L200 100L100 200L0 100L100 0Z" fill="currentColor" />
                        </svg>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-20">

                        {/* Colonne Texte */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="w-full lg:w-5/12 text-white"
                        >
                            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-4 md:mb-6">
                                Prêt à passer <br />
                                <span className="text-nira-blue">à la vitesse supérieure ?</span>
                            </h2>
                            <p className="text-gray-400 text-base md:text-lg mb-8 md:mb-10 leading-relaxed">
                                Les entreprises qui intègrent l'IA aujourd'hui prennent une avance décisive. Demandez votre audit gratuit de 30 minutes pour identifier vos gisements de productivité.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4 text-gray-300">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                                        <Clock className="w-5 h-5 text-nira-blue" />
                                    </div>
                                    <span>Réponse sous 24h ouvrées</span>
                                </div>
                                <div className="flex items-center gap-4 text-gray-300">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                                        <Shield className="w-5 h-5 text-nira-blue" />
                                    </div>
                                    <span>Confidentialité totale garantie</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Colonne Formulaire */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="w-full lg:w-7/12"
                        >
                            <form className="bg-white/90 backdrop-blur-md rounded-2xl md:rounded-3xl p-5 md:p-10 shadow-xl space-y-5 md:space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium text-nira-dark">Prénom & Nom</label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="w-full px-4 py-3 rounded-xl border border-nira-gray/20 bg-gray-50 text-nira-dark focus:outline-none focus:ring-2 focus:ring-nira-blue/50 focus:bg-white transition-colors"
                                            placeholder="Jean Dupont"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="company" className="text-sm font-medium text-nira-dark">Entreprise</label>
                                        <input
                                            type="text"
                                            id="company"
                                            className="w-full px-4 py-3 rounded-xl border border-nira-gray/20 bg-gray-50 text-nira-dark focus:outline-none focus:ring-2 focus:ring-nira-blue/50 focus:bg-white transition-colors"
                                            placeholder="Nom de la société"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-nira-dark">Email professionnel</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-4 py-3 rounded-xl border border-nira-gray/20 bg-gray-50 text-nira-dark focus:outline-none focus:ring-2 focus:ring-nira-blue/50 focus:bg-white transition-colors"
                                        placeholder="jean@entreprise.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-nira-dark">Quel processus souhaitez-vous automatiser ?</label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl border border-nira-gray/20 bg-gray-50 text-nira-dark focus:outline-none focus:ring-2 focus:ring-nira-blue/50 focus:bg-white transition-colors resize-none"
                                        placeholder="Décrivez brièvement votre besoin ou le problème rencontré..."
                                    ></textarea>
                                </div>

                                <Button size="lg" className="w-full group">
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Demander un audit gratuit
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Button>
                            </form>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
}
