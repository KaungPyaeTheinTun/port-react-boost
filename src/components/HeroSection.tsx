const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center section-padding pt-32" style={{ background: "var(--hero-gradient)" }}>
      <div className="max-w-4xl mx-auto">
        <p className="font-mono text-primary mb-5 animate-fade-up">Hi, my name is</p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 animate-fade-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
          John Developer.
        </h1>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-muted-foreground mb-6 animate-fade-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
          I build things for the web.
        </h2>
        <p className="text-muted-foreground max-w-xl text-lg leading-relaxed mb-10 animate-fade-up" style={{ animationDelay: "0.3s", opacity: 0 }}>
          I'm a full-stack developer specializing in building exceptional digital experiences. 
          Currently focused on building accessible, human-centered products with modern technologies.
        </p>
        <div className="flex gap-4 animate-fade-up" style={{ animationDelay: "0.4s", opacity: 0 }}>
          <a
            href="#projects"
            className="border border-primary text-primary px-8 py-3 rounded font-mono hover:bg-primary/10 transition-colors"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="bg-primary text-primary-foreground px-8 py-3 rounded font-mono hover:bg-primary/90 transition-colors"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
