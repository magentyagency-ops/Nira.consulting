"use client";

import { motion, useAnimation, useReducedMotion } from "framer-motion";
import { useEffect } from "react";

export function HeroAnimatedText() {
    const prefersReducedMotion = useReducedMotion();
    const shimmerControls = useAnimation();

    useEffect(() => {
        if (prefersReducedMotion) return;

        let isMounted = true;

        const runAnimationSequence = async () => {
            while (isMounted) {
                await new Promise(resolve => setTimeout(resolve, 10000));
                if (!isMounted) break;

                // Shimmer sur tout le texte "grace à l'ia."
                await shimmerControls.start({
                    x: ["-100%", "200%"],
                    transition: { duration: 1.2, ease: "easeInOut" }
                });
            }
        };

        runAnimationSequence();
        return () => { isMounted = false; };
    }, [shimmerControls, prefersReducedMotion]);

    return (
        <span className="text-gradient inline-flex items-baseline relative overflow-visible whitespace-pre py-1 pb-2">
            {/* Shimmer overlay */}
            <motion.span
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                    background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)",
                    width: "50%",
                }}
                initial={{ x: "-100%" }}
                animate={shimmerControls}
            />
            grace à l&apos;ia.
        </span>
    );
}
