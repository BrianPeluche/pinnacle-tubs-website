"use client";

const marqueeItems = [
  {
    title: "Complimentary Design Consultations",
    detail: "Bring photos or plans and we map electrical + pad layouts.",
  },
  {
    title: "Luxury Spa Lineup",
    detail: "Luxury, Compact Relaxer, Premium Series, Essential models in stock.",
  },
  {
    title: "Full-Service Installation",
    detail: "Cranes, electricians, and water-chemistry crash course included.",
  },
  {
    title: "Media Gallery",
    detail: "Luxury Spas • Outdoor Installs • Indoor Sanctuaries • Spotlights.",
  },
  {
    title: "Visit Us",
    detail: "123 Spa Street, Relaxation City, RC 12345 — Mon-Sat 9AM-6PM.",
  },
  {
    title: "Contact",
    detail: "Call (555) 123-4567 or email info@pinnacletubs.com anytime.",
  },
];

export function CinematicMarquee() {
  return (
    <section className="relative overflow-hidden bg-[#05000f] text-white">
      <div className="absolute inset-0 opacity-50">
        <div className="absolute inset-0 bg-gradient-to-r from-[#ff5fd5]/20 via-transparent to-[#ff9a5f]/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.06),_transparent_60%)]" />
      </div>
      <div className="relative w-full py-8">
        {[0, 1].map((row) => (
          <div
            key={row}
            className={`flex items-center gap-12 whitespace-nowrap px-4 ${
              row === 0 ? "animate-marquee" : "animate-marqueeReverse"
            }`}
          >
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <div
                key={`${item.title}-${row}-${index}`}
                className="flex min-w-[320px] flex-col gap-1 rounded-full border border-white/15 px-6 py-3 text-left"
              >
                <p className="text-[10px] uppercase tracking-[0.4em] text-white/60">
                  {item.title}
                </p>
                <p className="text-sm text-white/80">{item.detail}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
