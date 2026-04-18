import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLang } from "@/contexts/LangContext";
import profileImg from "@/assets/profile.jpeg";

const HeroSection = () => {
  const { ref, isVisible } = useScrollReveal(0.05);
  const { t } = useLang();

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center section-padding pt-32"
      style={{ background: "var(--hero-gradient)" }}
    >
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-[1fr_auto] gap-12 md:gap-16 items-center">
        <div>
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

        <div
          className={`relative mx-auto md:mx-0 order-first md:order-last transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: "200ms" }}
        >
          {/* Soft blurred glow frame */}
          <div
            aria-hidden
            className="absolute -inset-6 md:-inset-10 bg-primary/30 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -inset-2 bg-gradient-to-tr from-primary/40 via-primary/10 to-transparent blur-2xl"
          />
          <img
            src={profileImg}
            alt={t.hero.name}
            loading="lazy"
            className="relative w-64 h-80 md:w-80 md:h-[28rem] lg:w-96 lg:h-[32rem] object-cover"
            style={{
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black 45%, transparent 85%)",
              maskImage:
                "radial-gradient(ellipse at center, black 45%, transparent 85%)",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
