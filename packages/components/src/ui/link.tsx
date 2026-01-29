import NextLink from "next/link";
import React from "react";
import { cn } from "../lib/utils";
import { tv, VariantProps } from "tailwind-variants";

const link = tv({
  base: "transition-colors duration-200 inline-flex items-center gap-1",
  variants: {
    variant: {
      primary: "text-primary hover:text-primary-700",
      secondary: "text-secondary-500 hover:text-secondary-600",
    },
    size: {
      sm: "text-sm",
      default: "text-base",
      lg: "text-lg",
    },
    underline: {
      none: "no-underline hover:no-underline",
      hover: "no-underline hover:underline",
      always: "underline",
    },
    weight: {
      normal: "!font-normal",
      medium: "!font-medium",
      semibold: "!font-semibold",
      bold: "!font-bold",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
    underline: "none",
    weight: "semibold",
  },
});

export interface LinkProps
  extends
    React.ComponentPropsWithoutRef<typeof NextLink>,
    VariantProps<typeof link> {
  className?: string;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    { className, variant, size, underline, weight, children, ...props },
    ref,
  ) => {
    return (
      <NextLink
        ref={ref}
        className={cn(link({ variant, size, underline, weight }), className)}
        {...props}
      >
        {children}
      </NextLink>
    );
  },
);

Link.displayName = "Link";

export default Link;
