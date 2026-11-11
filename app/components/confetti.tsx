"use client";

import { useEffect, useState } from "react";
import ConfettiEffect from "react-confetti";

export default function Confetti() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight });

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
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
      colors={["#a4f4c5", "#7ce7b1", "#f2cc8f", "#91a7ff", "#ffffff"]}
      style={{ position: "fixed", inset: 0, zIndex: 5, pointerEvents: "none" }}
    />
  );
}
