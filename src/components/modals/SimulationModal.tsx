"use client";

import { useState, useEffect, useCallback, useRef, DragEvent } from "react";
import { useSimulationModal } from "@/store/useSimulationModal";
import { useAuditModal } from "@/store/useAuditModal";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, FolderOpen, Sparkles, Cpu, RotateCcw, ArrowRight } from "lucide-react";

type GameState = "idle" | "countdown" | "playing" | "finished";

const TOTAL_FILES = 12;
const RACE_DURATION = 15; // seconds

// ── Draggable file chip ──
function DraggableFile({ id, label, done }: { id: number; label: string; done: boolean }) {
    const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData("fileId", String(id));
        e.dataTransfer.effectAllowed = "move";
    };

    if (done) {
        return (
            <div className="h-11 rounded-lg bg-green-50 border border-green-200 flex items-center gap-2 px-3 opacity-60">
                <FileText className="w-4 h-4 text-green-400 shrink-0" />
                <span className="text-xs text-green-500 font-medium truncate">{label}</span>
                <span className="ml-auto text-green-400 text-xs">✓</span>
            </div>
        );
    }

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            className="h-11 rounded-lg bg-white border-2 border-gray-200 hover:border-nira-blue hover:shadow-md flex items-center gap-2 px-3 cursor-grab active:cursor-grabbing active:scale-95 active:border-nira-blue active:shadow-lg transition-all select-none"
        >
            <FileText className="w-4 h-4 text-gray-400 shrink-0" />
            <span className="text-xs text-gray-600 font-medium truncate">{label}</span>
        </div>
    );
}

// ── Drop zone (folder) ──
function DropFolder({
    onDrop,
    isOver,
    setIsOver,
    count,
    total,
}: {
    onDrop: (id: number) => void;
    isOver: boolean;
    setIsOver: (v: boolean) => void;
    count: number;
    total: number;
}) {
    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        setIsOver(true);
    };

    const handleDragLeave = () => setIsOver(false);

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsOver(false);
        const fileId = parseInt(e.dataTransfer.getData("fileId"), 10);
        if (!isNaN(fileId)) onDrop(fileId);
    };

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`w-full h-28 sm:h-32 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all duration-200 ${isOver
                ? "border-nira-blue bg-nira-blue/5 scale-[1.02] shadow-lg shadow-nira-blue/10"
                : "border-gray-300 bg-gray-50 hover:border-gray-400"
                }`}
        >
            <FolderOpen className={`w-8 h-8 ${isOver ? "text-nira-blue" : "text-gray-300"} transition-colors`} />
            <span className={`text-xs font-medium ${isOver ? "text-nira-blue" : "text-gray-400"}`}>
                Déposez ici ({count}/{total})
            </span>
        </div>
    );
}

