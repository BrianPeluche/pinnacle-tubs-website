"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { useMaskSettings } from "../../constants";
import ComingSoon from "./ComingSoon";

// ✅ import from lib/assests (your real path)
import BG from "../../lib/assests/EX_PAGE_START.jpeg";
import TEXT from "../../lib/assests/PIN_TUBS.jpeg";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero(): JSX.Element {
  const root = useRef<HTMLElement | null>(null);
  const { initialMaskPos, initialMaskSize, maskSize } = useMaskSettings();

  useGSAP(
    () => {
      gsap.set(".mask-wrapper", {
        maskPosition: initialMaskPos,
        maskSize: initialMaskSize,
      });

      gsap.set(".mask-logo", { marginTop: "-100vh", opacity: 0 });
      gsap.set(".entrance-message", { marginTop: "0vh" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          scrub: 2.5,
          end: "+=200%",
          pin: true,
        },
      });

      tl.to(".fade-out", { opacity: 0, ease: "power1.inOut" })
        .to(".scale-out", { scale: 1, ease: "power1.inOut" })
        .to(".mask-wrapper", { maskSize, ease: "power1.inOut" }, "<")
        .to(".mask-wrapper", { opacity: 0 })
        .to(
          ".overlay-logo",
          {
            opacity: 1,
            onComplete: () => gsap.to(".overlay-logo", { opacity: 0 }),
          },
          "<"
        )
        .to(
          ".entrance-message",
          {
            duration: 1,
            ease: "power1.inOut",
            maskImage:
              "radial-gradient(circle at 50% 0vh, black 50%, transparent 100%)",
          },
          "<"
        );
    },
    { scope: root, dependencies: [initialMaskPos, initialMaskSize, maskSize] }
  );

  return (
    <section ref={root} className="hero-section">
      {/* ONLY 2 image assets used: EX_PAGE_START.jpeg + PIN_TUBS.jpeg */}
      <div className="mask-wrapper relative size-full overflow-hidden">
        {/* background */}
        <Image
          src={BG}
          alt="background"
          fill
          priority
          className="scale-out object-cover"
        />

        {/* text */}
        <Image
          src={TEXT}
          alt="pinnacle tubs text"
          width={TEXT.width}
          height={TEXT.height}
          priority
          className="title-logo fade-out"
        />

        {/* If you still need the play/trailer elements, do them with HTML/CSS (no extra images) */}
      </div>

      {/* Reuse SAME text file without adding more <img> tags (divs with background-image) */}
      <div
        className="mask-logo size-full"
        style={{
          backgroundImage: `url(${TEXT.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="fake-logo-wrapper">
        <div
          className="overlay-logo"
          style={{
            backgroundImage: `url(${TEXT.src})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>

      <ComingSoon />
    </section>
  );
}
