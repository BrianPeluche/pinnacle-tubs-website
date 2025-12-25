"use client";

import { useEffect, useRef, useState } from "react";

type Scene = {
  tag: string;
  title: string;
  description: string;
  location: string;
  image: string;
  gradient: [string, string];
  chips: string[];
};

const scenes: Scene[] = [
  {
    tag: "Phase 01",
    title: "Design Consultation & Site Visit",
    description:
      "We begin with a design session in our showroom or through a virtual walk-through. Bring photos of your backyard and we map electrical runs, access paths, and HOA requirements before you ever sign.",
    location: "Showroom + Virtual",
    image:
      "https://images.unsplash.com/photo-1482192597420-4817fdd7e8b0?auto=format&fit=crop&w=1600&q=80",
    gradient: ["#ff5fd5", "#ffa856"],
    chips: ["Complimentary consult", "Backyard assessment", "Transparent quotes"],
  },
  {
    tag: "Phase 02",
    title: "Choose Your Pinnacle Model",
    description:
      "Luxury Spa 6-Person, Compact Relaxer 2-Person, Premium Series 8-Person, Essential 4-Person—every lineup is plumbed, wet-tested, and staged so you can soak before you buy.",
    location: "Hot Tub Gallery",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    gradient: ["#6d7dff", "#60efff"],
    chips: ["Hydrotherapy jets", "Energy savings", "Financing guidance"],
  },
  {
    tag: "Phase 03",
    title: "Installation, Training & Service",
    description:
      "Our licensed crew handles pads, cranes, electrical, and chemistry balancing. We leave you with maintenance kits, on-call techs, and optional care plans so every soak stays perfect.",
    location: "On-Site",
    image:
      "https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=1600&q=80",
    gradient: ["#ffa5f1", "#8b5dff"],
    chips: ["Crane + delivery", "Water care class", "Membership service"],
  },
  {
    tag: "Phase 04",
    title: "Share Your Backyard Story",
    description:
      "Our gallery features Luxury Spas, Outdoor + Indoor installs, and Customer Spotlights. Submit your project or schedule a return visit at (555) 123-4567 or info@pinnacletubs.com.",
    location: "Media Gallery",
    image:
      "https://images.unsplash.com/photo-1517504734587-289c83fdb9c2?auto=format&fit=crop&w=1600&q=80",
    gradient: ["#ff9f5f", "#ffe569"],
    chips: ["Media gallery", "Customer stories", "New install inspo"],
  },
];

export function ImmersiveScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = containerRef.current;
    if (!target) return;

    const handleScroll = () => {
      const start = target.offsetTop;
      const end = start + target.offsetHeight - window.innerHeight;
      if (end - start <= 0) {
        setProgress(0);
        return;
      }
      const current = window.scrollY;
      const raw = (current - start) / (end - start);
      const clamped = Math.min(1, Math.max(0, raw));
      setProgress(clamped);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const rawIndex = progress * scenes.length;
  const activeIndex = Math.min(scenes.length - 1, Math.floor(rawIndex));
  const activeScene = scenes[activeIndex];

  return (
    <section className="relative overflow-hidden bg-[#050109] py-24 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-10 h-[30rem] w-[30rem] rounded-full bg-pink-500/20 blur-[160px]" />
        <div className="absolute right-0 top-64 h-[35rem] w-[35rem] rounded-full bg-purple-500/20 blur-[180px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%)]" />
      </div>
      <div ref={containerRef} className="relative h-[400vh]">
        <div className="sticky top-0 flex h-screen flex-col justify-between px-4 py-12 sm:px-8 md:px-12">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">
              Scroll Narrative
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              Every phase of the Pinnacle Tubs experience, retold as a scrolling reveal.
            </h2>
            <p className="mt-4 max-w-2xl text-base text-white/70 md:text-lg">
              Each swipe covers the consultation, product selection, installation,
              and gallery moments already available on pinnacletubs.com but now
              wrapped in the kinetic atmosphere of a prestige game launch microsite.
            </p>
            <div className="mt-8 h-1 w-full rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#ff5fd5] via-[#ff9a5f] to-[#ffe569]"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,_1.2fr)_minmax(0,_0.8fr)]">
            <div
              className="relative overflow-hidden rounded-[40px] border border-white/15 bg-[#070011]/30 p-8 shadow-[0_0_45px_rgba(255,96,208,0.25)]"
              style={{
                backgroundImage: `linear-gradient(120deg, rgba(5,0,15,0.6), rgba(5,0,19,0.85)), url(${activeScene.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="flex flex-col gap-3 text-sm uppercase tracking-[0.4em] text-white/60">
                <span>{activeScene.tag}</span>
                <span>{activeScene.location}</span>
              </div>
              <h3 className="mt-6 text-4xl font-semibold leading-tight">
                {activeScene.title}
              </h3>
              <p className="mt-4 max-w-2xl text-base text-white/70">
                {activeScene.description}
              </p>

              <div className="mt-10 flex flex-wrap gap-4 text-xs uppercase tracking-[0.3em] text-white/70">
                {activeScene.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-white/30 px-4 py-2"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {scenes.map((scene, index) => {
                const cardProgress = Math.min(
                  1,
                  Math.max(0, rawIndex - index)
                );
                const isActive = index === activeIndex;
                return (
                  <div
                    key={scene.title}
                    className={`relative rounded-[28px] border p-6 transition-all duration-300 ${
                      isActive
                        ? "border-white/60 bg-white/10 text-white shadow-[0_25px_60px_rgba(10,0,25,0.45)]"
                        : "border-white/10 bg-white/5 text-white/70"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.35em]">
                      <span className="text-white/70">{scene.tag}</span>
                      <span>{scene.location}</span>
                    </div>
                    <p className="mt-3 text-2xl font-semibold leading-tight">
                      {scene.title}
                    </p>
                    <p className="mt-2 text-sm text-white/70">
                      {scene.description}
                    </p>
                    <div className="mt-4 h-[3px] w-full rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${cardProgress * 100}%`,
                          backgroundImage: `linear-gradient(120deg, ${scene.gradient[0]}, ${scene.gradient[1]})`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
