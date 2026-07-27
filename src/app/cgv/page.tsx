import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Conditions Générales de Vente (CGV) | Nira Consulting",
    description: "Conditions Générales de Vente et de prestations de services de Nira Consulting.",
};

export default function CGV() {
    return (
        <main className="min-h-screen bg-white text-nira-dark flex flex-col justify-between">
            <Navbar />
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl pt-32 pb-20">
                <Link href="/" className="inline-flex items-center text-sm text-nira-gray hover:text-nira-blue transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour à l'accueil
                </Link>

                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-nira-dark mb-8">
                    Conditions Générales de Vente (CGV)
                </h1>

                <div className="prose prose-zinc max-w-none space-y-8 text-nira-gray text-base leading-relaxed">
                    <p>
                        Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre la société <strong>NIRA CONSULTING</strong> (SIRET: 951 653 476 00014) et ses clients professionnels.
                    </p>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-nira-dark">1. Objet des prestations</h2>
                        <p>
                            Nira Consulting propose des prestations de conseil, d'audit, de conception, de développement et de maintenance de solutions d'automatisation des processus et d'intégration d'intelligence artificielle.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-nira-dark">2. Devis et Commandes</h2>
                        <p>
                            Toute prestation fait l'objet d'un devis préalable détaillé indiquant la nature des travaux, les délais d'exécution et le tarif convenu. La commande est définitive à compter de la réception du devis signé avec la mention « Bon pour accord ».
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-nira-dark">3. Tarifs et Modalités de paiement</h2>
                        <p>
                            Les prix sont stipulés en Euros (€) hors taxes (HT). Sauf convention contraire précisée sur le devis :
                        </p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Un acompte de 30% à 50% est exigible à la commande</li>
                            <li>Le solde est payable à la livraison du projet ou selon le calendrier de recette convenu</li>
                            <li>Les factures sont payables à réception par virement bancaire</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-nira-dark">4. Propriété intellectuelle des livrables</h2>
                        <p>
                            La propriété des livrables et workflows développés sur mesure est transférée au client dès le paiement intégral du prix convenu.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-nira-dark">5. Confidentialité</h2>
                        <p>
                            Nira Consulting s'engage à préserver la confidentialité la plus stricte concernant les données, processus et informations stratégiques transmis par le client dans le cadre des projets.
                        </p>
                    </section>
                </div>
            </div>

            <Footer />
        </main>
    );
}
