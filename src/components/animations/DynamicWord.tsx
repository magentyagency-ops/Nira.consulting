"use client";

import { AnimatePresence, motion, type Transition } from "framer-motion";
import { useEffect, useState } from "react";

const WORDS = [
    { text: "Optimisez", id: "optimisez" },
    { text: "Accélérez", id: "accelerez" },
    { text: "Automatisez", id: "automatisez" },
];

const DISPLAY_DURATION = 2800;

// Même animation pour tous les mots : slide depuis la droite + blur
const sharedAnimation = {
    initial: { opacity: 0, x: 30, filter: "blur(6px)" },
    animate: { opacity: 1, x: 0, filter: "blur(0px)" },
    exit: { opacity: 0, x: -25, filter: "blur(4px)" },
};

const sharedTransition: Transition = {
    duration: 0.35,
    ease: [0.22, 1, 0.36, 1],
};

export function DynamicWord() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % WORDS.length);
        }, DISPLAY_DURATION + 350);

        return () => clearInterval(interval);
    }, []);

    const current = WORDS[currentIndex];

    return (
        <span
            className="inline-flex justify-end"
            style={{ width: "6.8em" }}
        >
            <AnimatePresence mode="wait">
                <motion.span
                    key={current.id}
                    initial={sharedAnimation.initial}
                    animate={sharedAnimation.animate}
                    exit={sharedAnimation.exit}
                    transition={sharedTransition}
                    className="inline-block text-nira-dark whitespace-nowrap"
                >
                    {current.text}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}
