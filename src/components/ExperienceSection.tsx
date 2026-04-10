import { useState } from "react";

const experiences = [
  {
    company: "TechCorp Inc.",
    role: "Senior Full-Stack Developer",
    period: "2022 — Present",
    bullets: [
      "Lead a team of 5 engineers building a microservices architecture serving 2M+ users",
      "Implemented CI/CD pipelines reducing deployment time by 60%",
      "Architected a real-time notification system using WebSockets and Redis",
    ],
  },
  {
    company: "StartupXYZ",
    role: "Full-Stack Developer",
    period: "2020 — 2022",
    bullets: [
      "Built the core product from scratch using React, Node.js, and PostgreSQL",
      "Designed and implemented RESTful APIs consumed by web and mobile clients",
      "Optimized database queries resulting in 40% faster page loads",
    ],
  },
  {
    company: "WebAgency",
    role: "Junior Developer",
    period: "2019 — 2020",
    bullets: [
      "Developed responsive web applications for 10+ clients across various industries",
      "Collaborated with designers to translate Figma mockups into pixel-perfect interfaces",
      "Introduced automated testing practices increasing code coverage to 85%",
    ],
  },
];

const ExperienceSection = () => {
  const [active, setActive] = useState(0);

  return (
    <section id="experience" className="section-padding bg-card/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-foreground mb-10">
          <span className="font-mono text-primary text-lg">04.</span>
          Experience
          <span className="h-px bg-border flex-1 max-w-xs" />
        </h2>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Tabs */}
          <div className="flex md:flex-col overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-l border-border">
            {experiences.map((exp, i) => (
              <button
                key={exp.company}
                onClick={() => setActive(i)}
                className={`px-4 py-3 text-sm font-mono text-left whitespace-nowrap transition-colors
                  ${
                    active === i
                      ? "text-primary border-b-2 md:border-b-0 md:border-l-2 border-primary bg-primary/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
              >
                {exp.company}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="min-h-[280px]">
            <h3 className="text-lg font-semibold text-foreground">
              {experiences[active].role}{" "}
              <span className="text-primary">@ {experiences[active].company}</span>
            </h3>
            <p className="font-mono text-sm text-muted-foreground mb-5">
              {experiences[active].period}
            </p>
            <ul className="space-y-3">
              {experiences[active].bullets.map((bullet, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="text-primary mt-1 shrink-0">▹</span>
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
