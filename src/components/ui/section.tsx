import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sectionVariants = cva("relative w-full", {
  variants: {
    spacing: {
      none: "py-0",
      sm: "py-10 sm:py-12",
      md: "py-14 sm:py-20",
      lg: "py-20 sm:py-28",
      xl: "py-24 sm:py-32 lg:py-40",
    },
    tone: {
      default: "bg-background",
      surface: "bg-surface",
      muted: "bg-surface-muted",
      brand: "bg-brand text-white",
      footer: "bg-footer text-footer-foreground",
      transparent: "bg-transparent",
    },
  },
  defaultVariants: { spacing: "md", tone: "default" },
});

export interface SectionProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing, tone, ...props }, ref) => (
    <section
      ref={ref}
      className={cn(sectionVariants({ spacing, tone }), className)}
      {...props}
    />
  )
);
Section.displayName = "Section";
