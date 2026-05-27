import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import {
  Body,
  Button,
  Card,
  Container,
  Heading,
  Section,
} from "@/components/ui";
import { getNews, type NewsData } from "@/lib/content/outstatic";

export function NewsEvents() {
  const allNews = getNews();
  const featuredItems = allNews.filter((n) => n.featured);
  const highlight = featuredItems[0];
  const featured = featuredItems[1] || allNews.find((n) => !n.featured);
  const list = allNews.filter((n) => n !== highlight && n !== featured);

  if (!highlight && !featured) return null;

  return (
    <Section tone="muted" spacing="lg">
      <Container>
        <div className="flex flex-col items-center gap-3 text-center">
          <Heading as="h2" size="h2" tone="brand">
            News &amp; Events
          </Heading>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          {highlight ? (
            <Card interactive className="overflow-hidden lg:col-span-3">
              <Link href={highlight.href} className="flex h-full flex-col">
                <div className="relative aspect-square w-full overflow-hidden bg-brand/5">
                  <Image
                    src={highlight.image}
                    alt={highlight.title}
                    fill
                    sizes="(min-width: 1024px) 22rem, 90vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2 p-5">
                  <span className="text-base font-semibold text-foreground">
                    {highlight.title}
                  </span>
                  <Body size="sm">{highlight.excerpt}</Body>
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="size-3.5" />
                    {highlight.date}
                  </span>
                </div>
              </Link>
            </Card>
          ) : null}

          {featured ? (
            <Card interactive className="overflow-hidden lg:col-span-5">
              <Link href={featured.href} className="flex h-full flex-col">
                <div className="relative aspect-[5/3] w-full overflow-hidden">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    sizes="(min-width: 1024px) 38rem, 90vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <Heading as="h3" size="h5">
                    {featured.title}
                  </Heading>
                  <Body size="sm">{featured.excerpt}</Body>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-xs text-muted-foreground">
                    <Calendar className="size-3.5" />
                    {featured.date}
                  </span>
                </div>
              </Link>
            </Card>
          ) : null}

          {list.length > 0 ? (
            <div className="flex flex-col gap-4 lg:col-span-4">
              {list.map((item) => (
                <NewsListItem key={item.title} item={item} />
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

function NewsListItem({ item }: { item: NewsData }) {
  return (
    <Link
      href={item.href}
      className="group flex items-start gap-4 rounded-card border border-transparent bg-surface p-3 transition-all hover:border-border hover:shadow-soft"
    >
      <div className="relative size-20 shrink-0 overflow-hidden rounded-md bg-surface-muted">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="5rem"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1.5">
        <span className="line-clamp-2 text-sm font-semibold text-foreground transition-colors group-hover:text-brand">
          {item.title}
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="size-3" />
          {item.date}
        </span>
      </div>
    </Link>
  );
}
