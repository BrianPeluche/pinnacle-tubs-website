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

    gsap.set(section, { opacity: 0 });

    let targetTime = 0;

    const updateVideoTime = () => {
      if (!video.duration) return;
      const delta = targetTime - video.currentTime;
      if (Math.abs(delta) < 0.01) return;
      video.currentTime += delta * 0.12;
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          targetTime = video.duration * self.progress;
        },
      },
    });

    tl.to(section, { opacity: 1, duration: 0.5, ease: "power1.inOut" });

    const onLoadedMetadata = () => {
      video.currentTime = 0;
      targetTime = 0;
      ScrollTrigger.refresh();
    };

    if (video.readyState >= 1) onLoadedMetadata();
    else video.addEventListener("loadedmetadata", onLoadedMetadata);

    gsap.ticker.add(updateVideoTime);

    return () => {
      gsap.ticker.remove(updateVideoTime);
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
