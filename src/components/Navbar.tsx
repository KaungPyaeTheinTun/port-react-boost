import { useState, useEffect } from "react";
import {
  ArrowUp,
  ArrowUpRight,
  FileText,
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
      setIsAtTop(window.scrollY <= 100);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      {/* FLOATING SCROLL TO TOP ACTION BUTTON */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-10 right-10 z-40 w-11 h-11 rounded-full border border-neutral-200/60 dark:border-neutral-800/60 bg-white/80 dark:bg-black/80 text-black dark:text-white backdrop-blur-md flex items-center justify-center shadow-md transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-110 hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-black ${
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
        className={`fixed left-0 right-0 z-50 flex items-center transition-all duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          isOpen ? "top-4 md:top-6 h-24" : "top-0 h-20 bg-transparent"
        } ${
          !isAtTop && !isOpen
            ? "bg-white/90 dark:bg-black/90 backdrop-blur-xl border-b border-neutral-200/40 dark:border-neutral-800/40"
            : "border-b border-transparent"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto w-full flex items-center justify-between z-50 transition-all duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] ${
            isOpen ? "px-10 sm:px-16 md:px-20" : "px-8 sm:px-12"
          }`}
        >
          <a
            href="#"
            className="text-neutral-900 dark:text-white font-display font-bold tracking-tight text-xl transition-opacity hover:opacity-80"
          >
            PORTFOLIO
          </a>

          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="relative h-10 px-1 rounded-full border border-neutral-200/60 dark:border-neutral-800/60 bg-white/60 dark:bg-black/60 flex items-center overflow-hidden">
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
              className="h-10 px-5 rounded-full border border-neutral-200/60 dark:border-neutral-800/60 bg-white text-black dark:bg-white dark:text-black flex items-center gap-2.5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
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

      {/* BACKDROP BLUR BEHIND THE CANVAS */}
      <div
        className={`fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-md z-40 transition-opacity duration-500 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* METAMASK-INSPIRED FULL VIEWPORT ROUNDED CANVAS WINDOW */}
      <div
        className={`fixed top-4 left-4 right-4 bottom-4 md:top-6 md:left-6 md:right-6 md:bottom-6 z-40 rounded-[2rem] md:rounded-[2.5rem] bg-white dark:bg-[#121210] border border-neutral-200/80 dark:border-neutral-800/80 shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] flex flex-col justify-between p-6 sm:p-12 md:p-16 transform overflow-hidden ${
          isOpen
            ? "translate-y-0 opacity-100 scale-100"
            : "-translate-y-4 opacity-0 scale-[0.98] pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Top Spacer Header Buffer */}
        <div className="w-full h-16 md:h-20 shrink-0" />

        {/* Core Main Center Body Container */}
        {/* CHANGED: Removed max-h-[calc(100dvh-16rem)] and overflow-y-auto to stop unnecessary scrolling on desktop */}
        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center flex-grow my-auto relative z-10 overflow-y-auto md:overflow-visible max-h-[calc(100dvh-12rem)] md:max-h-none no-scrollbar">
          {/* Left Grid Content */}
          <nav className="md:col-span-7 flex flex-col justify-center">
            <span className="text-[11px] tracking-[0.2em] uppercase font-bold text-neutral-400 dark:text-neutral-500 mb-4 md:mb-6 block">
              Explore Portfolio
            </span>
            <ul className="flex flex-col py-1">
              {navLinks.map((link, i) => (
                <li key={link.href} className="relative">
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`group flex items-baseline gap-4 text-neutral-900 dark:text-white hover:text-neutral-500 dark:hover:text-neutral-400 transition-all duration-300 transform ${
                      isOpen
                        ? "translate-y-0 opacity-100"
                        : "translate-y-12 opacity-0"
                    } ${
                      lang === "mm"
                        ? "text-xl sm:text-3xl lg:text-4xl font-normal py-2.5 my-0.5 leading-[1.5] tracking-wide"
                        : "text-3xl sm:text-5xl lg:text-6xl font-display font-semibold py-1.5 md:py-2 tracking-tight"
                    }`}
                    style={{
                      transitionDuration: "600ms",
                      transitionDelay: isOpen ? `${150 + i * 50}ms` : "0ms",
                    }}
                  >
                    <span className="text-xs sm:text-sm font-mono font-bold text-neutral-400/70 dark:text-neutral-600/70">
                      {link.num}.
                    </span>
                    <span>{link.label}</span>
                    <ArrowUpRight
                      className={`inline-block transform -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:-translate-y-1 transition-all duration-300 text-neutral-400 ${
                        lang === "mm" ? "w-5 h-5 self-center" : "w-6 h-6"
                      }`}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Grid Content */}
          <div
            className={`md:col-span-5 md:pl-12 flex flex-col space-y-8 border-t md:border-t-0 md:border-l border-neutral-200 dark:border-neutral-800 pt-8 md:pt-0 justify-center transition-all transform duration-700 delay-300 ${
              isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-neutral-400 dark:text-neutral-500 block mb-3">
                Quick Download
              </span>
              <a
                href="/resume.pdf"
                className="group flex items-center justify-between p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/60 dark:border-neutral-800/60 hover:border-neutral-400 dark:hover:border-neutral-600 shadow-sm transition-all duration-300"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-300 border border-neutral-200/40 dark:border-neutral-700">
                    <FileText size={18} />
                  </div>
                  <div className="text-left">
                    <p
                      className={`text-neutral-900 dark:text-white leading-normal ${lang === "mm" ? "text-sm font-normal py-0.5" : "text-sm font-bold"}`}
                    >
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
                  className="group flex items-center gap-0 max-w-[44px] hover:max-w-[140px] h-11 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60 text-neutral-700 dark:text-neutral-300 hover:text-white hover:bg-[#0A66C2] dark:hover:bg-[#0A66C2] shadow-sm overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
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
                  className="group flex items-center gap-0 max-w-[44px] hover:max-w-[130px] h-11 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60 text-neutral-700 dark:text-neutral-300 hover:text-white hover:bg-black dark:hover:bg-neutral-800 shadow-sm overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
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
