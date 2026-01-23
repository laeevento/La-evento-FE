import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { tv, type VariantProps } from "tailwind-variants";

export const buttonVariants = tv({
  base: [
    "inline-flex",
    "cursor-pointer",
    "items-center",
    "justify-center",
    "gap-2",
    "whitespace-nowrap",
    "font-semibold",
    "transition-all",
    "duration-200",
    "ease-in-out",
    "focus-visible:outline-none",
    "focus-visible:ring-1",
    "focus-visible:ring-ring",
    "disabled:pointer-events-none",
    "disabled:cursor-not-allowed",
    "text-lg",
  ],
  variants: {
    variant: {
      primary: [
        "bg-primary-500",
        "text-white",
        "active:bg-primary-500",
        "hover:bg-primary-300",
        "disabled:bg-neutral-300",
        "disabled:text-neutral-600",
      ],
      secondary: [
        "border",
        "border-primary-100",
        "text-primary-500",
        "bg-primary-50",
        "hover:bg-primary-100",
        "active:bg-primary-100",
        "disabled:bg-neutral-300",
        "disabled:text-neutral-600",
        "disabled:border-neutral-400",
        "disabled:border-2",
      ],
      tertiary: [
        "bg-white",
        "text-primary-500",
        "hover:text-primary-400",
        "disabled:text-neutral-600",
      ],
    },
    size: {
      sm: "py-[0.5rem] px-4 h-[2.5rem]",
      md: "py-[0.625rem] px-4 h-[3rem]",
      lg: "py-[0.906rem] px-6 h-[3.5rem]",
    },
    rounded: {
      lg: ["rounded-lg"],
      full: ["rounded-full"],
    },
    width: {
      fit: ["w-fit"],
      full: ["w-full"],
    },
    standaloneIcon: {
      true: ["p-0", "!bg-transparent"],
      false: [],
    },
    leadingIcon: {
      true: [],
      false: [],
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "lg",
    width: "fit",
    rounded: "full",
  },
});

type ButtonVariantProps = Omit<
  VariantProps<typeof buttonVariants>,
  "standaloneIcon" | "leadingIcon"
>;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariantProps {
  children?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  standaloneIcon?: React.ReactNode;
  leadingIcon?: React.ReactNode;
  buttonText?: string;
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      width,
      rounded,
      standaloneIcon,
      leadingIcon,
      buttonText,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={buttonVariants({
          size,
          width,
          variant: !Boolean(standaloneIcon) ? variant : undefined, // eslint-disable-line no-extra-boolean-cast
          standaloneIcon: Boolean(standaloneIcon),
          leadingIcon: Boolean(leadingIcon) && !standaloneIcon,
          className,
          rounded,
        })}
        ref={ref}
        {...props}
      >
        <Slottable>{buttonText ?? children}</Slottable>
      </Comp>
    );
  },
);
Button.displayName = "Button";

export default Button;
