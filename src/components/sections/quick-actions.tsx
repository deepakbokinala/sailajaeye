import Link from "next/link";
import { Container } from "@/components/ui";

interface QuickAction {
  label: React.ReactNode;
  href: string;
  icon: string;
  alt: string;
}

const ICON_BASE = "https://api.iconify.design/healthicons";

const ACTIONS: QuickAction[] = [
  {
    label: (
      <>
        Book an<br />Appointment
      </>
    ),
    href: "https://kivihealth.com/iam/sai.laja.15614/bookslot",
    icon: `${ICON_BASE}/calendar-outline.svg`,
    alt: "Appointment",
  },
  {
    label: (
      <>
        Get a Health<br />Checkup
      </>
    ),
    href: "/health-checkup",
    icon: `${ICON_BASE}/stethoscope-outline.svg`,
    alt: "Checkup",
  },
  {
    label: (
      <>
        Get a Second<br />Opinion
      </>
    ),
    href: "/second-opinion",
    icon: `${ICON_BASE}/doctor-male-outline.svg`,
    alt: "Opinion",
  },
  {
    label: (
      <>
        Optical<br />Store
      </>
    ),
    href: "/optical-store",
    icon: `${ICON_BASE}/eyeglasses-outline.svg`,
    alt: "Optical Store",
  },
  {
    label: (
      <>
        24×7 Emergency<br />Care
      </>
    ),
    href: "tel:+918884471641",
    icon: `${ICON_BASE}/call-centre-outline.svg`,
    alt: "Callback",
  },
];

export function QuickActions() {
  return (
    <section className="relative z-10 pt-8 md:-mt-10 md:pt-0 lg:-mt-14">
      <Container size="full" padding="lg">
        {/* Mobile: 2-column card grid */}
        <ul className="grid grid-cols-2 gap-3 md:hidden">
          {ACTIONS.map(({ label, href, icon, alt }) => (
            <li key={alt}>
              <Link
                href={href}
                className="group flex h-full flex-col items-center justify-center gap-3 rounded-card bg-surface px-4 py-7 text-center text-foreground shadow-soft transition-colors hover:bg-brand hover:text-white"
              >
                <img
                  src={icon}
                  alt={alt}
                  className="size-10 shrink-0 transition group-hover:brightness-0 group-hover:invert"
                  loading="lazy"
                  decoding="async"
                />
                <h5 className="text-base font-semibold leading-snug">
                  {label}
                </h5>
              </Link>
            </li>
          ))}
        </ul>

        {/* Tablet & desktop: single pill bar */}
        <div className="hidden overflow-hidden rounded-pill bg-surface shadow-soft-lg md:block">
          <ul className="grid md:grid-cols-3 lg:grid-cols-5">
            {ACTIONS.map(({ label, href, icon, alt }, index) => (
              <li
                key={alt}
                className={
                  index < ACTIONS.length - 1
                    ? "border-r border-border"
                    : ""
                }
              >
                <Link
                  href={href}
                  className="group flex h-full items-center justify-center gap-5 px-6 py-5 text-foreground transition-colors hover:bg-brand hover:text-white"
                >
                  <img
                    src={icon}
                    alt={alt}
                    className="size-10 shrink-0 transition group-hover:brightness-0 group-hover:invert"
                    loading="lazy"
                    decoding="async"
                  />
                  <h5 className="text-sm font-semibold leading-snug sm:text-base">
                    {label}
                  </h5>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
