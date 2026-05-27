import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "group inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium",
    "transition-[transform,box-shadow,background-color,color] duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "select-none cursor-pointer",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-brand text-white shadow-brand hover:bg-brand-dark hover:shadow-soft-lg active:translate-y-px",
        secondary:
          "bg-surface text-foreground border border-border hover:border-border-strong hover:bg-surface-muted",
        outline:
          "border border-brand/30 text-brand hover:bg-brand hover:text-white hover:border-brand",
        ghost: "text-foreground hover:bg-surface-muted",
        link: "text-brand underline-offset-4 hover:underline px-0 h-auto",
        inverse:
          "bg-white text-brand hover:bg-white/90 shadow-soft",
      },
      size: {
        sm: "h-9 px-4 text-sm rounded-pill",
        md: "h-11 px-6 text-sm rounded-pill",
        lg: "h-12 px-7 text-[15px] rounded-pill",
        xl: "h-14 px-8 text-base rounded-pill",
        icon: "h-11 w-11 rounded-pill",
      },
      full: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: { variant: "primary", size: "md", full: false },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, full, leftIcon, rightIcon, children, ...props },
    ref
  ) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, full }), className)}
      {...props}
    >
      {leftIcon ? (
        <span className="inline-flex shrink-0 [&>svg]:size-4">{leftIcon}</span>
      ) : null}
      {children}
      {rightIcon ? (
        <span className="inline-flex shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 [&>svg]:size-4">
          {rightIcon}
        </span>
      ) : null}
    </button>
  )
);
Button.displayName = "Button";

export { buttonVariants };
