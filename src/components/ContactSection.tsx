import { useState, useRef, useEffect } from "react";
import { Mail, Send, Loader2, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name || !email || !message) {
      setStatus("error");
      setErrorMsg("Please fill in all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    if (name.length > 100 || email.length > 255 || message.length > 2000) {
      setStatus("error");
      setErrorMsg("One or more fields exceed the maximum length.");
      return;
    }

    try {
      const { error } = await supabase
        .from("contact_submissions")
        .insert({ name, email, message });

      if (error) throw error;

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again later.");
    }
  };

  const inputClasses = (field: string) =>
    `w-full bg-secondary border rounded px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none text-sm transition-all duration-300 ${
      focusedField === field
        ? "border-primary ring-2 ring-primary/20 shadow-[0_0_15px_hsl(var(--primary)/0.1)]"
        : "border-border hover:border-muted-foreground/30"
    }`;

  return (
    <section id="contact" className="section-padding" ref={sectionRef}>
      <div className={`max-w-2xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <p className="font-mono text-primary text-sm mb-3 text-center">05. What's Next?</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5 text-center">Get In Touch</h2>
        <p className="text-muted-foreground leading-relaxed mb-10 text-center">
          I'm currently open to new opportunities. Whether you have a question,
          a project idea, or just want to say hi — drop me a message!
        </p>

        {status === "success" ? (
          <div className="glass rounded-lg p-8 text-center animate-fade-up">
            <div className="animate-[bounce_0.6s_ease-out]">
              <CheckCircle className="text-primary mx-auto mb-4" size={48} />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h3>
            <p className="text-muted-foreground mb-6">
              Thanks for reaching out. I'll get back to you as soon as possible.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="font-mono text-primary hover:underline text-sm transition-colors duration-200 hover:text-primary/80"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass rounded-lg p-6 md:p-8 space-y-5 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.05)]">
            {[
              { id: "name", label: "Name", type: "text", maxLength: 100, placeholder: "Your name", delay: "100" },
              { id: "email", label: "Email", type: "email", maxLength: 255, placeholder: "you@example.com", delay: "200" },
            ].map((field) => (
              <div
                key={field.id}
                className={`transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${field.delay}ms` }}
              >
                <label htmlFor={field.id} className={`block text-sm font-mono mb-2 transition-colors duration-200 ${focusedField === field.id ? "text-primary" : "text-muted-foreground"}`}>
                  {field.label}
                </label>
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  maxLength={field.maxLength}
                  value={formData[field.id as keyof typeof formData]}
                  onChange={handleChange}
                  onFocus={() => setFocusedField(field.id)}
                  onBlur={() => setFocusedField(null)}
                  placeholder={field.placeholder}
                  className={inputClasses(field.id)}
                />
              </div>
            ))}

            <div
              className={`transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: "300ms" }}
            >
              <label htmlFor="message" className={`block text-sm font-mono mb-2 transition-colors duration-200 ${focusedField === "message" ? "text-primary" : "text-muted-foreground"}`}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                maxLength={2000}
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                placeholder="Your message..."
                className={`${inputClasses("message")} resize-none`}
              />
            </div>

            {status === "error" && (
              <p className="text-sm text-destructive font-mono animate-fade-up">{errorMsg}</p>
            )}

            <div
              className={`transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: "400ms" }}
            >
              <button
                type="submit"
                disabled={status === "loading"}
                className="group w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded font-mono transition-all duration-300 disabled:opacity-60 hover:bg-primary/90 hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default ContactSection;
