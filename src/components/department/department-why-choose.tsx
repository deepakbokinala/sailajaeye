import { Body, Card, Container, Heading, Section } from "@/components/ui";
import type { FeatureCard } from "@/lib/content/types";

interface Props {
  heading: string;
  items: FeatureCard[];
}

export function DepartmentWhyChoose({ heading, items }: Props) {
  return (
    <Section spacing="lg" tone="muted">
      <Container>
        <Heading as="h2" size="h2" tone="brand" className="mb-10 text-center">
          {heading}
        </Heading>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((card) => (
            <Card key={card.title} className="px-6 py-6">
              <Heading as="h3" size="h5" className="mb-2">
                {card.title}
              </Heading>
              <Body size="sm">{card.description}</Body>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
