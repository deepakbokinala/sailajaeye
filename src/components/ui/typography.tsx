import {
  forwardRef,
  type ElementType,
  type HTMLAttributes,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Heading                                                                    */
/* -------------------------------------------------------------------------- */
const headingVariants = cva("font-semibold tracking-tight text-foreground", {
  variants: {
    size: {
      display:
        "text-[2.5rem] leading-[1.05] sm:text-5xl lg:text-6xl xl:text-[4.25rem]",
      h1: "text-3xl leading-[1.15] sm:text-4xl lg:text-5xl",
      h2: "text-2xl leading-[1.2] sm:text-3xl lg:text-4xl",
      h3: "text-xl leading-snug sm:text-2xl lg:text-[1.75rem]",
      h4: "text-lg leading-snug sm:text-xl",
      h5: "text-base leading-snug sm:text-lg",
    },
    weight: {
      regular: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    tone: {
      default: "text-foreground",
      brand: "text-brand",
      muted: "text-muted-foreground",
      inverse: "text-white",
    },
    balance: {
      true: "text-balance",
      false: "",
    },
  },
  defaultVariants: {
    size: "h2",
    weight: "semibold",
    tone: "default",
    balance: true,
  },
});

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: HeadingTag;
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as = "h2", className, size, weight, tone, balance, ...props }, ref) => {
    const Comp = as as ElementType;
    return (
      <Comp
        ref={ref}
        className={cn(headingVariants({ size, weight, tone, balance }), className)}
        {...props}
      />
    );
  }
);
Heading.displayName = "Heading";

/* -------------------------------------------------------------------------- */
/*  Eyebrow / Subheading — the small uppercase brand label above headings      */
/* -------------------------------------------------------------------------- */
const subheadingVariants = cva(
  "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em]",
  {
    variants: {
      tone: {
        brand: "text-brand",
        muted: "text-muted-foreground",
        inverse: "text-white/80",
      },
    },
    defaultVariants: { tone: "brand" },
  }
);

export interface SubheadingProps
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof subheadingVariants> {}

export const Subheading = forwardRef<HTMLParagraphElement, SubheadingProps>(
  ({ className, tone, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(subheadingVariants({ tone }), className)}
      {...props}
    />
  )
);
Subheading.displayName = "Subheading";

/* -------------------------------------------------------------------------- */
/*  Body                                                                       */
/* -------------------------------------------------------------------------- */
const bodyVariants = cva("leading-relaxed text-foreground/80", {
  variants: {
    size: {
      sm: "text-sm",
      base: "text-base",
      lg: "text-[1.0625rem] sm:text-lg",
      xl: "text-lg sm:text-xl",
    },
    tone: {
      default: "text-foreground/80",
      strong: "text-foreground",
      muted: "text-muted-foreground",
      inverse: "text-white/85",
    },
  },
  defaultVariants: { size: "base", tone: "default" },
});

export interface BodyProps
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof bodyVariants> {}

export const Body = forwardRef<HTMLParagraphElement, BodyProps>(
  ({ className, size, tone, ...props }, ref) => (
    <p ref={ref} className={cn(bodyVariants({ size, tone }), className)} {...props} />
  )
);
Body.displayName = "Body";

/* -------------------------------------------------------------------------- */
/*  Muted — small secondary text                                               */
/* -------------------------------------------------------------------------- */
export const Muted = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm leading-relaxed text-muted-foreground", className)}
    {...props}
  />
));
Muted.displayName = "Muted";
