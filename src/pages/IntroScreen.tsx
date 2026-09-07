import React, { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import ZoomTextTunnel from "@/components/ZoomTextTunnel";
import "./IntroScreen.css";

const FADE_DELAY_MS = 2050;
const REMOVE_DELAY_MS = 2550;

const IntroScreen = () => {
  const [isRendered, setIsRendered] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => {
      setIsFadingOut(true);
    }, FADE_DELAY_MS);

    const removeTimer = window.setTimeout(() => {
      setIsRendered(false);
    }, REMOVE_DELAY_MS);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(removeTimer);
    };
  }, [shouldReduceMotion]);

  if (!isRendered) return null;

  return (
    <div
      className={`intro-container ${isDarkMode ? "intro-dark" : "intro-light"} ${
        isFadingOut ? "fade-out" : ""
      }`}
    >
      <div className="intro-passage" aria-label="Developer Portfolio">
        {shouldReduceMotion ? (
          <h1 className="intro-text">Developer Portfolio</h1>
        ) : !isFadingOut ? (
          <ZoomTextTunnel
            texts={["Developer", "Portfolio"]}
            tag="h1"
            color={isDarkMode ? "#f5f7ff" : "#0b0f19"}
            hold={600}
            maxScale={35}
            playOnce
            font={{
              fontSize: "clamp(1.2rem, 8vw, 5.5rem)",
              fontWeight: 700,
              textAlign: "center",
              fontFamily: '"Walone", system-ui, -apple-system, sans-serif',
              lineHeight: "1em",
              letterSpacing: "-0.02em",
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default IntroScreen;
