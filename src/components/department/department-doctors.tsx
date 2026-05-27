import Image from "next/image";
import Link from "next/link";
import { Button, Card, Container, Heading, Section } from "@/components/ui";
import type { DoctorEntry } from "@/lib/content/types";

interface Props {
  doctors: DoctorEntry[];
}

export function DepartmentDoctors({ doctors }: Props) {
  return (
    <Section spacing="lg" tone="muted">
      <Container>
        <Heading as="h2" size="h2" tone="brand" className="mb-10">
          Our Doctors
        </Heading>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {doctors.map((doc) => (
            <Card key={doc.name} className="flex flex-col items-center px-6 py-8 text-center">
              <div className="relative mb-4 size-28 overflow-hidden rounded-full bg-surface-muted">
                <Image
                  src={doc.image}
                  alt={doc.name}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </div>
              <span className="text-base font-semibold text-foreground">
                {doc.name}
              </span>
              <span className="mt-1 text-sm text-muted-foreground">
                {doc.credentials}
              </span>
              <Link href={doc.appointmentUrl ?? "https://kivihealth.com/iam/sai.laja.15614/bookslot"} className="mt-4">
                <Button variant="outline" size="sm">
                  Book an Appointment
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
