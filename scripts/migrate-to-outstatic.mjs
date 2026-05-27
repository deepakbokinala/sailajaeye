#!/usr/bin/env node
/**
 * One-shot migration: converts all hardcoded/JSON content into
 * Outstatic-compatible markdown files with YAML frontmatter.
 */
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("outstatic/content");

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function writeMd(collection, slug, frontmatter, body = "") {
  const dir = path.join(OUT, collection);
  fs.mkdirSync(dir, { recursive: true });
  const fm = Object.entries(frontmatter)
    .map(([k, v]) => {
      if (typeof v === "string") return `${k}: '${v.replace(/'/g, "''")}'`;
      return `${k}: ${JSON.stringify(v)}`;
    })
    .join("\n");
  const content = `---\n${fm}\n---\n\n${body}\n`;
  fs.writeFileSync(path.join(dir, `${slug}.md`), content, "utf-8");
}

// ─── 1. Department pages (surgeries + specialities) ─────────────────────────
const pagesDir = path.resolve("content/pages");
for (const file of fs.readdirSync(pagesDir).filter((f) => f.endsWith(".json"))) {
  const raw = JSON.parse(fs.readFileSync(path.join(pagesDir, file), "utf-8"));
  const collection = raw.type === "surgery" ? "surgeries" : "specialities";
  const frontmatter = {
    title: raw.title,
    status: "published",
    description: raw.subtitle || "",
    publishedAt: raw.updatedAt || new Date().toISOString(),
    coverImage: raw.heroImage || "",
    subtitle: raw.subtitle || "",
    pageType: raw.type,
    servicesHeading: raw.services?.heading || "",
    servicesDescription: raw.services?.description || "",
    services: JSON.stringify(raw.services?.items || []),
    whyChooseUsHeading: raw.whyChooseUs?.heading || "",
    whyChooseUs: JSON.stringify(raw.whyChooseUs?.items || []),
    doctors: JSON.stringify(raw.doctors || []),
    testimonials: JSON.stringify(raw.testimonials || []),
    ctaText: raw.cta?.text || "",
    ctaButtonLabel: raw.cta?.buttonLabel || "",
    ctaButtonUrl: raw.cta?.buttonUrl || "",
    seoTitle: raw.seo?.metaTitle || "",
    seoDescription: raw.seo?.metaDescription || "",
  };
  writeMd(collection, raw.slug, frontmatter, raw.description || "");
}

// ─── 2. Testimonials ────────────────────────────────────────────────────────
const testimonials = [
  {
    patient: "Rohini Kothandapani",
    procedure: "Cataract Surgery",
    date: "April 2025",
    blurb: "The professionalism, kindness, and attention to detail shown by the entire team were truly outstanding. Special thanks to Lalitha Mam for her incredible assistance with insurance and post-operative guidance.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80",
  },
  {
    patient: "Avijit Ghatak",
    procedure: "Cataract Surgery",
    date: "April 2025",
    blurb: "My father had a cataract operation here. The entire team along with Dr. Sailaja is cordial, approachable and kind. They managed my father's anxiety and hypertension with exceptional care throughout the procedure.",
    image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=900&q=80",
  },
  {
    patient: "Prasanth Kumar",
    procedure: "Cataract Surgery",
    date: "April 2025",
    blurb: "My mother underwent cataract surgery two weeks ago. Both doctors, sisters and staff are very kind and responsive. They explained every detail thoroughly and provided clear medication guidance for post-op care.",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=900&q=80",
  },
  {
    patient: "Sandhya Singh",
    procedure: "Cataract Surgery",
    date: "April 2025",
    blurb: "My mother's cataract surgery went very smoothly without any overhead for us. The whole process from consultation to mediclaim payment processing was seamless. Highly recommend Dr. Sailaja's hospital.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80",
  },
  {
    patient: "Praveen Gopinathan",
    procedure: "Eye Treatment",
    date: "January 2025",
    blurb: "Doctor is incredibly kind, knowledgeable, and approachable. The entire staff demonstrated professionalism, kindness, and unwavering support throughout my mother's treatment. Truly grateful for the care we received.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80",
  },
  {
    patient: "Nimisha Jutur",
    procedure: "Regular Checkup",
    date: "April 2025",
    blurb: "My mother had cataract surgery here and my son receives regular checkups. The doctor is very kind and sweet. The staff at the hospital are very good and professional. We trust them completely with our family's eye care.",
    image: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?auto=format&fit=crop&w=900&q=80",
  },
  {
    patient: "Uma Uma",
    procedure: "Retina Checkup",
    date: "April 2025",
    blurb: "Our family has been visiting this hospital annually. The doctor is excellent, and the staff is very helpful. They proactively remind us about retina checkups. You won't find this level of personal care anywhere else.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=900&q=80",
  },
  {
    patient: "Preeti Anup",
    procedure: "Cataract Surgery",
    date: "April 2025",
    blurb: "My mother-in-law's cataract surgery was handled with great professionalism and warmth by Ms Lalitha and her team. Everything from admission to discharge was well-coordinated and stress-free.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=80",
  },
];

