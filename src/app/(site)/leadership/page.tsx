import type { Metadata } from "next";
import Image from "next/image";
import { Header, Footer } from "@/components/layout";
import { Body, Container, Heading, Section } from "@/components/ui";
import { getLeadership, type LeaderData } from "@/lib/content/outstatic";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Leadership Team",
  description:
    "Meet the doctors leading Dr. Sailaja's Super Speciality Eye Hospital, Horamavu — their specialities, credentials, and the care they bring to every patient.",
};

export default function LeadershipPage() {
  const leaders = getLeadership();

  return (
    <>
      <Header />
      <main>
        <LeadershipHero />
        <LeadershipIntro />
        <LeaderProfiles leaders={leaders} />
        <LeadershipCTA />
      </main>
      <Footer />
    </>
  );
}

function LeadershipHero() {
  return (
    <section className="relative w-full">
      <div className="relative h-[240px] w-full overflow-hidden sm:h-[320px] lg:h-[400px]">
        <Image
          src="/team/team.jpg"
          alt="The team at Dr. Sailaja's Eye Hospital"
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
                Leadership Team
              </h1>
              <p className="mt-2 text-lg text-white/80">
                The People Behind Every Restored Vision
              </p>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}

function LeadershipIntro() {
  return (
    <Section spacing="xl">
      <Container size="full" padding="lg">
        <div className="mx-auto max-w-3xl text-center">
          <Heading as="h2" size="h2" tone="brand">
            Led by Surgeons Who Still See Patients
          </Heading>
          <Body className="mt-6">
            Our leadership is clinical, not administrative. The people who set
            the standard at Dr. Sailaja&apos;s are the same people in the
            consultation room and the operating theatre — which is why the care
            you receive reflects the values we set out with.
          </Body>
        </div>
      </Container>
    </Section>
  );
}

function LeaderProfiles({ leaders }: { leaders: LeaderData[] }) {
  if (leaders.length === 0) {
    return (
      <Section spacing="lg" tone="muted">
        <Container size="full" padding="lg">
          <Body className="text-center">
            Our team profiles are being updated. Please call us on{" "}
            <a href="tel:+918884471641" className="font-semibold text-brand">
              +91 88844 71641
            </a>{" "}
            for any assistance.
          </Body>
        </Container>
      </Section>
    );
  }

  return (
    <Section spacing="lg" tone="muted">
      <Container size="full" padding="lg">
        <div className="flex flex-col gap-12 lg:gap-16">
          {leaders.map((leader, index) => (
            <LeaderRow key={leader.slug} leader={leader} index={index} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function getInitials(name: string): string {
  return name
    .replace(/^Dr\.?\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/** Alternating rows so consecutive profiles don't read as a uniform list. */
function LeaderRow({ leader, index }: { leader: LeaderData; index: number }) {
  const mediaFirst = index % 2 === 0;

  return (
    <article className="grid items-center gap-8 rounded-card border border-border bg-surface p-6 shadow-soft sm:p-8 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-12 lg:p-10">
      <div
        className={`relative aspect-[4/3] w-full overflow-hidden rounded-[20px] bg-brand/10 ${
          mediaFirst ? "" : "lg:order-2"
        }`}
      >
        {leader.image ? (
          <Image
            src={leader.image}
            alt={leader.name}
            fill
            sizes="(min-width: 1024px) 22rem, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand/20 to-brand/5">
            <span className="text-6xl font-light text-brand">
              {getInitials(leader.name)}
            </span>
          </div>
        )}
      </div>

      <div className={mediaFirst ? "" : "lg:order-1"}>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">
          {leader.specialty}
        </p>
        <Heading as="h2" size="h3" className="mt-2">
          {leader.name}
        </Heading>
        {leader.credentials ? (
          <p className="mt-1 text-sm text-muted-foreground">
            {leader.credentials}
          </p>
        ) : null}
        {leader.subtitle ? (
          <p className="mt-3 text-sm text-muted-foreground">
            {leader.subtitle}
          </p>
        ) : null}
        {leader.bio ? (
          <div className="mt-5 flex flex-col gap-4">
            {leader.bio.split(/\n{2,}/).map((para) => (
              <Body key={para.slice(0, 40)}>{para.replace(/\n/g, " ")}</Body>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

function LeadershipCTA() {
  return (
    <Section spacing="lg" tone="brand">
      <Container size="full" padding="lg">
        <div className="mx-auto max-w-2xl text-center">
          <Heading as="h2" size="h2" tone="inverse">
            Consult Our Specialists
          </Heading>
          <Body tone="inverse" className="mt-5">
            Book an appointment with the doctor best suited to your condition,
            or call us and we will guide you to the right specialist.
          </Body>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://kivihealth.com/iam/sai.laja.15614/bookslot"
              className="inline-flex h-12 items-center rounded-pill bg-white px-8 text-sm font-semibold text-brand transition-colors hover:bg-white/90"
            >
              Book an Appointment
            </a>
            <a
              href="tel:+918884471641"
              className="inline-flex h-12 items-center rounded-pill border border-white/40 px-8 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Call +91 88844 71641
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
