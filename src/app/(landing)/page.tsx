import HeroSection from "./_components/HeroSection";
import WhySliceSection from "./_components/WhySliceSection";
import StepsSection from "./_components/StepsSection";
import CommunicationSection from "./_components/CommunicationSection";
import CTASection from "./_components/CTASection";

export default function LandingPage() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <WhySliceSection />
      <StepsSection />
      <CommunicationSection />
      <CTASection />
    </main>
  );
}
