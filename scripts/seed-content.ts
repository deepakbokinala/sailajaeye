import fs from "node:fs/promises";
import path from "node:path";

interface MegaMenuItem {
  label: string;
  href: string;
}

interface MegaMenuGroup {
  category: string;
  items: MegaMenuItem[];
}

interface DepartmentPageContent {
  slug: string;
  type: "surgery" | "speciality";
  title: string;
  subtitle: string;
  description: string;
  doctors: never[];
  services: {
    heading: string;
    description: string;
    items: { title: string; description: string }[];
  };
  whyChooseUs: {
    heading: string;
    items: { title: string; description: string }[];
  };
  testimonials: never[];
  cta: {
    text: string;
    buttonLabel: string;
    buttonUrl: string;
  };
  updatedAt: string;
}

// Inline the nav data to avoid path alias issues with tsx
function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function surgeryItem(label: string): MegaMenuItem {
  return { label, href: `/surgeries/${slugify(label)}` };
}

function specialityItem(label: string): MegaMenuItem {
  return { label, href: `/specialities/${slugify(label)}` };
}

const SURGERY_GROUPS: MegaMenuGroup[] = [
  {
    category: "Cataract",
    items: [
      surgeryItem("Cataract Surgery"),
      surgeryItem("Micro Incision Cataract Surgery (MICS)"),
      surgeryItem("Phaco Emulsification Cataract Surgery"),
      surgeryItem("AMO Phaco Emulsification (White Star with ICE)"),
    ],
  },
  { category: "Refractive", items: [surgeryItem("LASIK")] },
  {
    category: "Oculoplasty",
    items: [surgeryItem("Oculoplasty"), surgeryItem("Eyelid Surgery")],
  },
  { category: "General", items: [surgeryItem("Eye Surgery")] },
];

const SPECIALITY_GROUPS: MegaMenuGroup[] = [
  { category: "Retina", items: [specialityItem("Retina Clinic")] },
  { category: "Contact Lens", items: [specialityItem("Contact Lenses")] },
  { category: "Squint", items: [specialityItem("Squint Evaluation")] },
  {
    category: "Laser Treatments",
    items: [specialityItem("YAG Laser"), specialityItem("Lasers")],
  },
  {
    category: "Diagnostics",
    items: [
      specialityItem("A-Scan Biometry"),
      specialityItem("Tonometry"),
      specialityItem("Non-Mydriatic Fundus Camera (DRS)"),
      specialityItem("Computerized Visual Field Analyzer"),
      specialityItem("Computerized Eye Testing"),
    ],
  },
];

const DEFAULT_WHY_CHOOSE = [
  {
    title: "Experienced Specialists",
    description:
      "Our ophthalmologists bring years of experience and advanced training to deliver the highest standard of eye care.",
  },
  {
    title: "Advanced Technology",
    description:
      "We use the latest ophthalmic equipment and techniques for accurate diagnosis and effective treatment.",
  },
  {
    title: "Patient-Centric Care",
    description:
      "Every treatment plan is personalised to your unique needs, ensuring comfort and the best possible outcomes.",
  },
  {
    title: "Affordable Excellence",
    description:
      "World-class eye care at accessible prices, with transparent billing and no hidden costs.",
  },
  {
    title: "Comprehensive Follow-Up",
    description:
      "Post-procedure care and regular follow-ups to monitor recovery and ensure lasting results.",
  },
];

function makePage(
  item: MegaMenuItem,
  type: "surgery" | "speciality",
  category: string,
): DepartmentPageContent {
  const slug = item.href.split("/").pop()!;
  return {
    slug,
    type,
    title: item.label,
    subtitle:
      type === "surgery"
        ? `Expert ${item.label} at Dr. Sailaja's Eye Hospital`
        : `${item.label} — Specialised Eye Care Services`,
    description: `Dr. Sailaja's Super Speciality Eye Hospital offers comprehensive ${item.label.toLowerCase()} services with state-of-the-art technology and experienced ophthalmologists. Our ${category.toLowerCase()} department is committed to delivering the best possible outcomes for every patient.`,
    doctors: [],
    services: {
      heading: `${item.label} — Services & Procedures`,
      description: `Our ${item.label.toLowerCase()} services encompass a range of advanced diagnostic and treatment options tailored to each patient's needs.`,
      items: [
        {
          title: `${item.label} Consultation`,
          description: `Comprehensive consultation and evaluation by our expert ${category.toLowerCase()} specialists to determine the best course of treatment for your condition.`,
        },
        {
          title: "Pre-Procedure Assessment",
          description:
            "Thorough pre-operative assessment including detailed eye examination, biometry, and health screening to ensure safe and successful outcomes.",
        },
      ],
    },
    whyChooseUs: {
      heading: `Why Choose Dr. Sailaja's for ${item.label}?`,
      items: DEFAULT_WHY_CHOOSE,
    },
    testimonials: [],
    cta: {
      text: `Dr. Sailaja's Eye Hospital can help if you seek expert ${item.label.toLowerCase()} care and treatment. Contact us today to schedule your consultation.`,
      buttonLabel: "Book your appointment today!",
      buttonUrl: "/book",
    },
    updatedAt: new Date().toISOString(),
  };
}

async function seed() {
  const outDir = path.resolve(process.cwd(), "content/pages");
  await fs.mkdir(outDir, { recursive: true });

  let count = 0;

  for (const group of SURGERY_GROUPS) {
    for (const item of group.items) {
      const page = makePage(item, "surgery", group.category);
      await fs.writeFile(
        path.join(outDir, `${page.slug}.json`),
        JSON.stringify(page, null, 2),
      );
      count++;
      console.log(`  + surgeries/${page.slug}`);
    }
  }

  for (const group of SPECIALITY_GROUPS) {
    for (const item of group.items) {
      const page = makePage(item, "speciality", group.category);
      await fs.writeFile(
        path.join(outDir, `${page.slug}.json`),
        JSON.stringify(page, null, 2),
      );
      count++;
      console.log(`  + specialities/${page.slug}`);
    }
  }

  console.log(`\nSeeded ${count} pages in ${outDir}`);
}

seed().catch(console.error);
