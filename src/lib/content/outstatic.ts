import { getDocuments } from "outstatic/server";

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
  excerpt: string;
  image: string;
  href: string;
  featured: boolean;
}

export function getBlogs(): BlogData[] {
  const docs = getDocuments("blogs", [
    "title", "slug", "content", "coverImage", "description", "featured",
  ]);
  return docs.map((d) => ({
    title: d.title,
    excerpt: d.description || d.content?.slice(0, 200) || "",
    image: d.coverImage || "",
    href: `/blogs/${d.slug}`,
    featured: Boolean((d as Record<string, unknown>).featured),
  }));
}

export interface NewsData {
  title: string;
  date: string;
  image: string;
  href: string;
  excerpt: string;
  featured: boolean;
}

export function getNews(): NewsData[] {
  const docs = getDocuments("news", [
    "title", "slug", "content", "coverImage", "description",
    "publishedAt", "featured", "eventDate",
  ]);
  return docs.map((d) => {
    const eventDate = (d as Record<string, string>).eventDate || d.publishedAt || "";
    const dateObj = new Date(eventDate);
    const formatted = isNaN(dateObj.getTime())
      ? eventDate
      : dateObj.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    return {
      title: d.title,
      date: formatted,
      image: d.coverImage || "",
      href: `/news/${d.slug}`,
      excerpt: d.description || d.content?.slice(0, 200) || "",
      featured: Boolean((d as Record<string, unknown>).featured),
    };
  });
}

export interface DoctorData {
  name: string;
  specialty: string;
  image: string;
}

export function getDoctors(): DoctorData[] {
  const docs = getDocuments("doctors", [
    "title", "slug", "coverImage", "description", "specialty",
  ]);
  return docs.map((d) => ({
    name: d.title,
    specialty: (d as Record<string, string>).specialty || d.description || "",
    image: d.coverImage || "",
  }));
}
