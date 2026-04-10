import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return !document.documentElement.classList.contains("light");
    }
    return true;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.classList.toggle("light", !isDark);
  }, [isDark]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-mono text-primary font-bold text-lg">
          {"<Dev />"}
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/resume.pdf"
              className="text-sm border border-primary text-primary px-4 py-2 rounded hover:bg-primary/10 transition-colors font-mono"
            >
              Resume
            </a>
          </li>
          <li>
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-secondary transition-all duration-300"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </li>
        </ul>

        {/* Mobile toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-secondary transition-all duration-300"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden glass border-t border-border">
          <ul className="flex flex-col items-center gap-6 py-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground hover:text-primary transition-colors font-mono"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
