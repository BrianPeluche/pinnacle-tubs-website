// // hero-section.tsx
// // hero-section.tsx EX_GTA_TEXT.webp
// "use client";

// /* eslint-disable @next/next/no-img-element */ 

// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";

// import EX_PAGE_START from "../lib/assests/EX_PAGE_START.jpeg";
// import PIN_TUBS from "../lib/assests/PIN_TUBS.jpeg";
// import EX_GTA_TEXT from "../lib/assests/PINNACLE_TUBS.svg";

// gsap.registerPlugin(ScrollTrigger);

// export function HeroSection() {
//   const initialMaskPos = "50% 0%";
//   const initialMaskSize = "120% 120%";
//   const maskSize = "1800% 1800%";

//   useGSAP(() => {
//     gsap.set(".mask-wrapper", {
//       WebkitMaskImage:
//         "radial-gradient(circle at 50% 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 70%)",
//       maskImage:
//         "radial-gradient(circle at 50% 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 70%)",
//       WebkitMaskRepeat: "no-repeat",
//       maskRepeat: "no-repeat",
//       WebkitMaskPosition: initialMaskPos,
//       maskPosition: initialMaskPos,
//       WebkitMaskSize: initialMaskSize,
//       maskSize: initialMaskSize,
//     });

//     // template-like behavior: scale animates back to 1
//     gsap.set(".scale-out", { scale: 1.12, transformOrigin: "center center" });

//     // these are the extra 2 logo layers (like the example)
//     gsap.set(".mask-logo", { opacity: 0 });
//     gsap.set(".overlay-logo", { opacity: 0 });

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: ".hero-section",
//         start: "top top",
//         end: "+=200%",
//         scrub: 2.5,
//         pin: true,
//       },
//     });

//     tl.to(".fade-out", { opacity: 0, ease: "power1.inOut" })
//       .to(".scale-out", { scale: 1, ease: "power1.inOut" }, "<")
//       .to(
//         ".mask-wrapper",
//         { WebkitMaskSize: maskSize, maskSize: maskSize, ease: "power1.inOut" },
//         "<"
//       )
//       .to(".mask-wrapper", { opacity: 0, duration: 0.4 })
//       // flash overlay logo (like example)
//       .to(".overlay-logo", { opacity: 1, duration: 0.2, ease: "power1.inOut" })
//       .to(".overlay-logo", { opacity: 0, duration: 0.25, ease: "power1.inOut" })
//       // reveal the full-screen logo layer
//       .to(".mask-logo", { opacity: 1, duration: 0.35, ease: "power1.inOut" }, "<");
//   });

//   return (
//     <section className="hero-section relative h-[100svh] w-full overflow-hidden">
//       {/* 1) MASK WRAPPER LAYER (bg + title that fades) */}
//       <div className="mask-wrapper absolute inset-0 z-30">
//         <img
//           src={EX_PAGE_START.src}
//           alt="background"
//           className="scale-out absolute inset-0 h-full w-full object-cover"
//         />

//         <img
//           src={EX_GTA_TEXT.src}
//           alt="hero-title"
//           className="title-logo fade-out absolute inset-0 m-auto h-auto w-[min(900px,90vw)]"
//         />
//       </div>

//       {/* 2) FULL-SCREEN LOGO LAYER (mask-logo) */}
//       <div className="absolute inset-0 z-10">
//         <img
//           src={EX_GTA_TEXT.src}
//           alt="logo-layer"
//           className="mask-logo absolute inset-0 h-full w-full object-cover"
//         />
//       </div>

//       {/* 3) OVERLAY LOGO FLASH LAYER (overlay-logo) */}
//       <div className="fake-logo-wrapper pointer-events-none absolute inset-0 z-20">
//         <img
//           src={PIN_TUBS.src}
//           alt="overlay-logo"
//           className="overlay-logo absolute inset-0 m-auto h-auto w-[min(900px,90vw)]"
//         />
//       </div>
//     </section>
//   );
// }

// export default HeroSection;







"use client";

