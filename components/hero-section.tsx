"use client";

import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// ONLY TWO IMAGE FILES (your repo path)
import EX_PAGE_START from "../lib/assests/EX_PAGE_START.jpeg";
import PIN_TUBS from "../lib/assests/PIN_TUBS.jpeg";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const initialMaskPos = "50% 0%";
  const initialMaskSize = "120% 120%";
  const maskSize = "1800% 1800%";

  useGSAP(() => {
    gsap.set(".mask-wrapper", {
      WebkitMaskImage:
        "radial-gradient(circle at 50% 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 70%)",
      maskImage:
        "radial-gradient(circle at 50% 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 70%)",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: initialMaskPos,
      maskPosition: initialMaskPos,
      WebkitMaskSize: initialMaskSize,
      maskSize: initialMaskSize,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "+=200%",
        scrub: 2.5,
        pin: true,
      },
    });

    tl.to(".hero-text", { opacity: 0, ease: "power1.inOut" })
      .to(".hero-bg", { scale: 1.05, ease: "power1.inOut" }, "<")
      .to(
        ".mask-wrapper",
        { WebkitMaskSize: maskSize, maskSize, ease: "power1.inOut" },
        "<"
      )
      .to(".mask-wrapper", { opacity: 0, duration: 0.4 });
  });

  return (
    <section className="hero-section relative h-[100svh] w-full overflow-hidden">
      <div className="mask-wrapper relative h-full w-full">
        <Image
          src={EX_PAGE_START}
          alt="Background"
          fill
          priority
          sizes="100vw"
          className="hero-bg object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={PIN_TUBS}
            alt="Pinnacle Tubs"
            priority
            className="hero-text h-auto w-[min(900px,90vw)]"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
