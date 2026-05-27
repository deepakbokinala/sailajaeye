"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Slide {
  src: string;
  position?: string;
}

const SLIDES: Slide[] = [
  { src: "/carousel/carousel-one.jpg" },
  { src: "/carousel/carousel-two.jpg" },
  { src: "/carousel/carousel-three.jpg" },
  { src: "/carousel/carousel-four.jpg" },
  { src: "/carousel/carousel-five.jpg" },
  { src: "/carousel/carousel-six.jpg", position: "top" },
  { src: "/carousel/carousel-seven.jpg" },
];

const HOLD_MS = 6000;
const FADE_MS = 5000;
const CYCLE = HOLD_MS + FADE_MS;

export function Hero() {
  const [active, setActive] = useState(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const restartZoom = useCallback((i: number) => {
    const el = slideRefs.current[i];
    if (!el) return;
    const img = el.querySelector("img");
    if (!img) return;
    img.style.animation = "none";
    img.offsetHeight;
    img.style.animation = `heroZoom ${CYCLE}ms ease-out forwards`;
  }, []);

  const goTo = useCallback(
    (i: number) => {
      setActive(i);
      restartZoom(i);
    },
    [restartZoom],
  );

  useEffect(() => {
    restartZoom(0);
  }, [restartZoom]);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      goTo((active + 1) % SLIDES.length);
    }, CYCLE);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, goTo]);

  return (
    <section className="relative w-full">
      <div className="relative h-[260px] w-full overflow-hidden sm:h-[360px] lg:h-[480px]">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            ref={(el) => { slideRefs.current[i] = el; }}
            className="absolute inset-0"
            style={{
              zIndex: i === active ? 2 : 1,
              opacity: i === active ? 1 : 0,
              transition: `opacity ${FADE_MS}ms ease-in-out`,
            }}
          >
            <Image
              src={slide.src}
              alt={
                i === 0
                  ? "Dr. Sailaja's Super Speciality Eye Hospital, Horamavu"
                  : ""
              }
              fill
              priority={i === 0}
              sizes="100vw"
              className={`object-cover ${slide.position === "top" ? "object-top" : ""}`}
            />
          </div>
        ))}

        <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => {
                if (timerRef.current) clearTimeout(timerRef.current);
                goTo(i);
              }}
              className={`h-2 rounded-pill transition-all duration-300 ${
                i === active
                  ? "w-6 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
