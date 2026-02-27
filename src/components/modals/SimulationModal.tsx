"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSimulationModal } from "@/store/useSimulationModal";
import { useAuditModal } from "@/store/useAuditModal";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, FolderOpen, Sparkles, ArrowRight, Cpu, RotateCcw } from "lucide-react";

type GameState = "idle" | "countdown" | "playing" | "finished";

const TOTAL_FILES = 20;
const RACE_DURATION = 5;

// Simple file icon component
function FileIcon({ index, processed, onClick }: { index: number; processed: boolean; onClick: () => void }) {
    return (
        <motion.button
            layout
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
                opacity: processed ? 0.3 : 1,
                scale: processed ? 0.8 : 1,
                filter: processed ? "grayscale(100%)" : "none",
            }}
            whileHover={!processed ? { scale: 1.1, y: -2 } : {}}
            whileTap={!processed ? { scale: 0.9 } : {}}
            onClick={onClick}
            disabled={processed}
            className={`relative w-14 h-16 sm:w-16 sm:h-[72px] rounded-lg border-2 flex flex-col items-center justify-center gap-1 transition-colors ${processed
                    ? "bg-green-50 border-green-200 cursor-default"
                    : "bg-white border-gray-200 hover:border-nira-blue hover:shadow-md cursor-pointer"
                }`}
        >
            <FileText className={`w-5 h-5 ${processed ? "text-green-400" : "text-gray-400"}`} />
            <span className="text-[9px] font-mono text-gray-400">
                {processed ? "✓" : `#${index + 1}`}
            </span>
        </motion.button>
    );
}

