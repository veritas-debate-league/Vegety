"use client";

import { useEffect, useRef } from "react";

/**
 * Wraps a decoration layer and publishes a bounded progress value --p
 * (~ -0.5 … 0.5 = how far this group's centre is from the viewport centre)
 * onto itself. Children with the `.parallax` class read --p and translate by
 * `--p * --spd px`, so movement stays LOCAL to the group instead of growing
 * with total page scroll.
 */
export default function Parallax({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const p = (r.top + r.height / 2 - vh / 2) / vh; // ~ -0.5 … 0.5 on screen
      el.style.setProperty("--p", p.toFixed(4));
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className={className} aria-hidden>
      {children}
    </div>
  );
}
