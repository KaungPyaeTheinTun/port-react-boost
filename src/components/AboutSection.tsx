import { Code2, Server, Database } from "lucide-react";

const highlights = [
  { icon: Code2, label: "Frontend", desc: "React, TypeScript, Tailwind" },
  { icon: Server, label: "Backend", desc: "Node.js, Python, REST/GraphQL" },
  { icon: Database, label: "Database", desc: "PostgreSQL, MongoDB, Redis" },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-foreground mb-10">
          <span className="font-mono text-primary text-lg">01.</span>
          About Me
          <span className="h-px bg-border flex-1 max-w-xs" />
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {highlights.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="glass rounded-lg p-6 hover:border-primary/50 transition-colors">
              <Icon className="text-primary mb-3" size={28} />
              <h3 className="font-semibold text-foreground mb-1">{label}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>

        <div className="text-muted-foreground leading-relaxed space-y-4 max-w-2xl">
          <p>
            Hello! I'm a passionate full-stack developer with 5+ years of experience crafting 
            digital solutions. I enjoy turning complex problems into simple, beautiful, and 
            intuitive applications.
          </p>
          <p>
            My journey in web development started back in college when I decided to build a 
            custom CMS — turns out hacking together a website taught me a lot about HTML &amp; CSS. 
            Since then, I've had the privilege of working across startups and established companies.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
