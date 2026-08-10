import Image from "next/image";
import { Container } from "@/components/ui";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image?: string;
  /** Decorative by default — the title already names the page. */
  imageAlt?: string;
}

/**
 * The banner every interior page opens with: full-bleed photo, brand wash,
 * title bottom-left. Matches the treatment established by /optical-store.
 */
export function PageHero({
  title,
  subtitle,
  image = "/carousel/carousel-three.jpg",
  imageAlt = "",
}: PageHeroProps) {
  return (
    <section className="relative w-full">
      <div className="relative h-[240px] w-full overflow-hidden sm:h-[320px] lg:h-[400px]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-brand/70" />
        <div className="absolute inset-0 flex items-end">
          <Container size="full" padding="lg">
            <div className="pb-10 lg:pb-14">
              <h1 className="text-3xl font-light text-white sm:text-4xl">
                {title}
              </h1>
              {subtitle ? (
                <p className="mt-2 text-lg text-white/80">{subtitle}</p>
              ) : null}
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
