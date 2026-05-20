import React, { useState, useEffect } from "react";
import "./IntroScreen.css"; 

const IntroScreen = () => {
  const [isRendered, setIsRendered] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // 1. Wait 2.5 seconds, then trigger the fade-out class
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1500);

    // 2. Wait another 500ms (matching the CSS transition) to completely remove it from DOM
    const removeTimer = setTimeout(() => {
      setIsRendered(false);
    }, 1800);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isRendered) return null;

  return (
    <div className={`intro-container ${isFadingOut ? "fade-out" : ""}`}>
      <h1 className="intro-text text-focus-in">
        Developer Portfolio
      </h1>
    </div>
  );
};

export default IntroScreen;