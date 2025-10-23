import AboutSection from "@/components/about-section";
import BenefitsSection from "@/components/benefits-section";
import ComingSoonSection from "@/components/coming-soon-section";
import CtaSection from "@/components/cta-section";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import InstallationSection from "@/components/installation-section";
import Navbar from "@/components/navbar";

export const dynamic = "force-static";
export const revalidate = false;

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <BenefitsSection />
      <InstallationSection />
      <CtaSection />
      <ComingSoonSection />
      <Footer />
    </main>
  );
}
