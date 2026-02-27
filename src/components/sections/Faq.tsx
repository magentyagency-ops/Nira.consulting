"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        question: "Combien de temps faut-il pour voir les premiers résultats ?",
        answer: "Grâce à notre approche itérative, les premiers résultats (les 'quick wins') sont généralement visibles dès les deux premières semaines suivant l'audit. Nous priorisons toujours les automatisations ayant le plus fort ratio Impact/Effort."
    },
    {
        question: "Est-ce que mes données sont sécurisées avec l'IA ?",
        answer: "Absolument. Nous n'utilisons que des API d'entreprise conformes RGPD avec des politiques strictes de non-entraînement (zéro data retention). Vos données restent les vôtres, privées et chiffrées."
    },
    {
        question: "Faut-il changer tous nos outils actuels ?",
        answer: "Non, c'est tout l'inverse. Nira se connecte à votre écosystème existant (HubSpot, Salesforce, Slack, Google Workspace, etc.). Notre travail est de créer la 'glu' intelligente entre les logiciels que vos équipes maîtrisent déjà."
    },
    {
        question: "Comment facturez-vous vos prestations ?",
        answer: "Nous fonctionnons sous forme de forfaits d'intégration fixes ou d'abonnements mensuels (pour la maintenance et l'évolution continue). Le ROI est toujours chiffré avant tout engagement, garantissant un investissement rentable."
    },
    {
        question: "Que se passe-t-il si une automatisation casse ?",
        answer: "Nous incluons un monitoring temps réel sur l'ensemble de nos architectures. Si une API change ou qu'une erreur survient, nous sommes alertés instantanément et intervenons souvent avant même que vous ne le remarquiez."
    }
];

function FaqItem({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) {
    return (
        <div className="border-b border-nira-gray/10 mb-2">
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between py-6 text-left group transition-colors hover:text-nira-blue"
            >
                <span className={`text-base md:text-xl font-medium transition-colors ${isOpen ? 'text-nira-blue' : 'text-nira-dark'}`}>
                    {question}
                </span>
                <span className="ml-4 shrink-0 w-8 h-8 rounded-full bg-nira-gray/5 flex items-center justify-center group-hover:bg-nira-blue/10 transition-colors">
                    {isOpen ? <Minus className="w-4 h-4 text-nira-blue" /> : <Plus className="w-4 h-4 text-nira-dark group-hover:text-nira-blue" />}
                </span>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                    >
                        <p className="pb-8 text-nira-gray leading-relaxed pr-12">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function Faq() {
    const [openIndex, setOpenIndex] = useState<number | null>(0); // Le premier est ouvert par défaut

    return (
        <section className="py-16 md:py-32 relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-10 md:mb-24"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-nira-dark tracking-tight mb-4 md:mb-6">
                        Questions fréquentes.
                    </h2>
                    <p className="text-base md:text-lg text-nira-gray px-2">
                        Tout ce que vous devez savoir avant de franchir le pas de l'automatisation.
                    </p>
                </motion.div>

                <div className="bg-white/60 backdrop-blur-lg rounded-2xl md:rounded-3xl p-4 md:p-12 border border-nira-gray/5 shadow-sm">
                    {faqs.map((faq, index) => (
                        <FaqItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}
