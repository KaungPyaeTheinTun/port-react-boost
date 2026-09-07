import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useTheme } from "next-themes";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLang } from "@/contexts/LangContext";
import profileImg from "@/assets/profile.jpeg";

const HeroSection = () => {
  const { ref, isVisible } = useScrollReveal(0.05);
  const { t } = useLang();
  const { resolvedTheme } = useTheme();
  const [typedName, setTypedName] = useState("");
  const shouldReduceMotion = useReducedMotion();
  const isDarkMode = resolvedTheme === "dark";
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, shouldReduceMotion ? 0 : 80],
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, shouldReduceMotion ? 0 : 24],
  );
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, shouldReduceMotion ? 0 : -40],
  );
  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, shouldReduceMotion ? 1 : 1.05],
  );

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
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center section-padding pt-32 overflow-hidden"
    >
      {/* --- BLUEPRINT GRID BACKGROUND --- */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: isDarkMode
              ? `
                  linear-gradient(to right, rgba(255, 255, 255, 0.18) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(96, 165, 250, 0.28) 1px, transparent 1px)
                `
              : `
                  linear-gradient(to right, rgba(28, 68, 86, 0.15) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(56, 189, 248, 0.08) 1px, transparent 1px)
                `,
            backgroundSize: "40px 40px",
            boxShadow: isDarkMode
              ? "inset 0 0 120px rgba(59, 130, 246, 0.18)"
              : "inset 0 0 80px rgba(14, 165, 233, 0.06)",
            WebkitMaskImage:
              "radial-gradient(circle at center, black 30%, transparent 90%)",
            maskImage:
              "radial-gradient(circle at center, black 30%, transparent 90%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: isDarkMode
              ? "radial-gradient(circle at center, rgba(59,130,246,0.22), transparent 60%)"
              : "radial-gradient(circle at center, rgba(14,165,233,0.08), transparent 70%)",
          }}
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto w-full grid md:grid-cols-[1fr_minmax(320px,480px)] gap-12 md:gap-10 lg:gap-16 items-center md:items-end">
        {/* Left Content Column */}
        <motion.div
          className="-mt-10 md:-mt-28 lg:-mb-[-6rem]"
          style={{ y: contentY }}
        >
          <p
            className={`text-primary dark:text-white mb-5 text-lg font-medium transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            {t.hero.greeting}
          </p>

          <h1
            className={`text-3xl md:text-4xl lg:text-5xl font-black text-black dark:text-white mb-4 tracking-tight transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "100ms" }}
          >
            {typedName}
            <span
              className="inline-block w-[2px] h-[0.9em] bg-primary ml-1 align-middle animate-pulse"
              aria-hidden="true"
            />
          </h1>

          <h2
            className={`text-3xl md:text-5xl lg:text-5xl font-black text-black dark:text-white mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "200ms" }}
          >
            {t.hero.tagline}
          </h2>

          <p
            className={`text-slate-400 dark:text-white/80 max-w-xl text-lg leading-relaxed mb-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "300ms" }}
          >
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
              className="flex items-center justify-center gap-4 bg-primary text-primary-foreground dark:text-black pl-8 pr-3 py-2 rounded-lg font-semibold hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
            >
              {t.hero.resume || "Download Resume"}
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0f172a] dark:bg-white text-white dark:text-black">
                <Download size={18} strokeWidth={2.5} />
              </span>
            </a>
          </div>
        </motion.div>

        {/* Right Image Column */}
        <motion.div
          className={`relative z-10 mx-auto md:mx-auto order-first md:order-last mt-6 md:mt-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: "200ms" }}
        >
          <motion.div
            className="relative overflow-hidden w-[18rem] h-[22rem] md:w-[22rem] md:h-[30rem] lg:w-[27rem] lg:h-[36rem] rounded-t-[2.5rem] rounded-b-[7rem] border border-white/10 bg-slate-800/40 shadow-2xl backdrop-blur-sm"
            style={{ y: imageY, scale: imageScale }}
          >
            <motion.img
              src={profileImg}
              alt={t.hero.name}
              loading="eager"
              className="w-full h-full object-cover object-top scale-[1.03]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
