"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SliderArrowProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  direction: "prev" | "next";
  tone?: "default" | "brand";
}

/**
 * Reusable circular arrow used by every carousel. Hooks up to Swiper via
 * `ref` + the `navigation` module's `prevEl`/`nextEl`.
 */
export const SliderArrow = forwardRef<HTMLButtonElement, SliderArrowProps>(
  ({ direction, tone = "default", className, ...props }, ref) => {
    const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
    return (
      <button
        ref={ref}
        type="button"
        aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
        className={cn(
          "inline-flex size-10 items-center justify-center rounded-pill border transition-all duration-200",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          tone === "default"
            ? "border-border bg-surface text-foreground hover:border-brand hover:text-brand hover:shadow-soft"
            : "border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20",
          className
        )}
        {...props}
      >
        <Icon className="size-4" />
      </button>
    );
  }
);
SliderArrow.displayName = "SliderArrow";
