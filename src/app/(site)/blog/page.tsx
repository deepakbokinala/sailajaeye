import type { Metadata } from "next";
import { Header, Footer, PageHero } from "@/components/layout";
import { Body, Container, Heading, Section } from "@/components/ui";
import { ArticleCard } from "@/components/content/article";
import { getBlogs } from "@/lib/content/outstatic";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles and health guidance from the team at Dr. Sailaja's Super Speciality Eye Hospital, Horamavu, Bengaluru.",
};

export default function BlogPage() {
  const posts = getBlogs();

  return (
    <>
      <Header />
      <main>
        <PageHero
          title="Blog"
          subtitle="Guidance and Insight From Our Team"
          image="/carousel/carousel-five.jpg"
        />
        <Section spacing="lg">
          <Container size="full" padding="lg">
            {posts.length === 0 ? (
              <Body className="text-center">
                No articles have been published yet. Please check back soon.
              </Body>
            ) : (
              <>
                <div className="mx-auto max-w-3xl text-center">
                  <Heading as="h2" size="h2" tone="brand">
                    Latest Articles
                  </Heading>
                </div>
                <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                  {posts.map((post) => (
                    <ArticleCard key={post.slug} item={post} />
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
