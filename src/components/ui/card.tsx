import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "relative isolate flex flex-col bg-surface border border-border transition-all duration-300 ease-out",
  {
    variants: {
      radius: {
        md: "rounded-[16px]",
        lg: "rounded-[20px]",
        card: "rounded-card",
        hero: "rounded-hero",
      },
      shadow: {
        none: "",
        soft: "shadow-soft",
        lg: "shadow-soft-lg",
      },
      interactive: {
        true: "hover:-translate-y-0.5 hover:shadow-soft-lg hover:border-border-strong",
        false: "",
      },
    },
    defaultVariants: {
      radius: "card",
      shadow: "soft",
      interactive: false,
    },
  }
);

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, radius, shadow, interactive, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ radius, shadow, interactive }), className)}
      {...props}
    />
  )
);
Card.displayName = "Card";

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-2 p-6", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

export const CardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex-1 px-6 pb-6 pt-0", className)} {...props} />
  )
);
CardBody.displayName = "CardBody";

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mt-auto flex items-center gap-3 px-6 pb-6", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";
