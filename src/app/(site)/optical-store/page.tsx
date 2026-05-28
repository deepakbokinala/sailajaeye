import type { Metadata } from "next";
import Image from "next/image";
import { Header, Footer } from "@/components/layout";
import { Body, Container, Heading, Section } from "@/components/ui";
import { BrandSlider } from "@/components/sections/brand-slider";

export const metadata: Metadata = {
  title: "Optical Store",
  description:
    "Browse premium eyewear at Dr. Sailaja's Optical Store — frames, lenses, and sunglasses from top brands like Nova UHD, Essilor, Zeiss, Titan, and more.",
};

const SERVICES = [
  {
    title: "Prescription Eyeglasses",
    description:
      "Precision-crafted lenses tailored to your exact prescription, available in single vision, bifocal, and progressive options.",
    icon: "https://api.iconify.design/healthicons/eyeglasses-outline.svg",
  },
  {
    title: "Sunglasses",
    description:
      "UV-protective sunglasses from premium brands, available in prescription and non-prescription variants.",
    icon: "https://api.iconify.design/healthicons/eye-outline.svg",
  },
  {
    title: "Contact Lenses",
    description:
      "Daily, monthly, and specialty contact lenses with expert fitting consultations to ensure comfort and clarity.",
    icon: "https://api.iconify.design/healthicons/clinical-fe-outline.svg",
  },
  {
    title: "Kids Eyewear",
    description:
      "Durable, lightweight frames designed for children with flexible and hypoallergenic materials.",
    icon: "https://api.iconify.design/healthicons/child-care-outline.svg",
  },
  {
    title: "Lens Coatings & Upgrades",
    description:
      "Anti-reflective, blue-light blocking, photochromic, and scratch-resistant coatings for enhanced visual comfort.",
    icon: "https://api.iconify.design/healthicons/health-worker-outline.svg",
  },
  {
    title: "Frame Adjustments & Repairs",
    description:
      "Complimentary frame fitting, nose-pad replacement, and minor repairs to keep your eyewear in perfect shape.",
    icon: "https://api.iconify.design/healthicons/ui-preferences-outline.svg",
  },
];


export default function OpticalStorePage() {
  return (
    <>
      <Header />
      <main>
        <OpticalHero />
        <StoreIntro />
        <ServicesGrid />
        <BrandSlider />
        <VisitCTA />
      </main>
      <Footer />
    </>
  );
}

function OpticalHero() {
  return (
    <section className="relative w-full">
      <div className="relative h-[240px] w-full overflow-hidden sm:h-[320px] lg:h-[400px]">
        <Image
          src="/carousel/carousel-three.jpg"
          alt="Optical Store at Dr. Sailaja's Eye Hospital"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-brand/70" />
        <div className="absolute inset-0 flex items-end">
          <Container size="full" padding="lg">
            <div className="pb-10 lg:pb-14">
              <h1 className="text-3xl font-light text-white sm:text-4xl">
                Optical Store
              </h1>
              <p className="mt-2 text-lg text-white/80">
                Premium Eyewear &amp; Expert Lens Solutions
              </p>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}

function StoreIntro() {
  return (
    <Section spacing="xl">
      <Container size="full" padding="lg">
        <div className="mx-auto max-w-3xl text-center">
          <Heading as="h2" size="h2" tone="brand">
            Your Destination for Quality Eyewear
          </Heading>
          <Body className="mt-6">
            Our in-house optical store offers a curated selection of frames,
            lenses, and sunglasses from the world&apos;s most trusted brands.
            Whether you need prescription glasses, specialty lenses, or stylish
            sunglasses, our trained opticians will help you find the perfect fit
            for your vision and lifestyle.
          </Body>
        </div>
      </Container>
    </Section>
  );
}

function ServicesGrid() {
  return (
    <Section spacing="lg" tone="muted">
      <Container size="full" padding="lg">
        <Heading as="h2" size="h2" className="text-center">
          What We Offer
        </Heading>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="flex flex-col gap-4 rounded-card border border-border bg-surface p-8 shadow-soft transition-shadow hover:shadow-soft-lg"
            >
              <img
                src={service.icon}
                alt=""
                className="size-10"
                loading="lazy"
                decoding="async"
              />
              <h3 className="text-lg font-semibold text-foreground">
                {service.title}
              </h3>
              <Body>{service.description}</Body>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}


function VisitCTA() {
  return (
    <Section spacing="lg" tone="brand">
      <Container size="full" padding="lg">
        <div className="mx-auto max-w-2xl text-center">
          <Heading as="h2" size="h2" tone="inverse">
            Visit Our Optical Store
          </Heading>
          <Body tone="inverse" className="mt-5">
            Walk in to our optical store at Dr. Sailaja&apos;s Super Speciality
            Eye Hospital, Horamavu, Bengaluru. Our expert opticians are
            available to help you choose the right eyewear for your needs.
          </Body>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://kivihealth.com/iam/sai.laja.15614/bookslot"
              className="inline-flex h-12 items-center rounded-pill bg-white px-8 text-sm font-semibold text-brand transition-colors hover:bg-white/90"
            >
              Book an Eye Test
            </a>
            <a
              href="tel:+918884471641"
              className="inline-flex h-12 items-center rounded-pill border border-white/40 px-8 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Call Us
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
