import { Quote } from "lucide-react";
import { Body, Card, Container, Heading, Section } from "@/components/ui";
import type { TestimonialEntry } from "@/lib/content/types";

interface Props {
  testimonials: TestimonialEntry[];
}

export function DepartmentTestimonials({ testimonials }: Props) {
  return (
    <Section spacing="lg">
      <Container>
        <Heading as="h2" size="h2" tone="brand" className="mb-10 text-center">
          Patient Testimonials
        </Heading>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.patientName} className="flex flex-col gap-4 px-6 py-6">
              <Quote className="size-6 text-brand/40" />
              <Body size="sm" className="flex-1 italic">
                &ldquo;{t.quote}&rdquo;
              </Body>
              <span className="text-sm font-semibold text-foreground">
                {t.patientName}
              </span>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
