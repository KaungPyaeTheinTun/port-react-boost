import { useState, useEffect } from "react";
import { ArrowUpRight, BriefcaseBusiness, FileText, FolderKanban, Mail, Menu, Sparkles, User, X, Languages } from "lucide-react"; // ADDED: Languages icon
import { useLang } from "@/contexts/LangContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });
  
  // UPDATED: Destructure lang and setLang along with t
  const { t, lang, setLang } = useLang();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.classList.toggle("light", !isDark);
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY <= 2);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const navLinks = [
    { label: t.nav.about, href: "#about", icon: <User size={16} /> },
    { label: t.nav.skills, href: "#skills", icon: <Sparkles size={16} /> },
    { label: t.nav.projects, href: "#projects", icon: <FolderKanban size={16} /> },
    { label: t.nav.experience, href: "#experience", icon: <BriefcaseBusiness size={16} /> },
    { label: t.nav.contact, href: "#contact", icon: <Mail size={16} /> },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          !isAtTop || isOpen
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a
            href="#"
            className="text-foreground font-semibold tracking-[0.08em] uppercase text-sm md:text-base"
          >
            Portfolio
          </a>
          
          {/* Group wrapper to keep Language and Menu aligned horizontally */}
          <div className="flex items-center gap-3">
            
            {/* ADDED: Clean Language Switcher Capsule Button */}
            <div className="h-11 px-1.5 rounded-full border border-border/50 bg-background/90 backdrop-blur-xl flex items-center gap-1.5">
              <button
                onClick={() => setLang("en")}
                className={`h-8 w-8 rounded-full text-[10px] font-bold tracking-wider uppercase flex items-center justify-center transition-all duration-200 ${
                  lang === "en"
                    ? "bg-foreground text-background shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("mm")}
                className={`h-8 w-8 rounded-full text-[10px] font-bold tracking-wider uppercase flex items-center justify-center transition-all duration-200 ${
                  lang === "mm"
                    ? "bg-foreground text-background shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                MM
              </button>
            </div>

            <button
              className="relative z-[60] h-11 px-4 rounded-full border border-border/50 bg-background/90 backdrop-blur-xl text-foreground flex items-center gap-2 hover:bg-background transition-all duration-300"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <span className="text-[11px] font-semibold tracking-[0.08em] uppercase">
                Menu
              </span>
              {isOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile sidebar overlay */}
      <div
        className={`fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile sidebar */}
      <div
        className={`fixed top-0 right-0 z-[56] h-full w-[21rem] bg-background/90 backdrop-blur-2xl border-l border-border/60 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.55)] transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 pt-6">
          <p className="text-xs tracking-[0.16em] uppercase text-muted-foreground font-semibold">
            Navigation
          </p>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto pt-6 px-6 pb-6" style={{ height: "calc(100% - 64px)" }}>
          <ul className="flex flex-col gap-3">
            {navLinks.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center justify-between py-3.5 px-4 rounded-xl border border-transparent bg-muted/20 text-muted-foreground hover:text-foreground hover:bg-muted/100 transition-all duration-300 text-base font-medium"
                  style={{ transitionDelay: isOpen ? `${i * 50}ms` : "0ms" }}
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-background/80 border border-border/60 text-primary">
                      {link.icon}
                    </span>
                    {link.label}
                  </span>
                  <ArrowUpRight size={15} className="opacity-0 -translate-y-0.5 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0" />
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-6">
            <a
              href="/resume.pdf"
              className="inline-flex w-full items-center justify-center gap-2 border border-primary/60 bg-primary/5 text-primary px-4 py-3.5 rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-semibold"
            >
              <FileText size={16} />
              {t.nav.resume}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;