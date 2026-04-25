import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLang } from "@/contexts/LangContext";
import profileImg from "@/assets/profile.jpeg";

const HeroSection = () => {
  const { ref, isVisible } = useScrollReveal(0.05);
  const { t } = useLang();
  const [typedName, setTypedName] = useState("");

  useEffect(() => {
    const fullName = t.hero.name;
    let index = 0;
    let isDeleting = false;
    let timeoutId: number;
    setTypedName("");

    const tick = () => {
      if (isDeleting) {
        index -= 1;
      } else {
        index += 1;
      }

      setTypedName(fullName.slice(0, index));

      if (!isDeleting && index === fullName.length) {
        isDeleting = true;
        timeoutId = window.setTimeout(tick, 1000);
        return;
      }

      if (isDeleting && index === 0) {
        isDeleting = false;
        timeoutId = window.setTimeout(tick, 300);
        return;
      }

      timeoutId = window.setTimeout(tick, isDeleting ? 70 : 120);
    };

    timeoutId = window.setTimeout(tick, 120);

    return () => window.clearTimeout(timeoutId);
  }, [t.hero.name]);

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center section-padding pt-32"
      style={{ background: "var(--hero-gradient)" }}
    >
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-[1fr_minmax(320px,480px)] gap-12 md:gap-10 lg:gap-16 items-center md:items-end">
        <div className="-mt-10 md:-mt-28 lg:-mb-[-6rem]">
          <p className={`text-primary mb-5 text-lg transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {t.hero.greeting}
          </p>
          <h1 className={`text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4 tracking-tight transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "100ms" }}>
            {typedName}
            <span className="inline-block w-[2px] h-[0.9em] bg-primary ml-1 align-middle animate-pulse" aria-hidden="true" />
          </h1>
          <h2 className={`text-3xl md:text-5xl lg:text-5xl font-bold text-muted-foreground mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "200ms" }}>
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
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground pl-7 pr-3 py-2 rounded-lg font-semibold hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
            >
              {t.hero.getInTouch}
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-background text-foreground">
                <ArrowRight size={18} />
              </span>
            </a>
          </div>
        </div>

        <div
          className={`relative mx-auto md:mx-auto order-first md:order-last mt-6 md:mt-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="relative overflow-hidden w-[18rem] h-[22rem] md:w-[22rem] md:h-[30rem] lg:w-[27rem] lg:h-[36rem] rounded-t-[2.5rem] rounded-b-[7rem] border border-primary/10 bg-card shadow-[0_26px_60px_-28px_rgba(0,0,0,0.45)]">
            <img
              src={profileImg}
              alt={t.hero.name}
              loading="lazy"
              className="w-full h-full object-cover object-top scale-[1.03]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
