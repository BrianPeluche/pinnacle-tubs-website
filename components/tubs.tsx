"use client";

import { useEffect, useRef } from "react";
import {
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "@/components/motion";

import TME_EVO from "../lib/assests/TME_EVO.jpeg";
import TACO from "../lib/assests/TACO.jpeg";
import VIEW_BIG_BEAR from "../lib/assests/VIEW_BIG_BEAR.jpeg";

export default function Tubs() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const firstVideoRef = useRef<HTMLVideoElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 90%", "end center"],
  });

  const imageBoxY = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const firstVideoOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    firstVideoRef.current = document.querySelector(".first-vd") as HTMLVideoElement | null;
    return () => {
      if (firstVideoRef.current) firstVideoRef.current.style.opacity = "";
    };
  }, []);

  useMotionValueEvent(firstVideoOpacity, "change", (value) => {
    if (shouldReduceMotion) return;
    const video = firstVideoRef.current;
    if (!video) return;
    video.style.opacity = String(value);
  });

  const imageBoxYStyle = shouldReduceMotion ? 0 : imageBoxY;

  return (
    <section
      ref={sectionRef}
      className="jason relative w-full px-6 md:px-10 lg:px-16 py-24 lg:py-32"
    >
      {/*  container + 2-column layout on desktop */}
      <div className="mx-auto w-full max-w-7xl flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between">
        {/* LEFT: text */}
        <div className="jason-content w-full max-w-lg">
          <h1 className="text-4xl md:text-5xl font-semibold">Pinnacle Tubs</h1>
          <h2 className="mt-4 text-lg md:text-xl text-muted-foreground">
            Relaxation, built for the outdoors.
          </h2>

          <p className="mt-6 text-base md:text-lg leading-relaxed text-muted-foreground">
            Designed for comfort and durability - whether you&apos;re hosting friends,
            winding down after a long day, or enjoying a weekend getaway.
          </p>

          {/* "jason-2" image under the text */}
          <div className="jason-2 mt-10">
            <img
              src={TACO.src}
              alt="Taco"
              className="block w-full max-w-md rounded-2xl object-cover"
            />
          </div>
        </div>

        {/* RIGHT: images (aligned to the right on desktop) */}
        <m.div
          className="img-box w-full lg:w-auto lg:mt-96"
          style={{ y: imageBoxYStyle, willChange: "transform" }}
        >
          <div className="space-y-6 lg:space-y-8 lg:flex lg:flex-col lg:items-end">
            <div className="jason-1 w-full max-w-md">
              <img
                src={TME_EVO.src}
                alt="TME EVO"
                className="block w-full rounded-2xl object-cover"
              />
            </div>

            <div className="jason-3 w-full max-w-md">
              <img
                src={VIEW_BIG_BEAR.src}
                alt="View Big Bear"
                className="block w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
