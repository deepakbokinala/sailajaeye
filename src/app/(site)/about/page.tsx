import type { Metadata } from "next";
import Image from "next/image";
import { Header, Footer } from "@/components/layout";
import {
  Body,
  Container,
  Heading,
  Section,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Dr. Sailaja's Super Speciality Eye Hospital — our mission, vision, and commitment to exceptional eye care in Horamavu, Bengaluru.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <AboutHero />
        <AboutIntro />
        <FounderDesk />
      </main>
      <Footer />
    </>
  );
}

function AboutHero() {
  return (
    <section className="relative w-full">
      <div className="relative h-[240px] w-full overflow-hidden sm:h-[320px] lg:h-[400px]">
        <Image
          src="/carousel/carousel-one.jpg"
          alt="Dr. Sailaja's Super Speciality Eye Hospital"
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
                About Dr. Sailaja&apos;s Eye Hospital
              </h1>
              <p className="mt-2 text-lg text-white/80">
                Your Partner in Vision and Eye Wellness
              </p>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}

function AboutIntro() {
  return (
    <Section spacing="xl">
      <Container size="full" padding="lg">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div className="flex items-center justify-center bg-surface-muted p-10 lg:p-14">
            <Image
              src="/logo.png"
              alt="Dr. Sailaja's Super Speciality Eye Hospital"
              width={240}
              height={287}
              className="h-auto w-full max-w-[240px]"
            />
          </div>

          <div className="flex flex-col gap-5">
            <Heading as="h2" size="h2" tone="brand">
              Dr. Sailaja&apos;s Super Speciality Eye Hospital
            </Heading>
            <Body>
              Dr. Sailaja&apos;s Super Speciality Eye Hospital is a leading eye
              care provider in Horamavu, Bengaluru, dedicated to delivering
              comprehensive ophthalmic services to patients of all ages. With a
              team of experienced ophthalmologists and state-of-the-art
              diagnostic equipment, we are committed to restoring and preserving
              vision for every patient who walks through our doors.
            </Body>
            <Body>
              Our hospital offers a wide range of services including cataract
              surgery, LASIK, oculoplasty, retina care, glaucoma management,
              squint evaluation, and advanced diagnostic procedures. We use the
              latest technology including phaco emulsification, YAG laser, and
              computerized visual field analysis to ensure accurate diagnosis and
              effective treatment.
            </Body>
            <Body>
              Founded with the vision of making quality eye care accessible and
              affordable, Dr. Sailaja&apos;s Eye Hospital has earned the trust
              of thousands of patients across Bengaluru and beyond.
            </Body>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function FounderDesk() {
  return (
    <Section spacing="xl" tone="muted">
      <Container size="full" padding="lg">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="flex flex-col gap-5">
            <Heading as="h2" size="h2" className="italic">
              From the Founder&apos;s Desk
            </Heading>
            <Body>
              When I look back at our journey, I am humbled by how Dr.
              Sailaja&apos;s Eye Hospital began with a simple vision — to serve
              people with expert eye care and compassion. Over the years, with
              the trust and encouragement of our community, that vision has grown
              into a hospital that now provides world-class ophthalmic care to
              families across Bengaluru.
            </Body>
            <Body>
              As we step into the future, my promise is to keep building on this
              foundation of trust and care. With every advancement in technology,
              every new service we add, and every patient we serve, our focus
              will always remain the same — to heal with kindness, to serve with
              dedication, and to grow together with the community that has made
              us who we are today.
            </Body>
            <Body>
              Every milestone we achieve is rooted in the belief that eye care is
              a bond of trust. For us, it has never been just about treating
              conditions, but about caring for people, listening to them,
              supporting their families, and walking with them through their
              journey to better vision.
            </Body>
            <div className="mt-2">
              <span className="text-xl font-semibold text-brand">
                Dr. P.S. Sailaja
              </span>
              <br />
              <span className="text-sm text-muted-foreground">Founder</span>
            </div>
          </div>

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card">
            <Image
              src="/doctor.png"
              alt="Dr. P.S. Sailaja, Founder"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
