import { ExternalLink, Github } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLang } from "@/contexts/LangContext";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce application with real-time inventory management, payment processing with Stripe, and an admin dashboard for analytics.",
    tech: ["React", "Node.js", "PostgreSQL", "Stripe", "Redis"],
    github: "#",
    live: "#",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
  },
  {
    title: "Task Management App",
    description: "A collaborative project management tool featuring drag-and-drop Kanban boards, real-time updates via WebSockets, and team chat functionality.",
    tech: ["Next.js", "TypeScript", "Prisma", "Socket.io"],
    github: "#",
    live: "#",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
  },
  {
    title: "AI Content Generator",
    description: "An AI-powered content generation platform using OpenAI's API. Features include template management, content history, and team workspaces.",
    tech: ["React", "Python", "FastAPI", "OpenAI", "Docker"],
    github: "#",
    live: "#",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
  },
  {
    title: "Real-Time Analytics Dashboard",
    description: "A data visualization dashboard processing millions of events per day with interactive charts, custom alerts, and automated reporting.",
    tech: ["Vue.js", "D3.js", "Go", "ClickHouse", "Kafka"],
    github: "#",
    live: "#",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  },
];

const ProjectsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useLang();

  return (
    <section id="projects" className="section-padding" ref={ref}>
      <div className={`max-w-5xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-foreground mb-10">
          <span className="text-primary text-lg font-mono">03.</span>
          {t.projects.title}
          <span className="h-px bg-border flex-1 max-w-xs" />
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className={`glass rounded-xl overflow-hidden hover:border-primary/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 group ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              {/* Card image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <div className="absolute top-3 right-3 flex gap-2">
                  <a href={project.github} className="p-2 rounded-lg bg-background/80 backdrop-blur-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                    <Github size={16} />
                  </a>
                  <a href={project.live} className="p-2 rounded-lg bg-background/80 backdrop-blur-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>

              {/* Card body */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
