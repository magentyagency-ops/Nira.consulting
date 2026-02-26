"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps, useMotionTemplate, useMotionValue } from "framer-motion";
import { forwardRef, MouseEvent } from "react";

export interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
        // Spotlight effect logic for the primary button
        const mouseX = useMotionValue(0);
        const mouseY = useMotionValue(0);

        function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
            const { left, top } = currentTarget.getBoundingClientRect();
            mouseX.set(clientX - left);
            mouseY.set(clientY - top);
        }

        const variants = {
            primary:
                "bg-gradient-to-r from-nira-blue-600 to-nira-blue-500 text-white shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] hover:shadow-[0_6px_20px_rgba(14,165,233,0.23)] hover:bg-[rgba(14,165,233,0.9)] border border-transparent",
            secondary:
                "bg-nira-blue-50 text-nira-blue-600 hover:bg-nira-blue-100 border border-nira-blue-100",
            outline:
                "bg-transparent text-nira-dark border border-nira-gray/20 hover:border-nira-blue-400/50 hover:bg-nira-blue-50/30",
            ghost: "bg-transparent text-nira-dark hover:bg-nira-gray/5",
        };

        const sizes = {
            sm: "h-9 px-4 text-sm",
            md: "h-11 px-6 text-sm font-medium",
            lg: "h-13 px-8 text-base font-medium",
        };

        const isPrimary = variant === "primary";

        return (
            <motion.button
                ref={ref}
                onMouseMove={isPrimary ? handleMouseMove : undefined}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={cn(
                    "group relative inline-flex items-center justify-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-nira-blue-500/50 focus:ring-offset-2 overflow-hidden",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {isPrimary && (
                    <motion.div
                        className="pointer-events-none absolute -inset-px rounded-full opacity-0 transition duration-300 group-hover:opacity-100"
                        style={{
                            background: useMotionTemplate`
                radial-gradient(
                  150px circle at ${mouseX}px ${mouseY}px,
                  rgba(255, 255, 255, 0.4),
                  transparent 80%
                )
              `,
                        }}
                    />
                )}
                <span className="relative z-10 flex items-center justify-center">
                    {children as React.ReactNode}
                </span>
            </motion.button>
        );
    }
);

Button.displayName = "Button";

export { Button };
