import type { DepartmentPageContent } from "@/lib/content/types";
import { DepartmentHero } from "./department-hero";
import { DepartmentDoctors } from "./department-doctors";
import { DepartmentServices } from "./department-services";
import { DepartmentWhyChoose } from "./department-why-choose";
import { DepartmentTestimonials } from "./department-testimonials";
import { DepartmentCta } from "./department-cta";

interface Props {
  content: DepartmentPageContent;
}

export function DepartmentPage({ content }: Props) {
  return (
    <>
      <DepartmentHero
        title={content.title}
        subtitle={content.subtitle}
        description={content.description}
        heroImage={content.heroImage}
      />
      {content.doctors.length > 0 && (
        <DepartmentDoctors doctors={content.doctors} />
      )}
      {content.services.items.length > 0 && (
        <DepartmentServices {...content.services} />
      )}
      {content.whyChooseUs.items.length > 0 && (
        <DepartmentWhyChoose {...content.whyChooseUs} />
      )}
      {content.testimonials.length > 0 && (
        <DepartmentTestimonials testimonials={content.testimonials} />
      )}
      <DepartmentCta {...content.cta} />
    </>
  );
}
