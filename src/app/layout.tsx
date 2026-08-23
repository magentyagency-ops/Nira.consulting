import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { AuditModal } from "@/components/modals/AuditModal";
import { SimulationModal } from "@/components/modals/SimulationModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nira Consulting | Automatisation & IA",
  description: "Audit, conception et déploiement d’automatisations sur mesure pour accélérer la croissance de votre entreprise avec l'Intelligence Artificielle.",
  keywords: ["Nira Consulting", "Automatisation", "IA", "Intelligence Artificielle", "Make", "n8n", "Productivité"],
  openGraph: {
    title: "Nira Consulting | Automatisation & IA",
    description: "Audit, conception et déploiement d’automatisations sur mesure.",
    siteName: "Nira Consulting",
    locale: "fr_FR",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <AuditModal />
        <SimulationModal />
        <Toaster theme="dark" position="bottom-right" />
      </body>
    </html>
  );
}
