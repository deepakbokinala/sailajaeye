import type { Metadata } from "next";
import { Clock, MapPin, Phone } from "lucide-react";
import { Header, Footer, PageHero } from "@/components/layout";
import { Body, Container, Heading, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Visit or call Dr. Sailaja's Super Speciality Eye Hospital — 33/1, Horamavu Main Rd, Chinnaswamappa Layout, Horamavu, Bengaluru 560113. Phone +91 88844 71641.",
};

const ADDRESS_LINES = [
  "33/1, Horamavu Main Rd,",
  "Above Post Office, Near Gandhi Statue,",
  "Chinnaswamappa Layout, Horamavu,",
  "Bengaluru, Karnataka 560113",
];

const MAP_QUERY = encodeURIComponent(
  "Dr Sailaja's Super Speciality Eye Hospital, Horamavu Main Road, Bengaluru 560113"
);

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          title="Contact Us"
          subtitle="We're Here to Help — Visit, Call, or Book Online"
        />

        <Section spacing="xl">
          <Container size="full" padding="lg">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
              <div>
                <Heading as="h2" size="h2" tone="brand">
                  Reach Us
                </Heading>
                <Body className="mt-5">
                  Walk in during clinic hours or call ahead to reserve a slot.
                  For surgical consultations we recommend booking in advance so
                  the right specialist is available.
                </Body>

                <dl className="mt-10 flex flex-col gap-8">
                  <div className="flex gap-4">
                    <MapPin className="mt-1 size-5 shrink-0 text-brand" aria-hidden />
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        Address
                      </dt>
                      <dd className="mt-2">
                        <address className="not-italic leading-relaxed text-foreground/80">
                          {ADDRESS_LINES.map((line) => (
                            <span key={line} className="block">
                              {line}
                            </span>
                          ))}
                        </address>
                      </dd>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Phone className="mt-1 size-5 shrink-0 text-brand" aria-hidden />
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        Phone
                      </dt>
                      <dd className="mt-2">
                        <a
                          href="tel:+918884471641"
                          className="text-lg font-semibold text-foreground transition-colors hover:text-brand"
                        >
                          +91 88844 71641
                        </a>
                      </dd>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Clock className="mt-1 size-5 shrink-0 text-brand" aria-hidden />
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        Clinic Hours
                      </dt>
                      <dd className="mt-2 leading-relaxed text-foreground/80">
                        Please call ahead to confirm current consultation
                        timings for your specialist.
                      </dd>
                    </div>
                  </div>
                </dl>

                <div className="mt-10 flex flex-wrap gap-4">
                  <a
                    href="https://kivihealth.com/iam/sai.laja.15614/bookslot"
                    className="inline-flex h-12 items-center rounded-pill bg-brand px-8 text-sm font-semibold text-white shadow-brand transition-colors hover:bg-brand-dark"
                  >
                    Book an Appointment
                  </a>
                  <a
                    href="tel:+918884471641"
                    className="inline-flex h-12 items-center rounded-pill border border-brand px-8 text-sm font-semibold text-brand transition-colors hover:bg-brand/5"
                  >
                    Call Now
                  </a>
                </div>
              </div>

              <div className="overflow-hidden rounded-card border border-border shadow-soft">
                <iframe
                  title="Map to Dr. Sailaja's Super Speciality Eye Hospital"
                  src={`https://maps.google.com/maps?q=${MAP_QUERY}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-[420px] w-full border-0 lg:h-full lg:min-h-[520px]"
                />
              </div>
            </div>
          </Container>
        </Section>

        <Section spacing="lg" tone="brand">
          <Container size="full" padding="lg">
            <div className="mx-auto max-w-2xl text-center">
              <Heading as="h2" size="h2" tone="inverse">
                In an Emergency
              </Heading>
              <Body tone="inverse" className="mt-5">
                Sudden vision loss, eye injury, severe pain, or flashes and
                floaters need urgent attention. Call us immediately rather than
                waiting for an appointment slot.
              </Body>
              <div className="mt-8">
                <a
                  href="tel:+918884471641"
                  className="inline-flex h-12 items-center rounded-pill bg-white px-8 text-sm font-semibold text-brand transition-colors hover:bg-white/90"
                >
                  Call +91 88844 71641
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
