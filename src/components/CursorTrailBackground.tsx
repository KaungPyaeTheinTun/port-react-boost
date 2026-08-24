import { useEffect, useRef } from "react";

type TrailPoint = {
  x: number;
  y: number;
  life: number;
  maxLife: number;
};

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
};

const CursorTrailBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const trail: TrailPoint[] = [];
    const sparks: Spark[] = [];
    const latestPointer = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    const rootStyles = getComputedStyle(document.documentElement);
    const primary =
      rootStyles.getPropertyValue("--primary").trim() || "224 34% 19%";

    let animationFrame = 0;
    let isPointerActive = false;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawnSpark = (x: number, y: number) => {
      sparks.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 1.8,
        vy: (Math.random() - 0.5) * 1.8,
        life: 1,
        maxLife: 28 + Math.random() * 10,
        size: 1.2 + Math.random() * 2.4,
      });
    };

    const handlePointerMove = (event: PointerEvent) => {
      latestPointer.x = event.clientX;
      latestPointer.y = event.clientY;
      isPointerActive = true;

      trail.push({
        x: event.clientX,
        y: event.clientY,
        life: 1,
        maxLife: 26,
      });

      if (trail.length > 24) {
        trail.shift();
      }

      spawnSpark(event.clientX, event.clientY);
      if (Math.random() > 0.55) {
        spawnSpark(event.clientX, event.clientY);
      }
    };

    const handlePointerLeave = () => {
      isPointerActive = false;
    };

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      if (trail.length > 1) {
        context.lineCap = "round";
        context.lineJoin = "round";

        for (let index = 1; index < trail.length; index += 1) {
          const previous = trail[index - 1];
          const current = trail[index];
          const intensity = index / trail.length;

          context.beginPath();
          context.strokeStyle = `hsl(${primary} / ${0.05 + intensity * 0.22})`;
          context.lineWidth = 0.8 + intensity * 4.2;
          context.shadowBlur = 18;
          context.shadowColor = `hsl(${primary} / 0.22)`;
          context.moveTo(previous.x, previous.y);
          context.lineTo(current.x, current.y);
          context.stroke();
        }
      }

      for (let index = trail.length - 1; index >= 0; index -= 1) {
        const point = trail[index];
        point.life -= 1 / point.maxLife;

        if (point.life <= 0) {
          trail.splice(index, 1);
          continue;
        }

        context.beginPath();
        context.fillStyle = `hsl(${primary} / ${point.life * 0.12})`;
        context.shadowBlur = 20;
        context.shadowColor = `hsl(${primary} / ${point.life * 0.16})`;
        context.arc(point.x, point.y, 3 + point.life * 9, 0, Math.PI * 2);
        context.fill();
      }

      for (let index = sparks.length - 1; index >= 0; index -= 1) {
        const spark = sparks[index];
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.life -= 1 / spark.maxLife;

        if (spark.life <= 0) {
          sparks.splice(index, 1);
          continue;
        }

        context.beginPath();
        context.fillStyle = `hsl(${primary} / ${spark.life * 0.26})`;
        context.shadowBlur = 14;
        context.shadowColor = `hsl(${primary} / ${spark.life * 0.18})`;
        context.arc(spark.x, spark.y, spark.size * spark.life, 0, Math.PI * 2);
        context.fill();
      }

      if (isPointerActive) {
        const glow = context.createRadialGradient(
          latestPointer.x,
          latestPointer.y,
          0,
          latestPointer.x,
          latestPointer.y,
          110,
        );
        glow.addColorStop(0, `hsl(${primary} / 0.12)`);
        glow.addColorStop(1, `hsl(${primary} / 0)`);

        context.beginPath();
        context.fillStyle = glow;
        context.arc(latestPointer.x, latestPointer.y, 110, 0, Math.PI * 2);
        context.fill();
      }

      animationFrame = window.requestAnimationFrame(draw);
    };

    resizeCanvas();
    draw();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-90"
    />
  );
};

export default CursorTrailBackground;
