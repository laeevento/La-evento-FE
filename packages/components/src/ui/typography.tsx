import React, { forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const typography = tv({
  base: ["font-inter"],
  variants: {
    align: {
      left: ["text-left"],
      center: ["text-center"],
      right: ["text-right"],
    },
    weight: {
      light: ["font-light"],
      regular: ["font-normal"],
      medium: ["font-medium"],
      semibold: ["font-semibold"],
      bold: ["font-bold"],
      extraBold: ["font-extrabold"],
    },
    truncate: {
      true: ["truncate", "flex-grow", "basis-0"],
      false: [],
    },
    size: {
      xxs: ["text-xxs"],
      xs: ["text-xs"],
      "13": ["text-[13px]"],
      sm: ["text-sm"],
      md: ["text-base"],
      lg: ["text-lg"],
      xl: ["text-xl"],
      "2xl": ["text-2xl"],
      "3xl": ["text-3xl"],
      "4xl": ["text-4xl"],
      "5xl": ["text-5xl"],
      "6xl": ["text-6xl"],
      "7xl": ["text-7xl"],
      "8xl": ["text-8xl"],
      "9xl": ["text-9xl"],
      inherit: ["text-inherit"],
    },
    leading: {
      none: ["leading-none"],
      sm: ["leading-5"],
      base: ["leading-6"],
      lg: ["leading-8"],
      normal: ["leading-normal"],
    },
    variant: {
      primary: ["text-neutral-900"],
      secondary: ["text-primary-900"],
      ghost: ["text-neutral-700"],
      white: ["text-neutral-0"],
      black: ["text-neutral-950"],
    },
  },
  defaultVariants: {
    align: "left",
    variant: "secondary",
    size: "md",
    leading: "base",
  },
});

export interface TypographyProps<T extends React.ElementType = "p">
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof typography> {
  component?: T;
  children?: React.ReactNode;
}

const Typography = forwardRef<HTMLParagraphElement, TypographyProps>(
  (props, ref) => {
    const {
      children,
      align,
      className,
      leading,
      size,
      truncate,
      variant,
      weight,
      component,
      ...rest
    } = props;
    const ElementTag = component || "p";

    return (
      <ElementTag
        ref={ref}
        className={typography({
          align,
          leading,
          size,
          className,
          truncate,
          variant,
          weight,
        })}
        {...rest}
      >
        {children}
      </ElementTag>
    );
  },
);

Typography.displayName = "Typography";
export default Typography;
