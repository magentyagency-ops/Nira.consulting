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
  title: "Nira | Automatisation par l'IA",
  description: "Audit, conception et déploiement d’automatisations sur mesure.",
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
