//tubs.tsx

"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import TME_EVO from "../lib/assests/TME_EVO.jpeg";
import TACO from "../lib/assests/TACO.jpeg";
import VIEW_BIG_BEAR from "../lib/assests/VIEW_BIG_BEAR.jpeg";

gsap.registerPlugin(ScrollTrigger);

export default function Tubs() {
  useGSAP(() => {
    gsap.set(".jason", { y: "-80vh" });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".jason",
          start: "top 90%",
          end: "10% center",
          scrub: 2,
        },
      })
      .to(".first-vd", { opacity: 0, duration: 1, ease: "power1.inOut" });

    gsap.to(".jason .img-box", {
      scrollTrigger: {
        trigger: ".jason",
        start: "top center",
        end: "80% center",
        scrub: 2,
      },
      y: -300,
      duration: 1,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <section className="jason">
      <div className="max-w-lg jason-content">
        <h1>Pinnacle Tubs</h1>
        <h2>Relaxation, built for the outdoors.</h2>
        <p>
          Designed for comfort and durability—whether you’re hosting friends,
          winding down after a long day, or enjoying a weekend getaway.
        </p>

        {/* Replaced jason-2.webp */}
        <div className="jason-2">
          <img src={TACO.src} alt="Taco" />
        </div>
      </div>

      <div className="space-y-5 mt-96 img-box">
        {/* Replaced jason-1.webp */}
        <div className="jason-1">
          <img src={TME_EVO.src} alt="TME EVO" />
        </div>

        {/* Replaced jason-3.webp */}
        <div className="jason-3">
          <img src={VIEW_BIG_BEAR.src} alt="View Big Bear" />
        </div>
      </div>
    </section>
  );
}
