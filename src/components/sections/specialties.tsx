import Link from "next/link";
import {
  Eye,
  Focus,
  ScanEye,
  Scissors,
  Users,
  Activity,
  type LucideIcon,
} from "lucide-react";
import {
  Body,
  Card,
  Container,
  Heading,
  Section,
} from "@/components/ui";

interface Specialty {
  label: string;
  href: string;
  icon: LucideIcon;
}

const SPECIALTIES: Specialty[] = [
  { label: "Cataract Surgery", href: "/surgeries/cataract-surgery", icon: Eye },
  { label: "LASIK", href: "/surgeries/lasik", icon: Focus },
  { label: "Retina Clinic", href: "/specialities/retina-clinic", icon: ScanEye },
  { label: "Oculoplasty", href: "/surgeries/oculoplasty", icon: Scissors },
  { label: "Squint Evaluation", href: "/specialities/squint-evaluation", icon: Users },
  { label: "Diagnostics", href: "/specialities/a-scan-biometry", icon: Activity },
];

export function Specialties() {
  return (
    <Section tone="muted">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
          <Heading as="h2" size="h2" tone="brand">
            Dr. Sailaja&apos;s Eye Care Services
          </Heading>
          <Body>
            Our hospital combines cutting-edge ophthalmic technology with
            experienced eye surgeons to deliver expert care &mdash; from
            routine eye exams to advanced surgical procedures.
          </Body>
          <Body className="max-w-2xl">
            Our comprehensive range of eye care services ensures personalised
            treatment for every patient. From precision cataract surgery to
            advanced retinal diagnostics, we are committed to restoring and
            preserving your vision.
          </Body>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SPECIALTIES.map(({ label, href, icon: Icon }) => (
            <Card key={label} interactive className="px-6 py-6">
              <Link
                href={href}
                className="flex items-center gap-4 focus:outline-none"
              >
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-pill bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                  <Icon className="size-5" />
                </span>
                <span className="text-base font-medium text-foreground">
                  {label}
                </span>
              </Link>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
