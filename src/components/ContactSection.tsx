import { useState } from "react";
import { Send, Loader2, CheckCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLang } from "@/contexts/LangContext";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { ref: sectionRef, isVisible } = useScrollReveal();
  const { t } = useLang();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    // Field Validations Check Engine
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

    // Dynamic Parameter Object Map matching the variable markers inside EmailJS template configuration layout
    const templateParams = {
      from_name: name,
      reply_to: email,
      message: message,
    };

    try {
      // EmailJS Delivery Request Framework Engine
      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      if (response.status !== 200) {
        throw new Error("Failed delivery handling.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error details payload:", error);
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
    {
      id: "name",
      label: t.contact.name,
      type: "text",
      maxLength: 100,
      placeholder: t.contact.namePlaceholder,
      delay: "100",
    },
    {
      id: "email",
      label: t.contact.email,
      type: "email",
      maxLength: 255,
      placeholder: t.contact.emailPlaceholder,
      delay: "200",
    },
  ];

  return (
    <section id="contact" className="section-padding" ref={sectionRef}>
      <div
        className={`max-w-2xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <p className="text-primary text-sm mb-3 text-center font-mono">
          06. {t.contact.subtitle}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5 text-center">
          {t.contact.title}
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-10 text-center">
          {t.contact.description}
        </p>

        {status === "success" ? (
          /* Redesigned Success Card Component with Glass Blur and Green Accents */
          <div className="backdrop-blur-md bg-emerald-500/5 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.05)] rounded-xl p-8 text-center animate-fade-up">
            <div className="animate-[bounce_0.6s_ease-out]">
              <CheckCircle
                className="text-emerald-500 mx-auto mb-4 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]"
                size={48}
              />
            </div>
            <h3 className="text-xl font-bold text-emerald-400 mb-2">
              {t.contact.successTitle}
            </h3>
            <p className="text-emerald-600/80 dark:text-emerald-400/70 mb-6 max-w-sm mx-auto text-sm">
              {t.contact.successDesc}
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="text-emerald-500 hover:text-emerald-400 font-medium hover:underline text-sm transition-colors duration-200"
            >
              {t.contact.sendAnother}
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="glass rounded-xl p-6 md:p-8 space-y-5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
          >
            {fields.map((field) => (
              <div
                key={field.id}
                className={`transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${field.delay}ms` }}
              >
                <label
                  htmlFor={field.id}
                  className={`block text-sm font-medium mb-2 transition-colors duration-200 ${focusedField === field.id ? "text-primary" : "text-muted-foreground"}`}
                >
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
              <label
                htmlFor="message"
                className={`block text-sm font-medium mb-2 transition-colors duration-200 ${focusedField === "message" ? "text-primary" : "text-muted-foreground"}`}
              >
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

            {status === "error" && (
              <p className="text-sm text-destructive animate-fade-up">
                {errorMsg}
              </p>
            )}

            <div
              className={`transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: "400ms" }}
            >
              <button
                type="submit"
                disabled={status === "loading"}
                className="group w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-60 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 active:translate-y-0"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    {t.contact.sending}
                  </>
                ) : (
                  <>
                    <Send
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                    {t.contact.send}
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
