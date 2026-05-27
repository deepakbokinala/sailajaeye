import { Body, Container, Heading, Section } from "@/components/ui";

export function Intro() {
  return (
    <Section spacing="md">
      <Container size="md">
        <div className="flex flex-col items-center gap-6 text-center">
          <Heading as="h2" size="h2">
            Dr. Sailaja&apos;s &mdash; Where Expertise Meets Trustworthy Eye Care
          </Heading>
          <Body className="max-w-3xl">
            Dr. Sailaja&apos;s Super Speciality Eye Hospital, located in
            Horamavu, Bangalore, is recognised as a leading eye care centre
            dedicated to providing high-quality, patient-centered care at an
            affordable cost. Our holistic approach ensures that we don&apos;t
            just treat ailments, we create a nurturing environment filled with
            compassion, warmth and care.
          </Body>
          <Body className="max-w-3xl">
            With experienced ophthalmologists and advanced eye care
            technology, we promise to deliver unmatched service backed by
            cutting-edge diagnostics and a committed team of doctors, nurses,
            and expert health professionals.
          </Body>
        </div>
      </Container>
    </Section>
  );
}
