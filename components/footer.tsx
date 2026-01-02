"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="mt-auto w-full border-t bg-muted/50">
      <div className="mx-auto w-full max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-bold">Pinnacle Tubs</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Luxury hot tubs made in the USA.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Repairs and service are available for existing hot tubs.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/hot-tubs" className="text-muted-foreground hover:text-primary">
                  Hot Tubs
                </Link>
              </li>
              <li>
                <Link href="/product" className="text-muted-foreground hover:text-primary">
                  Featured Product
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-muted-foreground hover:text-primary">
                  Media Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Contact</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>We reply promptly to questions and service requests.</p>
              <div className="space-y-2">
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">
                    Email
                  </p>
                  <a className="block hover:text-primary" href="mailto:pinnacle.tubs@gmail.com">
                    pinnacle.tubs@gmail.com
                  </a>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">
                    Phone
                  </p>
                  <a className="block hover:text-primary" href="tel:9099366206">
                    909 936 6206
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Location - Big Bear Lake, CA</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="space-y-1">
                <p>41529 Big Bear Blvd</p>
                <p>Big Bear Lake, CA 92315</p>
                <p>USA</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">
                  Social
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    className="inline-flex items-center rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground transition hover:text-primary"
                    href="https://www.instagram.com/pinnacle.tubs"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Instagram
                  </a>
                  <a
                    className="inline-flex items-center rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground transition hover:text-primary"
                    href="https://www.facebook.com/pinnacletubs"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear ?? ""} Pinnacle Tubs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