testimonials.forEach((t) => {
  const slug = slugify(t.patient);
  writeMd("testimonials", slug, {
    title: t.patient,
    status: "published",
    description: `${t.procedure} · ${t.date}`,
    publishedAt: new Date("2025-04-01").toISOString(),
    coverImage: t.image,
    patient: t.patient,
    procedure: t.procedure,
    reviewDate: t.date,
  }, t.blurb);
});

// ─── 3. Blog posts ──────────────────────────────────────────────────────────
const blogs = [
  {
    slug: "pulmonology",
    title: "Best Pulmonology Hospital in Bangalore for TB, Asthma and Chronic Cough",
    excerpt: "Breathing is something most of us take for granted, until something interrupts it. A persistent cough that does not go away, breathlessness during simple activities, recurrent chest tightness…",
    image: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    slug: "ent",
    title: "Best ENT Hospital in Bangalore for Ear, Nose and Throat Problems",
    excerpt: "ENT problems can affect breathing, hearing, sleep, and daily comfort. The best ENT hospital in Bangalore offers expert diagnosis, advanced treatment, and a multidisciplinary approach.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=900&q=80",
    featured: false,
  },
  {
    slug: "dialysis-care",
    title: "How to Choose the Best Dialysis Care in Bangalore for Kidney Patients",
    excerpt: "",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=240&q=80",
    featured: false,
  },
  {
    slug: "spine-surgery",
    title: "Back Pain After Lifting | Best Spine Surgery Hospital in Bangalore",
    excerpt: "",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=240&q=80",
    featured: false,
  },
];

blogs.forEach((b) => {
  writeMd("blogs", b.slug, {
    title: b.title,
    status: "published",
    description: b.excerpt,
    publishedAt: new Date("2025-05-01").toISOString(),
    coverImage: b.image,
    featured: b.featured,
  }, b.excerpt || b.title);
});

// ─── 4. News & Events ───────────────────────────────────────────────────────
const news = [
  {
    slug: "robotic-knee-replacement-teen",
    title: "17-yr-old boy undergoes robotic knee replacement surgery in the city",
    date: "2025-02-18",
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=1200&q=80",
    excerpt: "17-yr-old boy undergoes robotic knee replacement surgery in the city, putting the spotlight on Bangalore's growing edge in surgical innovation.",
    featured: true,
  },
  {
    slug: "womens-day-2025",
    title: "Women's Day Celebration",
    date: "2025-03-27",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=900&q=80",
    excerpt: "Celebrating Her Strength, Today and Always",
    featured: true,
  },
  {
    slug: "eye-care-costs-bangalore",
    title: "Simple Isn't Simple! Bangaloreans Shelling Out Up To ₹1,00,000 To...",
    date: "2025-12-27",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=240&q=80",
    excerpt: "",
    featured: false,
  },
  {
    slug: "conjunctivitis-pollution",
    title: "Pollution, Weather Change Driving Conjunctivitis Cases In...",
    date: "2025-12-23",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=240&q=80",
    excerpt: "",
    featured: false,
  },
  {
    slug: "psoriasis-winter",
    title: "Winter dryness triggers rise in psoriasis cases in Bengaluru",
    date: "2025-12-22",
    image: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=240&q=80",
    excerpt: "",
    featured: false,
  },
  {
    slug: "gummy-vitamins-risk",
    title: "Sweet but risky: The gummy vitamin boom",
    date: "2025-12-15",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=240&q=80",
    excerpt: "",
    featured: false,
  },
];

news.forEach((n) => {
  writeMd("news", n.slug, {
    title: n.title,
    status: "published",
    description: n.excerpt,
    publishedAt: new Date(n.date).toISOString(),
    coverImage: n.image,
    featured: n.featured,
    eventDate: n.date,
  }, n.excerpt || n.title);
});

// ─── 5. Doctors ─────────────────────────────────────────────────────────────
const doctors = [
  {
    name: "Dr. D Bharghavi",
    specialty: "Dietician",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Dr. Abhinay I",
    specialty: "Surgical Oncology",
    image: "/doctor.png",
  },
  {
    name: "Dr. Meera Rao",
    specialty: "Cardiology",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Dr. Vivek Sharma",
    specialty: "Orthopedics",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Dr. Priya Nair",
    specialty: "Neurology",
    image: "https://images.unsplash.com/photo-1638202993928-7267aad84c31?auto=format&fit=crop&w=600&q=80",
  },
];

doctors.forEach((d) => {
  const slug = slugify(d.name);
  writeMd("doctors", slug, {
    title: d.name,
    status: "published",
    description: d.specialty,
    publishedAt: new Date().toISOString(),
    coverImage: d.image,
    specialty: d.specialty,
  }, "");
});

// ─── 6. Generate metadata.json ──────────────────────────────────────────────
const metadata = { commit: "", generated: new Date().toISOString(), metadata: [] };
const collections = [];

