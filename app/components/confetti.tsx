"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ConfettiAnimation = dynamic(() => import("./confetti-animation"), {
  ssr: false,
});

export default function Confetti() {
  const [ready, setReady] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (complete) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cancelPending = () => {};

    const schedule = () => {
      cancelPending();
      if (motion.matches) {
        setReady(false);
        return;
      }

      // Keep the decorative download and animation out of the initial load.
      if ("requestIdleCallback" in window) {
        const id = window.requestIdleCallback(() => setReady(true), { timeout: 1000 });
        cancelPending = () => window.cancelIdleCallback(id);
      } else {
        const id = setTimeout(() => setReady(true), 200);
        cancelPending = () => clearTimeout(id);
      }
    };

    const onMotionChange = () => {
      if (document.readyState === "complete") schedule();
    };

    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    motion.addEventListener("change", onMotionChange);

    return () => {
      cancelPending();
      window.removeEventListener("load", schedule);
      motion.removeEventListener("change", onMotionChange);
    };
  }, [complete]);

  if (!ready || complete) return null;

  return <ConfettiAnimation onComplete={() => setComplete(true)} />;
}
