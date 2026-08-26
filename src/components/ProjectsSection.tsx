import { useCallback, useEffect, useRef, useState } from "react";
import { ExternalLink, Github, ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLang } from "@/contexts/LangContext";
import busTicketImg from "@/assets/project-bus-ticket.png";
import trainingImg from "@/assets/project-training.png";
import supportTicketImg from "@/assets/project-support-ticket.png";
import cursorlineImg from "@/assets/cursorline.png";
import employeeImg from "@/assets/project-employee.png";
import artwork from "@/assets/image.png";

const GITHUB_URL = "https://github.com/KaungPyaeTheinTun?tab=repositories";
const MAX_VISIBLE = 2;
const SCALE_STEP = 0.14;
const DEPTH = 220;
const MOVE_DURATION_MS = 560;

const projects = [
  {
    title: "CursorLine",
    description:
      "An interactive AI-powered web application where users with a subscribed plan can ask AI questions and get information instantly. The platform also includes interactive sections for exploring the About, Blog, Changelog, and Features, all presented through a modern and engaging UI.",
    tech: [
      "React",
      "Laravel",
      "MySQL",
      "TypeScript",
      "Tailwind",
      "Framer Motion",
      "Vite",
      "Groq",
      "Stripe",
      "GitHub",
    ],
    github: "https://github.com/KaungPyaeTheinTun/cursorline_AI",
    live: "https://app.kaungpyaetheintun.site/",
    image: cursorlineImg,
  },
  {
    title: "Artwork Showcase",
    description:
      "A visually stunning artwork showcase website built with React and Tailwind CSS. Features a responsive design, smooth animations, and an intuitive user interface for displaying digital art.",
    tech: [
      "React",
      "TypeScript",
      "Tailwind",
      "Framer Motion",
      "Vite",
      "GitHub",
    ],
    github: "https://github.com/KaungPyaeTheinTun/ArtWork",
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
    tech: [
      "React",
      "TypeScript",
      "Tailwind",
      "Laravel",
      "MySQL",
      "Redis",
      "Nginx",
      "Docker",
    ],
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
  },
];

const ProjectsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useLang();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(1280);
  const lockRef = useRef(false);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const lockMovement = useCallback(() => {
    lockRef.current = true;
    window.setTimeout(() => {
      lockRef.current = false;
    }, MOVE_DURATION_MS);
  }, []);

  const step = useCallback(
    (direction: number) => {
      if (lockRef.current || projects.length < 2) return;

      lockMovement();
      setCurrentIndex((prev) => {
        const next = prev + direction;
        return ((next % projects.length) + projects.length) % projects.length;
      });
    },
    [lockMovement],
  );

  const goToProject = useCallback(
    (index: number) => {
      if (lockRef.current || index === currentIndex) return;
      lockMovement();
      setCurrentIndex(index);
    },
    [currentIndex, lockMovement],
  );

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number } },
  ) => {
    if (info.offset.x <= -70) {
      step(1);
    } else if (info.offset.x >= 70) {
      step(-1);
    }
  };

  const totalProjectsFormatted = String(projects.length).padStart(2, "0");
  const activeProject = projects[currentIndex];
  const activeProjectFormatted = String(currentIndex + 1).padStart(2, "0");
  const isMobile = viewportWidth < 640;
  const cardWidth = isMobile
    ? Math.min(330, viewportWidth * 0.84)
    : viewportWidth < 1024
      ? 540
      : 660;
  const cardHeight = Math.round(cardWidth * 0.56);
  const gap = isMobile ? 5.5 : 7;
  const tilt = isMobile ? 8 : 12;
  const sideTilt = isMobile ? 5 : 8;

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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-foreground flex-1">
            <span className="text-primary text-lg font-mono">03.</span>
            {t.projects.title}
            <span className="h-px bg-border flex-1 max-w-xs hidden xs:inline-block" />
          </h2>

          <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto">
            <div className="flex items-center gap-2 text-xs md:text-sm font-mono font-semibold text-muted-foreground/70 bg-muted/40 px-3 py-1.5 border border-border/40 rounded-xl select-none">
              <span className="text-primary font-bold">
                {activeProjectFormatted}
              </span>
              <span className="text-muted-foreground/40 font-light">/</span>
              <span className="text-muted-foreground/70 font-light">
                {totalProjectsFormatted}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => step(-1)}
                className="p-2.5 rounded-xl border border-border/70 bg-background text-foreground transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:border-primary/40 active:scale-95"
                aria-label="Previous Project"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                onClick={() => step(1)}
                className="p-2.5 rounded-xl border border-border/70 bg-background text-foreground transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:border-primary/40 active:scale-95"
                aria-label="Next Project"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="mx-auto flex justify-center px-1 py-4 [perspective:1600px]">
            <motion.div
              className="relative flex items-center justify-center"
              style={{
                width: cardWidth,
                height: cardHeight,
                transformStyle: "preserve-3d",
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={handleDragEnd}
            >
              {projects.map((project, index) => {
                let signedOffset = index - currentIndex;

                if (signedOffset > projects.length / 2) {
                  signedOffset -= projects.length;
                }
                if (signedOffset < -projects.length / 2) {
                  signedOffset += projects.length;
                }

                const offset = Math.abs(signedOffset);
                const isActive = signedOffset === 0;
                const visible = offset <= MAX_VISIBLE;
                const scale = isActive
                  ? 1.04
                  : Math.max(0.46, 1 - offset * SCALE_STEP);
                const translateX = signedOffset * gap * 30;
                const translateZ = -offset * DEPTH;
                const rotateY = -signedOffset * tilt;
                const rotateZ = signedOffset * sideTilt;

                return (
                  <motion.button
                    key={project.title}
                    type="button"
                    onClick={() => goToProject(index)}
                    className={`absolute left-1/2 top-1/2 block overflow-hidden border bg-card text-left ${
                      isActive
                        ? "border-primary/30 shadow-2xl shadow-primary/12"
                        : "border-border/50 shadow-xl shadow-black/5"
                    }`}
                    style={{
                      width: cardWidth,
                      height: cardHeight,
                      borderRadius: 18,
                      transformStyle: "preserve-3d",
                      transformOrigin: "center center",
                      pointerEvents: visible ? "auto" : "none",
                      cursor: isActive ? "grab" : "pointer",
                    }}
                    initial={{
                      opacity: 0,
                      transform:
                        "translate(-50%, -50%) translateX(0px) translateZ(0px) rotateY(0deg) rotateZ(0deg) scale(0.9)",
                    }}
                    animate={{
                      opacity: visible
                        ? isActive
                          ? 1
                          : offset > 1
                            ? 0.24
                            : 0.56
                        : 0,
                      transform: `translate(-50%, -50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
                    }}
                    transition={{
                      duration: MOVE_DURATION_MS / 1000,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileTap={{ scale: isActive ? 0.985 : 0.97 }}
                  >
                    <div className="relative h-full overflow-hidden bg-muted">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700"
                      />
                      <div
                        className={`absolute inset-0 ${
                          isActive
                            ? "bg-gradient-to-t from-background/72 via-background/14 to-transparent"
                            : "bg-gradient-to-t from-background/82 via-background/30 to-transparent"
                        }`}
                      />
                      <div
                        className="absolute inset-0 bg-black transition-opacity duration-500"
                        style={{
                          opacity: isActive ? 0 : offset > 1 ? 0.5 : 0.28,
                        }}
                      />
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>

          <div className="mt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.title}
                className="glass rounded-2xl border border-primary/10 p-6 md:p-8"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28 }}
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-3xl">
                    
                    <h3 className="text-2xl font-bold text-foreground md:text-3xl">
                      {activeProject.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                      {activeProject.description}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={activeProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-background px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                    >
                      <Github size={16} />
                      GitHub
                    </a>

                    {activeProject.live && (
                      <a
                        href={activeProject.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-primary/25 bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary transition hover:bg-primary/15"
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {activeProject.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-primary/10 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
