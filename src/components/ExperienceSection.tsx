import { useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLang } from "@/contexts/LangContext";

const experiences = [
  {
    company: "ITVIsionHub comp.",
    role: "Senior Full-Stack Developer",
    period: "2026 — Present",
    bullets: [
      "Lead a team of 5 engineers building a microservices architecture serving 2M+ users",
      "Implemented CI/CD pipelines reducing deployment time by 60%",
      "Architected a real-time notification system using WebSockets and Redis",
    ],
  },
  {
    company: "ITVIsionHub comp.",
    role: "Full-Stack Developer",
    period: "2025 — 2026",
    bullets: [
      "Built the core product from scratch using React, Node.js, and PostgreSQL",
      "Designed and implemented RESTful APIs consumed by web and mobile clients",
      "Optimized database queries resulting in 40% faster page loads",
    ],
  },
  {
    company: "ITVIsionHub comp.",
    role: "Junior Developer",
    period: "2024 — 2025",
    bullets: [
      "Developed responsive web applications for 10+ clients across various industries",
      "Collaborated with designers to translate Figma mockups into pixel-perfect interfaces",
      "Introduced automated testing practices increasing code coverage to 85%",
    ],
  },
];

const ExperienceSection = () => {
  const [active, setActive] = useState(0);
  const { ref, isVisible } = useScrollReveal();
  const { t } = useLang();

  return (
    <section id="experience" className="section-padding bg-card/30" ref={ref}>
      <div className={`max-w-4xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-foreground mb-10">
          <span className="text-primary text-lg font-mono">04.</span>
          {t.experience.title}
          <span className="h-px bg-border flex-1 max-w-xs" />
        </h2>

        <div className="flex flex-col md:flex-row gap-6">
          <div
            className={`flex md:flex-col overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-l border-border transition-all duration-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
            style={{ transitionDelay: "200ms" }}
          >
            {experiences.map((exp, i) => (
              <button
                key={`${exp.company}-${i}`} 
                onClick={() => setActive(i)}
                className={`px-5 py-3 text-sm text-left whitespace-nowrap transition-all duration-300
                  ${active === i
                    ? "text-primary border-b-2 md:border-b-0 md:border-l-2 border-primary bg-primary/5 font-bold"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
              >
                {exp.company}
              </button>
            ))}
          </div>

          <div key={active} className="min-h-[280px] animate-fade-up">
            <h3 className="text-lg font-bold text-foreground">
              {experiences[active].role}{" "}
              <span className="text-primary">@ {experiences[active].company}</span>
            </h3>
            <p className="text-sm text-muted-foreground mb-5 font-mono">
              {experiences[active].period}
            </p>
            <ul className="space-y-3">
              {experiences[active].bullets.map((bullet, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-sm text-muted-foreground animate-fade-up"
                  style={{ animationDelay: `${i * 100}ms`, opacity: 0 }}
                >
                  <span className="text-primary mt-0.5 shrink-0">▹</span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
