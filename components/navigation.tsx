//navigation.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, m } from "@/components/motion";

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const showBrand = pathname === "/";

  const panels = [
    {
      id: "hottubs",
      label: "HOTTUBS",
      title: "Hot Tubs",
      description: "Explore our hot tub lineup, sizes, and finishes.",
    },
    {
      id: "product",
      label: "PRODUCT",
      title: "Featured Product",
      description: "Highlights and key specs for our newest model.",
    },
    {
      id: "gallery",
      label: "GALLERY",
      title: "Media Gallery",
      description: "A visual look at installs, details, and real homes.",
    },
  ];
  const [activePanel, setActivePanel] = useState(panels[0]?.id ?? "hottubs");
  const activeContent = panels.find((panel) => panel.id === activePanel) ?? panels[0];

  return (
    <nav className="absolute left-0 top-0 z-50 w-full bg-transparent text-[#F5F5F5]">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="flex h-16 items-center mt-6 justify-between gap-24">
          {showBrand ? (
            <Link href="/" className="text-4xl font-bold tracking-tight bg-transparent">
              Pinnacle Tubs
            </Link>
          ) : (
            <span
              className="invisible text-4xl font-bold tracking-tight"
              aria-hidden="true"
            >
              Pinnacle Tubs
            </span>
          )}

          <button
            type="button"
            className="flex rounded-md border border-transparent bg-transparent text-lg font-semibold text-[#F5F5F5] transition hover:bg-[#1F2937]/5"
            aria-expanded={isOpen}
            aria-controls="site-drawer"
            aria-label="Toggle menu"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <svg
              className="h-16 w-16"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 transition ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      >
          <button
            type="button"
            className={`absolute inset-0 h-full w-full bg-black/40 transition-opacity duration-300 ${
              isOpen ? "opacity-100 backdrop-blur-sm" : "opacity-0"
            }`}
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
          />
          <div
            id="site-drawer"
            className={`absolute right-0 top-0 h-full w-full max-w-[920px] bg-gray-950 px-8 py-10 shadow-2xl transition-transform duration-300 ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-white">
                Navigation
              </span>
              <button
                type="button"
                className="rounded-md border border-[#1F2937]/20 px-3 py-1 text-xs font-semibold text-white hover:bg-gray-700/50"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>

            <div className="mt-10   gap-10 text-white">
              <div className="flex items-start gap-5">
                {panels.map((panel) => {
                  const isActive = activePanel === panel.id;
                  return (
                    <button
                      key={panel.id}
                      type="button"
                      onClick={() => setActivePanel(panel.id)}
                      className={`inline-flex items-center rounded-full border px-6 py-3 text-2xl font-semibold tracking-[0.2em] transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 ${
                        isActive
                          ? "border-white bg-white text-[#1F2937] shadow-sm"
                          : "border-transparent text-white hover:text-white/80"
                      }`}
                      aria-pressed={isActive}
                    >
                      {panel.label}
                    </button>
                  );
                })}
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 mt-10 text-white">
                <AnimatePresence mode="wait">
                  <m.div
                    key={activeContent?.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                      Selected
                    </p>
                    <h3 className="mt-4 text-3xl font-semibold tracking-[0.12em]">
                      {activeContent?.title}
                    </h3>
                    <p className="mt-4 text-sm text-white/70">{activeContent?.description}</p>
                  </m.div>
                </AnimatePresence>
              </div>
            </div>

          </div>
      </div>
    </nav>
  );
}
