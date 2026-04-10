const skillCategories = [
  {
    title: "Frontend",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux", "Vue.js"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express", "Python", "Django", "GraphQL", "REST APIs"],
  },
  {
    title: "Database & Cloud",
    skills: ["PostgreSQL", "MongoDB", "Redis", "AWS", "Docker", "CI/CD"],
  },
  {
    title: "Tools & Others",
    skills: ["Git", "Figma", "Jest", "Cypress", "Linux", "Agile"],
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding bg-card/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-foreground mb-10">
          <span className="font-mono text-primary text-lg">02.</span>
          Skills & Technologies
          <span className="h-px bg-border flex-1 max-w-xs" />
        </h2>

        <div className="grid sm:grid-cols-2 gap-8">
          {skillCategories.map((cat) => (
            <div key={cat.title} className="glass rounded-lg p-6">
              <h3 className="font-mono text-primary text-sm mb-4">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm px-3 py-1 rounded-full bg-secondary text-secondary-foreground font-mono"
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