// ── Pipeline node ──
function PipelineNode({ label, icon, active, delay }: { label: string; icon: React.ReactNode; active: boolean; delay: number }) {
    return (
        <motion.div
            animate={active ? { opacity: 1 } : { opacity: 0.35 }}
            transition={{ delay }}
            className="flex flex-col items-center gap-1"
        >
            <motion.div
                animate={
                    active
                        ? {
                            scale: [1, 1.12, 1],
                            boxShadow: [
                                "0 0 0px rgba(15,141,230,0)",
                                "0 0 18px rgba(15,141,230,0.4)",
                                "0 0 0px rgba(15,141,230,0)",
                            ],
                        }
                        : {}
                }
                transition={active ? { repeat: Infinity, duration: 1.4, delay } : {}}
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${active ? "bg-nira-blue text-white" : "bg-gray-100 text-gray-400"
                    }`}
            >
                {icon}
            </motion.div>
            <span className={`text-[10px] font-medium ${active ? "text-nira-blue" : "text-gray-400"}`}>{label}</span>
        </motion.div>
    );
}

const FILE_NAMES = [
    "brief_client.pdf",
    "facture_0127.xlsx",
    "rapport_q4.docx",
    "devis_final.pdf",
    "planning.csv",
    "contrat_v2.pdf",
    "notes_réunion.md",
    "budget_2025.xlsx",
    "cahier_charges.pdf",
    "specs_tech.docx",
    "offre_comm.pdf",
    "feedback.txt",
];

export function SimulationModal() {
    const { isOpen, closeModal } = useSimulationModal();
    const { openModal: openAuditModal } = useAuditModal();

    const [gameState, setGameState] = useState<GameState>("idle");
    const [countdown, setCountdown] = useState(3);
    const [timeLeft, setTimeLeft] = useState(RACE_DURATION);
    const [humanDone, setHumanDone] = useState<boolean[]>(Array(TOTAL_FILES).fill(false));
    const [niraProcessed, setNiraProcessed] = useState(0);
    const [niraBurst, setNiraBurst] = useState(false);
    const [dropHover, setDropHover] = useState(false);

    // Time tracking
    const startTimeRef = useRef<number | null>(null);
    const [humanFinishTime, setHumanFinishTime] = useState<number | null>(null);
    const [niraFinishTime, setNiraFinishTime] = useState<number | null>(null);

    const humanScore = humanDone.filter(Boolean).length;

    const resetGame = useCallback(() => {
        setGameState("idle");
        setCountdown(3);
        setTimeLeft(RACE_DURATION);
        setHumanDone(Array(TOTAL_FILES).fill(false));
        setNiraProcessed(0);
        setNiraBurst(false);
        setDropHover(false);
        startTimeRef.current = null;
        setHumanFinishTime(null);
        setNiraFinishTime(null);
    }, []);

    const handleClose = () => {
        closeModal();
        setTimeout(resetGame, 300);
    };

    const startCountdown = () => {
        setGameState("countdown");
        setCountdown(3);
    };

    // Countdown
    useEffect(() => {
        if (gameState !== "countdown") return;
        if (countdown <= 0) {
            setGameState("playing");
            startTimeRef.current = performance.now();
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

    // Nira burst — processes all files after 3 seconds
    useEffect(() => {
        if (gameState !== "playing") return;
        const burst = setTimeout(() => {
            setNiraBurst(true);
            let i = 0;
            const interval = setInterval(() => {
                i++;
                setNiraProcessed(i);
                if (i >= TOTAL_FILES) {
                    clearInterval(interval);
                    if (startTimeRef.current) {
                        setNiraFinishTime(performance.now() - startTimeRef.current);
                    }
                }
            }, 60);
        }, 3000);
        return () => clearTimeout(burst);
    }, [gameState]);

    // Human drops a file
    const handleFileDrop = (fileId: number) => {
        if (gameState !== "playing") return;
        setHumanDone((prev) => {
            const next = [...prev];
            if (!next[fileId]) {
                next[fileId] = true;
                // Check if finished
                if (next.every(v => v) && startTimeRef.current) {
                    setHumanFinishTime(performance.now() - startTimeRef.current);
                }
            }
            return next;
        });
    };

    // ─────── IDLE ───────
    const renderIdle = () => (
        <motion.div
            key="idle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center h-full text-center px-6 py-12"
        >
            <div className="w-14 h-14 rounded-2xl bg-nira-blue/10 flex items-center justify-center text-nira-blue mb-5">
                <Cpu className="w-7 h-7" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Humain vs <span className="text-nira-blue">Nira</span>
            </h2>
            <p className="text-gray-500 mb-6 max-w-md leading-relaxed text-sm sm:text-base">
                <strong className="text-gray-700">12 fichiers</strong> doivent être classés dans le bon dossier.
                <br />
                Glissez-déposez chaque fichier dans le dossier cible.
                Vous avez <strong className="text-gray-700">15 secondes</strong>.
                <br />
                Pendant ce temps, le pipeline IA de Nira fera la même chose de son côté.
            </p>

            <div className="flex items-center gap-3 text-xs text-gray-400 mb-8 bg-gray-50 rounded-full px-5 py-2.5 border border-gray-100">
                <FileText className="w-4 h-4 text-gray-400" />
                <span>Glissez les fichiers → Déposez dans le dossier</span>
                <FolderOpen className="w-4 h-4 text-nira-blue" />
            </div>

            <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={startCountdown}
                className="px-10 py-4 bg-gradient-to-r from-nira-blue-600 to-nira-blue-500 text-white font-bold rounded-2xl hover:shadow-[0_20px_40px_-15px_rgba(15,141,230,0.4)] transition-all flex items-center gap-3 relative overflow-hidden group"
            >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-[-20deg]" />
                <Sparkles className="w-5 h-5 text-blue-100" />
                <span className="relative z-10">Lancer la course</span>
            </motion.button>
        </motion.div>
    );

    // ─────── COUNTDOWN ───────
    const renderCountdown = () => (
        <motion.div
            key="countdown"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full"
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={countdown}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.8, opacity: 0 }}
                    transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
                    className="text-8xl font-black text-nira-blue"
                >
                    {countdown === 0 ? "GO!" : countdown}
                </motion.div>
            </AnimatePresence>
            <p className="text-gray-400 mt-4 text-sm">Préparez-vous à glisser !</p>
        </motion.div>
    );

    // ─────── PLAYING ───────
    const renderPlaying = () => (
        <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full flex flex-col"
        >
            {/* Timer bar */}
            <div className="flex-none px-4 sm:px-6 py-3 border-b border-gray-100 flex items-center justify-between bg-white">
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${timeLeft <= 3 ? "bg-red-500 animate-pulse" : "bg-green-500"}`} />
                    <span className="text-xs font-medium text-gray-500 hidden sm:inline">En cours</span>
                </div>
                <div className={`text-xl font-bold font-mono px-4 py-1 rounded-full ${timeLeft <= 3 ? "text-red-500 bg-red-50" : "text-gray-900 bg-gray-50"
                    }`}>
                    {timeLeft}s
                </div>
                <div className="text-xs text-gray-400 font-mono">
                    Vous: {humanScore}/{TOTAL_FILES}
                </div>
            </div>

            {/* Split */}
            <div className="flex-1 flex flex-col md:flex-row min-h-0 relative">
                {/* VS badge */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 items-center justify-center text-xs font-bold text-gray-400">
                    VS
                </div>

                {/* ── LEFT: Human ── */}
                <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-100 p-3 sm:p-5 flex flex-col bg-white overflow-y-auto">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-base">👤</span>
                        <h3 className="text-sm font-bold text-gray-900">Vous (Manuel)</h3>
                        <span className="ml-auto text-sm font-bold font-mono text-gray-900">{humanScore}/{TOTAL_FILES}</span>
                    </div>

                    {/* Files to drag */}
                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mb-3">
                        {FILE_NAMES.map((name, i) => (
                            <DraggableFile key={i} id={i} label={name} done={humanDone[i]} />
                        ))}
                    </div>

                    {/* Drop zone */}
                    <DropFolder
                        onDrop={handleFileDrop}
                        isOver={dropHover}
                        setIsOver={setDropHover}
                        count={humanScore}
                        total={TOTAL_FILES}
                    />
                </div>

                {/* ── RIGHT: Nira ── */}
                <div className="flex-1 p-3 sm:p-5 flex flex-col bg-gradient-to-br from-blue-50/60 to-white overflow-y-auto">
                    <div className="flex items-center gap-2 mb-3">
                        <Cpu className="w-4 h-4 text-nira-blue" />
                        <h3 className="text-sm font-bold text-gray-900">Nira <span className="text-nira-blue">(IA)</span></h3>
                        <span className="ml-auto text-sm font-bold font-mono text-nira-blue">{niraProcessed}/{TOTAL_FILES}</span>
                    </div>

                    {/* Pipeline */}
                    <div className="flex items-center justify-center gap-2 sm:gap-4 mb-3 py-2.5 px-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                        <PipelineNode label="Fichiers" icon={<FolderOpen className="w-5 h-5" />} active={niraBurst} delay={0} />
                        <motion.div animate={niraBurst ? { x: [0, 3, 0] } : {}} transition={niraBurst ? { repeat: Infinity, duration: 0.6 } : {}}>
                            <ArrowRight className={`w-3.5 h-3.5 ${niraBurst ? "text-nira-blue" : "text-gray-300"}`} />
                        </motion.div>
                        <PipelineNode label="OpenAI" icon={<Sparkles className="w-5 h-5" />} active={niraBurst} delay={0.15} />
                        <motion.div animate={niraBurst ? { x: [0, 3, 0] } : {}} transition={niraBurst ? { repeat: Infinity, duration: 0.6, delay: 0.2 } : {}}>
                            <ArrowRight className={`w-3.5 h-3.5 ${niraBurst ? "text-nira-blue" : "text-gray-300"}`} />
                        </motion.div>
                        <PipelineNode label="Classé ✓" icon={<FolderOpen className="w-5 h-5" />} active={niraBurst} delay={0.3} />
                    </div>

                    {/* Nira file grid */}
                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mb-3">
                        {FILE_NAMES.map((name, i) => {
                            const done = i < niraProcessed;
                            return (
                                <motion.div
                                    key={i}
                                    animate={{
                                        opacity: done ? 0.5 : 1,
                                        scale: done ? 0.95 : 1,
                                    }}
                                    transition={{ duration: 0.15 }}
                                    className={`h-11 rounded-lg border flex items-center gap-2 px-3 ${done ? "bg-green-50 border-green-200" : "bg-white border-gray-200"
                                        }`}
                                >
                                    <FileText className={`w-4 h-4 shrink-0 ${done ? "text-green-400" : "text-nira-blue/30"}`} />
                                    <span className={`text-xs font-medium truncate ${done ? "text-green-500" : "text-gray-500"}`}>{name}</span>
                                    {done && <span className="ml-auto text-green-400 text-xs">✓</span>}
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Nira drop complete */}
                    <div className={`w-full h-28 sm:h-32 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 ${niraProcessed >= TOTAL_FILES
                        ? "border-green-300 bg-green-50"
                        : niraBurst
                            ? "border-nira-blue bg-nira-blue/5 animate-pulse"
                            : "border-gray-200 bg-gray-50"
                        }`}>
                        <FolderOpen className={`w-8 h-8 ${niraProcessed >= TOTAL_FILES ? "text-green-400" : niraBurst ? "text-nira-blue" : "text-gray-300"
                            }`} />
                        <span className={`text-xs font-medium ${niraProcessed >= TOTAL_FILES ? "text-green-500" : niraBurst ? "text-nira-blue" : "text-gray-400"
                            }`}>
                            {niraProcessed >= TOTAL_FILES ? "Terminé ✓" : niraBurst ? "Classement en cours..." : "En attente..."}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );

    // ─────── FINISHED ───────
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
                Résultats en {RACE_DURATION} secondes :
            </motion.p>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-10 sm:gap-16 mb-12"
            >
                <div className="text-center min-w-[120px]">
                    <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-2">Vous</div>
                    <div className="text-4xl sm:text-5xl font-black text-gray-300 font-mono">
                        {humanFinishTime ? `${(humanFinishTime / 1000).toFixed(1)}s` : "> 15s"}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                        {humanScore < TOTAL_FILES ? `${humanScore}/${TOTAL_FILES} fichiers` : "Terminé"}
                    </div>
                </div>
                <div className="w-px h-20 bg-gray-200" />
                <div className="text-center min-w-[120px]">
                    <div className="text-xs text-nira-blue uppercase tracking-widest font-semibold mb-2">Nira</div>
                    <div className="text-4xl sm:text-5xl font-black text-nira-blue font-mono drop-shadow-[0_0_20px_rgba(15,141,230,0.3)]">
                        {niraFinishTime ? `${(niraFinishTime / 1000).toFixed(1)}s` : "..."}
                    </div>
                    <div className="text-xs text-nira-blue/50 mt-1">Terminé ✓</div>
                </div>
            </motion.div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-3"
            >
                <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { handleClose(); setTimeout(openAuditModal, 350); }}
                    className="px-8 py-3.5 bg-gradient-to-r from-nira-blue-600 to-nira-blue-500 text-white font-bold rounded-2xl hover:shadow-[0_20px_40px_-15px_rgba(15,141,230,0.4)] transition-all shadow-lg shadow-nira-blue/10 flex items-center gap-2 relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-[-20deg]" />
                    <Sparkles className="w-4 h-4 text-blue-100" />
                    <span className="relative z-10">Automatiser mes processus</span>
                </motion.button>
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
                        className="relative w-full max-w-5xl max-h-[92vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        <button
                            onClick={handleClose}
                            className="absolute top-3 right-3 z-50 w-8 h-8 bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 rounded-full flex items-center justify-center transition-colors"
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
