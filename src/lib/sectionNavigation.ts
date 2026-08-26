export const getSectionIdFromHref = (href: string) =>
  href.startsWith("#") ? href.slice(1) || "home" : href;

export const getSectionElement = (sectionId: string) =>
  document.getElementById(
    sectionId === "home" ? "home" : `${sectionId}-anchor`,
  ) || document.getElementById(sectionId);

let activeScrollAnimation: number | null = null;

const stopScrollAnimation = () => {
  if (activeScrollAnimation !== null) {
    window.cancelAnimationFrame(activeScrollAnimation);
    activeScrollAnimation = null;
  }
};

const getScrollPaddingTop = () => {
  const paddingTop = Number.parseFloat(
    window.getComputedStyle(document.documentElement).scrollPaddingTop,
  );

  return Number.isFinite(paddingTop) ? paddingTop : 0;
};

const animateScrollTo = (targetTop: number) => {
  stopScrollAnimation();

  const startTop = window.scrollY;
  const distance = targetTop - startTop;
  if (Math.abs(distance) < 2) {
    window.scrollTo({ top: targetTop, behavior: "auto" });
    return;
  }

  const duration = Math.min(900, Math.max(550, Math.abs(distance) * 0.12));
  const startTime = performance.now();

  const step = (currentTime: number) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);

    window.scrollTo({
      top: startTop + distance * easedProgress,
      behavior: "auto",
    });

    if (progress < 1) {
      activeScrollAnimation = window.requestAnimationFrame(step);
      return;
    }

    activeScrollAnimation = null;
  };

  activeScrollAnimation = window.requestAnimationFrame(step);
};

const getSectionScrollTop = (sectionId: string) => {
  if (sectionId === "home") {
    return 0;
  }

  const target = getSectionElement(sectionId);
  if (!target) return null;

  return Math.max(
    0,
    window.scrollY + target.getBoundingClientRect().top - getScrollPaddingTop(),
  );
};

export const scrollToSection = (
  sectionId: string,
  behavior: ScrollBehavior = "smooth",
) => {
  const targetTop = getSectionScrollTop(sectionId);
  if (targetTop === null) return;

  if (window.location.hash !== `#${sectionId}`) {
    window.history.replaceState(
      null,
      "",
      sectionId === "home" ? "#" : `#${sectionId}`,
    );
  }

  if (
    behavior !== "smooth" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    stopScrollAnimation();
    window.scrollTo({ top: targetTop, behavior: "auto" });
    return;
  }

  animateScrollTo(targetTop);
};
