import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLang } from "@/contexts/LangContext";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React", level: 50 },
      { name: "TypeScript", level: 90 },
      { name: "Vue.js", level: 50 },
      { name: "Tailwind CSS", level: 92 },
      { name: "BootStrap 5", level: 75 },
      { name: "HTML/CSS", level: 90 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "PHP", level: 88 },
      { name: "Laravel", level: 80 },
      { name: "ASP.NET", level: 65 },
      { name: "REST APIs", level: 92 },
    ],
  },
  {
    title: "Database & Cloud",
    skills: [
      { name: "MySQL", level: 85 },
      { name: "MSSQL", level: 80 },
      { name: "Redis", level: 70 },
      { name: "Digital Ocean", level: 50 },
      { name: "Docker", level: 78 },
      { name: "CI/CD", level: 82 },
    ],
  },
  {
    title: "Tools & Others",
    skills: [
      { name: "Git", level: 92 },
      { name: "Figma", level: 70 },
      { name: "Agile", level: 88 },
    ],
  },
];

const SkillsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useLang();

  return (
    <section id="skills" className="section-padding bg-card/30" ref={ref}>
      <div className={`max-w-4xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-foreground mb-10">
          <span className="text-primary text-lg font-mono">02.</span>
          {t.skills.title}
          <span className="h-px bg-border flex-1 max-w-xs" />
        </h2>

        <div className="grid sm:grid-cols-2 gap-8">
          {skillCategories.map((cat, i) => (
            <div
              key={cat.title}
              className={`glass rounded-xl p-6 hover:border-primary/50 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${200 + i * 120}ms` }}
            >
              <h3 className="text-primary text-sm font-bold uppercase tracking-wider mb-5">{cat.title}</h3>
              <div className="space-y-4">
                {cat.skills.map((skill, j) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm font-medium text-foreground">{skill.name}</span>
                      <span className="text-xs text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: isVisible ? `${skill.level}%` : "0%",
                          transitionDelay: `${400 + i * 120 + j * 80}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
