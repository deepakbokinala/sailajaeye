import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header, Footer, PageHero } from "@/components/layout";
import { Body, Container, Heading, Section } from "@/components/ui";
import { storage } from "@/lib/content/storage";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Specialities",
  description:
    "Specialised eye care services at Dr. Sailaja's Super Speciality Eye Hospital, Horamavu — computerized eye testing, visual field analysis, biometry, contact lenses, lasers, and more.",
};

export default async function SpecialitiesPage() {
  const pages = await storage.getAllPages();
  const specialities = pages
    .filter((p) => p.type === "speciality")
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <>
      <Header />
      <main>
        <PageHero
          title="Specialities"
          subtitle="Diagnostics and Specialised Services Under One Roof"
        />
        <Section spacing="xl">
          <Container size="full" padding="lg">
            <div className="mx-auto max-w-3xl text-center">
              <Heading as="h2" size="h2" tone="brand">
                The Right Test, Read by the Right Specialist
              </Heading>
              <Body className="mt-6">
                Accurate diagnosis is what makes good treatment possible. Our
                diagnostic suite covers everything from routine refraction to
                retinal imaging and visual field analysis — each interpreted by
                a specialist, not just a machine.
              </Body>
            </div>
          </Container>
        </Section>
        <Section spacing="lg" tone="muted">
          <Container size="full" padding="lg">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {specialities.map((item) => (
                <Link
                  key={item.slug}
                  href={`/specialities/${item.slug}`}
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
