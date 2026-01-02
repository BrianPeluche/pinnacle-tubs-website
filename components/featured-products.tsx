"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProducts() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useGSAP(() => {
    gsap.set(".first-vd-wrapper", { opacity: 1 });

    const video = videoRef.current;
    if (!video) return;

    let tl: gsap.core.Timeline | null = null;
    let targetTime = 0;

    const updateVideoTime = () => {
      if (!video.duration) return;
      const delta = targetTime - video.currentTime;
      if (Math.abs(delta) < 0.01) return;
      video.currentTime += delta * 0.12;
    };

    const onLoadedMetadata = () => {
      video.currentTime = 0;
      targetTime = 0;

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".first-vd-wrapper",
          start: "top top",
          end: "+=200%",
          scrub: true,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            targetTime = video.duration * self.progress;
          },
        },
      });

      tl.to(".hero-section", { delay: 0.2, opacity: 0, ease: "none" });
    };

    if (video.readyState >= 1) onLoadedMetadata();
    else video.addEventListener("loadedmetadata", onLoadedMetadata);

    gsap.ticker.add(updateVideoTime);

    return () => {
      gsap.ticker.remove(updateVideoTime);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      tl?.scrollTrigger?.kill();
      tl?.kill();
    };
  }, []);

  return (
    <section className="first-vd-wrapper relative z-10 h-[100svh] w-full overflow-hidden bg-black">
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
