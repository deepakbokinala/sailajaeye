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
        <OurTeam />
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

const TEAM_IMAGES = [
  { src: "/team/team.jpg", alt: "Our team at Dr. Sailaja's Eye Hospital" },
  { src: "/team/tea.jpg", alt: "Doctors and staff at work" },
  { src: "/team/te.jpg", alt: "Specialists during a consultation" },
  { src: "/team/t.jpg", alt: "Support staff caring for patients" },
];

function OurTeam() {
  return (
    <Section spacing="xl" tone="muted">
      <Container size="full" padding="lg">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
          <Heading as="h2" size="h2" tone="brand">
            Our Team
          </Heading>
          <Body>
            Behind every restored vision is a team of people who care deeply
            about what they do. Our ophthalmologists, optometrists, nurses, and
            support staff bring decades of combined experience — and the kind
            of unhurried attention that makes patients feel heard at every step.
          </Body>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {TEAM_IMAGES.map((img) => (
            <div
              key={img.src}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-card bg-surface-muted shadow-soft"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-5">
          <Body>
            From the consultation room to the operating theatre, our team works
            as one. Senior specialists collaborate closely with junior doctors,
            counsellors, and technicians so that every treatment plan reflects
            the collective expertise of the hospital — not just one
            practitioner&apos;s view.
          </Body>
          <Body>
            We invest continuously in training and the latest ophthalmic
            technology, because the standard of care should keep getting better
            year after year. But what hasn&apos;t changed since day one is the
            warmth — the small things, like remembering a patient&apos;s name,
            walking an anxious family member through a procedure, or following
            up after surgery to make sure everything is healing well.
          </Body>
          <Body>
            We&apos;re proud of the trust our community has placed in us, and
            we&apos;re grateful to every member of our team who shows up each
            day to honour it.
          </Body>
        </div>
      </Container>
    </Section>
  );
}

function FounderDesk() {
  return (
    <Section spacing="xl">
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

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card">
            <Image
              src="/sailaja.jpg"
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
