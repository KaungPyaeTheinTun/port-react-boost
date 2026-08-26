import { Bot, FileText, Mail, MessageCircle } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLang } from "@/contexts/LangContext";
import workflowItOpsImg from "@/assets/overview.png";
import gmailWorkflowImg from "@/assets/Screenshot 2026-08-25 115932.png";
import telegramHybridImg from "@/assets/Screenshot 2026-08-25 115947.png";
import telegramAutoImg from "@/assets/Screenshot 2026-08-25 120002.png";
import laravelQuotationImg from "@/assets/Screenshot 2026-08-25 120024.png";

const metrics = [
  { value: "04", label: "Real workflows" },
  { value: "08+", label: "Apps connected" },
  { value: "03", label: "AI automations" },
  { value: "24/7", label: "Always-on flows" },
];

const workflows = [
  {
    icon: Mail,
    title: "Gmail Campaign Sender",
    category: "Outbound Automation",
    summary:
      "Bulk-send email campaigns and automatically follow up with contacts when no reply is detected.",
    trigger: "Lead list / campaign launch",
    result: "Automated send + timed follow-up",
    stack: ["n8n", "Gmail", "Delay", "Reply Check"],
    image: gmailWorkflowImg,
  },
  {
    icon: MessageCircle,
    title: "Telegram AI with Auto Question",
    category: "Conversational AI",
    summary:
      "Receives Telegram messages, processes user questions automatically, and sends AI-generated replies back in chat.",
    trigger: "Telegram incoming message",
    result: "Instant AI response workflow",
    stack: ["n8n", "Telegram", "AI", "Prompt Logic"],
    image: telegramAutoImg,
  },
  {
    icon: Bot,
    title: "Telegram AI-Bot (OpenAI Hybrid)",
    category: "Hybrid Assistant",
    summary:
      "Routes Telegram requests through hybrid AI logic to provide smarter answers, fallbacks, and structured responses.",
    trigger: "Telegram bot interaction",
    result: "Hybrid OpenAI-powered assistant",
    stack: ["n8n", "Telegram", "OpenAI", "Routing"],
    image: telegramHybridImg,
  },
  {
    icon: FileText,
    title: "Laravel Quotation Automation",
    category: "Ops + Documents",
    summary:
      "Takes Laravel quotation form data, copies the source sheet from Drive, updates it, then sends email and Slack notifications.",
    trigger: "Laravel form submission",
    result: "Generated quotation + team alerts",
    stack: ["n8n", "Laravel", "Google Drive", "Sheets", "Email", "Slack"],
    image: laravelQuotationImg,
  },
];

const AutomationSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useLang();

  return (
    <section
      id="automation"
      className="section-padding bg-card/30 overflow-hidden"
      ref={ref}
    >
      <div
        className={`max-w-7xl mx-auto transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-foreground mb-10">
          <span className="text-primary text-lg font-mono">04.</span>
          {t.automation.title}
          <span className="h-px bg-border flex-1 max-w-xs" />
        </h2>

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-start mb-10">
          <div
            className={`space-y-6 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "120ms" }}
          >
            <div className="space-y-4 max-w-2xl">
              <p className="text-primary text-sm font-bold uppercase tracking-[0.18em]">
                {t.automation.kicker}
              </p>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                {t.automation.subtitle}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t.automation.description}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {metrics.map((metric, index) => (
                <div
                  key={metric.label}
                  className={`glass rounded-xl p-5 transition-all duration-500 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: `${220 + index * 90}ms` }}
                >
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {metric.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`glass rounded-2xl p-6 md:p-7 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "220ms" }}
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <p className="text-primary text-xs font-bold uppercase tracking-[0.18em] mb-2">
                  {t.automation.featuredLabel}
                </p>
                <h4 className="text-xl font-bold text-foreground">
                  Workflow Preview
                </h4>
              </div>
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Real Workflow
              </span>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-3 md:p-4 overflow-hidden">
              <img
                src={workflowItOpsImg}
                alt="n8n workflow preview"
                className="w-full h-auto rounded-xl border border-slate-200/90 bg-white object-contain"
              />
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                A real n8n workflow preview integrated into the section as the
                featured automation visual.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {workflows.map((workflow, index) => {
            const Icon = workflow.icon;

            return (
              <div
                key={workflow.title}
                className={`group relative glass rounded-2xl p-6 min-h-[320px] overflow-hidden hover:border-primary/40 hover:-translate-y-1 transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${320 + index * 100}ms` }}
              >
                <div className="relative z-10 transition-opacity duration-300 group-hover:opacity-0">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Icon size={22} />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary/80 mb-2">
                          {workflow.category}
                        </p>
                        <h3 className="text-lg font-bold text-foreground">
                          {workflow.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-muted-foreground mb-5">
                    {workflow.summary}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-3 mb-5">
                    <div className="rounded-xl bg-background/70 border border-border/60 p-3">
                      <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary/80 mb-1">
                        Trigger
                      </div>
                      <div className="text-sm text-foreground">
                        {workflow.trigger}
                      </div>
                    </div>
                    <div className="rounded-xl bg-background/70 border border-border/60 p-3">
                      <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary/80 mb-1">
                        Result
                      </div>
                      <div className="text-sm text-foreground">
                        {workflow.result}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {workflow.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="absolute inset-0 z-20 flex flex-col bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
                    <p className="text-sm font-bold text-foreground truncate">
                      {workflow.title}
                    </p>
                    <span className="shrink-0 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                      Workflow
                    </span>
                  </div>
                  <div className="flex-1 overflow-hidden p-3">
                    <img
                      src={workflow.image}
                      alt={`${workflow.title} workflow diagram`}
                      className="h-full w-full rounded-xl border border-slate-200 bg-[#f8fafc] object-contain object-center"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AutomationSection;
