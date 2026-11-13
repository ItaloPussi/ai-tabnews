"use client";

import { useEffect, useState } from "react";
import ConfettiEffect from "react-confetti";

const colors = ["#a4f4c5", "#7ce7b1", "#f2cc8f", "#91a7ff", "#ffffff"];

export default function ConfettiAnimation({ onComplete }: { onComplete: () => void }) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    let frame = 0;
    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setDimensions((previous) =>
        previous.width === width && previous.height === height
          ? previous
          : { width, height },
      );
    };
    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateDimensions);
    };

    updateDimensions();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (!dimensions.width) return null;

  return (
    <ConfettiEffect
      width={dimensions.width}
      height={dimensions.height}
      numberOfPieces={180}
      recycle={false}
      gravity={0.16}
      tweenDuration={9000}
      colors={colors}
      onConfettiComplete={onComplete}
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, zIndex: 5, pointerEvents: "none" }}
    />
  );
}
