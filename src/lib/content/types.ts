export interface DoctorEntry {
  name: string;
  credentials: string;
  image: string;
  appointmentUrl?: string;
}

export interface ServiceEntry {
  title: string;
  description: string;
}

export interface FeatureCard {
  title: string;
  description: string;
}

export interface TestimonialEntry {
  quote: string;
  patientName: string;
}

export interface DepartmentPageContent {
  slug: string;
  type: "surgery" | "speciality";
  title: string;
  subtitle: string;
  description: string;
  heroImage?: string;
  doctors: DoctorEntry[];
  services: {
    heading: string;
    description: string;
    items: ServiceEntry[];
  };
  whyChooseUs: {
    heading: string;
    items: FeatureCard[];
  };
  testimonials: TestimonialEntry[];
  cta: {
    text: string;
    buttonLabel: string;
    buttonUrl: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
  updatedAt: string;
}
