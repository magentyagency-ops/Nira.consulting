"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { Star, Quote } from "lucide-react";

// --- CountUp Component ---
function CountUp({
    to,
    duration = 2,
    delay = 0,
    suffix = "",
    prefix = ""
}: {
    to: number,
    duration?: number,
    delay?: number,
    suffix?: string,
    prefix?: string
}) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const controls = animate(count, to, {
            duration: duration,
            delay: delay,
            ease: "easeOut",
            onUpdate: (latest) => {
                if (ref.current) {
                    ref.current.textContent = `${prefix}${Math.round(latest)}${suffix}`;
                }
            }
        });

        // Small initial state
        if (ref.current) ref.current.textContent = `${prefix}0${suffix}`;

        return controls.stop;
    }, [count, to, duration, delay, prefix, suffix]);

    return <motion.span ref={ref} className="font-bold tabular-nums"></motion.span>;
}


const metrics = [
    { value: 30, suffix: "%", prefix: "-", label: "Temps administratif en moins", delay: 0 },
    { value: 2, suffix: "x", prefix: "", label: "Vitesse de traitement", delay: 0.2 },
    { value: 100, suffix: "%", prefix: "", label: "Traçabilité des données", delay: 0.4 }
];

const testimonials = [
    {
        quote: "Nira n'a pas seulement déployé un outil, ils ont repensé toute notre façon de gérer l'information. Le ROI a été visible dès le premier mois d'utilisation.",
        author: "Safir Hanafi",
        role: "CEO, PillQare",
        avatar: "bg-indigo-100 text-indigo-700"
    },
    {
        quote: "L'audit de Nira a radicalement changé ma vision de l'Intelligence Artificielle. Ils nous ont montré comment l'IA peut fluidifier la communication avec nos équipes créatives au quotidien.",
        author: "Farid Boumkais",
        role: "Directeur associé, 4success Groupe",
        avatar: "bg-emerald-100 text-emerald-700"
    }
];

export function SocialProof() {
    return (
        <section className="py-16 md:py-32 relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

                {/* Metrics Section */}
                <div className="mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center mb-10 md:mb-16"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-nira-dark tracking-tight mb-4 md:mb-6">
                            L'impact en chiffres.
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
                        {metrics.map((metric, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: metric.delay }}
                                className="text-center p-6 md:p-8 rounded-3xl bg-gray-50/30 backdrop-blur-md border border-nira-gray/5"
                            >
                                <div className="text-4xl md:text-7xl text-nira-blue mb-3 md:mb-4 tracking-tighter">
                                    <CountUp to={metric.value} prefix={metric.prefix} suffix={metric.suffix} delay={metric.delay + 0.3} />
                                </div>
                                <p className="text-sm md:text-lg font-medium text-nira-dark">{metric.label}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="text-center text-xs md:text-sm text-nira-gray/60 mt-8 italic"
                    >
                        * en moyenne sur nos clients en 2025
                    </motion.p>
                </div>

                {/* Testimonials Section */}
                <div className="max-w-6xl mx-auto relative pt-12">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-nira-gray/20"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-12">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="bg-white/60 backdrop-blur-lg p-6 md:p-10 rounded-2xl md:rounded-3xl border border-nira-gray/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow"
                            >
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                                    ))}
                                </div>
                                <p className="text-base md:text-xl text-nira-dark leading-relaxed mb-6 md:mb-8 relative z-10">
                                    <Quote className="absolute -top-4 -left-4 w-12 h-12 text-nira-gray/5 -z-10" />
                                    "{testimonial.quote}"
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${testimonial.avatar}`}>
                                        {testimonial.author.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-nira-dark">{testimonial.author}</div>
                                        <div className="text-sm text-nira-gray">{testimonial.role}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
