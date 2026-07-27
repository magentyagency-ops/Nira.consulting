import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Politique de Confidentialité | Nira Consulting",
    description: "Politique de protection des données personnelles et d'utilisation des cookies de Nira Consulting.",
};

export default function PolitiqueConfidentialite() {
    return (
        <main className="min-h-screen bg-white text-nira-dark flex flex-col justify-between">
            <Navbar />
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl pt-32 pb-20">
                <Link href="/" className="inline-flex items-center text-sm text-nira-gray hover:text-nira-blue transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour à l'accueil
                </Link>

                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-nira-dark mb-8">
                    Politique de Confidentialité
                </h1>

                <div className="prose prose-zinc max-w-none space-y-8 text-nira-gray text-base leading-relaxed">
                    <p>
                        Chez <strong>Nira Consulting</strong> (SIRET: 951 653 476 00014), nous accordons une importance capitale à la protection de vos données personnelles et au respect de votre vie privée conformément au Règlement Général sur la Protection des Données (RGPD).
                    </p>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-nira-dark">1. Données collectées</h2>
                        <p>
                            Nous collectons uniquement les données personnelles que vous nous fournissez volontairement lors de la demande d'audit ou de prise de contact :
                        </p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Nom et prénom</li>
                            <li>Adresse e-mail professionnelle</li>
                            <li>Nom d'entreprise</li>
                            <li>Numéro de téléphone (optionnel)</li>
                            <li>Description de vos besoins en automatisation</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-nira-dark">2. Utilisation des données</h2>
                        <p>
                            Vos données sont exclusivement utilisées pour :
                        </p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Répondre à vos demandes d'audit et d'informations</li>
                            <li>Vous élaborer une proposition d'accompagnement sur mesure</li>
                            <li>Gérer la relation commerciale et le suivi de projet</li>
                        </ul>
                        <p className="font-semibold text-nira-dark">
                            Vos données ne sont jamais vendues, cédées ou louées à des tiers.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-nira-dark">3. Durée de conservation</h2>
                        <p>
                            Les données prospectuelles sont conservées pendant une durée maximale de 3 ans à compter du dernier contact, puis supprimées ou archivées conformément aux exigences légales.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-nira-dark">4. Vos droits (RGPD)</h2>
                        <p>
                            Conformément à la réglementation européenne, vous disposez des droits suivants concernant vos données personnelles :
                        </p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Droit d'accès et de rectification</li>
                            <li>Droit à l'effacement (droit à l'oubli)</li>
                            <li>Droit à la limitation du traitement</li>
                            <li>Droit d'opposition</li>
                        </ul>
                        <p className="mt-2">
                            Pour exercer vos droits, contactez-nous à : <strong>contact@nira.consulting</strong>.
                        </p>
                    </section>
                </div>
            </div>

            <Footer />
        </main>
    );
}
