import { useEffect, useMemo, useState } from "react";
import { useLang } from "@/contexts/LangContext";
import { getSectionElement, scrollToSection } from "@/lib/sectionNavigation";

const SectionScrollIndicator = () => {
  const { t, lang } = useLang();
  const [activeSection, setActiveSection] = useState("home");

  const sections = useMemo(
    () => [
      { id: "home", label: lang === "mm" ? "ပင်မ" : "Home" },
      { id: "about", label: t.nav.about },
      { id: "skills", label: t.nav.skills },
      { id: "projects", label: t.nav.projects },
      { id: "automation", label: t.nav.automation },
      { id: "experience", label: t.nav.experience },
      { id: "contact", label: t.nav.contact },
    ],
    [
      lang,
      t.nav.about,
      t.nav.automation,
      t.nav.contact,
      t.nav.experience,
      t.nav.projects,
      t.nav.skills,
    ],
  );

  useEffect(() => {
    const getSectionPageTop = (sectionId: string) => {
      const element = getSectionElement(sectionId);
      if (!element) return null;

      return window.scrollY + element.getBoundingClientRect().top;
    };

    const updateActiveSection = () => {
      const checkpoint = window.scrollY + window.innerHeight * 0.4;
      let current = sections[0].id;

      for (let index = 0; index < sections.length; index += 1) {
        const section = sections[index];
        const currentTop = getSectionPageTop(section.id);
        if (currentTop === null) continue;

        const nextTop =
          index < sections.length - 1
            ? getSectionPageTop(sections[index + 1].id)
            : Number.POSITIVE_INFINITY;

        if (checkpoint >= currentTop && checkpoint < nextTop) {
          current = section.id;
        }
      }

      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [sections]);

  return (
    <div className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-neutral-200/70 bg-white/80 px-3 py-2 shadow-lg backdrop-blur-md dark:border-neutral-800/70 dark:bg-black/70 md:bottom-auto md:left-auto md:right-6 md:top-1/2 md:flex-col md:translate-x-0 md:-translate-y-1/2 md:rounded-[1.75rem] md:px-2 md:py-3">
      {sections.map((section) => {
        const isActive = activeSection === section.id;

        return (
          <button
            key={section.id}
            type="button"
            onClick={() => scrollToSection(section.id)}
            aria-label={`Scroll to ${section.label}`}
            className="group relative flex items-center justify-center"
          >
            <span
              className={`pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full border border-neutral-200/70 bg-white/90 px-3 py-1 text-xs font-semibold text-neutral-700 opacity-0 shadow-md transition-all duration-300 dark:border-neutral-800/70 dark:bg-black/85 dark:text-neutral-200 md:block ${
                isActive
                  ? "translate-x-0 opacity-100"
                  : "translate-x-2 group-hover:translate-x-0 group-hover:opacity-100"
              }`}
            >
              {section.label}
            </span>

            <span
              className={`rounded-full transition-all duration-300 ${
                isActive
                  ? "h-2.5 w-8 bg-neutral-900 dark:bg-white md:h-8 md:w-2.5"
                  : "h-2.5 w-2.5 bg-neutral-400/45 hover:bg-neutral-500/70 dark:bg-neutral-500/55 dark:hover:bg-neutral-300/80"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default SectionScrollIndicator;
