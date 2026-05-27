import Link from "next/link";
import { Body, Button, Container, Section } from "@/components/ui";

interface Props {
  text: string;
  buttonLabel: string;
  buttonUrl: string;
}

export function DepartmentCta({ text, buttonLabel, buttonUrl }: Props) {
  return (
    <Section spacing="lg">
      <Container size="sm">
        <div className="flex flex-col items-center gap-6 text-center">
          <Body size="lg">{text}</Body>
          <Link href={buttonUrl}>
            <Button variant="primary" size="xl">
              {buttonLabel}
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
