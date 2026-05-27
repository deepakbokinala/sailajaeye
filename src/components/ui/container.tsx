import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto w-full", {
  variants: {
    size: {
      sm: "max-w-3xl",
      md: "max-w-5xl",
      lg: "max-w-6xl",
      xl: "max-w-7xl",
      full: "max-w-none",
    },
    padding: {
      none: "px-0",
      sm: "px-4 sm:px-5",
      md: "px-4 sm:px-6 lg:px-8",
      lg: "px-4 sm:px-8 lg:px-12",
    },
  },
  defaultVariants: { size: "xl", padding: "md" },
});

export interface ContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(containerVariants({ size, padding }), className)}
      {...props}
    />
  )
);
Container.displayName = "Container";
