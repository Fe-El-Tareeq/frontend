import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileContainer } from "../components/layout/MobileContainer";
import { LandingHeader } from "../components/landing/LandingHeader";
import { LandingSubNav } from "../components/landing/LandingSubNav";
import { LandingMenuModal } from "../components/landing/LandingMenuModal";
import { HeroSection } from "../components/landing/HeroSection";
import { HowItWorksSection } from "../components/landing/HowItWorksSection";
import { WhyUsSection } from "../components/landing/WhyUsSection";
import { FaqSection } from "../components/landing/FaqSection";
import { ContactSection } from "../components/landing/ContactSection";
import { LandingFooter } from "../components/landing/LandingFooter";

export default function LandingPage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-10 text-right">
      {/* Top Header */}
      <LandingHeader
        onOpenMenu={() => setIsMenuOpen(true)}
        onNavigateHome={() => navigate("/")}
      />

      {/* Slide-out Menu Overlay Modal */}
      <LandingMenuModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigateLogin={() => {
          setIsMenuOpen(false);
          navigate("/login");
        }}
        onNavigateRegister={() => {
          setIsMenuOpen(false);
          navigate("/register-step1");
        }}
        onNavigateHome={() => {
          setIsMenuOpen(false);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      {/* Sticky Secondary Navigation */}
      <LandingSubNav onScrollTo={scrollToSection} />

      {/* Page Sections */}
      <div className="px-4 pt-4 space-y-6">
        {/* 1. Hero Section */}
        <HeroSection
          onNeedItem={() => navigate("/register-step1")}
          onTraveler={() => navigate("/register-step1")}
        />

        {/* 2. How it works */}
        <HowItWorksSection />

        {/* 3. Why Choose Us */}
        <WhyUsSection />

        {/* 4. FAQs */}
        <FaqSection />

        {/* 5. Contact Us */}
        <ContactSection />

        {/* 6. Footer */}
        <LandingFooter
          onScrollTo={scrollToSection}
          onNavigateLogin={() => navigate("/login")}
          onNavigateRegister={() => navigate("/register-step1")}
        />
      </div>
    </MobileContainer>
  );
}
