import { Body, Container, Heading, Section } from "@/components/ui";
import type { ServiceEntry } from "@/lib/content/types";

interface Props {
  heading: string;
  description: string;
  items: ServiceEntry[];
}

export function DepartmentServices({ heading, description, items }: Props) {
  return (
    <Section spacing="lg">
      <Container>
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <Heading as="h2" size="h2">
            {heading}
          </Heading>
          <Body className="mt-4">{description}</Body>
        </div>
        <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
          {items.map((item) => (
            <div key={item.title} className="flex flex-col gap-2">
              <Heading as="h3" size="h4">
                {item.title}
              </Heading>
              <Body size="sm">{item.description}</Body>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