// Pipeline node
function PipelineNode({ label, icon, active, delay }: { label: string; icon: React.ReactNode; active: boolean; delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0.4 }}
            animate={active ? { opacity: 1 } : { opacity: 0.4 }}
            transition={{ delay }}
            className={`flex flex-col items-center gap-1.5 ${active ? "" : "opacity-40"}`}
        >
            <motion.div
                animate={active ? { scale: [1, 1.15, 1], boxShadow: ["0 0 0px rgba(15,141,230,0)", "0 0 20px rgba(15,141,230,0.4)", "0 0 0px rgba(15,141,230,0)"] } : {}}
                transition={active ? { repeat: Infinity, duration: 1.5, delay } : {}}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${active ? "bg-nira-blue text-white shadow-lg" : "bg-gray-100 text-gray-400"
                    }`}
            >
                {icon}
            </motion.div>
            <span className={`text-[10px] sm:text-xs font-medium ${active ? "text-nira-blue" : "text-gray-400"}`}>{label}</span>
        </motion.div>
    );
}

// Arrow between pipeline nodes
function PipelineArrow({ active, delay }: { active: boolean; delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0.3 }}
            animate={active ? { opacity: 1 } : { opacity: 0.3 }}
            transition={{ delay }}
            className="flex items-center"
        >
            <motion.div
                animate={active ? { x: [0, 4, 0] } : {}}
                transition={active ? { repeat: Infinity, duration: 0.8, delay } : {}}
            >
                <ArrowRight className={`w-4 h-4 ${active ? "text-nira-blue" : "text-gray-300"}`} />
            </motion.div>
        </motion.div>
    );
}

export function SimulationModal() {
    const { isOpen, closeModal } = useSimulationModal();
    const { openModal: openAuditModal } = useAuditModal();

    const [gameState, setGameState] = useState<GameState>("idle");
    const [countdown, setCountdown] = useState(3);
    const [timeLeft, setTimeLeft] = useState(RACE_DURATION);
    const [humanProcessed, setHumanProcessed] = useState<boolean[]>(Array(TOTAL_FILES).fill(false));
    const [niraProcessed, setNiraProcessed] = useState(0);
    const [niraBurst, setNiraBurst] = useState(false);

    const humanScore = humanProcessed.filter(Boolean).length;

    // Reset everything
    const resetGame = useCallback(() => {
        setGameState("idle");
        setCountdown(3);
        setTimeLeft(RACE_DURATION);
        setHumanProcessed(Array(TOTAL_FILES).fill(false));
        setNiraProcessed(0);
        setNiraBurst(false);
    }, []);

    const handleClose = () => {
        closeModal();
        setTimeout(resetGame, 300);
    };

    // Start countdown
    const startCountdown = () => {
        setGameState("countdown");
        setCountdown(3);
    };

    // Countdown effect
    useEffect(() => {
        if (gameState !== "countdown") return;
        if (countdown <= 0) {
            setGameState("playing");
            return;
        }
        const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
        return () => clearTimeout(t);
    }, [gameState, countdown]);

    // Game timer
    useEffect(() => {
        if (gameState !== "playing") return;
        if (timeLeft <= 0) {
            setGameState("finished");
            return;
        }
        const t = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearInterval(t);
    }, [gameState, timeLeft]);

    // Nira burst at 2 seconds mark — processes all files instantly
    useEffect(() => {
        if (gameState !== "playing") return;
        const burst = setTimeout(() => {
            setNiraBurst(true);
            // Instant processing animation
            let i = 0;
            const interval = setInterval(() => {
                i++;
                setNiraProcessed(i);
                if (i >= TOTAL_FILES) clearInterval(interval);
            }, 40); // 40ms per file = 0.8s total
        }, 2000); // after 2 seconds
        return () => clearTimeout(burst);
    }, [gameState]);

    // Human click handler
    const handleFileClick = (index: number) => {
        if (gameState !== "playing") return;
        setHumanProcessed((prev) => {
            const next = [...prev];
            next[index] = true;
            return next;
        });
    };

    // ─────────────── IDLE STATE ───────────────
    const renderIdle = () => (
        <motion.div
            key="idle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center h-full text-center px-6 py-12"
        >
            <div className="w-16 h-16 rounded-2xl bg-nira-blue/10 flex items-center justify-center text-nira-blue mb-6">
                <Cpu className="w-8 h-8" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Humain vs <span className="text-nira-blue">Nira</span>
            </h2>
            <p className="text-gray-500 mb-2 max-w-md leading-relaxed">
                20 fichiers à classer dans le bon dossier.
            </p>
            <p className="text-gray-400 text-sm mb-8 max-w-md">
                Vous avez <strong className="text-gray-700">5 secondes</strong> pour en traiter un maximum manuellement.
                Pendant ce temps, le pipeline IA de Nira fera de même de son côté.
            </p>

            <div className="flex items-center gap-3 text-xs text-gray-400 mb-8 bg-gray-50 rounded-full px-5 py-2.5 border border-gray-100">
                <FolderOpen className="w-4 h-4 text-nira-blue" />
                <span>Cliquez sur chaque fichier pour le traiter → Nira utilise son pipeline IA</span>
            </div>

            <button
                onClick={startCountdown}
                className="px-10 py-3.5 bg-nira-blue text-white font-semibold rounded-xl hover:bg-nira-blue/90 transition-all shadow-lg shadow-nira-blue/20 flex items-center gap-2"
            >
                <Sparkles className="w-4 h-4" />
                Lancer la simulation
            </button>
        </motion.div>
    );

    // ─────────────── COUNTDOWN STATE ───────────────
    const renderCountdown = () => (
        <motion.div
            key="countdown"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full"
        >
            <motion.div
                key={countdown}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                transition={{ type: "spring", bounce: 0.3 }}
                className="text-8xl font-black text-nira-blue"
            >
                {countdown === 0 ? "GO!" : countdown}
            </motion.div>
            <p className="text-gray-400 mt-4 text-sm">Préparez-vous !</p>
        </motion.div>
    );

    // ─────────────── PLAYING STATE ───────────────
    const renderPlaying = () => (
        <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full flex flex-col"
        >
            {/* Timer bar */}
            <div className="flex-none px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white/80 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${timeLeft <= 2 ? "bg-red-500 animate-pulse" : "bg-green-500"}`} />
                    <span className="text-sm font-medium text-gray-500">Course en cours</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-1.5 border border-gray-100">
                    <span className={`text-xl font-bold font-mono ${timeLeft <= 2 ? "text-red-500" : "text-gray-900"}`}>
                        {timeLeft}s
                    </span>
                </div>
                <div className="text-sm text-gray-400">
                    {humanScore}/{TOTAL_FILES} traités
                </div>
            </div>

            {/* Split screen */}
            <div className="flex-1 flex flex-col md:flex-row min-h-0">
                {/* ── LEFT: Human ── */}
                <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-100 p-4 sm:p-6 flex flex-col bg-white overflow-y-auto">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                            <span className="text-sm">👤</span>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-gray-900">Vous (Manuel)</h3>
                            <p className="text-[11px] text-gray-400">Cliquez sur chaque fichier</p>
                        </div>
                        <div className="ml-auto text-lg font-bold font-mono text-gray-900">{humanScore}/{TOTAL_FILES}</div>
                    </div>

                    {/* File grid */}
                    <div className="flex-1 flex items-center justify-center">
                        <div className="grid grid-cols-5 gap-2 sm:gap-3">
                            {humanProcessed.map((done, i) => (
                                <FileIcon key={i} index={i} processed={done} onClick={() => handleFileClick(i)} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── VS divider (desktop) ── */}
                <div className="hidden md:flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-400">
                        VS
                    </div>
                </div>

                {/* ── RIGHT: Nira ── */}
                <div className="flex-1 p-4 sm:p-6 flex flex-col bg-gradient-to-br from-blue-50/50 to-white overflow-y-auto">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-nira-blue/10 flex items-center justify-center">
                            <Cpu className="w-4 h-4 text-nira-blue" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-gray-900">Nira <span className="text-nira-blue">(Pipeline IA)</span></h3>
                            <p className="text-[11px] text-gray-400">Automatisation en cours...</p>
                        </div>
                        <div className="ml-auto text-lg font-bold font-mono text-nira-blue">{niraProcessed}/{TOTAL_FILES}</div>
                    </div>

                    {/* Pipeline visualization */}
                    <div className="flex items-center justify-center gap-1.5 sm:gap-3 mb-6 py-3 px-2 bg-white rounded-xl border border-gray-100 shadow-sm">
                        <PipelineNode
                            label="Fichiers"
                            icon={<FolderOpen className="w-5 h-5" />}
                            active={niraBurst}
                            delay={0}
                        />
                        <PipelineArrow active={niraBurst} delay={0.1} />
                        <PipelineNode
                            label="OpenAI"
                            icon={<Sparkles className="w-5 h-5" />}
                            active={niraBurst}
                            delay={0.2}
                        />
                        <PipelineArrow active={niraBurst} delay={0.3} />
                        <PipelineNode
                            label="Classé"
                            icon={<FolderOpen className="w-5 h-5" />}
                            active={niraBurst}
                            delay={0.4}
                        />
                    </div>

                    {/* Nira file grid */}
                    <div className="flex-1 flex items-center justify-center">
                        <div className="grid grid-cols-5 gap-2 sm:gap-3">
                            {Array.from({ length: TOTAL_FILES }).map((_, i) => {
                                const done = i < niraProcessed;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 1 }}
                                        animate={{
                                            opacity: done ? 0.3 : 1,
                                            scale: done ? 0.8 : 1,
                                            borderColor: done ? "rgb(134 239 172)" : "rgb(229 231 235)",
                                            backgroundColor: done ? "rgb(240 253 244)" : "rgb(255 255 255)",
                                        }}
                                        transition={{ duration: 0.15 }}
                                        className="w-14 h-16 sm:w-16 sm:h-[72px] rounded-lg border-2 flex flex-col items-center justify-center gap-1"
                                    >
                                        <FileText className={`w-5 h-5 ${done ? "text-green-400" : "text-nira-blue/40"}`} />
                                        <span className="text-[9px] font-mono text-gray-400">
                                            {done ? "✓" : `#${i + 1}`}
                                        </span>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );

    // ─────────────── FINISHED STATE ───────────────
    const renderFinished = () => (
        <motion.div
            key="finished"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full text-center px-6 py-12"
        >
            <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl sm:text-4xl font-black text-gray-900 mb-2"
            >
                L'IA ne dort <span className="text-nira-blue">jamais</span>.
            </motion.h2>
            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-400 mb-10"
            >
                Résultats en 5 secondes :
            </motion.p>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-8 sm:gap-16 mb-12"
            >
                <div className="text-center">
                    <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-2">Vous</div>
                    <div className="text-5xl sm:text-6xl font-black text-gray-300 font-mono">{humanScore}</div>
                    <div className="text-xs text-gray-400 mt-1">/{TOTAL_FILES} fichiers</div>
                </div>
                <div className="w-px h-20 bg-gray-200" />
                <div className="text-center">
                    <div className="text-xs text-nira-blue uppercase tracking-widest font-semibold mb-2">Nira</div>
                    <div className="text-5xl sm:text-6xl font-black text-nira-blue font-mono drop-shadow-[0_0_20px_rgba(15,141,230,0.3)]">{niraProcessed}</div>
                    <div className="text-xs text-nira-blue/50 mt-1">/{TOTAL_FILES} fichiers</div>
                </div>
            </motion.div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-3"
            >
                <button
                    onClick={() => {
                        handleClose();
                        setTimeout(openAuditModal, 350);
                    }}
                    className="px-8 py-3 bg-nira-blue text-white font-semibold rounded-xl hover:bg-nira-blue/90 transition-all shadow-lg shadow-nira-blue/20 flex items-center gap-2"
                >
                    <Sparkles className="w-4 h-4" />
                    Automatiser mes processus
                </button>
                <button
                    onClick={resetGame}
                    className="px-6 py-3 bg-gray-100 text-gray-600 font-medium rounded-xl hover:bg-gray-200 transition-all flex items-center gap-2"
                >
                    <RotateCcw className="w-4 h-4" />
                    Rejouer
                </button>
            </motion.div>
        </motion.div>
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                        className="relative w-full max-w-5xl h-[620px] max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 z-50 w-9 h-9 bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 rounded-full flex items-center justify-center transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="flex-1 overflow-hidden relative">
                            <AnimatePresence mode="wait">
                                {gameState === "idle" && renderIdle()}
                                {gameState === "countdown" && renderCountdown()}
                                {gameState === "playing" && renderPlaying()}
                                {gameState === "finished" && renderFinished()}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
