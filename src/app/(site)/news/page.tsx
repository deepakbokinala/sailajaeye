import type { Metadata } from "next";
import { Header, Footer, PageHero } from "@/components/layout";
import { Body, Container, Heading, Section } from "@/components/ui";
import { ArticleCard } from "@/components/content/article";
import { getNews } from "@/lib/content/outstatic";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "News & Events",
  description:
    "News, events, and announcements from Dr. Sailaja's Super Speciality Eye Hospital, Horamavu, Bengaluru.",
};

export default function NewsPage() {
  const items = getNews();

  return (
    <>
      <Header />
      <main>
        <PageHero
          title="News &amp; Events"
          subtitle="What's Happening at Dr. Sailaja's"
          image="/carousel/carousel-four.jpg"
        />
        <Section spacing="lg">
          <Container size="full" padding="lg">
            {items.length === 0 ? (
              <Body className="text-center">
                There are no updates to share right now. Please check back soon.
              </Body>
            ) : (
              <>
                <div className="mx-auto max-w-3xl text-center">
                  <Heading as="h2" size="h2" tone="brand">
                    Latest Updates
                  </Heading>
                </div>
                <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                  {items.map((item) => (
                    <ArticleCard key={item.slug} item={item} />
                  ))}
                </div>
              </>
            )}
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
