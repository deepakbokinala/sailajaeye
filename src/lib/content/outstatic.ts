import { getDocuments, getDocumentBySlug } from "outstatic/server";

export interface TestimonialData {
  patient: string;
  title: string;
  blurb: string;
  image: string;
}

export function getTestimonials(): TestimonialData[] {
  const docs = getDocuments("testimonials", [
    "title", "slug", "content", "coverImage", "description",
    "patient", "procedure", "reviewDate",
  ]);
  return docs.map((d) => ({
    patient: (d as Record<string, string>).patient || d.title,
    title: d.description || "",
    blurb: d.content?.replace(/\n/g, " ").trim() || "",
    image: d.coverImage || "",
  }));
}

export interface BlogData {
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  href: string;
  date: string;
  featured: boolean;
}

export function getBlogs(): BlogData[] {
  const docs = getDocuments("blogs", [
    "title", "slug", "content", "coverImage", "description",
    "publishedAt", "featured",
  ]);
  return docs.map((d) => ({
    title: d.title,
    slug: d.slug,
    excerpt: d.description || d.content?.slice(0, 200) || "",
    image: d.coverImage || "",
    href: `/blog/${d.slug}`,
    date: formatDate(d.publishedAt),
    featured: Boolean((d as Record<string, unknown>).featured),
  }));
}

export interface ArticleData {
  title: string;
  slug: string;
  description: string;
  body: string;
  image: string;
  date: string;
}

/** Full article for a blog detail page. Returns null when absent. */
export function getArticle(
  collection: "blogs",
  slug: string
): ArticleData | null {
  const doc = getDocumentBySlug(collection, slug, [
    "title", "slug", "content", "coverImage", "description",
    "publishedAt",
  ]);
  if (!doc?.title) return null;
  return {
    title: doc.title,
    slug: doc.slug,
    description: doc.description || "",
    body: doc.content?.trim() || "",
    image: doc.coverImage || "",
    date: formatDate(doc.publishedAt),
  };
}

/** "23 December 2025", or the raw value when it isn't a parseable date. */
function formatDate(value: string | undefined): string {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export interface DoctorData {
  name: string;
  specialty: string;
  credentials: string;
  subtitle: string;
  image: string;
}

export function getDoctors(): DoctorData[] {
  const docs = getDocuments("doctors", [
    "title", "slug", "coverImage", "description",
    "specialty", "credentials", "subtitle",
  ]);
  return docs.map((d) => ({
    name: d.title,
    specialty: (d as Record<string, string>).specialty || d.description || "",
    credentials: (d as Record<string, string>).credentials || "",
    subtitle: (d as Record<string, string>).subtitle || "",
    image: d.coverImage || "",
  }));
}

/** Same roster as getDoctors, plus the markdown body for full profiles. */
export interface LeaderData extends DoctorData {
  slug: string;
  bio: string;
}

/**
 * Only doctors flagged `leadership` in the CMS. The Leadership page is a
 * deliberate subset of the roster, not everyone who consults here — toggle
 * "Show on the Leadership Team page" in /outstatic to change who appears.
 */
export function getLeadership(): LeaderData[] {
  const docs = getDocuments("doctors", [
    "title", "slug", "content", "coverImage", "description",
    "specialty", "credentials", "subtitle", "leadership",
  ]);
  return docs
    .filter((d) => Boolean((d as Record<string, unknown>).leadership))
    .map((d) => ({
      name: d.title,
      slug: d.slug,
      specialty: (d as Record<string, string>).specialty || d.description || "",
      credentials: (d as Record<string, string>).credentials || "",
      subtitle: (d as Record<string, string>).subtitle || "",
      image: d.coverImage || "",
      bio: d.content?.trim() || "",
    }))
    // Medical Director leads; otherwise keep a stable, name-based order.
    .sort((a, b) => {
      const rank = (l: LeaderData) =>
        /medical director/i.test(l.specialty) ? 0 : 1;
      return rank(a) - rank(b) || a.name.localeCompare(b.name);
    });
}

export interface HealthPackageData {
  title: string;
  slug: string;
  description: string;
  body: string;
  price: string;
  originalPrice: string;
  duration: string;
  bestFor: string;
  tests: string[];
  featured: boolean;
}

export function getHealthPackages(): HealthPackageData[] {
  const docs = getDocuments("health-packages", [
    "title", "slug", "content", "description",
    "price", "originalPrice", "duration", "bestFor", "tests", "featured",
  ]);
  return docs
    .map((d) => {
      const raw = d as Record<string, string>;
      return {
        title: d.title,
        slug: d.slug,
        description: d.description || "",
        body: d.content?.trim() || "",
        price: raw.price || "",
        originalPrice: raw.originalPrice || "",
        duration: raw.duration || "",
        bestFor: raw.bestFor || "",
        tests: parseList(raw.tests),
        featured: Boolean((d as Record<string, unknown>).featured),
      };
    })
    // Featured packages lead; the rest keep their document order.
    .sort((a, b) => Number(b.featured) - Number(a.featured));
}

/** Tests are authored as a JSON array string in the CMS. Never throw on bad input. */
function parseList(value: string | undefined): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === "string") : [];
  } catch {
    return [];
  }
}
