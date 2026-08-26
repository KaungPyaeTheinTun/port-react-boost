import { Fragment, type ReactNode, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type OverscrollPanelItem = {
  id: string;
  content: ReactNode;
};

type OverscrollPanelsProps = {
  items: OverscrollPanelItem[];
};

const OverscrollPanels = ({ items }: OverscrollPanelsProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleRefresh = () => ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(
        "[data-overscroll-panel]",
      );
      const pinnedSections = sections.slice(0, -1);

      pinnedSections.forEach((panel) => {
        const inner = panel.querySelector<HTMLElement>(
          "[data-overscroll-inner]",
        );
        if (!inner) return;

        const refreshAnimation = () => {
          const viewportHeight = window.innerHeight;
          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: panel,
              start: "bottom bottom",
              end: `+=${viewportHeight}`,
              scrub: true,
              pin: true,
              pinSpacing: false,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          gsap.set(panel, { transformOrigin: "center top" });
          gsap.set(inner, { y: 0 });

          timeline.to(
            panel,
            {
              scale: 0.92,
              opacity: 0.35,
              filter: "blur(6px)",
            },
            0,
          );
        };

        refreshAnimation();
      });
    }, container);

    const images = Array.from(container.querySelectorAll("img"));
    images.forEach((image) => {
      if (!image.complete) {
        image.addEventListener("load", handleRefresh);
      }
    });

    window.addEventListener("load", handleRefresh);
    ScrollTrigger.refresh();

    return () => {
      images.forEach((image) => {
        image.removeEventListener("load", handleRefresh);
      });
      window.removeEventListener("load", handleRefresh);
      ctx.revert();
    };
  }, [items.length]);

  return (
    <div ref={containerRef} className="relative">
      {items.map((panel, index) => (
        <Fragment key={panel.id}>
          <div
            id={`${panel.id}-anchor`}
            data-section-anchor={panel.id}
            className="pointer-events-none h-0"
            aria-hidden="true"
          />
          <div
            data-overscroll-panel
            data-overscroll-id={panel.id}
            className="relative min-h-screen overflow-hidden bg-background"
            style={{ zIndex: index + 1 }}
          >
            <div
              data-overscroll-inner
              className="relative min-h-screen bg-background"
            >
              {panel.content}
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default OverscrollPanels;
