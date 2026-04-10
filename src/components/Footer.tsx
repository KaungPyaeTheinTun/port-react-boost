import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/contexts/LangContext";

const socials = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Mail, href: "mailto:hello@dev.com", label: "Email" },
];

const Footer = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const { t } = useLang();

  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
        <div className="flex items-center gap-5">
          {socials.map(({ icon: Icon, href, label }, i) => (
            <div key={label} className="relative">
              {/* Tooltip */}
              <span
                className={`absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 text-xs font-medium rounded-lg bg-foreground text-background whitespace-nowrap transition-all duration-300 pointer-events-none ${
                  hoveredIdx === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
              >
                {label}
                <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-foreground" />
              </span>
              <a
                href={href}
                className="block p-3 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:-translate-y-1"
                aria-label={label}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <Icon size={20} />
              </a>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          {t.footer.builtWith} <Heart size={12} className="text-primary" />
        </p>
      </div>
    </footer>
  );
};

export default Footer;
