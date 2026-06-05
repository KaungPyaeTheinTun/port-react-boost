import { useState, useEffect } from "react";
import { ExternalLink, Github, ArrowLeft, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLang } from "@/contexts/LangContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import busTicketImg from "@/assets/project-bus-ticket.png";
import trainingImg from "@/assets/project-training.png";
import supportTicketImg from "@/assets/project-support-ticket.png";
import employeeImg from "@/assets/project-employee.png";
import artwork from "@/assets/image.png";

const GITHUB_URL = "https://github.com/KaungPyaeTheinTun?tab=repositories";

const projects = [
  {
    title: "Artwork Showcase",
    description:
      "A visually stunning artwork showcase website built with React and Tailwind CSS. Features a responsive design, smooth animations, and an intuitive user interface for displaying digital art.",
    tech: ["React", "Tailwind", "Framer Motion", "Vite", "GitHub"],
    github: GITHUB_URL,
    live: "https://artwork-showcase.web.app/",
    image: artwork,
  },
  {
    title: "Training Management System",
    description:
      "A complete training management solution built with Laravel for managing courses, trainers, students, schedules, and progress tracking. Deployed in production for ITVisionSoft.",
    tech: [
      "Laravel",
      "Tailwind",
      "MySQL",
      "Docker",
      "Nginx",
      "Digital Ocean",
      "Redis",
    ],
    github: GITHUB_URL,
    live: "https://itvisionsoft.com/",
    image: trainingImg,
  },
  {
    title: "Support Ticket Portal",
    description:
      "A modern customer support ticketing portal with React frontend and Laravel API backend. Features Redis caching, Nginx reverse proxy, and Dockerized deployment for scalability.",
    tech: ["React", "Laravel", "MySQL", "Redis", "Nginx", "Docker"],
    github: GITHUB_URL,
    live: null,
    image: supportTicketImg,
  },
  {
    title: "Employee Management System",
    description:
      "An enterprise employee management application built on ASP.NET and MSSQL. Manages employee records, departments, attendance, and reporting with a clean admin interface.",
    tech: ["ASP.NET", "Tailwind", "MSSQL", "Docker", "GitHub"],
    github: GITHUB_URL,
    live: null,
    image: employeeImg,
  },
  {
    title: "Bus Ticket System",
    description:
      "A web-based bus ticket booking platform that lets users browse routes, pick seats, and book tickets online. Includes an admin panel for managing buses, schedules, and bookings.",
    tech: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Bootstrap",
      "Tailwind",
      "PHP",
      "MySQL",
      "Docker",
    ],
    github: GITHUB_URL,
    live: null,
    image: busTicketImg,
  }
];

const ProjectsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useLang();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(true);

  // Safely manage and track mobile viewport without causing hydration errors
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial state correctly on client mount
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getMaxIndex = () => {
    if (!isMobile) {
      return Math.max(0, projects.length - 3); // 3 visible items on desktop
    }
    return projects.length - 1; // 1 visible item on mobile
  };

  const slideLeft = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const slideRight = () => {
    setCurrentIndex((prev) => Math.min(getMaxIndex(), prev + 1));
  };

  // Automatically adjust current index if layout flips between desktop and mobile
  useEffect(() => {
    const maxIdx = getMaxIndex();
    if (currentIndex > maxIdx) {
      setCurrentIndex(maxIdx);
    }
  }, [isMobile]);

  const cannotSlideLeft = currentIndex === 0;
  const cannotSlideRight = currentIndex === getMaxIndex();

  const totalProjectsFormatted = String(projects.length).padStart(2, "0");

  return (
    <section
      id="projects"
      className="section-padding overflow-hidden w-full"
      ref={ref}
    >
      <div
        className={`max-w-7xl mx-auto transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* TITLE AND NAVIGATION HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-foreground flex-1">
            <span className="text-primary text-lg font-mono">03.</span>
            {t.projects.title}
            <span className="h-px bg-border flex-1 max-w-xs hidden xs:inline-block" />
          </h2>

          {/* Right Align Layout Container for Controls */}
          <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto">
            {/* TOTAL PROJECTS COUNT LABEL */}
            <div className="flex items-center gap-2 text-xs md:text-sm font-mono font-semibold text-muted-foreground/70 bg-muted/40 px-3 py-1.5 border border-border/40 rounded-xl select-none">
              <span className="text-primary font-bold">
                {totalProjectsFormatted}
              </span>
              <span className="text-muted-foreground/40 font-light">
                projects
              </span>
            </div>

            {/* BUTTON CONTROLS */}
            <div className="flex items-center gap-2">
              <button
                onClick={slideLeft}
                disabled={cannotSlideLeft}
                className={`p-2.5 rounded-xl border border-border/70 bg-background text-foreground transition-all duration-300 ${
                  cannotSlideLeft
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:bg-primary/10 hover:text-primary hover:border-primary/40 active:scale-95"
                }`}
                aria-label="Slide Left"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                onClick={slideRight}
                disabled={cannotSlideRight}
                className={`p-2.5 rounded-xl border border-border/70 bg-background text-foreground transition-all duration-300 ${
                  cannotSlideRight
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:bg-primary/10 hover:text-primary hover:border-primary/40 active:scale-95"
                }`}
                aria-label="Slide Right"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* --- VIEWPORT MASK CONTAINER --- */}
        <TooltipProvider delayDuration={150}>
          <div className="w-full overflow-hidden rounded-xl px-0.5 py-1">
            <div
              className="flex transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{
                // Calculates precise sliding shifts based on layout grid width
                transform: isMobile
                  ? `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 1.5}rem))`
                  : `translateX(calc(-${currentIndex * 33.333}% - ${currentIndex * 0.5}rem))`,
              }}
            >
              {projects.map((project) => (
                <div
                  key={project.title}
                  // w-full on mobile makes sure it fills exactly 100% viewport width without clipping
                  className="w-full md:w-[calc(33.333%-1rem)] mr-6 shrink-0 glass rounded-xl overflow-hidden hover:border-primary/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
                >
                  {/* Card Image */}
                  <div className="relative h-44 overflow-hidden bg-muted">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-background/80 backdrop-blur-sm text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-300"
                          >
                            <Github size={15} />
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
                              className="p-2 rounded-lg bg-background/80 backdrop-blur-sm text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-300"
                            >
                              <ExternalLink size={15} />
                            </a>
                          </TooltipTrigger>
                          <TooltipContent>Live Demo</TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex flex-col justify-between min-h-[220px]">
                    <div>
                      <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-xs leading-relaxed mb-4 line-clamp-4">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
};

export default ProjectsSection;
