import { Code2, Server, Database } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLang } from "@/contexts/LangContext";

const AboutSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useLang();

  const highlights = [
    { icon: Code2, label: t.about.frontend, desc: t.about.frontendDesc },
    { icon: Server, label: t.about.backend, desc: t.about.backendDesc },
    { icon: Database, label: t.about.database, desc: t.about.databaseDesc },
  ];

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className={`max-w-4xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-foreground mb-10">
          <span className="text-primary text-lg font-mono">01.</span>
          {t.about.title}
          <span className="h-px bg-border flex-1 max-w-xs" />
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {highlights.map(({ icon: Icon, label, desc }, i) => (
            <div
              key={label}
              className={`glass rounded-xl p-6 hover:border-primary/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Icon className="text-primary" size={22} />
              </div>
              <h3 className="font-bold text-foreground mb-1">{label}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>

        <div className={`text-muted-foreground leading-relaxed space-y-4 max-w-2xl transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "600ms" }}>
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
