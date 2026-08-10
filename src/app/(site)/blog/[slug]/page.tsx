import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { Container, Heading, Section } from "@/components/ui";
import { ArticleBody } from "@/components/content/article";
import { getArticle, getBlogs } from "@/lib/content/outstatic";

export const revalidate = 60;
export const dynamicParams = true;

export function generateStaticParams() {
  return getBlogs().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getArticle("blogs", slug);
  if (!post) return {};
  return { title: post.title, description: post.description };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getArticle("blogs", slug);
  if (!post) notFound();

  return (
    <>
      <Header />
      <main>
        <Section spacing="lg">
          <Container size="md" padding="lg">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-brand-dark"
            >
              <ArrowLeft className="size-4" />
              All articles
            </Link>

            <article className="mt-8">
              {post.date ? (
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                  {post.date}
                </p>
              ) : null}
              <Heading as="h1" size="h1" className="mt-3">
                {post.title}
              </Heading>

              {post.image ? (
                <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-card bg-brand/10">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    priority
                    sizes="(min-width: 1024px) 64rem, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : null}

              <div className="mt-10">
                <ArticleBody body={post.body} />
              </div>
            </article>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
