import { ExternalLink, Github } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLang } from "@/contexts/LangContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import busTicketImg from "@/assets/project-bus-ticket.png";
import trainingImg from "@/assets/project-training.png";
import supportTicketImg from "@/assets/project-support-ticket.png";
import employeeImg from "@/assets/project-employee.png";

const GITHUB_URL = "https://github.com/KaungPyaeTheinTun";

const projects = [
  {
    title: "Bus Ticket System",
    description:
      "A web-based bus ticket booking platform that lets users browse routes, pick seats, and book tickets online. Includes an admin panel for managing buses, schedules, and bookings.",
    tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Tailwind", "PHP", "MySQL", "Docker", "GitHub"],
    github: GITHUB_URL,
    live: null,
    image: busTicketImg,
  },
  {
    title: "Training Management System",
    description:
      "A complete training management solution built with Laravel for managing courses, trainers, students, schedules, and progress tracking. Deployed in production for ITVisionSoft.",
    tech: ["HTML5", "CSS3", "JavaScript", "Tailwind", "Laravel", "MySQL", "Docker", "Nginx", "Digital Ocean", "Redis", "Git", "GitHub"],
    github: GITHUB_URL,
    live: "https://itvisionsoft.com/",
    image: trainingImg,
  },
  {
    title: "Support Ticket Portal",
    description:
      "A modern customer support ticketing portal with React frontend and Laravel API backend. Features Redis caching, Nginx reverse proxy, and Dockerized deployment for scalability.",
    tech: ["React", "Laravel", "MySQL", "Redis", "Nginx","Docker", "Git", "GitHub"],
    github: GITHUB_URL,
    live: null,
    image: supportTicketImg,
  },
  {
    title: "Employee Management System",
    description:
      "An enterprise employee management application built on ASP.NET and MSSQL. Manages employee records, departments, attendance, and reporting with a clean admin interface.",
    tech: ["ASP.NET", "Tailwind","MSSQL", "Docker", "GitHub"],
    github: GITHUB_URL,
    live: null,
    image: employeeImg,
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

        <TooltipProvider delayDuration={150}>
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
                    loading="lazy"
                    width={800}
                    height={512}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} on GitHub`}
                          className="p-2 rounded-lg bg-background/80 backdrop-blur-sm text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-300"
                        >
                          <Github size={16} />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>View on GitHub</TooltipContent>
                    </Tooltip>

                    {project.live && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.title} live demo`}
                            className="p-2 rounded-lg bg-background/80 backdrop-blur-sm text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-300"
                          >
                            <ExternalLink size={16} />
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>Live Demo</TooltipContent>
                      </Tooltip>
                    )}
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
                    {project.tech.map((tech) => (
                      <span key={tech} className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
};

export default ProjectsSection;
