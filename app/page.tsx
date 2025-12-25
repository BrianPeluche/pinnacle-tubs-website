import { Suspense } from "react";

import { Navigation } from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import FeaturedProducts from "@/components/featured-products";
import Tubs from "@/components/tubs";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <FeaturedProducts />
      <Tubs />
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </main>
  );
}
