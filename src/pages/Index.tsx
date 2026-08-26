import Navbar from "@/components/Navbar";
import CursorTrailBackground from "@/components/CursorTrailBackground";
import SectionScrollIndicator from "@/components/SectionScrollIndicator";
import HeroSection from "@/components/HeroSection";
import { TechGrid } from "@/components/TechGrid";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import AutomationSection from "@/components/AutomationSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import OverscrollPanels from "@/components/OverscrollPanels";
import Footer from "@/components/Footer";
import { LangProvider } from "@/contexts/LangContext";

const Index = () => {
  const overscrollItems = [
    { id: "about", content: <AboutSection /> },
    { id: "skills", content: <SkillsSection /> },
    { id: "projects", content: <ProjectsSection /> },
    { id: "automation", content: <AutomationSection /> },
    { id: "experience", content: <ExperienceSection /> },
    { id: "contact", content: <ContactSection /> },
  ];

  return (
    <LangProvider>
      <div className="relative min-h-screen overflow-x-hidden bg-background">
        <CursorTrailBackground />
        <Navbar />
        <SectionScrollIndicator />
        <HeroSection />
        <TechGrid />
        <OverscrollPanels items={overscrollItems} />
        <Footer />
      </div>
    </LangProvider>
  );
};

export default Index;
