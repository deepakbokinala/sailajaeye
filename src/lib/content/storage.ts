import { getDocuments, getDocumentBySlug } from "outstatic/server";
import type { DepartmentPageContent } from "./types";

function safeJsonParse<T>(raw: string | undefined, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function docToPage(doc: Record<string, unknown>, slug: string, collection: "surgeries" | "specialities"): DepartmentPageContent {
  return {
    slug,
    type: collection === "surgeries" ? "surgery" : "speciality",
    title: (doc.title as string) || slug,
    subtitle: (doc.subtitle as string) || "",
    description: (doc.content as string) || "",
    heroImage: (doc.coverImage as string) || undefined,
    doctors: safeJsonParse(doc.doctors as string, []),
    services: {
      heading: (doc.servicesHeading as string) || "",
      description: (doc.servicesDescription as string) || "",
      items: safeJsonParse(doc.services as string, []),
    },
    whyChooseUs: {
      heading: (doc.whyChooseUsHeading as string) || "",
      items: safeJsonParse(doc.whyChooseUs as string, []),
    },
    testimonials: safeJsonParse(doc.testimonials as string, []),
    cta: {
      text: (doc.ctaText as string) || "",
      buttonLabel: (doc.ctaButtonLabel as string) || "Book your appointment today!",
      buttonUrl: (doc.ctaButtonUrl as string) || "https://kivihealth.com/iam/sai.laja.15614/bookslot",
    },
    seo: {
      metaTitle: (doc.seoTitle as string) || undefined,
      metaDescription: (doc.seoDescription as string) || undefined,
    },
    updatedAt: (doc.publishedAt as string) || new Date().toISOString(),
  };
}

const FIELDS = [
  "title", "slug", "content", "coverImage", "publishedAt",
  "subtitle", "pageType", "services", "servicesHeading", "servicesDescription",
  "whyChooseUs", "whyChooseUsHeading", "doctors", "testimonials",
  "ctaText", "ctaButtonLabel", "ctaButtonUrl", "seoTitle", "seoDescription",
];

export interface ContentStorage {
  listSlugs(): Promise<string[]>;
  getPage(slug: string): Promise<DepartmentPageContent | null>;
  getAllPages(): Promise<DepartmentPageContent[]>;
}

class OutstaticStorage implements ContentStorage {
  async listSlugs(): Promise<string[]> {
    const surgeries = getDocuments("surgeries", ["slug"]);
    const specialities = getDocuments("specialities", ["slug"]);
    return [...surgeries, ...specialities].map((d) => d.slug);
  }

  async getPage(slug: string): Promise<DepartmentPageContent | null> {
    // Try surgeries first, then specialities
    let doc = getDocumentBySlug("surgeries", slug, FIELDS);
    if (doc && doc.title) {
      return docToPage(doc as Record<string, unknown>, slug, "surgeries");
    }
    doc = getDocumentBySlug("specialities", slug, FIELDS);
    if (doc && doc.title) {
      return docToPage(doc as Record<string, unknown>, slug, "specialities");
    }
    return null;
  }

  async getAllPages(): Promise<DepartmentPageContent[]> {
    const surgeries = getDocuments("surgeries", FIELDS);
    const specialities = getDocuments("specialities", FIELDS);

    return [
      ...surgeries.map((d) => docToPage(d as Record<string, unknown>, d.slug, "surgeries")),
      ...specialities.map((d) => docToPage(d as Record<string, unknown>, d.slug, "specialities")),
    ];
  }
}

export const storage: ContentStorage = new OutstaticStorage();
