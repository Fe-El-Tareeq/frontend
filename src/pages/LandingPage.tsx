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
import { LandingCtaBanner } from "../components/landing/LandingCtaBanner";
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
    <MobileContainer hasSidebar={false} className="bg-[#F8FAFC] dark:bg-[#0B1E36] pb-12 text-right max-w-none">
      {/* 1. Header with Menu Button & Logo */}
      <LandingHeader
        onOpenMenu={() => setIsMenuOpen(true)}
        onNavigateHome={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />

      {/* 2. Menu Overlay Modal (Popup when clicking hamburger icon) */}
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

      {/* 3. Sticky Sub Navigation Bar */}
      <LandingSubNav onScrollTo={scrollToSection} />

      {/* 4. Page Content Sections */}
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8 lg:px-12 pt-6 space-y-10">
        {/* Hero Section */}
        <HeroSection
          onNeedItem={() => navigate("/login")}
          onTraveler={() => navigate("/login")}
        />

        {/* How It Works (ثلاث خطوات بسيطة) */}
        <HowItWorksSection />

        {/* About / Why Choose Us (منصة مجتمعية تبني الثقة بين الجيران) */}
        <WhyUsSection />

        {/* FAQs (أسئلة يسألها المستخدمون) */}
        <FaqSection />

        {/* Contact Us (نحن هنا لمساعدتك) */}
        <ContactSection />

        {/* Bottom CTA Banner (ابدأ استخدام بطريقك اليوم) */}
        <LandingCtaBanner
          onRegister={() => navigate("/register-step1")}
          onLogin={() => navigate("/login")}
        />

        {/* Footer */}
        <LandingFooter
          onScrollTo={scrollToSection}
          onNavigateHome={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          onNavigateTerms={() => navigate("/terms")}
        />
      </div>
    </MobileContainer>
  );
}
