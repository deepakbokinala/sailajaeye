import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "default" | "inverse";
  className?: string;
}

export function Logo({ variant = "default", className }: LogoProps) {
  const inverse = variant === "inverse";

  return (
    <Link
      href="/"
      aria-label="Dr. Sailaja's Super Speciality Eye Hospital — Home"
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <Image
        src="/logo.png"
        alt=""
        width={41}
        height={49}
        className="transition-transform duration-300 group-hover:-rotate-3"
        priority
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-lg font-bold",
            inverse ? "text-white" : "text-brand"
          )}
        >
          Dr. Sailaja&apos;s
        </span>
        <span
          className={cn(
            "mt-0.5 text-[9px] font-medium uppercase tracking-[0.25em]",
            inverse ? "text-white/80" : "text-foreground"
          )}
        >
          Super Speciality
        </span>
        <span
          className={cn(
            "text-[9px] font-medium uppercase tracking-[0.25em]",
            inverse ? "text-white/80" : "text-foreground"
          )}
        >
          Eye Hospital
        </span>
      </span>
    </Link>
  );
}
