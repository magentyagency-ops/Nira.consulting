import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Mentions Légales | Nira Consulting",
    description: "Mentions légales de Nira Consulting, agence d'automatisation et d'IA pour entreprises.",
};

export default function MentionsLegales() {
    return (
        <main className="min-h-screen bg-white text-nira-dark flex flex-col justify-between">
            <Navbar />
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl pt-32 pb-20">
                <Link href="/" className="inline-flex items-center text-sm text-nira-gray hover:text-nira-blue transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour à l'accueil
                </Link>

                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-nira-dark mb-8">
                    Mentions Légales
                </h1>

                <div className="prose prose-zinc max-w-none space-y-8 text-nira-gray text-base leading-relaxed">
                    <section className="bg-nira-blue-50/50 p-6 md:p-8 rounded-2xl border border-nira-blue-100">
                        <h2 className="text-xl font-semibold text-nira-dark mb-4">1. Éditeur du site</h2>
                        <p>
                            Le site <strong>Nira Consulting</strong> est édité par la société <strong>NIRA CONSULTING</strong>.
                        </p>
                        <ul className="list-disc list-inside mt-3 space-y-1">
                            <li><strong>Forme juridique :</strong> Société par actions simplifiée (SAS / SASU)</li>
                            <li><strong>Numéro SIRET :</strong> 951 653 476 00014</li>
                            <li><strong>Numéro SIREN :</strong> 951 653 476</li>
                            <li><strong>Siège social :</strong> Paris, France</li>
                            <li><strong>Directeur de la publication :</strong> Nira Consulting</li>
                            <li><strong>Contact :</strong> contact@nira.consulting</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-nira-dark">2. Hébergement</h2>
                        <p>
                            Le site est hébergé sur la plateforme Vercel Inc. / Vercel Cloud Network.
                        </p>
                        <p className="text-sm">
                            Vercel Inc. — 440 N Barranca Ave #4133 Covina, CA 91723, USA.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-nira-dark">3. Propriété intellectuelle</h2>
                        <p>
                            L’ensemble des contenus présents sur le site (textes, graphismes, logos, éléments visuels, vidéos, icônes et code source) est la propriété exclusive de Nira Consulting, sauf mention contraire.
                        </p>
                        <p>
                            Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site est strictement interdite sans l'autorisation écrite préalable de Nira Consulting.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-nira-dark">4. Limitation de responsabilité</h2>
                        <p>
                            Nira Consulting s’efforce de fournir des informations aussi précises que possible. Toutefois, l'entreprise ne pourra être tenue responsable des omissions, inexactitudes et carences dans la mise à jour des informations.
                        </p>
                    </section>
                </div>
            </div>

            <Footer />
        </main>
    );
}
