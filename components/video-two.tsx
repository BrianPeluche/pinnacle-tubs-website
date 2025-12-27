// video-two.tsx

// video-two.tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const VideoTwo = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    // keep sizing correct: DON'T offset layout with negative margin
    gsap.set(section, { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 5,
        pin: true,
        invalidateOnRefresh: true,
        // markers: true,
      },
    });

    tl.to(section, { opacity: 1, duration: 0.5, ease: "power1.inOut" });

    const onLoadedMetadata = () => {
      video.currentTime = 0;

      tl.to(
        video,
        {
          currentTime: video.duration,
          duration: 2,
          ease: "none", // smoother scrubbing than power1.inOut
        },
        "<"
      );

      ScrollTrigger.refresh();
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
    <section
      ref={sectionRef}
      className="lucia video-two-wrapper relative h-[100svh] w-full overflow-hidden"
    >
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="h-full w-full object-cover object-[50%_70%]"
      >
        <source src="/videos/output3.mp4" type="video/mp4" />
      </video>
    </section>
  );
};

export default VideoTwo;
