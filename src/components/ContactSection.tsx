import { Mail } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding">
      <div className="max-w-2xl mx-auto text-center">
        <p className="font-mono text-primary text-sm mb-3">05. What's Next?</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5">Get In Touch</h2>
        <p className="text-muted-foreground leading-relaxed mb-10">
          I'm currently open to new opportunities and my inbox is always open. 
          Whether you have a question, a project idea, or just want to say hi — 
          I'll do my best to get back to you!
        </p>
        <a
          href="mailto:hello@example.com"
          className="inline-flex items-center gap-2 border border-primary text-primary px-8 py-3 rounded font-mono hover:bg-primary/10 transition-colors"
        >
          <Mail size={18} />
          Say Hello
        </a>
      </div>
    </section>
  );
};

export default ContactSection;
