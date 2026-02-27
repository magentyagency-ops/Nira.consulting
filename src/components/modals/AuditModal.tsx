"use client";

import { useAuditModal } from "@/store/useAuditModal";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { submitAuditRequest } from "@/app/actions/audit";
import { toast } from "sonner";

// Le même schéma que côté serveur pour éviter la duplication des règles
const formSchema = z.object({
    name: z.string().min(2, "Le nom est trop court."),
    email: z.string().email("Cet email n'est pas valide."),
    company: z.string().optional(),
    message: z.string().min(10, "Merci de nous en dire un peu plus (10 caractères min)."),
});

type FormData = z.infer<typeof formSchema>;

export function AuditModal() {
    const { isOpen, closeModal } = useAuditModal();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    // Fonction déclenchée lors de la soumission du formulaire
    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);

        // Créer un FormData natif (requis pour les Server Actions pures)
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value) formData.append(key, value);
        });

        // Appel de la Server Action
        const result = await submitAuditRequest(formData);

        if (result.success) {
            toast.success("Demande d'audit envoyée !", {
                description: "Alexandre reviendra vers vous sous 24h ouvrées.",
                icon: <Sparkles className="w-5 h-5 text-nira-blue" />
            });
            reset();
            closeModal();
        } else {
            toast.error("Oups, une erreur est survenue.", {
                description: result.error,
            });
        }

        setIsSubmitting(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop / Fond flouté */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                        className="absolute inset-0 bg-nira-dark/80 backdrop-blur-md"
                    />

                    {/* Fenêtre Modale */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0 }}
                        className="relative w-full max-w-2xl bg-[#111114] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
                    >
                        {/* Section Gauche : Infos (Cachée sur petit mobile, visible sur md+) */}
                        <div className="hidden md:flex md:w-5/12 bg-[#16161a] p-10 flex-col justify-between border-r border-white/5 relative overflow-hidden">
                            {/* Glow interne plus sophistiqué */}
                            <div className="absolute -top-20 -left-20 w-64 h-64 bg-nira-blue/20 blur-[100px] rounded-full pointer-events-none" />
                            <div className="absolute bottom-20 right-0 w-32 h-32 bg-nira-blue/10 blur-[60px] rounded-full pointer-events-none" />

                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nira-blue/10 border border-nira-blue/20 text-nira-blue text-[10px] font-bold uppercase tracking-widest mb-6">
                                    <Sparkles className="w-3 h-3" />
                                    Accompagnement Expert
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4 leading-tight">
                                    Construisons votre <span className="text-nira-blue">avantage</span> compétitif.
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Plus qu'un audit, une feuille de route pour transformer vos processus manuels en systèmes intelligents.
                                </p>
                            </div>

                            <div className="relative z-10 mt-12 space-y-5">
                                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm group hover:bg-white/[0.05] transition-colors duration-300">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-nira-blue/20 flex items-center justify-center text-nira-blue shrink-0 group-hover:scale-110 transition-transform">
                                            <Sparkles className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-white mb-1">01. Immersion & Audit</h4>
                                            <p className="text-xs text-gray-500 leading-relaxed">Analyse en profondeur de vos flux et détection des gisements de productivité.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm group hover:bg-white/[0.05] transition-colors duration-300">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 shrink-0 group-hover:scale-110 transition-transform">
                                            <ArrowRight className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-white mb-1">02. Plan Technique</h4>
                                            <p className="text-xs text-gray-500 leading-relaxed">Conception d'une architecture logicielle et IA sur-mesure adaptée à vos outils.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm group hover:bg-white/[0.05] transition-colors duration-300">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 shrink-0 group-hover:scale-110 transition-transform">
                                            <div className="w-5 h-5 border-2 border-current rounded-sm opacity-50" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-white mb-1">03. Déploiement Agile</h4>
                                            <p className="text-xs text-gray-500 leading-relaxed">Mise en production progressive et formation de vos équipes pour un ROI immédiat.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section Droite : Formulaire */}
                        <div className="w-full md:w-7/12 p-6 md:p-8 relative">
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-full flex items-center justify-center transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            <h2 className="text-2xl font-bold text-white mb-6 md:mb-8 pr-8">Demander un audit</h2>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                {/* Nom et Entreprise sur 2 colonnes si possible */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Prénom & Nom</label>
                                        <input
                                            {...register("name")}
                                            placeholder="John Doe"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-nira-blue/50 focus:border-nira-blue/50 transition-all"
                                        />
                                        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Entreprise</label>
                                        <input
                                            {...register("company")}
                                            placeholder="Optionnel"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-nira-blue/50 focus:border-nira-blue/50 transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Email pro */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Email professionnel</label>
                                    <input
                                        {...register("email")}
                                        type="email"
                                        placeholder="john@votre-entreprise.com"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-nira-blue/50 focus:border-nira-blue/50 transition-all"
                                    />
                                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                                </div>

                                {/* Message / Besoin */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Votre besoin</label>
                                    <textarea
                                        {...register("message")}
                                        rows={3}
                                        placeholder="Quelles tâches manuelles vous font perdre du temps au quotidien ?"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-nira-blue/50 focus:border-nira-blue/50 transition-all resize-none"
                                    />
                                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                                </div>

                                {/* Bouton Submit */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full mt-2 bg-white hover:bg-gray-100 text-nira-dark font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Envoi en cours...
                                        </>
                                    ) : (
                                        <>
                                            Soumettre ma demande
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
