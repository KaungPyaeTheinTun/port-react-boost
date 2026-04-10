import { Github, Linkedin, Twitter } from "lucide-react";

const socials = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

const Footer = () => {
  return (
    <footer className="py-8 px-6 text-center">
      <div className="flex justify-center gap-6 mb-4">
        {socials.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label={label}
          >
            <Icon size={20} />
          </a>
        ))}
      </div>
      <p className="text-xs font-mono text-muted-foreground">
        Built with React & Tailwind CSS
      </p>
    </footer>
  );
};

export default Footer;
