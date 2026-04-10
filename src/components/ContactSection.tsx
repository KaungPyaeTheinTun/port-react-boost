import { useState } from "react";
import { Mail, Send, Loader2, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

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

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-2xl mx-auto">
        <p className="font-mono text-primary text-sm mb-3 text-center">05. What's Next?</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5 text-center">Get In Touch</h2>
        <p className="text-muted-foreground leading-relaxed mb-10 text-center">
          I'm currently open to new opportunities. Whether you have a question,
          a project idea, or just want to say hi — drop me a message!
        </p>

        {status === "success" ? (
          <div className="glass rounded-lg p-8 text-center animate-fade-up">
            <CheckCircle className="text-primary mx-auto mb-4" size={48} />
            <h3 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h3>
            <p className="text-muted-foreground mb-6">
              Thanks for reaching out. I'll get back to you as soon as possible.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="font-mono text-primary hover:underline text-sm"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass rounded-lg p-6 md:p-8 space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-mono text-muted-foreground mb-2">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                maxLength={100}
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full bg-secondary border border-border rounded px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary transition-colors text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-mono text-muted-foreground mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                maxLength={255}
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-secondary border border-border rounded px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary transition-colors text-sm"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-mono text-muted-foreground mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                maxLength={2000}
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message..."
                className="w-full bg-secondary border border-border rounded px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary transition-colors text-sm resize-none"
              />
            </div>

            {status === "error" && (
              <p className="text-sm text-destructive font-mono">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded font-mono hover:bg-primary/90 transition-colors disabled:opacity-60"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default ContactSection;
