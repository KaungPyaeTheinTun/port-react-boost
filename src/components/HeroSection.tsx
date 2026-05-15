import { useEffect, useState } from "react";
import { Download } from "lucide-react";
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
      className="relative min-h-screen flex items-center section-padding pt-32 overflow-hidden"
    >
      {/* --- BLUEPRINT GRID BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle Cyan Grid Lines */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(28, 68, 86, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(56, 189, 248, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        {/* Radial Fade to make it dark at the corners */}
        <div 
          className="absolute inset-0" 
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full grid md:grid-cols-[1fr_minmax(320px,480px)] gap-12 md:gap-10 lg:gap-16 items-center md:items-end">
        
        {/* Left Content Column */}
        <div className="-mt-10 md:-mt-28 lg:-mb-[-6rem]">
          <p className={`text-primary mb-5 text-lg font-medium transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {t.hero.greeting}
          </p>
          
          <h1 className={`text-3xl md:text-4xl lg:text-5xl font-black text-black mb-4 tracking-tight transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "100ms" }}>
            {typedName}
            <span className="inline-block w-[2px] h-[0.9em] bg-primary ml-1 align-middle animate-pulse" aria-hidden="true" />
          </h1>

          <h2 className={`text-3xl md:text-5xl lg:text-5xl font-black text-black mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "200ms" }}>
            {t.hero.tagline}
          </h2>

          <p className={`text-slate-400 max-w-xl text-lg leading-relaxed mb-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "300ms" }}>
            {t.hero.description}
          </p>

          {/* Responsive Buttons: Vertical on mobile, Horizontal on desktop */}
          <div 
            className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} 
            style={{ transitionDelay: "400ms" }}
          >
            <a
              href="#projects"
              className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300 text-center"
            >
              {t.hero.viewWork}
            </a>
            
            <a
              href="/resume.pdf"
              download="Resume.pdf"
              className="flex items-center justify-center gap-4 bg-primary text-white pl-8 pr-3 py-2 rounded-lg font-semibold hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
            >
              {t.hero.resume || "Download Resume"}
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0f172a] text-white">
                <Download size={18} strokeWidth={2.5} />
              </span>
            </a>
          </div>
        </div>

        {/* Right Image Column */}
        <div
          className={`relative z-10 mx-auto md:mx-auto order-first md:order-last mt-6 md:mt-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="relative overflow-hidden w-[18rem] h-[22rem] md:w-[22rem] md:h-[30rem] lg:w-[27rem] lg:h-[36rem] rounded-t-[2.5rem] rounded-b-[7rem] border border-white/10 bg-slate-800/40 shadow-2xl backdrop-blur-sm">
            <img
              src={profileImg}
              alt={t.hero.name}
              loading="eager"
              className="w-full h-full object-cover object-top scale-[1.03]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;