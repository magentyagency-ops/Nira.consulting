"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, Clock } from "lucide-react";
import { Button } from "../ui/button";

export function FinalCta() {
    return (
        <section id="contact" className="py-16 md:py-32 relative overflow-hidden">
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

                    <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="w-full text-white"
                        >
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 md:mb-6">
                                Prêt à passer <br className="hidden md:block" />
                                <span className="text-nira-blue">à la vitesse supérieure ?</span>
                            </h2>
                            <p className="text-gray-400 text-base md:text-lg mb-8 md:mb-10 leading-relaxed max-w-2xl mx-auto">
                                Les entreprises qui intègrent l'IA aujourd'hui prennent une avance décisive. Demandez votre audit gratuit de 30 minutes pour identifier vos gisements de productivité.
                            </p>
                            
                            <Button 
                                size="lg" 
                                className="group w-full sm:w-auto text-base md:text-lg px-8 py-6 mb-10 md:mb-12"
                                onClick={() => window.open('https://calendly.com/valentino-nira-ia/30min', '_blank')}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Demander un audit gratuit
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Button>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-300">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                                        <Clock className="w-5 h-5 text-nira-blue" />
                                    </div>
                                    <span className="text-sm">Réponse sous 24h ouvrées</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                                        <Shield className="w-5 h-5 text-nira-blue" />
                                    </div>
                                    <span className="text-sm">Confidentialité totale garantie</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
