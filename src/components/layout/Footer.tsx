import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-nira-gray/10 pt-12 md:pt-20 pb-8 md:pb-10 relative z-10 backdrop-blur-md bg-white/40">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">

                    {/* Colonne 1 : Marque */}
                    <div className="col-span-2 lg:col-span-1">
                        <Link href="/" className="text-xl md:text-2xl font-bold tracking-tighter text-nira-dark flex items-center gap-2 mb-3 md:mb-4">
                            Nira.
                        </Link>
                        <p className="text-nira-gray text-xs md:text-sm leading-relaxed max-w-xs">
                            L'agence d'automatisation nouvelle génération. Nous transformons vos processus complexes en workflows parfaitement huilés grâce à l'IA.
                        </p>
                    </div>

                    {/* Colonne 2 : Agence */}
                    <div>
                        <h4 className="font-semibold text-nira-dark mb-4">Agence</h4>
                        <ul className="space-y-3 text-sm text-nira-gray">
                            <li><Link href="/#approche" className="hover:text-nira-blue transition-colors">Notre approche</Link></li>
                            <li><Link href="/#cas-d-usage" className="hover:text-nira-blue transition-colors">Cas d'usage</Link></li>
                            <li><Link href="/#impact" className="hover:text-nira-blue transition-colors">Impact & ROI</Link></li>
                            <li><Link href="/#why-nira" className="hover:text-nira-blue transition-colors">Pourquoi Nira ?</Link></li>
                        </ul>
                    </div>

                    {/* Colonne 3 : Légal & Support */}
                    <div>
                        <h4 className="font-semibold text-nira-dark mb-4">Légal</h4>
                        <ul className="space-y-3 text-sm text-nira-gray">
                            <li><Link href="/mentions-legales" className="hover:text-nira-blue transition-colors">Mentions légales</Link></li>
                            <li><Link href="/politique-de-confidentialite" className="hover:text-nira-blue transition-colors">Politique de confidentialité</Link></li>
                            <li><Link href="/cgv" className="hover:text-nira-blue transition-colors">CGV</Link></li>
                            <li><Link href="/#contact" className="hover:text-nira-blue transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Colonne 4 : Réseaux */}
                    <div>
                        <h4 className="font-semibold text-nira-dark mb-4">Réseaux</h4>
                        <ul className="space-y-3 text-sm text-nira-gray">
                            <li>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="group flex items-center hover:text-nira-blue transition-colors">
                                    LinkedIn
                                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                </a>
                            </li>
                            <li>
                                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="group flex items-center hover:text-nira-blue transition-colors">
                                    Twitter / X
                                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-6 md:pt-8 border-t border-nira-gray/10 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 text-xs md:text-sm text-nira-gray">
                    <p>© {new Date().getFullYear()} Nira. Tous droits réservés.</p>
                    <p className="flex items-center gap-1">
                        Fait avec <span className="text-red-500">♥</span> à Paris.
                    </p>
                </div>

            </div>
        </footer>
    );
}
