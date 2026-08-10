import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header, Footer, PageHero } from "@/components/layout";
import { Body, Container, Heading, Section } from "@/components/ui";
import { storage } from "@/lib/content/storage";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Surgeries",
  description:
    "Surgical eye care at Dr. Sailaja's Super Speciality Eye Hospital, Horamavu — cataract surgery, LASIK, phaco emulsification, eyelid surgery, and more.",
};

export default async function SurgeriesPage() {
  const pages = await storage.getAllPages();
  const surgeries = pages
    .filter((p) => p.type === "surgery")
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <>
      <Header />
      <main>
        <PageHero
          title="Surgeries"
          subtitle="Advanced Surgical Care for Every Eye Condition"
        />
        <Section spacing="xl">
          <Container size="full" padding="lg">
            <div className="mx-auto max-w-3xl text-center">
              <Heading as="h2" size="h2" tone="brand">
                Surgery, Planned Around You
              </Heading>
              <Body className="mt-6">
                Every procedure at Dr. Sailaja&apos;s begins with a thorough
                evaluation and an honest conversation about what surgery can and
                cannot achieve. Explore the procedures we perform below.
              </Body>
            </div>
          </Container>
        </Section>
        <Section spacing="lg" tone="muted">
          <Container size="full" padding="lg">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {surgeries.map((item) => (
                <Link
                  key={item.slug}
                  href={`/surgeries/${item.slug}`}
                  className="group flex h-full flex-col rounded-card border border-border bg-surface p-7 shadow-soft transition-all hover:-translate-y-0.5 hover:border-border-strong hover:shadow-soft-lg"
                >
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  {item.subtitle ? (
                    <Body size="sm" className="mt-2">
                      {item.subtitle}
                    </Body>
                  ) : null}
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-brand">
                    Learn more
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
