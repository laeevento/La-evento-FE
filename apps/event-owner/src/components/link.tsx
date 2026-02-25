import { Link as RouterLink } from "@tanstack/react-router";
import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

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

type LinkVariantProps = VariantProps<typeof link>;

interface LinkProps extends LinkVariantProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    { className, variant, size, underline, weight, children, href, ...props },
    ref,
  ) => {
    return (
      <RouterLink
        ref={ref}
        to={href}
        className={link({ variant, size, underline, weight, className })}
        {...props}
      >
        {children}
      </RouterLink>
    );
  },
);

Link.displayName = "Link";

export default Link;