for (const collection of ["surgeries", "specialities", "testimonials", "blogs", "news", "doctors"]) {
  const dir = path.join(OUT, collection);
  if (!fs.existsSync(dir)) continue;
  collections.push({ title: collection.charAt(0).toUpperCase() + collection.slice(1), slug: collection, path: `outstatic/content/${collection}`, children: [] });

  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".md"))) {
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const fmMatch = raw.match(/^---\n([\s\S]*?)\n---/);
    if (!fmMatch) continue;
    const slug = file.replace(/\.md$/, "");
    const fmLines = fmMatch[1].split("\n");
    const fm = {};
    for (const line of fmLines) {
      const m = line.match(/^(\w+):\s*'?(.*?)'?\s*$/);
      if (m) fm[m[1]] = m[2];
    }
    metadata.metadata.push({
      __outstatic: { slug, collection, path: `outstatic/content/${collection}/${file}` },
      title: fm.title || slug,
      status: fm.status || "published",
      description: fm.description || "",
      publishedAt: fm.publishedAt || new Date().toISOString(),
      coverImage: fm.coverImage || "",
    });
  }
}

fs.writeFileSync(path.join(OUT, "metadata.json"), JSON.stringify(metadata, null, 2), "utf-8");
fs.writeFileSync(path.join(OUT, "collections.json"), JSON.stringify(collections, null, 2), "utf-8");

// ─── 7. Generate schema.json for each collection ────────────────────────────
const schemas = {
  surgeries: {
    title: "surgeries", type: "object",
    properties: {
      subtitle: { fieldType: "String", dataType: "string", title: "Subtitle" },
      pageType: { fieldType: "String", dataType: "string", title: "Page Type" },
      services: { fieldType: "Text", dataType: "string", title: "Services JSON" },
      servicesHeading: { fieldType: "String", dataType: "string", title: "Services Heading" },
      servicesDescription: { fieldType: "Text", dataType: "string", title: "Services Description" },
      whyChooseUs: { fieldType: "Text", dataType: "string", title: "Why Choose Us JSON" },
      whyChooseUsHeading: { fieldType: "String", dataType: "string", title: "Why Choose Us Heading" },
      doctors: { fieldType: "Text", dataType: "string", title: "Doctors JSON" },
      testimonials: { fieldType: "Text", dataType: "string", title: "Testimonials JSON" },
      ctaText: { fieldType: "Text", dataType: "string", title: "CTA Text" },
      ctaButtonLabel: { fieldType: "String", dataType: "string", title: "CTA Button Label" },
      ctaButtonUrl: { fieldType: "String", dataType: "string", title: "CTA Button URL" },
      seoTitle: { fieldType: "String", dataType: "string", title: "SEO Title" },
      seoDescription: { fieldType: "Text", dataType: "string", title: "SEO Description" },
    },
  },
  specialities: {
    title: "specialities", type: "object",
    properties: {
      subtitle: { fieldType: "String", dataType: "string", title: "Subtitle" },
      pageType: { fieldType: "String", dataType: "string", title: "Page Type" },
      services: { fieldType: "Text", dataType: "string", title: "Services JSON" },
      servicesHeading: { fieldType: "String", dataType: "string", title: "Services Heading" },
      servicesDescription: { fieldType: "Text", dataType: "string", title: "Services Description" },
      whyChooseUs: { fieldType: "Text", dataType: "string", title: "Why Choose Us JSON" },
      whyChooseUsHeading: { fieldType: "String", dataType: "string", title: "Why Choose Us Heading" },
      doctors: { fieldType: "Text", dataType: "string", title: "Doctors JSON" },
      testimonials: { fieldType: "Text", dataType: "string", title: "Testimonials JSON" },
      ctaText: { fieldType: "Text", dataType: "string", title: "CTA Text" },
      ctaButtonLabel: { fieldType: "String", dataType: "string", title: "CTA Button Label" },
      ctaButtonUrl: { fieldType: "String", dataType: "string", title: "CTA Button URL" },
      seoTitle: { fieldType: "String", dataType: "string", title: "SEO Title" },
      seoDescription: { fieldType: "Text", dataType: "string", title: "SEO Description" },
    },
  },
  testimonials: {
    title: "testimonials", type: "object",
    properties: {
      patient: { fieldType: "String", dataType: "string", title: "Patient Name" },
      procedure: { fieldType: "String", dataType: "string", title: "Procedure" },
      reviewDate: { fieldType: "String", dataType: "string", title: "Review Date" },
    },
  },
  blogs: {
    title: "blogs", type: "object",
    properties: {
      featured: { fieldType: "Boolean", dataType: "boolean", title: "Featured" },
    },
  },
  news: {
    title: "news", type: "object",
    properties: {
      featured: { fieldType: "Boolean", dataType: "boolean", title: "Featured" },
      eventDate: { fieldType: "String", dataType: "string", title: "Event Date" },
    },
  },
  doctors: {
    title: "doctors", type: "object",
    properties: {
      specialty: { fieldType: "String", dataType: "string", title: "Specialty" },
    },
  },
};

for (const [col, schema] of Object.entries(schemas)) {
  const dir = path.join(OUT, col);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "schema.json"), JSON.stringify(schema, null, 2), "utf-8");
}

console.log("✓ Migration complete");
console.log(`  Collections: ${collections.map(c => c.slug).join(", ")}`);
console.log(`  Total documents: ${metadata.metadata.length}`);
