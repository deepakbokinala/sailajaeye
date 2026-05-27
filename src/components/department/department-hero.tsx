import Image from "next/image";
import { Body, Heading } from "@/components/ui";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80";

interface Props {
  title: string;
  subtitle: string;
  description: string;
  heroImage?: string;
}

export function DepartmentHero({
  title,
  subtitle,
  description,
  heroImage,
}: Props) {
  return (
    <section className="relative w-full bg-surface">
      <div className="grid min-h-[320px] lg:grid-cols-[1fr_1fr] lg:min-h-[420px]">
        <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-16 lg:py-16 xl:px-24">
          <Heading as="h1" size="display" tone="brand" className="uppercase">
            {title}
          </Heading>
          <p className="mt-3 text-lg font-semibold text-foreground sm:text-xl">
            {subtitle}
          </p>
          <Body className="mt-4 max-w-xl">{description}</Body>
        </div>
        <div className="relative hidden min-h-[320px] lg:block">
          <Image
            src={heroImage || FALLBACK_IMAGE}
            alt={title}
            fill
            priority
            sizes="50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
