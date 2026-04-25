import { useState, useEffect } from "react";
import { BriefcaseBusiness, FileText, FolderKanban, Mail, Menu, Sparkles, User, X } from "lucide-react";
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
  const { t } = useLang();

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
      </nav>

      {/* Mobile sidebar overlay */}
      <div
        className={`fixed inset-0 z-[55] bg-background/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile sidebar */}
      <div
        className={`fixed top-0 right-0 z-[56] h-full w-72 bg-card/90 backdrop-blur-2xl border-l border-border/50 shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-end px-6 pt-5">
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto pt-4 px-8 pb-8" style={{ height: 'calc(100% - 60px)' }}>
          <ul className="flex flex-col gap-2">
            {navLinks.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 py-3 px-4 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 text-base font-medium"
                  style={{ transitionDelay: isOpen ? `${i * 50}ms` : "0ms" }}
                >
                  <span className="opacity-85">{link.icon}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-auto">
            <a
              href="/resume.pdf"
              className="inline-flex w-full items-center justify-center gap-2 border border-primary text-primary px-4 py-3 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-semibold"
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
