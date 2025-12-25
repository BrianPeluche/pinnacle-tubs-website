"use client";

import { useEffect, useState } from "react";

const panels = [
  {
    tag: "Showroom",
    title: "Immersive Gallery Visits",
    description:
      "Test our Luxury Spa 6-Person, Compact Relaxer, Premium Series, and Essential models in person. Every unit is filled, heated, and ready for a real soak so you know exactly what is coming home.",
    details: ["Guided hydrotherapy demos", "Financing walk-throughs", "Finish + cabinet samples"],
    image:
      "https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1600&q=80",
  },
  {
    tag: "Installation",
    title: "White-Glove Delivery Days",
    description:
      "From pouring pads and coordinating cranes to balancing water chemistry, our team keeps the entire install cinematic and stress-free. You get a ready-to-use spa before we leave.",
    details: ["Permits + site prep", "Crane + electrician coordination", "Water care training"],
    image:
      "https://images.unsplash.com/photo-1489493585363-d69421e0edd4?auto=format&fit=crop&w=1600&q=80",
  },
  {
    tag: "Support",
    title: "Lifetime Care & Memberships",
    description:
      "Enjoy maintenance plans, emergency visits, and phone/text support. We supply filters, chemicals, and seasonal refreshes so every soak matches day-one performance.",
    details: ["Quarterly service routes", "On-call technicians", "Chemistry + balancing kits"],
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
  },
];

export function ShowroomPanels() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % panels.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const activePanel = panels[activeIndex];

  return (
    <section className="relative overflow-hidden bg-[#06000f] py-24 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-20 h-[30rem] w-[30rem] rounded-full bg-[#ff5fd5]/20 blur-[180px]" />
        <div className="absolute bottom-0 right-0 h-[35rem] w-[35rem] rounded-full bg-[#60efff]/10 blur-[200px]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(5,0,15,0.9),rgba(5,0,30,0.8))]" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 lg:flex-row">
        <div className="relative flex-1 overflow-hidden rounded-[40px] border border-white/20">
          <div
            key={activePanel.image}
            className="absolute inset-0 transition duration-700"
            style={{
              backgroundImage: `linear-gradient(120deg, rgba(5,0,15,0.55), rgba(5,0,25,0.8)), url(${activePanel.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="relative flex h-full flex-col justify-between p-10">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-white/60">
                {activePanel.tag}
              </p>
              <h3 className="mt-4 text-4xl font-semibold leading-tight">{activePanel.title}</h3>
              <p className="mt-4 text-sm text-white/80">{activePanel.description}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.4em] text-white/80">
              {activePanel.details.map((detail) => (
                <span key={detail} className="rounded-full border border-white/40 px-4 py-2">
                  {detail}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          {panels.map((panel, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={panel.title}
                onMouseEnter={() => setActiveIndex(index)}
                className={`group w-full rounded-[28px] border px-6 py-5 text-left transition ${
                  isActive
                    ? "border-white/70 bg-white/10 shadow-[0_20px_60px_rgba(10,0,30,0.55)]"
                    : "border-white/15 bg-white/5 hover:border-white/40"
                }`}
              >
                <p className="text-[11px] uppercase tracking-[0.45em] text-white/60">{panel.tag}</p>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-xl font-semibold">{panel.title}</p>
                  <span className="text-xs uppercase tracking-[0.4em] text-white/60">
                    {isActive ? "Live" : "Preview"}
                  </span>
                </div>
                <p className="mt-2 text-sm text-white/70">{panel.description}</p>
              </button>
            );
          })}
          <div className="rounded-[28px] border border-white/20 bg-[#090014]/80 p-6 text-sm text-white/80">
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">Visit Pinnacle</p>
            <p className="mt-2">
              123 Spa Street, Relaxation City, RC 12345 • Mon-Sat 9AM-6PM • (555) 123-4567 •
              info@pinnacletubs.com
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
