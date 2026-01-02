"use client";

/* eslint-disable @next/next/no-img-element */

import { useLayoutEffect, useRef, useState } from "react";
import { m, useScroll, useTransform } from "@/components/motion";
import Image from "next/image";
import EX_PAGE_START from "../lib/assests/EX_PAGE_START.jpeg";

type Target = { x: number; y: number; scale: number };

export default function HeroSection() {
  const morphSectionRef = useRef<HTMLElement | null>(null);
  const wordTargetRef = useRef<HTMLSpanElement | null>(null);
  const [wordTarget, setWordTarget] = useState<Target>({ x: 0, y: 0, scale: 0.18 });

  const { scrollYProgress } = useScroll({
    target: morphSectionRef,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(
    scrollYProgress,
    [0, 0.55, 0.85, 1],
    [1, wordTarget.scale, wordTarget.scale, 1]
  );
  const heroX = useTransform(
    scrollYProgress,
    [0, 0.55, 0.85, 1],
    [0, wordTarget.x, wordTarget.x, 0]
  );
  const heroY = useTransform(
    scrollYProgress,
    [0, 0.55, 0.85, 1],
    [0, wordTarget.y, wordTarget.y, 0]
  );
  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.5, 0.9, 1],
    [1, 1, 0, 0, 1]
  );

  const dimOpacity = useTransform(scrollYProgress, [0, 0.12, 0.9, 1], [0, 0.9, 0.9, 0]);
  const wordOpacity = useTransform(scrollYProgress, [0, 0.12, 1], [0, 1, 1]);
  const wordFillOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.5], [0, 0, 1, 0]);
  const outlineOpacity = useTransform(scrollYProgress, [0, 0.2, 0.45, 0.6], [1, 1, 0.5, 0]);
  const solidWordOpacity = useTransform(scrollYProgress, [0, 0.4, 0.5, 1], [0, 0, 1, 1]);
  const wordScale = useTransform(scrollYProgress, [0, 0.4, 0.7], [2.6, 1, 1]);

  const brand = "PINNACLE TUBS";
  useLayoutEffect(() => {
    const measure = () => {
      const el = wordTargetRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const x = rect.left + rect.width / 2 - vw / 2;
      const y = rect.top + rect.height / 2 - vh / 2;
      const scale = Math.max(rect.width / vw, rect.height / vh) * 1.2;

      setWordTarget({ x, y, scale: Math.max(0.05, scale) });
    };

    const raf = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section ref={morphSectionRef} className="relative w-full bg-black">
      <div className="relative h-[200svh] w-full bg-black">
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-black">
          <m.div
            className="absolute inset-0"
            style={{
              x: heroX,
              y: heroY,
              scale: heroScale,
              opacity: heroOpacity,
              willChange: "transform, opacity",
            }}
          >
            <Image
              src={EX_PAGE_START}
              alt="Pinnacle Tubs hero background"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[50%_35%]"
            />
          </m.div>

          <m.div className="absolute inset-0 bg-black" style={{ opacity: dimOpacity }} />

          <div className="pointer-events-none absolute inset-0 grid place-items-center px-6">
            <m.h1
              className="max-w-[95vw] origin-center text-center text-[clamp(2.25rem,7vw,5.5rem)] font-semibold uppercase leading-[0.9] tracking-[0.2em] text-white"
              style={{
                opacity: wordOpacity,
                scale: wordScale,
                willChange: "transform, opacity",
              }}
            >
              <span className="relative inline-block">
                <m.span
                  ref={wordTargetRef}
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    opacity: wordFillOpacity,
                    backgroundImage: `url(${EX_PAGE_START.src})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "50% 35%",
                    backgroundSize: "cover",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {brand}
                </m.span>
                <m.span
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    opacity: outlineOpacity,
                    color: "transparent",
                    WebkitTextStroke: "1px rgba(255, 255, 255, 0.85)",
                  }}
                >
                  {brand}
                </m.span>
                <m.span className="relative" style={{ opacity: solidWordOpacity }}>
                  {brand}
                </m.span>
              </span>
            </m.h1>
          </div>
        </div>
      </div>
    </section>
  );
}
