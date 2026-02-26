"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState } from "react";

const navLinks = [
    { name: "Approche", href: "#approche" },
    { name: "Cas d'usage", href: "#cas-d-usage" },
    { name: "Contact", href: "#contact" },
];

export function Navbar() {
    const { scrollY } = useScroll();
    const backgroundY = useTransform(
        scrollY,
        [0, 50],
        ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.7)"]
    );
    const borderY = useTransform(
        scrollY,
        [0, 50],
        ["rgba(255, 255, 255, 0)", "rgba(0, 0, 0, 0.05)"]
    );
    const blurY = useTransform(scrollY, [0, 50], ["blur(0px)", "blur(12px)"]);

    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

    const containerVariants: Variants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: -10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        },
    };

    return (
        <motion.header
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            style={{
                backgroundColor: backgroundY,
                borderBottomColor: borderY,
                borderBottomWidth: "1px",
                backdropFilter: blurY,
                WebkitBackdropFilter: blurY,
            }}
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        >
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <motion.div variants={itemVariants}>
                    <Link href="/" className="flex items-center gap-2 group">
                        {/* Subtle logo mark */}
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-nira-blue-600 to-nira-blue-400 flex items-center justify-center shadow-lg shadow-nira-blue-500/20 group-hover:scale-105 transition-transform duration-300">
                            <div className="w-3 h-3 bg-white rounded-sm" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-nira-dark">Nira</span>
                    </Link>
                </motion.div>

                {/* Desktop Navigation */}
                <motion.nav variants={itemVariants} className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onMouseEnter={() => setHoveredLink(link.name)}
                            onMouseLeave={() => setHoveredLink(null)}
                            className="relative px-3 py-2 text-sm font-medium text-nira-gray hover:text-nira-dark transition-colors"
                        >
                            {link.name}
                            <AnimatePresence>
                                {hoveredLink === link.name && (
                                    <motion.span
                                        layoutId="navbar-hover"
                                        className="absolute inset-0 bg-nira-blue-50/50 rounded-md -z-10"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                    />
                                )}
                            </AnimatePresence>
                        </Link>
                    ))}
                </motion.nav>

                {/* CTAs */}
                <motion.div variants={itemVariants} className="flex items-center gap-4">
                    <Button variant="primary" size="md" className="hidden sm:flex">
                        Demander un audit
                    </Button>
                    {/* Mobile Menu Button */}
                    <button className="md:hidden flex flex-col gap-1.5 p-2 focus:outline-none group">
                        <span className="w-5 h-0.5 bg-nira-dark group-hover:bg-nira-blue-500 transition-colors" />
                        <span className="w-5 h-0.5 bg-nira-dark group-hover:bg-nira-blue-500 transition-colors" />
                    </button>
                </motion.div>
            </div>
        </motion.header>
    );
}
