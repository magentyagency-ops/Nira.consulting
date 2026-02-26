"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useEffect, useState } from "react";

export function AnimatedBackground() {
    const prefersReducedMotion = useReducedMotion();
    const { springX, springY } = useMousePosition({ stiffness: 50, damping: 20 });
    const [mounted, setMounted] = useState(false);
    const [windowCenter, setWindowCenter] = useState({ x: 0, y: 0 });

    useEffect(() => {
        setMounted(true);
        setWindowCenter({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

        const handleResize = () => {
            setWindowCenter({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!mounted) return null;

    // Calcul du décalage (parallax inversé et très léger) par rapport au centre de l'écran
    const getMoveEffect = (factor: number) => {
        if (prefersReducedMotion) return { x: 0, y: 0 };
        return {
            x: springX.get() ? (springX.get() - windowCenter.x) * factor : 0,
            y: springY.get() ? (springY.get() - windowCenter.y) * factor : 0,
        };
    };

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden bg-white">
            {/* 
        Le fond reste 100% blanc.
        On ajoute un léger "noise" très subtil via CSS grid pour la texture 
      */}
            <div
                className="absolute inset-0 opacity-[0.015] mix-blend-multiply"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Orbe Principal (Centre / Haut Droit) */}
            <motion.div
                animate={{
                    scale: prefersReducedMotion ? 1 : [1, 1.05, 1],
                    opacity: prefersReducedMotion ? 0.3 : [0.3, 0.4, 0.3],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    x: prefersReducedMotion ? 0 : getMoveEffect(-0.02).x,
                    y: prefersReducedMotion ? 0 : getMoveEffect(-0.02).y,
                }}
                className="absolute top-[10%] right-[10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-nira-blue-100 rounded-full blur-[100px] mix-blend-multiply opacity-30"
            />

            {/* Orbe Secondaire (Bas Gauche) */}
            <motion.div
                animate={{
                    scale: prefersReducedMotion ? 1 : [1, 1.1, 1],
                    opacity: prefersReducedMotion ? 0.4 : [0.4, 0.5, 0.4],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                style={{
                    x: prefersReducedMotion ? 0 : getMoveEffect(0.03).x,
                    y: prefersReducedMotion ? 0 : getMoveEffect(0.03).y,
                }}
                className="absolute bottom-[-10%] left-[-5%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] bg-nira-blue-50/80 rounded-full blur-[120px] mix-blend-multiply opacity-40"
            />

            {/* Halo curseur (suivi direct très diffus) */}
            {!prefersReducedMotion && (
                <motion.div
                    style={{
                        x: springX,
                        y: springY,
                        translateX: "-50%",
                        translateY: "-50%",
                    }}
                    className="absolute top-0 left-0 w-[400px] h-[400px] bg-nira-blue-100/30 rounded-full blur-[80px] z-0 opacity-50"
                />
            )}
        </div>
    );
}
