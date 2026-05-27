"use client";

import { useRef } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import {
  Body,
  Card,
  Container,
  Heading,
  Section,
  SliderArrow,
} from "@/components/ui";

export interface TestimonialItem {
  patient: string;
  title: string;
  blurb: string;
  image: string;
}

export function Testimonials({ items }: { items: TestimonialItem[] }) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <Section tone="muted" spacing="lg">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <Heading as="h2" size="h2" tone="brand">
            Patient testimonials
          </Heading>
          <Body>
            At Dr. Sailaja&apos;s, every patient&apos;s story reflects our strong commitment
            to their health and recovery. Their heartfelt words drive us to
            continue providing the best possible medical support.
          </Body>
        </div>

        <div className="relative mt-12">
          <Swiper
            modules={[Navigation, Pagination]}
            onBeforeInit={(s) => {
              if (typeof s.params.navigation === "object" && s.params.navigation) {
                s.params.navigation.prevEl = prevRef.current;
                s.params.navigation.nextEl = nextRef.current;
              }
            }}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            pagination={{
              clickable: true,
              bulletClass:
                "swiper-pagination-bullet !bg-muted-foreground/40 !opacity-100",
              bulletActiveClass: "!bg-brand !w-6 !rounded-pill transition-all",
            }}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className="!pb-12"
          >
            {items.map((t) => (
              <SwiperSlide key={t.patient} className="h-auto">
                <TestimonialCard testimonial={t} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="mt-2 flex items-center justify-center gap-3">
            <SliderArrow ref={prevRef} direction="prev" />
            <SliderArrow ref={nextRef} direction="next" />
          </div>
        </div>
      </Container>
    </Section>
  );
}

function TestimonialCard({ testimonial: t }: { testimonial: TestimonialItem }) {
  return (
    <Card interactive className="h-full overflow-hidden">
      <a
        href="#"
        aria-label={`Watch ${t.patient}'s story`}
        className="group relative block aspect-video w-full overflow-hidden"
      >
        <Image
          src={t.image}
          alt={`${t.patient} testimonial thumbnail`}
          fill
          sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 top-0 bg-brand/95 px-4 py-2">
          <span className="line-clamp-1 text-xs font-semibold text-white">
            {t.title}
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-4 py-3">
          <span className="text-sm font-semibold text-white">
            Healing Journey
          </span>
        </div>
        <span className="absolute right-3 top-12 inline-flex items-center gap-1 rounded-pill bg-white/95 px-2.5 py-1 text-[10px] font-semibold text-brand shadow-soft">
          <Play className="size-3 fill-brand" />
          Watch on
        </span>
      </a>

      <div className="flex flex-col gap-3 p-5">
        <Body size="sm" className="line-clamp-4">
          {t.blurb}
        </Body>
        <span className="text-sm font-semibold text-foreground">{t.patient}</span>
      </div>
    </Card>
  );
}
