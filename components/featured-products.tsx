//featured-products.tsx

"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProducts() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useGSAP(() => {
    // ✅ Same as the reference code
    gsap.set(".first-vd-wrapper", { marginTop: "-150vh", opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".first-vd-wrapper",
        start: "top top",
        end: "+=300%",
        scrub: 6,
        pin: true,
       // markers: true, //
      },
    });

    tl.to(".hero-section", { delay: 0.2, opacity: 0, ease: "none" });
    tl.to(".first-vd-wrapper", { opacity: 1.5, duration: 20, ease: "none" });

    const video = videoRef.current;
    if (!video) return;

    const onLoadedMetadata = () => {
      tl.to(
        video,
        {
          currentTime: video.duration,
          duration: 20,
          ease: "power1.inOut",
        },
        "<"
      );
    };

    if (video.readyState >= 1) onLoadedMetadata();
    else video.addEventListener("loadedmetadata", onLoadedMetadata);

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section className="first-vd-wrapper relative h-[100svh] w-full overflow-hidden">
      <div className="h-[100svh] w-full">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="first-vd h-full w-full object-cover"
        >
          <source src="/videos/output1.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}