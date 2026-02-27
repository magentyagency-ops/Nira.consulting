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

const formSchema = z.object({
    name: z.string().min(2, "Le nom est trop court."),
    email: z.string().email("Cet email n'est pas valide."),
    company: z.string().optional(),
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

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value) formData.append(key, value);
        });

        const result = await submitAuditRequest(formData);

        if (result.success) {
            toast.success("Demande d'audit envoyée !", {
                description: "Nous reviendrons vers vous sous 24h.",
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
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                        className="absolute inset-0 bg-nira-dark/80 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0 }}
                        className="relative w-full max-w-md bg-[#111114] border border-white/10 rounded-3xl shadow-2xl p-6 md:p-8"
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 w-8 h-8 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-full flex items-center justify-center transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-2">Audit Gratuit</h2>
                            <p className="text-gray-400 text-sm">
                                Identifions vos gains de productivité immédiats.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Prénom & Nom</label>
                                <input
                                    {...register("name")}
                                    placeholder="John Doe"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-nira-blue/50 transition-all"
                                />
                                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Email professionnel</label>
                                <input
                                    {...register("email")}
                                    type="email"
                                    placeholder="john@entreprise.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-nira-blue/50 transition-all"
                                />
                                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Entreprise</label>
                                <input
                                    {...register("company")}
                                    placeholder="Indépendant / Société"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-nira-blue/50 transition-all"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full mt-4 bg-white hover:bg-gray-100 text-nira-dark font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        Demander l'audit
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
