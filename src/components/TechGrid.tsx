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
  { name: "Vue.js", slug: "vuedotjs", hex: "4FC08D" },
  { name: "MySQL", slug: "mysql", hex: "4479A1" },
  { name: "Digital Ocean", slug: "digitalocean", hex: "0080FF" },
  { name: "Docker", slug: "docker", hex: "2496ED" },
  { name: "MSSQL", slug: "microsoftsqlserver", hex: "CC292B" },
];

export function TechGrid() {
  // Tripling the icons ensures a seamless loop without running out of items on wide screens
  const marqueeIcons = [...techIcons, ...techIcons, ...techIcons];

  return (
    // Background is solid white, border spans full screen width
    <section className="w-full bg-white overflow-hidden py-8">
      {/* Keeps internal content aligned matching the max width constraints of the HeroSection */}
      <div className="w-full px-6 sm:px-10 md:px-16 lg:px-24">
        {/* Marquee Viewport Container - Expands full-width beneath title */}
        <div className="relative w-full overflow-hidden bg-white flex items-center z-10">
          {/* Subtle edge fades to blend the items smoothly as they slide */}
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

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
                  className="flex flex-col items-center justify-center gap-2 p-4 h-[100px] md:h-[120px] w-[100px] md:w-[120px] shrink-0 relative group cursor-pointer"
                >
                  {/* Hover background highlight overlay */}
                  <div className="absolute inset-0 bg-neutral-50/0 group-hover:bg-neutral-50/60 group-hover:rounded-2xl transition-colors duration-200" />

                  {/* Brand Color Icon Mask Layer */}
                  <div className="w-10 h-10 relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110 z-10 select-none pointer-events-none">
                    <div
                      className="w-full h-full"
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

                  {/* Technology Label */}
                  <span className="text-[10px] md:text-[11px] font-semibold tracking-wide text-neutral-400 group-hover:text-neutral-900 transition-colors z-10 select-none pointer-events-none">
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
