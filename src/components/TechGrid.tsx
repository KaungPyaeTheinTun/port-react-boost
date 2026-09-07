import { motion } from "framer-motion";

const techIcons = [
  { name: "HTML5", slug: "html5", hex: "E34F26" },
  { name: "CSS3", slug: "css3", hex: "1572B6" },
  { name: "JavaScript", slug: "javascript", hex: "F7DF1E" },
  { name: "Tailwind", slug: "tailwindcss", hex: "06B6D4" },
  { name: "PHP", slug: "php", hex: "777BB4" },
  { name: "Laravel", slug: "laravel", hex: "FF2D20" },
  { name: "WordPress", slug: "wordpress", hex: "21759B" },
  { name: "C#", slug: "csharp", hex: "239120" },
  { name: "ASP.NET", slug: "dotnet", hex: "512BD4" },
  { name: "React.js", slug: "react", hex: "61DAFB" },
  { name: "MySQL", slug: "mysql", hex: "4479A1" },
  { name: "Digital Ocean", slug: "digitalocean", hex: "0080FF" },
  { name: "Docker", slug: "docker", hex: "2496ED" },
  { name: "MSSQL", slug: "microsoftsqlserver", hex: "CC292B" },
];

export function TechGrid() {
  // Tripling the icons ensures a seamless loop without running out of items on wide screens
  const marqueeIcons = [...techIcons, ...techIcons, ...techIcons];

  return (
    <section className="w-full overflow-hidden bg-background py-8 text-foreground transition-colors duration-300">
      <div className="w-full px-6 sm:px-10 md:px-16 lg:px-24">
        <div className="relative z-10 flex w-full items-center overflow-hidden bg-transparent">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-8 bg-gradient-to-r from-background to-transparent dark:from-background" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-8 bg-gradient-to-l from-background to-transparent dark:from-background" />

          {/* INFINITE MOVING MARQUEE TRACK */}
          <motion.div
            className="flex items-center min-h-[100px] md:min-h-[120px]"
            animate={{ x: [0, "-33.333%"] }}
            transition={{
              ease: "linear",
              duration: 25, // Control horizontal velocity speed parameters cleanly
              repeat: Infinity,
            }}
          >
            {marqueeIcons.map((tech, i) => {
              const iconUrl = `https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/${tech.slug}.svg`;

              return (
                <div
                  key={`${tech.name}-${i}`}
                  className="group relative flex h-[100px] w-[100px] shrink-0 cursor-pointer flex-col items-center justify-center gap-2 p-4 md:h-[120px] md:w-[120px]"
                >
                  <div className="absolute inset-0 rounded-2xl bg-neutral-50/0 transition-colors duration-200 group-hover:bg-neutral-100/80 dark:bg-transparent dark:group-hover:bg-neutral-800/80" />

                  <div className="relative z-10 flex h-10 w-10 items-center justify-center transition-transform duration-300 group-hover:scale-110 select-none pointer-events-none">
                    <div
                      className="h-full w-full"
                      style={{
                        backgroundColor: `#${tech.hex}`,
                        WebkitMaskImage: `url(${iconUrl})`,
                        maskImage: `url(${iconUrl})`,
                        WebkitMaskRepeat: "no-repeat",
                        maskRepeat: "no-repeat",
                        WebkitMaskPosition: "center",
                        maskPosition: "center",
                        WebkitMaskSize: "contain",
                        maskSize: "contain",
                      }}
                    />
                  </div>

                  <span className="pointer-events-none z-10 select-none text-[10px] font-semibold tracking-wide text-neutral-500 transition-colors group-hover:text-neutral-900 dark:text-neutral-300 dark:group-hover:text-white md:text-[11px]">
                    {tech.name}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
