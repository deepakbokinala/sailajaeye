import Image from "next/image";
import { Quote } from "lucide-react";
import { Container, Section } from "@/components/ui";

export function LeaderQuote() {
  return (
    <Section spacing="md" tone="transparent" className="py-12 sm:py-16">
      <Container size="full" padding="lg">
        <div className="relative overflow-hidden rounded-card bg-brand text-white shadow-brand">
          {/* Soft brand glow accents */}
          <div className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-24 -bottom-24 size-72 rounded-full bg-brand-darker/40 blur-3xl" />

          <div className="relative grid items-center gap-8 px-8 py-10 sm:px-12 sm:py-12 lg:grid-cols-[1fr_auto] lg:gap-16 lg:px-16">
            <div className="flex flex-col gap-5 max-w-2xl">
              <Quote className="size-8 opacity-80" />
              <p className="text-lg leading-relaxed text-white/95 sm:text-xl">
                &ldquo;At Dr. Sailaja&apos;s, your eye health and well-being are always our top
                priority. With the most advanced medical technology and a dedicated
                team of super specialist doctors, we ensure you receive the best
                healthcare experience.&rdquo;
              </p>
              <div className="flex flex-col gap-0.5 pt-2">
                <span className="text-base font-semibold">Dr. P.S. Sailaja</span>
                <span className="text-sm text-white/75">
                  Founder
                </span>
              </div>
            </div>

            <div className="relative shrink-0 self-center">
              <div className="absolute inset-0 -m-3 rounded-full border border-white/20" />
              <div className="absolute inset-0 -m-6 rounded-full border border-white/10" />
              <div className="relative size-36 overflow-hidden rounded-full border-4 border-white/40 sm:size-44 lg:size-48">
                <Image
                  src="/doctor.png"
                  alt="Dr. Shafiq A M, Co-Founder, MD & CEO"
                  fill
                  sizes="(min-width: 1024px) 12rem, 11rem"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
