import { useState, useEffect } from "react";
// Replaced ArrowUpRight with ArrowUp for the scroll button layout
import {
  ArrowUp,
  ArrowUpRight,
  FileText,
  X,
  Linkedin,
  Github,
} from "lucide-react";
import { useLang } from "@/contexts/LangContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  const { t, lang, setLang } = useLang();

  useEffect(() => {
    const handleScroll = () => {
      // Button will show once the user scrolls down past 100px
      setIsAtTop(window.scrollY <= 100);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background page content from shifting or scrolling behind the overlay
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen]);

  // Smooth click scroll mechanism engine handler
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const navLinks = [
    { label: t.nav.about, href: "#about", num: "01" },
    { label: t.nav.skills, href: "#skills", num: "02" },
    { label: t.nav.projects, href: "#projects", num: "03" },
    { label: t.nav.experience, href: "#experience", num: "04" },
    { label: t.nav.contact, href: "#contact", num: "05" },
  ];

  return (
    <>
      {/* FLOATING SCROLL TO TOP FLOATER ACTION BUTTON */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full border border-neutral-200/60 dark:border-neutral-800/60 bg-white/80 dark:bg-black/80 text-black dark:text-white backdrop-blur-md flex items-center justify-center shadow-md transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-110 hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-black ${
          isAtTop || isOpen
            ? "opacity-0 translate-y-10 pointer-events-none"
            : "opacity-100 translate-y-0"
        }`}
        aria-label="Scroll back to top of portfolio page"
      >
        <ArrowUp size={18} className="animate-pulse" />
      </button>

      {/* HEADER NAV ROW BAR */}
      <nav
        className={`fixed top-0 left-0 right-0 h-16 z-50 flex items-center transition-colors duration-300 isolate transform translate-z-0 ${
          !isAtTop && !isOpen
            ? "bg-white/90 dark:bg-black/90 backdrop-blur-xl border-b border-neutral-200/40 dark:border-neutral-800/40"
            : "bg-transparent border-b border-transparent"
        }`}
        style={{
          WebkitTransform:
            "translate3d(0,0,0)" /* Deep iOS Safari Hardware Lock */,
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-12 flex items-center justify-between">
          <a
            href="#"
            className="text-neutral-900 dark:text-white font-display font-bold tracking-tight text-xl transition-opacity hover:opacity-80"
          >
            PORTFOLIO
          </a>

          <div className="flex items-center gap-4">
            <div className="relative h-10 px-1 rounded-full border border-neutral-200/60 dark:border-neutral-800/60 bg-white/60 dark:bg-black/60 flex items-center z-50 overflow-hidden">
              <div
                className={`absolute h-8 rounded-full bg-neutral-900 dark:bg-white shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  lang === "en"
                    ? "w-[43px] translate-x-0"
                    : "w-[45px] translate-x-[41px]"
                }`}
              />

              <button
                onClick={() => setLang("en")}
                className={`relative h-8 px-3 rounded-full text-[10px] font-bold tracking-wider uppercase z-10 transition-colors duration-300 ${
                  lang === "en"
                    ? "text-white dark:text-black"
                    : "text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                EN
              </button>

              <button
                onClick={() => setLang("mm")}
                className={`relative h-8 px-3 rounded-full text-[10px] font-bold tracking-wider uppercase z-10 transition-colors duration-300 ${
                  lang === "mm"
                    ? "text-white dark:text-black"
                    : "text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                MM
              </button>
            </div>

            {/* HAMBURGER TRIGGER BUTTON CONTROLLER */}
            <button
              className="relative z-50 h-10 px-5 rounded-full border border-neutral-200/60 dark:border-neutral-800/60 bg-white text-black dark:bg-white dark:text-black flex items-center gap-2.5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Navigation Screen Menu"
            >
              <span className="text-[11px] font-bold tracking-[0.1em] uppercase hidden sm:inline-block">
                {isOpen ? "Close" : "Menu"}
              </span>
              <div className="relative w-3.5 h-3.5 flex items-center justify-center">
                <span
                  className={`absolute w-3.5 h-0.5 bg-current transition-transform duration-300 ${isOpen ? "rotate-45" : "-translate-y-1"}`}
                />
                <span
                  className={`absolute w-3.5 h-0.5 bg-current transition-transform duration-300 ${isOpen ? "-rotate-45" : "translate-y-1"}`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* FULL VIEWPORT CURTAIN DROP WINDOW OVERLAY */}
      <div
        className={`fixed top-0 left-0 w-full h-[100dvh] z-40 bg-[#F4F3EF] dark:bg-[#121210] transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] flex flex-col justify-between p-6 sm:p-12 md:p-16 transform translate-z-0 ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
        style={{
          WebkitTransform: isOpen
            ? "translate3d(0,0,0)"
            : "translate3d(0,-100%,0)",
        }}
      >
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Header Top Spacer Area */}
        <div className="w-full h-16 sm:h-20 shrink-0" />

        {/* Core Main Center Body Container */}
        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-center my-auto relative z-10 overflow-y-auto max-h-[calc(100dvh-12rem)] no-scrollbar">
          <nav className="md:col-span-7 flex flex-col">
            <span className="text-[11px] tracking-[0.2em] uppercase font-bold text-neutral-400 dark:text-neutral-500 mb-4 block">
              Navigation Menu
            </span>
            <ul className="flex flex-col space-y-2 sm:space-y-4">
              {navLinks.map((link, i) => (
                <li key={link.href} className="overflow-hidden">
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`group flex items-baseline gap-4 text-3xl sm:text-5xl lg:text-6xl font-display font-semibold tracking-tight text-neutral-900 dark:text-white hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors duration-300 transition-all transform ${
                      isOpen
                        ? "translate-y-0 opacity-100"
                        : "translate-y-12 opacity-0"
                    }`}
                    style={{
                      transitionDuration: "600ms",
                      transitionDelay: isOpen ? `${150 + i * 60}ms` : "0ms",
                    }}
                  >
                    <span className="text-xs sm:text-sm font-mono font-bold text-neutral-400/70 dark:text-neutral-600/70">
                      {link.num}.
                    </span>
                    <span>{link.label}</span>
                    <ArrowUpRight
                      className="inline-block transform -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:-translate-y-1 transition-all duration-300 text-neutral-400"
                      size={24}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div
            className={`md:col-span-5 md:pl-12 flex flex-col space-y-6 border-t md:border-t-0 md:border-l border-neutral-200 dark:border-neutral-800 pt-6 md:pt-0 transition-all transform duration-700 delay-500 ${
              isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-neutral-400 dark:text-neutral-500 block mb-2">
                Quick Download
              </span>
              <a
                href="/resume.pdf"
                className="group flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60 hover:border-neutral-400 dark:hover:border-neutral-600 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-300">
                    <FileText size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-neutral-900 dark:text-white">
                      {t.nav.resume || "Curriculum Vitae"}
                    </p>
                    <p className="text-xs text-neutral-400">PDF (1.2 MB)</p>
                  </div>
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors"
                />
              </a>
            </div>

            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-neutral-400 dark:text-neutral-500 block mb-3">
                Connect
              </span>
              <div className="flex gap-3 h-11 items-center">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-0 max-w-[44px] hover:max-w-[140px] h-11 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60 text-neutral-700 dark:text-neutral-300 hover:text-white hover:bg-[#0A66C2] dark:hover:bg-[#0A66C2] shadow-sm overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                >
                  <div className="min-w-[42px] h-full flex items-center justify-center">
                    <Linkedin size={18} />
                  </div>
                  <span className="text-xs font-bold tracking-wide pr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    LinkedIn
                  </span>
                </a>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-0 max-w-[44px] hover:max-w-[130px] h-11 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60 text-neutral-700 dark:text-neutral-300 hover:text-white hover:bg-black dark:hover:bg-neutral-800 shadow-sm overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                >
                  <div className="min-w-[42px] h-full flex items-center justify-center">
                    <Github size={18} />
                  </div>
                  <span className="text-xs font-bold tracking-wide pr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    GitHub
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Window Subtitle Brand Meta Row info */}
        <div className="max-w-5xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between border-t border-neutral-200/60 dark:border-neutral-800/60 pt-4 text-[11px] text-neutral-400 dark:text-neutral-500 font-medium z-10 shrink-0">
          <p>
            © {new Date().getFullYear()} KaungPyaeTheinTun. All rights reserved.
          </p>
          <p className="mt-1 sm:mt-0 tracking-wide">Yangon, Myanmar</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
