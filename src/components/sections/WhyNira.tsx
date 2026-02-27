"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function WhyNira() {
    return (
        <section className="py-16 md:py-24 relative text-white overflow-hidden" style={{ backgroundColor: 'rgba(9, 9, 11, 0.92)', backdropFilter: 'grayscale(1) brightness(2.5)', WebkitBackdropFilter: 'grayscale(1) brightness(2.5)' }}>
            {/* Background Glows subtils */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-nira-blue/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-white/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

                    {/* Left Column: Photo & Title */}
                    <div className="w-full lg:w-5/12 relative">
                        {/* Decorative element behind photo */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="absolute -top-10 -left-10 w-40 h-40 bg-nira-blue/20 rounded-full blur-[40px] z-0"
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="relative z-10"
                        >
                            <div className="relative w-full aspect-[4/5] max-w-sm mx-auto lg:mx-0 rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                                <div className="absolute inset-0 bg-gradient-to-t from-nira-dark via-transparent to-transparent z-10 opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>

                                {/* Placeholder image - the user will upload the real one */}
                                <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                                    <span className="text-gray-500">Photo d'Alexandre</span>
                                </div>
                                <Image
                                    src="/images/alexandre-lin.jpg"
                                    alt="Alexandre Lin - Head of Tech & Innovation"
                                    fill
                                    className="object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700"
                                />

                                {/* Name tag floating over image */}
                                <div className="absolute bottom-6 left-6 right-6 z-20">
                                    <h3 className="text-2xl font-bold text-white mb-1">Alexandre Lin</h3>
                                    <p className="text-nira-blue font-medium text-sm tracking-wide">Head of Tech & Innovation</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-full lg:w-7/12"
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                            L'automatisation pilotée par <span className="text-nira-blue inline-block relative">
                                l'ingénierie.
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-nira-blue/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
                                </svg>
                            </span>
                        </h2>

                        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                            <p className="font-medium text-white text-xl">
                                "Les outils no-code sont fantastiques pour prototyper, mais construire un système métier robuste, scalable et dopé à l'IA requiert une approche d'ingénieur réseau."
                            </p>
                            <p className="text-gray-400 text-base">
                                Derrière Nira, notre infrastructure technique est architecturée pour la sécurité, la performance et l'hyper-personnalisation. Pas d'usines à gaz préconçues, mais des ponts intelligents entre vos logiciels existants et les dernières avancées en intelligence artificielle.
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