/* eslint-disable @next/next/no-img-element */

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import EX_PAGE_START from "../lib/assests/EX_PAGE_START.jpeg";
import PIN_TUBS from "../lib/assests/PIN_TUBS.jpeg";
import EX_GTA_TEXT from "../lib/assests/PINNACLE_TUBS.svg";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const el = sectionRef.current;
      if (!el) return;

      const q = gsap.utils.selector(el);
      const mm = gsap.matchMedia();

      // IMPORTANT: keep breakpoint logic INSIDE GSAP to avoid React re-renders while pinned
      mm.add(
        {
          mobile: "(max-width: 768px)",
          tablet: "(min-width: 769px) and (max-width: 1024px)",
          desktop: "(min-width: 1025px)",
        },
        (ctx) => {
          const { mobile, tablet } = ctx.conditions as {
            mobile: boolean;
            tablet: boolean;
            desktop: boolean;
          };

          const settings = mobile
            ? {
                initialMaskPos: "50% -1500vh",
                initialMaskSize: "3100% 3100%",
                maskPos: "50% 7vh",
                maskSize: "50% 50%",
              }
            : tablet
            ? {
                initialMaskPos: "50% -1700vh",
                initialMaskSize: "3500% 3500%",
                maskPos: "50% 17vh",
                maskSize: "30% 30%",
              }
            : {
                initialMaskPos: "50% 22%",
                initialMaskSize: "3500% 3500%",
                maskPos: "50% 22%",
                maskSize: "20% 20%",
              };

          const { initialMaskPos, initialMaskSize, maskPos, maskSize } = settings;

          // Base mask setup (Safari needs the Webkit* properties too)
          gsap.set(q(".mask-wrapper"), {
            WebkitMaskImage:
              "radial-gradient(circle at 50% 0vh, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 70%)",
            maskImage:
              "radial-gradient(circle at 50% 0vh, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 70%)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: initialMaskPos,
            maskPosition: initialMaskPos,
            WebkitMaskSize: initialMaskSize,
            maskSize: initialMaskSize,
            opacity: 1,
          });

          // Template-like “cinematic” start state
          gsap.set(q(".scale-out"), { scale: 1.12, transformOrigin: "center center" });
          gsap.set(q(".mask-logo"), { opacity: 0, yPercent: -12 });
          gsap.set(q(".overlay-logo"), { opacity: 0 });

          const tl = gsap.timeline({
            defaults: { ease: "power1.inOut" },
            scrollTrigger: {
              trigger: el,
              start: "top top",
              end: "+=200%",
              scrub: 2.5,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          tl.to(q(".fade-out"), { opacity: 0, duration: 0.35 })
            .to(q(".scale-out"), { scale: 1, duration: 0.9 }, "<")
            .to(
              q(".mask-wrapper"),
              {
                WebkitMaskPosition: maskPos,
                maskPosition: maskPos,
                WebkitMaskSize: maskSize,
                maskSize,
                duration: 1.0,
              },
              "<"
            )
            .to(q(".mask-wrapper"), { opacity: 0, duration: 0.35 })
            .to(q(".overlay-logo"), { opacity: 1, duration: 0.15 }, "<0.05")
            .to(q(".overlay-logo"), { opacity: 0, duration: 0.25 })
            .to(q(".mask-logo"), { opacity: 1, yPercent: 0, duration: 0.35 }, "<0.05");

          return () => {
            tl.scrollTrigger?.kill(true);
            tl.kill();
          };
        }
      );

      return () => mm.revert();
    },
    {
      scope: sectionRef,
      // CRITICAL for Next dev/StrictMode + pinning (prevents leftover pin-spacers)
      revertOnUpdate: true,
    }
  );

  return (
    <section
      ref={sectionRef}
      className="hero-section relative h-[100svh] w-full overflow-hidden"
    >
      {/* 1) MASK WRAPPER LAYER (bg + title that fades) */}
      <div className="mask-wrapper absolute inset-0 z-30">
        <img
          src={EX_PAGE_START.src}
          alt="background"
          className="scale-out absolute inset-0 h-full w-full object-cover"
        />

        {/* ✅ MUST be .src for your SVG import (your broken version used `as any`) */}
        <img
          src={EX_GTA_TEXT.src}
          alt="hero-title"
          className="title-logo fade-out absolute inset-0 m-auto h-auto w-[min(900px,90vw)] select-none"
        />
      </div>

      {/* 2) FULL-SCREEN LOGO LAYER (mask-logo) */}
      <div className="absolute inset-0 z-10">
        <img
          src={PIN_TUBS.src}
          alt="logo-layer"
          className="mask-logo absolute inset-0 h-full w-full object-cover select-none"
        />
      </div>

      {/* 3) OVERLAY LOGO FLASH LAYER (overlay-logo) */}
      <div className="fake-logo-wrapper pointer-events-none absolute inset-0 z-20">
        <img
          src={PIN_TUBS.src}
          alt="overlay-logo"
          className="overlay-logo absolute inset-0 m-auto h-auto w-[min(900px,90vw)] select-none"
        />
      </div>
    </section>
  );
}


