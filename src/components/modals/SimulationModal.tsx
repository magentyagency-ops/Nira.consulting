"use client";

import { useSimulationModal } from "@/store/useSimulationModal";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function SimulationModal() {
    const { isOpen, closeModal } = useSimulationModal();

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                        className="relative w-full max-w-5xl bg-black rounded-3xl shadow-2xl overflow-hidden flex flex-col aspect-video border border-white/10"
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors border border-white/20"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="w-full h-full relative">
                            {/* NOTE: Pour l'instant, la vidéo est lue localement. 
                                Dès qu'elle sera hébergée sur Vercel Blob, remplacez le 'src' par l'URL publique. */}
                            <video 
                                src="/demo-video.mov" 
                                controls 
                                autoPlay 
                                className="w-full h-full object-contain bg-black"
                                playsInline
                            >
                                Votre navigateur ne supporte pas la balise vidéo.
                            </video>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
