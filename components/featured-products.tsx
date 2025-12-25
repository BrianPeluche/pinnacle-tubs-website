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
    gsap.set(".first-vd-wrapper", { y: "-150vh", opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".first-vd-wrapper",
        start: "top top",
        end: "+=200% top",
        scrub: true,
        pin: true,
      },
    });

    tl.to(".first-vd-wrapper", { y: "0vh", duration: 1, ease: "power1.inOut" });
    tl.to(".first-vd-wrapper", { opacity: 1, duration: 1, ease: "power1.inOut" }, "<");

    const video = videoRef.current;
    if (!video) return;

    const onLoadedMetadata = () => {
      // keep it consistent on refresh/hot-reload
      try {
        video.currentTime = 0;
      } catch {}

      tl.to(
        video,
        {
          currentTime: video.duration || 0,
          duration: 3,
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
      <div className="h-dvh">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="first-vd h-full w-full object-cover"
        >
          <source src="/videos/EX_VID_FEAT.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
