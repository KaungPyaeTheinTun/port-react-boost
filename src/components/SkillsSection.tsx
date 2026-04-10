import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const skillCategories = [
  { title: "Frontend", skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux", "Vue.js"] },
  { title: "Backend", skills: ["Node.js", "Express", "Python", "Django", "GraphQL", "REST APIs"] },
  { title: "Database & Cloud", skills: ["PostgreSQL", "MongoDB", "Redis", "AWS", "Docker", "CI/CD"] },
  { title: "Tools & Others", skills: ["Git", "Figma", "Jest", "Cypress", "Linux", "Agile"] },
];

const SkillsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="skills" className="section-padding bg-card/30" ref={ref}>
      <div className={`max-w-4xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-foreground mb-10">
          <span className="font-mono text-primary text-lg">02.</span>
          Skills & Technologies
          <span className="h-px bg-border flex-1 max-w-xs" />
        </h2>

        <div className="grid sm:grid-cols-2 gap-8">
          {skillCategories.map((cat, i) => (
            <div
              key={cat.title}
              className={`glass rounded-lg p-6 hover:border-primary/50 hover:-translate-y-1 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${200 + i * 100}ms` }}
            >
              <h3 className="font-mono text-primary text-sm mb-4">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, j) => (
                  <span
                    key={skill}
                    className={`text-sm px-3 py-1 rounded-full bg-secondary text-secondary-foreground font-mono hover:bg-primary/10 hover:text-primary transition-all duration-300 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
                    style={{ transitionDelay: `${400 + i * 100 + j * 50}ms` }}
                  >
                    {skill}
                  </span>
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
