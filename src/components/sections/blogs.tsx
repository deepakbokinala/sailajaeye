import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Body,
  Button,
  Card,
  Container,
  Heading,
  Section,
} from "@/components/ui";
import { getBlogs, type BlogData } from "@/lib/content/outstatic";

export function Blogs() {
  const allBlogs = getBlogs();
  const featured = allBlogs.find((b) => b.featured) || allBlogs[0];
  const rest = allBlogs.filter((b) => b !== featured);
  const secondary = rest[0];
  const list = rest.slice(1);

  if (!featured) return null;

  return (
    <Section spacing="lg">
      <Container>
        <div className="flex flex-col items-center gap-3 text-center">
          <Heading as="h2" size="h2" tone="brand">
            Blogs
          </Heading>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <Card interactive className="overflow-hidden lg:col-span-5">
            <Link href={featured.href} className="flex h-full flex-col">
              <div className="relative aspect-[5/3] w-full overflow-hidden bg-brand/5">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(min-width: 1024px) 38rem, 90vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-brand/40 via-transparent to-transparent" />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <Heading as="h3" size="h5">
                  {featured.title}
                </Heading>
                <Body size="sm">{featured.excerpt}</Body>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-brand">
                  Read More <ArrowRight className="size-3.5" />
                </span>
              </div>
            </Link>
          </Card>

          {secondary ? (
            <Card interactive className="overflow-hidden lg:col-span-3">
              <Link href={secondary.href} className="flex h-full flex-col">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={secondary.image}
                    alt={secondary.title}
                    fill
                    sizes="(min-width: 1024px) 22rem, 90vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <Heading as="h4" size="h5">
                    {secondary.title}
                  </Heading>
                  <Body size="sm" className="line-clamp-3">
                    {secondary.excerpt}
                  </Body>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-brand">
                    Read More <ArrowRight className="size-3.5" />
                  </span>
                </div>
              </Link>
            </Card>
          ) : null}

          {list.length > 0 ? (
            <div className="flex flex-col gap-4 lg:col-span-4">
              {list.map((post) => (
                <BlogListItem key={post.title} post={post} />
              ))}
            </div>
          ) : null}
        </div>

        <div className="mt-10 flex justify-center">
          <Button rightIcon={<ArrowRight />}>View All</Button>
        </div>
      </Container>
    </Section>
  );
}

function BlogListItem({ post }: { post: BlogData }) {
  return (
    <Link
      href={post.href}
      className="group flex items-start gap-4 rounded-card border border-transparent bg-surface p-3 transition-all hover:border-border hover:shadow-soft"
    >
      <div className="relative size-20 shrink-0 overflow-hidden rounded-md bg-surface-muted">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="5rem"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <span className="line-clamp-2 text-sm font-semibold text-foreground transition-colors group-hover:text-brand">
          {post.title}
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-brand">
          Read More <ArrowRight className="size-3" />
        </span>
      </div>
    </Link>
  );
}
