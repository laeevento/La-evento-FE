"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { RiCheckFill } from "@remixicon/react";
import { tv, type VariantProps } from "tailwind-variants";

const checkboxVariants = tv({
  slots: {
    root: [
      "peer",
      "size-6",
      "shrink-0",
      "rounded",
      "border-3",
      "border-grey-900",
      "bg-white",
      "transition-colors",
      "focus-visible:outline-none",
      "disabled:cursor-not-allowed",
      "disabled:opacity-50",
      "data-[state=checked]:bg-primary-500",
      "data-[state=checked]:border-primary-500",
      "data-[state=checked]:text-white",
    ],
    indicator: [
      "flex",
      "items-center",
      "justify-center",
      "text-current",
      "transition-none",
    ],
  },
});

type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root> &
  VariantProps<typeof checkboxVariants>;

function Checkbox({ className, ...props }: CheckboxProps) {
  const { root, indicator } = checkboxVariants();

  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={root({ className })}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className={indicator()}
      >
        <RiCheckFill className="size-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export default Checkbox;
