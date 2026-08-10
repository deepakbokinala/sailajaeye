import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { Header, Footer, PageHero } from "@/components/layout";
import { Body, Container, Heading, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Work with Dr. Sailaja's Super Speciality Eye Hospital, Horamavu, Bengaluru — opportunities for ophthalmologists, optometrists, nursing, and support staff.",
};

const ROLES = [
  {
    title: "Ophthalmologists",
    description:
      "Consultants and fellows across cataract, refractive, vitreoretina, glaucoma, and paediatric ophthalmology.",
  },
  {
    title: "Optometrists",
    description:
      "Refraction, contact lens fitting, vision therapy, and diagnostic workups alongside our clinical team.",
  },
  {
    title: "Nursing & OT Staff",
    description:
      "Scrub nurses, OT technicians, and ward staff supporting a high-volume surgical practice.",
  },
  {
    title: "Front Office & Patient Care",
    description:
      "Reception, appointments, billing, and patient counselling — the first people our patients meet.",
  },
];

const REASONS = [
  {
    title: "Surgical volume that builds skill",
    description:
      "Our senior surgeons have performed tens of thousands of procedures. You learn by being in the room.",
  },
  {
    title: "Modern diagnostic equipment",
    description:
      "Computerized testing, visual field analysis, fundus imaging, and biometry — you work with current tools.",
  },
  {
    title: "A team that teaches",
    description:
      "Clinical leadership still sees patients daily, so mentoring happens on the floor rather than in theory.",
  },
];

export default function CareersPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          title="Careers"
          subtitle="Build Your Career in Eye Care With Us"
          image="/team/tea.jpg"
        />

        <Section spacing="xl">
          <Container size="full" padding="lg">
            <div className="mx-auto max-w-3xl text-center">
              <Heading as="h2" size="h2" tone="brand">
                Join Dr. Sailaja&apos;s
              </Heading>
              <Body className="mt-6">
                We are a super speciality eye hospital in Horamavu, Bengaluru,
                built around one idea — that expert care should be accessible.
                If you want to do serious clinical work in a team that still
                takes time with every patient, we would like to hear from you.
              </Body>
            </div>
          </Container>
        </Section>

        <Section spacing="lg" tone="muted">
          <Container size="full" padding="lg">
            <Heading as="h2" size="h2" className="text-center">
              Roles We Hire For
            </Heading>
            <Body className="mx-auto mt-4 max-w-2xl text-center">
              We accept applications on an ongoing basis, even when a specific
              vacancy is not open.
            </Body>
            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              {ROLES.map((role) => (
                <div
                  key={role.title}
                  className="flex flex-col gap-3 rounded-card border border-border bg-surface p-8 shadow-soft transition-shadow hover:shadow-soft-lg"
                >
                  <h3 className="text-lg font-semibold text-foreground">
                    {role.title}
                  </h3>
                  <Body size="sm">{role.description}</Body>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        <Section spacing="lg">
          <Container size="full" padding="lg">
            <Heading as="h2" size="h2" className="text-center">
              Why Work Here
            </Heading>
            <div className="mt-12 grid gap-8 lg:grid-cols-3">
              {REASONS.map((reason) => (
                <div key={reason.title} className="flex flex-col gap-3">
                  <h3 className="text-lg font-semibold text-brand">
                    {reason.title}
                  </h3>
                  <Body size="sm">{reason.description}</Body>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        <Section spacing="lg" tone="brand">
          <Container size="full" padding="lg">
            <div className="mx-auto max-w-2xl text-center">
              <Heading as="h2" size="h2" tone="inverse">
                Apply
              </Heading>
              <Body tone="inverse" className="mt-5">
                Call us with a brief introduction and your area of practice, and
                our team will guide you through the next steps.
              </Body>
              <div className="mt-8">
                <a
                  href="tel:+918884471641"
                  className="inline-flex h-12 items-center gap-2 rounded-pill bg-white px-8 text-sm font-semibold text-brand transition-colors hover:bg-white/90"
                >
                  <Phone className="size-4" />
                  +91 88844 71641
                </a>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
