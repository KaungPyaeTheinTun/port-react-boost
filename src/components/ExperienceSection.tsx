import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
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

const experienceTimeline = [
  {
    year: "2024",
    title: "Junior Developer",
    note: "Built strong frontend and backend foundations across real client projects.",
  },
  {
    year: "2025",
    title: "Full-Stack Developer",
    note: "Delivered production features, improved reliability, and optimized workflows.",
  },
  {
    year: "2026",
    title: "Senior Full-Stack Developer",
    note: "Leading scalable web application work across product, API, and deployment layers.",
  },
];

const ExperienceSection = () => {
  const [active, setActive] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { ref, isVisible } = useScrollReveal();
  const { t } = useLang();

  return (
    <section
      id="experience"
      className="relative overflow-hidden section-padding bg-card/30"
      ref={ref}
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(99, 102, 241, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(99, 102, 241, 0.06) 1px, transparent 1px)
            `,
            backgroundSize: "72px 72px",
          }}
        />

        <motion.div
          className="absolute -right-10 top-20 h-52 w-52 rounded-full bg-primary/12 blur-3xl"
          animate={{ x: [0, -18, 0], y: [0, 24, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-[-4rem] bottom-10 h-40 w-40 rounded-full bg-sky-400/10 blur-3xl"
          animate={{ x: [0, 22, 0], y: [0, -18, 0], scale: [1, 0.92, 1] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="absolute right-[8%] top-[28%] hidden lg:block">
          <div className="grid grid-cols-4 gap-4 opacity-40">
            {Array.from({ length: 12 }).map((_, index) => (
              <span
                key={index}
                className={`block rounded-full bg-primary/30 ${
                  index % 4 === 0 ? "h-2 w-2" : "h-1.5 w-1.5"
                } ${index % 3 === 0 ? "animate-pulse" : ""}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        className={`relative z-10 max-w-7xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-foreground mb-10">
          <span className="text-primary text-lg font-mono">05.</span>
          {t.experience.title}
          <span className="h-px bg-border flex-1 max-w-xs" />
        </h2>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="flex flex-col md:flex-row gap-6">
            <div
              className={`relative z-40 md:hidden transition-all duration-500 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen((open) => !open)}
                  className="flex w-full items-center justify-between rounded-2xl border border-border/70 bg-background/90 px-4 py-3 text-left shadow-sm backdrop-blur-sm transition-colors duration-200 hover:border-primary/40"
                >
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-foreground">
                      {experiences[active].role}
                    </div>
                    <div className="mt-1 text-[11px] font-mono text-muted-foreground">
                      {experiences[active].period}
                    </div>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-muted-foreground transition-transform duration-300 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="pointer-events-auto absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 space-y-2 rounded-2xl border border-border/70 bg-background p-2 shadow-xl ring-1 ring-black/5 backdrop-blur-md">
                    {experiences.map((exp, i) => (
                      <button
                        key={`${exp.company}-${i}`}
                        type="button"
                        onClick={() => {
                          setActive(i);
                          setIsDropdownOpen(false);
                        }}
                        className={`block w-full rounded-lg px-4 py-3 text-left transition-all duration-200 ${
                          active === i
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "bg-transparent text-foreground hover:bg-secondary/70"
                        }`}
                      >
                        <div className="text-sm font-semibold">{exp.role}</div>
                        <div
                          className={`mt-1 text-[11px] font-mono ${
                            active === i
                              ? "text-primary-foreground/80"
                              : "text-muted-foreground"
                          }`}
                        >
                          {exp.period}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Tabs Sidebar */}
            <div
              className={`hidden md:flex md:flex-col overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-l border-border transition-all duration-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
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

              <ul key={active} className="space-y-3">
                {experiences[active].bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-sm text-muted-foreground animate-fade-up"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <span className="text-primary mt-0.5 shrink-0">▹</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className={`glass rounded-3xl border border-primary/10 p-6 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "260ms" }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary/80 mb-6">
              Career Journey
            </p>

            <div className="relative space-y-6 pl-8">
              <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/70 via-primary/20 to-transparent" />

              {experienceTimeline.map((item, index) => {
                const isCurrent = index === experienceTimeline.length - 1;

                return (
                  <div
                    key={item.year}
                    className={`relative transition-all duration-500 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${320 + index * 100}ms` }}
                  >
                    <span
                      className={`absolute -left-8 top-1.5 h-6 w-6 rounded-full border ${
                        isCurrent
                          ? "border-primary/40 bg-primary/15"
                          : "border-border bg-background"
                      } flex items-center justify-center`}
                    >
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          isCurrent
                            ? "bg-primary animate-pulse"
                            : "bg-muted-foreground/35"
                        }`}
                      />
                    </span>

                    <p className="text-xs font-mono text-primary mb-1">
                      {item.year}
                    </p>
                    <h4 className="text-sm font-bold text-foreground">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.note}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-border/60 bg-background/80 px-3 py-3 text-center">
                <div className="text-lg font-bold text-foreground">03</div>
                <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  Roles
                </div>
              </div>
              <div className="rounded-2xl border border-border/60 bg-background/80 px-3 py-3 text-center">
                <div className="text-lg font-bold text-foreground">03+</div>
                <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  Years
                </div>
              </div>
              <div className="rounded-2xl border border-border/60 bg-background/80 px-3 py-3 text-center">
                <div className="text-lg font-bold text-foreground">FS</div>
                <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  Stack
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
