import { Body, Container, Heading, Section } from "@/components/ui";

interface Brand {
  name: string;
  logo: string;
}

const BRANDS: Brand[] = [
  { name: "Nova UHD", logo: "/brands/nova-uhd.svg" },
  { name: "Essilor", logo: "/brands/essilor.svg" },
  { name: "Zeiss", logo: "/brands/zeiss.svg" },
  { name: "Titan Eyeplus", logo: "/brands/titan.svg" },
  { name: "Ray-Ban", logo: "/brands/ray-ban.svg" },
  { name: "Crizal", logo: "/brands/crizal.svg" },
  { name: "Johnson & Johnson Vision", logo: "/brands/jnj-vision.svg" },
  { name: "Bausch + Lomb", logo: "/brands/bausch-lomb.svg" },
];

export function BrandSlider() {
  return (
    <Section spacing="lg">
      <Container size="full" padding="lg">
        <Heading as="h2" size="h2" className="text-center">
          Brands We Carry
        </Heading>
        <Body className="mx-auto mt-4 max-w-2xl text-center">
          We partner with the world&apos;s leading eyewear and lens
          manufacturers to bring you the best in quality, comfort, and style.
        </Body>

        <div className="relative mt-12 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />

          <div className="flex animate-marquee items-center gap-16">
            {[...BRANDS, ...BRANDS].map((brand, i) => (
              <div
                key={`${brand.name}-${i}`}
                className="flex h-16 w-44 shrink-0 items-center justify-center"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-10 w-auto max-w-[160px] object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
