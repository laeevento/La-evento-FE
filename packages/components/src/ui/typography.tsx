import React, { forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const typography = tv({
  base: ["font-poppins"],
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
    tracking: {
      tighter: "-0.5px",
      tight: "-0.1px",
      normal: "0",
      wide: "0.1px",
      wider: "0.5px",
      widest: "1.4px",
    },
    variant: {
      primary: ["text-primary"],
      secondary: ["text-foreground"],
      ghost: ["text-muted-foreground"],
      white: ["text-white"],
      black: ["text-black"],
    },
  },
  defaultVariants: {
    align: "left",
    variant: "black",
    size: "md",
    leading: "base",
    tracking: "wide",
  },
});

export type TypographyProps<T extends React.ElementType = "p"> = {
  component?: T;
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<T> &
  VariantProps<typeof typography>;

const Typography = forwardRef(
  <T extends React.ElementType = "p">(
    props: TypographyProps<T>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ref: React.ForwardedRef<any>,
  ) => {
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

// Export with the correct polymorphic type signature
export default Typography as <T extends React.ElementType = "p">(
  props: TypographyProps<T> & { ref?: React.ComponentPropsWithRef<T>["ref"] },
) => React.ReactElement;
