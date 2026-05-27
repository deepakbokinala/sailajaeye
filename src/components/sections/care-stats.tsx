import { Body, Heading, Section } from "@/components/ui";

interface Stat {
  value: string;
  label: string;
}

const STATS: Stat[] = [
  { value: "01", label: "Hospital" },
  { value: "04", label: "Clinics" },
  { value: "05", label: "Pharmacies" },
  { value: "130+", label: "Doctors" },
  { value: "1300+", label: "Employees" },
  { value: "300", label: "Beds" },
  { value: "70", label: "ICU" },
  { value: "07", label: "Operation Theatre" },
  { value: "40", label: "Bedded ER" },
  { value: "65,000", label: "sqft, OPD Block" },
];

export function CareStats() {
  return (
    <Section spacing="none" className="overflow-hidden">
      <div className="grid items-stretch lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        {/* Left: full illustration (circle + arc + pillar labels) */}
        <div className="flex items-center justify-end py-14 pl-4 sm:py-20 sm:pl-8 lg:py-24">
          <img
            src="/bringing-home-care.svg"
            alt="Dr. Sailaja's Eye Hospital — doctors lead, patient centric practices, world class infrastructure, leading specialists"
            className="h-auto w-full max-w-xl"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Right: full-bleed maroon panel with copy + stats grid */}
        <div className="relative overflow-hidden bg-brand text-white">
          <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-white/10 blur-3xl" />
          <div className="relative mx-auto flex h-full max-w-2xl flex-col justify-center px-6 py-14 sm:px-10 sm:py-20 lg:px-14 lg:py-24 xl:px-16">
            <Heading as="h2" size="h2" tone="inverse">
              Bringing Care Into Healthcare
            </Heading>

            <Body tone="inverse" className="mt-5">
              Dr. Sailaja&apos;s Super Speciality Eye Hospital in Horamavu is a
              leading eye care provider, offering comprehensive ophthalmic
              services including cataract surgery, glaucoma management, retina
              care, and refractive procedures. Our facility features advanced
              diagnostic equipment, modern operation theatres, and a dedicated
              team of specialists.
            </Body>

            <Body tone="inverse" className="mt-4">
              With a track record of thousands of successful eye surgeries, our
              hospital is committed to restoring and preserving vision using
              cutting-edge technology and exceptional care. Dr. Sailaja&apos;s
              is a trusted name in eye care across East Bangalore.
            </Body>

            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <dt className="text-3xl font-bold leading-none sm:text-4xl">
                    {stat.value}
                  </dt>
                  <dd className="text-sm font-normal leading-snug text-white/85">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </Section>
  );
}
