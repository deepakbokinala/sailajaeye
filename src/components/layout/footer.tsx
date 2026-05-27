import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { Container, Muted } from "@/components/ui";
import { Logo } from "./logo";

const SOCIALS: Array<{ label: string; href: string; path: string }> = [
  {
    label: "Facebook",
    href: "#",
    path: "M22 12a10 10 0 1 0-11.6 9.88v-6.99H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.45 2.89h-2.35v6.99A10 10 0 0 0 22 12z",
  },
  {
    label: "Instagram",
    href: "#",
    path: "M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.22.42.56.21.96.47 1.38.89.42.42.68.82.89 1.38.17.42.37 1.05.42 2.22.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.42 2.22-.21.56-.47.96-.89 1.38-.42.42-.82.68-1.38.89-.42.17-1.05.37-2.22.42-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.22-.42a3.7 3.7 0 0 1-1.38-.89 3.7 3.7 0 0 1-.89-1.38c-.17-.42-.37-1.05-.42-2.22C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.42-2.22.21-.56.47-.96.89-1.38.42-.42.82-.68 1.38-.89.42-.17 1.05-.37 2.22-.42C8.42 2.21 8.8 2.2 12 2.2zm0 5.4a4.4 4.4 0 1 0 0 8.8 4.4 4.4 0 0 0 0-8.8zm0 7.26a2.86 2.86 0 1 1 0-5.72 2.86 2.86 0 0 1 0 5.72zm5.6-7.43a1.03 1.03 0 1 1-2.06 0 1.03 1.03 0 0 1 2.06 0z",
  },
  {
    label: "YouTube",
    href: "#",
    path: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z",
  },
];

function SocialIcon({ path, label }: { path: string; label: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label={label}
      className="size-4"
      fill="currentColor"
    >
      <path d={path} />
    </svg>
  );
}

const FACILITIES = [
  "24/7 Laboratory Services",
  "24/7 Pharmacy",
  "Cafeteria",
  "Café Lab",
  "Diagnostic Centre",
  "Labour Room",
  "MRI",
];

const SERVICES = [
  "24/7 Emergency Care",
  "Day Care Services",
  "Home Care",
  "Neurorehabilitation Centre",
  "Physiotherapy",
];

const QUICKLINKS = [
  ["Leadership Team", "/leadership"],
  ["Book Appointment", "https://kivihealth.com/iam/sai.laja.15614/bookslot"],
  ["Health Packages", "/packages"],
  ["Investigation Reports", "/reports"],
  ["Careers", "/careers"],
  ["Blogs", "/blogs"],
  ["News & Events", "/news"],
  ["Gallery", "/gallery"],
  ["Contact Us", "/contact"],
  ["Voices of Dr. Sailaja's", "/voices"],
] as const;

export function Footer() {
  return (
    <footer className="bg-footer text-footer-foreground">
      <Container size="full" padding="lg">
        <div className="grid gap-12 py-16 lg:grid-cols-[1.2fr_1fr_1fr_1.1fr]">
          {/* Brand / contact column */}
          <div className="flex flex-col gap-6">
            <Logo variant="inverse" />
            <div className="flex items-start gap-3 text-sm leading-relaxed text-white/85">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              <address className="not-italic">
                33/1, Horamavu Main Rd,
                <br />
                Above Post Office, Near Gandhi Statue,
                <br />
                Chinnaswamappa Layout, Horamavu,
                <br />
                Bengaluru, Karnataka 560113
              </address>
            </div>
            <div className="flex flex-col gap-2 text-sm text-white/85">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                Contact
              </span>
              <a href="tel:+918884471641" className="inline-flex items-center gap-2 transition-colors hover:text-white">
                <Phone className="size-4" />
                +91 88844 71641
              </a>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                Follow Us
              </span>
              <div className="flex items-center gap-2">
                {SOCIALS.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="inline-flex size-9 items-center justify-center rounded-pill bg-white/10 text-white transition-colors hover:bg-white/20"
                  >
                    <SocialIcon path={social.path} label={social.label} />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Facilities */}
          <FooterColumn title="Facilities">
            {FACILITIES.map((label) => (
              <FooterLink key={label} href="#">
                {label}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Services */}
          <FooterColumn title="Services">
            {SERVICES.map((label) => (
              <FooterLink key={label} href="#">
                {label}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Quicklinks */}
          <FooterColumn title="Quicklinks">
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {QUICKLINKS.map(([label, href]) => (
                <FooterLink key={label} href={href}>
                  {label}
                </FooterLink>
              ))}
            </div>
          </FooterColumn>
        </div>

        <div className="border-t border-white/10 py-6">
          <Muted className="text-center text-xs text-white/70">
            © {new Date().getFullYear()} Dr. Sailaja&apos;s Super Speciality Eye Hospital.
          </Muted>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
        {title}
      </h4>
      <ul className="flex flex-col gap-2.5 text-sm text-white/80">
        {children}
      </ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="transition-colors duration-200 hover:text-white"
      >
        {children}
      </Link>
    </li>
  );
}
