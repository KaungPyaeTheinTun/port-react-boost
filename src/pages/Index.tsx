import Navbar from "@/components/Navbar";
import CursorTrailBackground from "@/components/CursorTrailBackground";
import SectionScrollIndicator from "@/components/SectionScrollIndicator";
import HeroSection from "@/components/HeroSection";
import { TechGrid } from "@/components/TechGrid";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { LangProvider } from "@/contexts/LangContext";

const Index = () => {
  return (
    <LangProvider>
      <div className="relative min-h-screen overflow-x-hidden bg-background">
        <CursorTrailBackground />
        <Navbar />
        <SectionScrollIndicator />
        <HeroSection />
        <TechGrid />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
        <Footer />
      </div>
    </LangProvider>
  );
};

export default Index;
