import Image from "next/image";
import Link from "next/link";
import { Body } from "@/components/ui";

export interface ArticleCardItem {
  title: string;
  href: string;
  excerpt: string;
  image: string;
  date: string;
}

export function ArticleCard({ item }: { item: ArticleCardItem }) {
  return (
    <Link
      href={item.href}
      className="group flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface shadow-soft transition-all hover:-translate-y-0.5 hover:border-border-strong hover:shadow-soft-lg"
    >
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-brand/10">
        {item.image ? (
          <Image
            src={item.image}
            alt=""
            fill
            sizes="(min-width: 1280px) 25rem, (min-width: 768px) 45vw, 90vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-6">
        {item.date ? (
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
            {item.date}
          </span>
        ) : null}
        <h3 className="mt-2 text-base font-semibold leading-snug text-foreground">
          {item.title}
        </h3>
        {item.excerpt ? (
          <Body size="sm" className="mt-3 line-clamp-3">
            {item.excerpt}
          </Body>
        ) : null}
      </div>
    </Link>
  );
}

/**
 * Article bodies are authored as plain prose in Outstatic (no markdown syntax
 * in practice), so we split on blank lines rather than pulling in a renderer.
 */
export function ArticleBody({ body }: { body: string }) {
  const paragraphs = body.split(/\n{2,}/).filter((p) => p.trim().length > 0);
  if (paragraphs.length === 0) return null;

  return (
    <div className="flex flex-col gap-5">
      {paragraphs.map((para, i) => (
        <Body key={i} size="lg">
          {para.replace(/\n/g, " ").trim()}
        </Body>
      ))}
    </div>
  );
}
