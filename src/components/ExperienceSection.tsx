import { useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLang } from "@/contexts/LangContext";

const experiences = [
  {
    company: "ITVIsionHub comp.",
    role: "Senior Full-Stack Developer",
    period: "2026 — Present",
    bullets: [
      "Developed and maintained scalable full-stack web applications using ASP.NET, Laravel, React.js, and RESTful APIs, delivering high-quality business solutions.",
      "Optimized application performance, database queries, and system workflows, improving response times and overall user experience.",
      "Implemented secure authentication, role-based access control, and CI/CD deployment processes, enhancing system reliability and development efficiency.",
    ],
  },
  {
    company: "ITVIsionHub comp.",
    role: "Full-Stack Developer",
    period: "2025 — 2026",
    bullets: [
      "Built and delivered full-stack web applications using PHP, Laravel, React.js, and RESTful APIs, supporting business-critical operations.",
      "Collaborated with cross-functional teams to develop new features, troubleshoot issues, and improve application reliability.",
      "Enhanced application performance through database optimization and code refactoring, resulting in faster page load times and improved efficiency.",
    ],
  },
  {
    company: "ITVIsionHub comp.",
    role: "Junior Developer",
    period: "2024 — 2025",
    bullets: [
      "Developed and maintained responsive web applications using modern frontend and backend technologies for multiple client projects.",
      "Collaborated with senior developers and designers to transform UI/UX designs into functional, user-friendly interfaces.",
      "Participated in debugging, testing, and performance optimization efforts, improving application stability and code quality.",
    ],
  },
];

const ExperienceSection = () => {
  const [active, setActive] = useState(0);
  const { ref, isVisible } = useScrollReveal();
  const { t } = useLang();

  return (
    <section id="experience" className="section-padding bg-card/30" ref={ref}>
      <div
        className={`max-w-4xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-foreground mb-10">
          <span className="text-primary text-lg font-mono">04.</span>
          {t.experience.title}
          <span className="h-px bg-border flex-1 max-w-xs" />
        </h2>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Tabs Sidebar */}
          <div
            className={`flex md:flex-col overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-l border-border transition-all duration-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
            style={{ transitionDelay: "200ms" }}
          >
            {experiences.map((exp, i) => (
              <button
                key={`${exp.company}-${i}`}
                onClick={() => setActive(i)}
                className={`px-5 py-3 text-sm text-left whitespace-nowrap transition-all duration-300
                  ${
                    active === i
                      ? "text-primary border-b-2 md:border-b-0 md:border-l-2 border-primary bg-primary/5 font-bold"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
              >
                {exp.company}
              </button>
            ))}
          </div>

          {/* Details Content Panel */}
          {/* FIXED: Removed key={active} here to prevent total DOM unmounting */}
          <div className="flex-1 min-h-[280px]">
            <h3 className="text-lg font-bold text-foreground">
              {experiences[active].role}{" "}
              <span className="text-primary">
                @ {experiences[active].company}
              </span>
            </h3>
            <p className="text-sm text-muted-foreground mb-5 font-mono">
              {experiences[active].period}
            </p>

            {/* FIXED: Placed unique key here so only the list re-renders smoothly */}
            <ul key={active} className="space-y-3">
              {experiences[active].bullets.map((bullet, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-sm text-muted-foreground animate-fade-up"
                  // FIXED: Removed opacity: 0 to let Tailwind/CSS handle entry state gracefully
                  style={{ animationDelay: `${i * 100}ms` }}
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
