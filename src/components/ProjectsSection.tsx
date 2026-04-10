import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce application with real-time inventory management, payment processing with Stripe, and an admin dashboard for analytics.",
    tech: ["React", "Node.js", "PostgreSQL", "Stripe", "Redis"],
    github: "#",
    live: "#",
  },
  {
    title: "Task Management App",
    description:
      "A collaborative project management tool featuring drag-and-drop Kanban boards, real-time updates via WebSockets, and team chat functionality.",
    tech: ["Next.js", "TypeScript", "Prisma", "Socket.io"],
    github: "#",
    live: "#",
  },
  {
    title: "AI Content Generator",
    description:
      "An AI-powered content generation platform using OpenAI's API. Features include template management, content history, and team workspaces.",
    tech: ["React", "Python", "FastAPI", "OpenAI", "Docker"],
    github: "#",
    live: "#",
  },
  {
    title: "Real-Time Analytics Dashboard",
    description:
      "A data visualization dashboard processing millions of events per day with interactive charts, custom alerts, and automated reporting.",
    tech: ["Vue.js", "D3.js", "Go", "ClickHouse", "Kafka"],
    github: "#",
    live: "#",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-foreground mb-10">
          <span className="font-mono text-primary text-lg">03.</span>
          Featured Projects
          <span className="h-px bg-border flex-1 max-w-xs" />
        </h2>

        <div className="grid gap-6">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="glass rounded-lg p-6 md:p-8 hover:border-primary/50 transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="font-mono text-primary text-xs">
                  Project {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex gap-3">
                  <a href={project.github} className="text-muted-foreground hover:text-primary transition-colors">
                    <Github size={18} />
                  </a>
                  <a href={project.live} className="text-muted-foreground hover:text-primary transition-colors">
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="text-xs font-mono text-primary/80 bg-primary/10 px-2 py-1 rounded">
                    {t}
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

export default ProjectsSection;
