import type { Metadata } from "next";
import Image from "next/image";
import { Check, Clock, Users } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { Body, Container, Heading, Section } from "@/components/ui";
import { getHealthPackages, type HealthPackageData } from "@/lib/content/outstatic";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Health Packages",
  description:
    "Eye health check-up packages at Dr. Sailaja's Super Speciality Eye Hospital, Horamavu — routine screening, comprehensive diagnostics, diabetic retina care, and cataract evaluation.",
};

export default function HealthPackagesPage() {
  const packages = getHealthPackages();

  return (
    <>
      <Header />
      <main>
        <PackagesHero />
        <PackagesIntro />
        <PackagesGrid packages={packages} />
        <PackagesCTA />
      </main>
      <Footer />
    </>
  );
}

function PackagesHero() {
  return (
    <section className="relative w-full">
      <div className="relative h-[240px] w-full overflow-hidden sm:h-[320px] lg:h-[400px]">
        <Image
          src="/carousel/carousel-three.jpg"
          alt="Eye health check-up at Dr. Sailaja's Eye Hospital"
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
                Health Packages
              </h1>
              <p className="mt-2 text-lg text-white/80">
                Structured Eye Check-ups for Every Stage of Care
              </p>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}

function PackagesIntro() {
  return (
    <Section spacing="xl">
      <Container size="full" padding="lg">
        <div className="mx-auto max-w-3xl text-center">
          <Heading as="h2" size="h2" tone="brand">
            Know Your Eyes Before They Tell You
          </Heading>
          <Body className="mt-6">
            Most sight-threatening conditions — glaucoma, diabetic retinopathy,
            macular degeneration — cause no symptoms until damage is already
            done. Our check-up packages bundle the right tests for your age and
            risk profile, so problems are found while they are still treatable.
          </Body>
        </div>
      </Container>
    </Section>
  );
}

function PackagesGrid({ packages }: { packages: HealthPackageData[] }) {
  if (packages.length === 0) {
    return (
      <Section spacing="lg" tone="muted">
        <Container size="full" padding="lg">
          <Body className="text-center">
            Our packages are being updated. Please call us on{" "}
            <a href="tel:+918884471641" className="font-semibold text-brand">
              +91 88844 71641
            </a>{" "}
            and we will help you choose the right check-up.
          </Body>
        </Container>
      </Section>
    );
  }

  return (
    <Section spacing="lg" tone="muted">
      <Container size="full" padding="lg">
        <Heading as="h2" size="h2" className="text-center">
          Choose Your Package
        </Heading>
        <div className="mt-12 grid items-stretch gap-8 md:grid-cols-2 xl:grid-cols-3">
          {packages.map((pkg) => (
            <PackageCard key={pkg.slug} pkg={pkg} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function PackageCard({ pkg }: { pkg: HealthPackageData }) {
  return (
    <article
      className={`relative flex h-full flex-col rounded-card border bg-surface p-8 shadow-soft transition-shadow hover:shadow-soft-lg ${
        pkg.featured ? "border-brand" : "border-border"
      }`}
    >
      {pkg.featured ? (
        <span className="absolute -top-3 left-8 rounded-pill bg-brand px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
          Most Recommended
        </span>
      ) : null}

      <h3 className="text-lg font-semibold text-foreground">{pkg.title}</h3>
      {pkg.description ? (
        <Body size="sm" className="mt-2">
          {pkg.description}
        </Body>
      ) : null}

      <div className="mt-5 flex items-baseline gap-2">
        {pkg.price ? (
          <>
            <span className="text-3xl font-semibold text-brand">
              &#8377;{pkg.price}
            </span>
            {pkg.originalPrice ? (
              <span className="text-base text-subtle-foreground line-through">
                &#8377;{pkg.originalPrice}
              </span>
            ) : null}
          </>
        ) : (
          <span className="text-xl font-semibold text-brand">
            Price on request
          </span>
        )}
      </div>

      {pkg.duration || pkg.bestFor ? (
        <dl className="mt-5 flex flex-col gap-2 border-y border-border py-4 text-sm text-muted-foreground">
          {pkg.duration ? (
            <div className="flex items-center gap-2">
              <Clock className="size-4 shrink-0 text-brand" aria-hidden />
              <dt className="sr-only">Duration</dt>
              <dd>{pkg.duration}</dd>
            </div>
          ) : null}
          {pkg.bestFor ? (
            <div className="flex items-center gap-2">
              <Users className="size-4 shrink-0 text-brand" aria-hidden />
              <dt className="sr-only">Best for</dt>
              <dd>{pkg.bestFor}</dd>
            </div>
          ) : null}
        </dl>
      ) : null}

      {pkg.tests.length > 0 ? (
        <>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Includes
          </p>
          <ul className="mt-3 flex flex-col gap-2">
            {pkg.tests.map((test) => (
              <li key={test} className="flex items-start gap-2 text-sm text-foreground/80">
                <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                <span>{test}</span>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {/* mt-auto on the wrapper pins the CTA to the card foot, so buttons line
          up across cards with different numbers of tests. */}
      <div className="mt-auto pt-6">
        <a
          href="https://kivihealth.com/iam/sai.laja.15614/bookslot"
          className="inline-flex h-12 w-full items-center justify-center rounded-pill bg-brand px-6 text-sm font-semibold text-white shadow-brand transition-colors hover:bg-brand-dark"
        >
          Book This Package
        </a>
      </div>
    </article>
  );
}

function PackagesCTA() {
  return (
    <Section spacing="lg" tone="brand">
      <Container size="full" padding="lg">
        <div className="mx-auto max-w-2xl text-center">
          <Heading as="h2" size="h2" tone="inverse">
            Not Sure Which Package You Need?
          </Heading>
          <Body tone="inverse" className="mt-5">
            Call us and describe what you are experiencing. Our team will
            recommend the right check-up for your age, symptoms, and medical
            history — no guesswork required.
          </Body>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:+918884471641"
              className="inline-flex h-12 items-center rounded-pill bg-white px-8 text-sm font-semibold text-brand transition-colors hover:bg-white/90"
            >
              Call +91 88844 71641
            </a>
            <a
              href="https://kivihealth.com/iam/sai.laja.15614/bookslot"
              className="inline-flex h-12 items-center rounded-pill border border-white/40 px-8 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Book an Appointment
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
