"use client";

import { useState, useEffect } from "react";
import { useSpring } from "framer-motion";

export function useMousePosition(springConfig = { stiffness: 150, damping: 20 }) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const springX = useSpring(0, springConfig);
    const springY = useSpring(0, springConfig);

    useEffect(() => {
        // Initializer le centre de l'écran par défaut
        setMousePosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
        springX.set(window.innerWidth / 2);
        springY.set(window.innerHeight / 2);

        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            springX.set(e.clientX);
            springY.set(e.clientY);
        };

        window.addEventListener("mousemove", updateMousePosition);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
        };
    }, [springX, springY]);

    return { x: mousePosition.x, y: mousePosition.y, springX, springY };
}
