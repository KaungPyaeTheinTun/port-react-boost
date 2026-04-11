import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLang } from "@/contexts/LangContext";

const HeroSection = () => {
  const { ref, isVisible } = useScrollReveal(0.05);
  const { t } = useLang();

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center section-padding pt-32"
      style={{ background: "var(--hero-gradient)" }}
    >
      <div className="max-w-4xl mx-auto w-full">
        <p className={`text-primary mb-5 text-lg transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {t.hero.greeting}
        </p>
        <h1 className={`text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-4 tracking-tight transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "100ms" }}>
          {t.hero.name}
        </h1>
        <h2 className={`text-3xl md:text-5xl lg:text-6xl font-bold text-muted-foreground mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "200ms" }}>
          {t.hero.tagline}
        </h2>
        <p className={`text-muted-foreground max-w-xl text-lg leading-relaxed mb-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "300ms" }}>
          {t.hero.description}
        </p>
        <div className={`flex gap-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "400ms" }}>
          <a
            href="#projects"
            className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            {t.hero.viewWork}
          </a>
          <a
            href="#contact"
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
          >
            {t.hero.getInTouch}
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
