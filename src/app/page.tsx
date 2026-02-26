import { Navbar } from "@/components/layout/Navbar";
import { LivingBlobBackground } from "@/components/animations/LivingBlobBackground";
import { Hero } from "@/components/sections/Hero";
import { Impact } from "@/components/sections/Impact";
import { Approche } from "@/components/sections/Approche";
import { UseCases } from "@/components/sections/UseCases";
import { WorkflowShowcase } from "@/components/sections/WorkflowShowcase";
import { WhyNira } from "@/components/sections/WhyNira";
import { SocialProof } from "@/components/sections/SocialProof";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative selection:bg-nira-blue-200 selection:text-nira-blue-900 overflow-hidden">
      <LivingBlobBackground />
      <Navbar />
      <Hero />
      <Impact />
      <Approche />
      <UseCases />
      <WorkflowShowcase />
      <WhyNira />
      <SocialProof />
      <Faq />
      <FinalCta />
      <Footer />
    </main>
  );
}
