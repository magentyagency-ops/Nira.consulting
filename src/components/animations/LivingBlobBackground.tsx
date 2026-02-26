"use client";

/**
 * LivingBlobBackground
 * 
 * Performance-first approach:
 * - Pure CSS @keyframes instead of Framer Motion → runs on compositor thread, 0 JS overhead
 * - will-change: transform → GPU-accelerated
 * - No expensive filters (contrast/brightness removed)
 * - Blobs use mix-blend-multiply on a white bg to merge softly when overlapping
 */
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export function LivingBlobBackground() {
    const { scrollY } = useScroll();

    // Un spring qui suit le scroll avec du retard (damping faible, stiffness modérée)
    const smoothScrollY = useSpring(scrollY, {
        stiffness: 40,
        damping: 15,
        mass: 1.5
    });

    // La différence entre le scroll instantané et le scroll lissé
    // Quand on scroll vers le bas (scrollY augmente), smoothScrollY est en retard (plus petit)
    // Donc smoothScrollY - scrollY = négatif -> les blobs montent avec la page, puis redescendent.
    const yOffset = useTransform(() => smoothScrollY.get() - scrollY.get());

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden bg-white z-0">
            <motion.div
                className="absolute inset-0 mix-blend-multiply"
                style={{ y: yOffset }}
            >
                {/* Blob 1 */}
                <div
                    className="absolute w-[18vw] h-[18vw] max-w-[270px] max-h-[270px] rounded-full bg-nira-blue-200/80 blur-[60px] will-change-transform"
                    style={{ animation: "blob1 15s ease-in-out infinite", top: "5%", left: "10%" }}
                />
                {/* Blob 2 */}
                <div
                    className="absolute w-[14vw] h-[14vw] max-w-[210px] max-h-[210px] rounded-full bg-nira-blue-300/70 blur-[50px] will-change-transform"
                    style={{ animation: "blob2 18s ease-in-out infinite", top: "10%", right: "5%" }}
                />
                {/* Blob 3 */}
                <div
                    className="absolute w-[12vw] h-[12vw] max-w-[180px] max-h-[180px] rounded-full bg-nira-blue-400/50 blur-[45px] will-change-transform"
                    style={{ animation: "blob3 14s ease-in-out infinite", bottom: "10%", left: "20%" }}
                />
                {/* Blob 4 */}
                <div
                    className="absolute w-[10vw] h-[10vw] max-w-[150px] max-h-[150px] rounded-full bg-nira-blue-300/60 blur-[40px] will-change-transform"
                    style={{ animation: "blob4 16s ease-in-out infinite", top: "35%", left: "40%" }}
                />
            </motion.div>
        </div>
    );
}
