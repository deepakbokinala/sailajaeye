export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export interface MegaMenuItem {
  label: string;
  href: string;
}

export interface MegaMenuGroup {
  category: string;
  items: MegaMenuItem[];
}

function surgeryItem(label: string): MegaMenuItem {
  return { label, href: `/surgeries/${slugify(label)}` };
}

function specialityItem(label: string): MegaMenuItem {
  return { label, href: `/specialities/${slugify(label)}` };
}

export const SURGERY_GROUPS: MegaMenuGroup[] = [
  {
    category: "Cataract",
    items: [
      surgeryItem("Cataract Surgery"),
      surgeryItem("Micro Incision Cataract Surgery (MICS)"),
      surgeryItem("Phaco Emulsification Cataract Surgery"),
      surgeryItem("AMO Phaco Emulsification (White Star with ICE)"),
    ],
  },
  {
    category: "Refractive",
    items: [surgeryItem("LASIK")],
  },
  {
    category: "Oculoplasty",
    items: [surgeryItem("Oculoplasty"), surgeryItem("Eyelid Surgery")],
  },
  {
    category: "General",
    items: [surgeryItem("Eye Surgery")],
  },
];

export const SPECIALITY_GROUPS: MegaMenuGroup[] = [
  {
    category: "Retina",
    items: [specialityItem("Retina Clinic")],
  },
  {
    category: "Contact Lens",
    items: [specialityItem("Contact Lenses")],
  },
  {
    category: "Squint",
    items: [specialityItem("Squint Evaluation")],
  },
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

export const SURGERY_LINKS: MegaMenuItem[] = SURGERY_GROUPS.flatMap(
  (g) => g.items,
);

export const SPECIALITY_LINKS: MegaMenuItem[] = SPECIALITY_GROUPS.flatMap(
  (g) => g.items,
);
