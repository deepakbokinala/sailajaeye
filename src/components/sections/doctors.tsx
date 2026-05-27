"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper/types";
import { ChevronDown } from "lucide-react";
import "swiper/css";

import {
  Body,
  Card,
  Container,
  Heading,
  Section,
  SliderArrow,
} from "@/components/ui";
import { cn } from "@/lib/utils";

export interface DoctorItem {
  name: string;
  specialty: string;
  image: string;
}

export function Doctors({ items }: { items: DoctorItem[] }) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);

  const specialties = [
    "All",
    ...Array.from(new Set(items.map((d) => d.specialty))),
  ];

  return (
    <Section spacing="lg">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <Heading as="h2" size="h2" tone="brand">
            Our Doctors
          </Heading>
          <Body>
            With years of expertise and a deep commitment to patient well-being,
            our doctors at Dr. Sailaja&apos;s deliver exceptional care to enhance every
            patient&apos;s health.
          </Body>
        </div>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[320px_1fr] lg:gap-10">
          <Card className="p-6">
            <Heading as="h3" size="h5" className="mb-5">
              Choose Specialties
            </Heading>
            <div className="flex flex-col gap-4">
              <FilterSelect label="Specialty" options={specialties} />
              <FilterSelect
                label="Doctor's Name"
                options={["All", ...items.map((d) => d.name)]}
              />
            </div>
          </Card>

          <div className="relative min-w-0">
            <Swiper
              modules={[Navigation]}
              onSwiper={setSwiper}
              onBeforeInit={(s) => {
                if (typeof s.params.navigation === "object" && s.params.navigation) {
                  s.params.navigation.prevEl = prevRef.current;
                  s.params.navigation.nextEl = nextRef.current;
                }
              }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              spaceBetween={20}
              slidesPerView={1.1}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 2, spaceBetween: 24 },
                1280: { slidesPerView: 3, spaceBetween: 24 },
              }}
              className="!pb-2"
            >
              {items.map((doctor) => (
                <SwiperSlide key={doctor.name} className="h-auto">
                  <DoctorCard doctor={doctor} />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="mt-6 flex items-center justify-center gap-3">
              <SliderArrow ref={prevRef} direction="prev" />
              <SliderArrow ref={nextRef} direction="next" />
            </div>
            {swiper ? null : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function DoctorCard({ doctor }: { doctor: DoctorItem }) {
  return (
    <Card interactive className="overflow-hidden">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-muted">
        <Image
          src={doctor.image}
          alt={doctor.name}
          fill
          sizes="(min-width: 1280px) 18rem, (min-width: 640px) 40vw, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      <div className="flex flex-col items-center gap-1 px-5 py-5 text-center">
        <span className="text-base font-semibold text-foreground">
          {doctor.name}
        </span>
        <span className="text-sm text-muted-foreground">{doctor.specialty}</span>
      </div>
    </Card>
  );
}

function FilterSelect({
  label,
  options,
}: {
  label: string;
  options: string[];
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </span>
      <span className="relative">
        <select
          defaultValue={options[0]}
          className={cn(
            "h-11 w-full appearance-none rounded-pill border border-border bg-surface px-4 pr-10 text-sm font-medium text-foreground",
            "transition-colors hover:border-border-strong focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          )}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      </span>
    </label>
  );
}
