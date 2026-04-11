import { useState } from "react";
import { Send, Loader2, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLang } from "@/contexts/LangContext";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { ref: sectionRef, isVisible } = useScrollReveal();
  const { t } = useLang();

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
      setErrorMsg(t.contact.errorRequired);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setErrorMsg(t.contact.errorEmail);
      return;
    }
    if (name.length > 100 || email.length > 255 || message.length > 2000) {
      setStatus("error");
      setErrorMsg(t.contact.errorLength);
      return;
    }

    try {
      const { error } = await supabase.from("contact_submissions").insert({ name, email, message });
      if (error) throw error;

      // Send email notification (non-blocking — don't fail the form if email fails)
      supabase.functions.invoke('notify-contact', {
        body: { name, email, message },
      }).catch(console.error);

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
      setErrorMsg(t.contact.errorGeneric);
    }
  };

  const inputClasses = (field: string) =>
    `w-full bg-secondary border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none text-sm transition-all duration-300 ${
      focusedField === field
        ? "border-primary ring-2 ring-primary/20 shadow-[0_0_15px_hsl(var(--primary)/0.1)]"
        : "border-border hover:border-muted-foreground/30"
    }`;

  const fields = [
    { id: "name", label: t.contact.name, type: "text", maxLength: 100, placeholder: t.contact.namePlaceholder, delay: "100" },
    { id: "email", label: t.contact.email, type: "email", maxLength: 255, placeholder: t.contact.emailPlaceholder, delay: "200" },
  ];

  return (
    <section id="contact" className="section-padding" ref={sectionRef}>
      <div className={`max-w-2xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <p className="text-primary text-sm mb-3 text-center font-mono">05. {t.contact.subtitle}</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5 text-center">{t.contact.title}</h2>
        <p className="text-muted-foreground leading-relaxed mb-10 text-center">{t.contact.description}</p>

        {status === "success" ? (
          <div className="glass rounded-xl p-8 text-center animate-fade-up">
            <div className="animate-[bounce_0.6s_ease-out]">
              <CheckCircle className="text-primary mx-auto mb-4" size={48} />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">{t.contact.successTitle}</h3>
            <p className="text-muted-foreground mb-6">{t.contact.successDesc}</p>
            <button onClick={() => setStatus("idle")} className="text-primary hover:underline text-sm transition-colors duration-200">
              {t.contact.sendAnother}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass rounded-xl p-6 md:p-8 space-y-5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
            {fields.map((field) => (
              <div
                key={field.id}
                className={`transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${field.delay}ms` }}
              >
                <label htmlFor={field.id} className={`block text-sm font-medium mb-2 transition-colors duration-200 ${focusedField === field.id ? "text-primary" : "text-muted-foreground"}`}>
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

            <div className={`transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "300ms" }}>
              <label htmlFor="message" className={`block text-sm font-medium mb-2 transition-colors duration-200 ${focusedField === "message" ? "text-primary" : "text-muted-foreground"}`}>
                {t.contact.message}
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
                placeholder={t.contact.messagePlaceholder}
                className={`${inputClasses("message")} resize-none`}
              />
            </div>

            {status === "error" && <p className="text-sm text-destructive animate-fade-up">{errorMsg}</p>}

            <div className={`transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "400ms" }}>
              <button
                type="submit"
                disabled={status === "loading"}
                className="group w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-60 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 active:translate-y-0"
              >
                {status === "loading" ? (
                  <><Loader2 size={18} className="animate-spin" />{t.contact.sending}</>
                ) : (
                  <><Send size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />{t.contact.send}</>
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
