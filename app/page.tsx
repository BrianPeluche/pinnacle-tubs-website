import { Suspense } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { FeaturedProducts } from "@/components/featured-products";
import { Footer } from "@/components/footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navigation />
      <HeroSection />
      <FeaturedProducts />
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </main>
  );
}
