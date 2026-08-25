import { useEffect, useMemo, useRef, type CSSProperties } from "react";
import { useAnimate, type Transition } from "framer-motion";

const TAGS = ["h1", "h2", "h3", "p", "div"] as const;

interface ZoomTextTunnelProps {
  texts?: string[];
  font?: CSSProperties;
  color?: string;
  tag?: (typeof TAGS)[number];
  maxScale?: number;
  hold?: number;
  playOnce?: boolean;
  transition?: Transition;
  style?: CSSProperties;
}

function BaseZoomTextTunnel(props: ZoomTextTunnelProps) {
  const {
    texts = ["EXPLORE", "CREATE", "INNOVATE", "FUTURE"],
    font = {
      fontFamily: "Inter",
      fontWeight: 400,
      fontSize: 120,
      lineHeight: "1em",
      letterSpacing: "-0.02em",
      textAlign: "center",
    },
    color = "#FFFFFF",
    tag = "h2",
    maxScale = 35,
    hold = 600,
    playOnce = false,
    transition = {
      type: "tween",
      stiffness: 800,
      damping: 60,
      mass: 1,
      duration: 1.2,
      ease: [0.7, 0, 0.25, 1],
    },
    style,
  } = props;

  const [scope, animate] = useAnimate();
  const slot0Ref = useRef<HTMLSpanElement>(null);
  const slot1Ref = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const controlsRef = useRef<
    Array<{ stop?: () => void; finished?: Promise<unknown> }>
  >([]);

  const safeTexts = useMemo(() => {
    const cleaned = Array.isArray(texts)
      ? texts.filter(
          (text): text is string => typeof text === "string" && text.length > 0,
        )
      : [];
    return cleaned.length > 0 ? cleaned : ["ZOOM"];
  }, [texts]);

  const clampedMaxScale = useMemo(() => {
    const value = Number(maxScale);
    return Number.isFinite(value) ? Math.max(1, value) : 35;
  }, [maxScale]);

  const holdMs = useMemo(() => {
    const value = Number(hold);
    return Number.isFinite(value) ? Math.max(0, value) : 600;
  }, [hold]);

  const longest = useMemo(
    () =>
      safeTexts.reduce(
        (longestText, nextText) =>
          nextText.length > longestText.length ? nextText : longestText,
        safeTexts[0],
      ),
    [safeTexts],
  );

  useEffect(() => {
    const slots = [slot0Ref.current, slot1Ref.current];
    const selectors = [".slot-0", ".slot-1"];

    if (safeTexts.length <= 1) {
      if (slots[0]) slots[0].textContent = safeTexts[0];
      animate(selectors[0], { scale: 1, opacity: 1 }, { duration: 0 });
      animate(selectors[1], { scale: 0.05, opacity: 0 }, { duration: 0 });
      return;
    }

    let cancelled = false;
    let active = 0;
    let index = 0;

    if (slots[0]) slots[0].textContent = safeTexts[0];
    animate(selectors[0], { scale: 1, opacity: 1 }, { duration: 0 });
    animate(selectors[1], { scale: 0.05, opacity: 0 }, { duration: 0 });

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timeoutRef.current = setTimeout(resolve, ms);
      });

    const settle = (control: { finished?: Promise<unknown> } | undefined) =>
      control?.finished ?? Promise.resolve();

    const run = async () => {
      while (!cancelled) {
        await wait(holdMs);
        if (cancelled) return;

        const incoming = 1 - active;
        const nextIndex = (index + 1) % safeTexts.length;
        if (slots[incoming]) slots[incoming].textContent = safeTexts[nextIndex];

        await settle(
          animate(
            selectors[incoming],
            { scale: 0.05, opacity: 0 },
            { duration: 0 },
          ),
        );
        if (cancelled) return;

        const enter = animate(
          selectors[incoming],
          { scale: 1, opacity: 1 },
          transition,
        );
        const exit = animate(
          selectors[active],
          { scale: clampedMaxScale, opacity: 0 },
          transition,
        );
        controlsRef.current = [enter, exit];

        await settle(exit);
        if (cancelled) return;

        await settle(
          animate(
            selectors[active],
            { scale: 0.05, opacity: 0 },
            { duration: 0 },
          ),
        );
        active = incoming;
        index = nextIndex;

        if (playOnce && nextIndex === safeTexts.length - 1) {
          return;
        }
      }
    };

    void run();

    return () => {
      cancelled = true;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      controlsRef.current.forEach((control) => control?.stop?.());
    };
  }, [safeTexts, transition, clampedMaxScale, holdMs, playOnce, animate]);

  const safeTag = (TAGS as readonly string[]).includes(tag) ? tag : "h2";
  const Tag = safeTag as keyof JSX.IntrinsicElements;

  const srOnly: CSSProperties = {
    position: "absolute",
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0 0 0 0)",
    whiteSpace: "nowrap",
    border: 0,
  };

  const slotStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    whiteSpace: "pre",
    color,
    transformOrigin: "center center",
    willChange: "transform, opacity",
    ...font,
  };

  return (
    <div
      ref={scope}
      aria-label={safeTexts.join(", ")}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        minWidth: 1,
        minHeight: 1,
        width: "100%",
        height: "100%",
        ...style,
      }}
    >
      <Tag style={srOnly}>{safeTexts.join(", ")}</Tag>

      <span
        aria-hidden="true"
        style={{
          visibility: "hidden",
          whiteSpace: "pre",
          color,
          ...font,
        }}
      >
        {longest}
      </span>

      <span
        ref={slot0Ref}
        className="slot-0"
        aria-hidden="true"
        style={slotStyle}
      />
      <span
        ref={slot1Ref}
        className="slot-1"
        aria-hidden="true"
        style={slotStyle}
      />
    </div>
  );
}

const presetFont: CSSProperties = {
  fontSize: 120,
  textAlign: "center",
  fontFamily: "Inter",
  fontWeight: 700,
  lineHeight: "1em",
  letterSpacing: "-0.02em",
};

export default function ZoomTextTunnel(props: Record<string, unknown>) {
  return (
    <BaseZoomTextTunnel font={presetFont} {...(props as ZoomTextTunnelProps)} />
  );
}
