import * as React from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "@remixicon/react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { tv, VariantProps } from "tailwind-variants";

import { cn } from "@/lib/utils";
import Typography from "./typography";

const selectTrigger = tv({
  base: [
    // Basic layout and appearance
    "appearance-none",
    "flex",
    "items-center",
    "justify-between",
    "gap-2",
    "w-full",
    "border-[0.5px]",
    "border-solid",
    "bg-[#F5F5F5]",
    "font-poppins",
    "font-normal",
    "text-sm",
    "tracking-[-0.2px]",
    "leading-[1.5]",
    "select-none",

    // Transitions
    "duration-300",
    "ease-smooth",
    "transition-combined",

    // Focus states
    "outline-none",

    // Disabled state
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
    "disabled:border-grey-600",

    // Placeholder styling
    "data-[placeholder]:text-[#7C7C7C]",
  ],
  variants: {
    size: {
      base: ["rounded-xl", "text-sm", "px-4", "py-[18px]", "h-[60px]"],
    },
    variant: {
      default: ["border-[#ABABAB]"],
      error: ["border-secondary-500"],
    },
    leadingIcon: {
      true: [],
      false: [],
    },
    trailingIcon: {
      true: [],
      false: [],
    },
  },
  compoundVariants: [
    {
      size: "base",
      leadingIcon: true,
      className: ["pl-12"],
    },
    {
      size: "base",
      trailingIcon: true,
    },
  ],
  defaultVariants: {
    size: "base",
    variant: "default",
  },
});

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

interface SelectTriggerProps
  extends
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
    Omit<VariantProps<typeof selectTrigger>, "leadingIcon" | "trailingIcon"> {
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  hasError?: boolean;
}

function SelectTrigger({
  className,
  size = "base",
  variant = "default",
  hasError = false,
  leadingIcon,
  trailingIcon,
  children,
  ...props
}: SelectTriggerProps) {
  const effectiveVariant = hasError ? "error" : variant;

  return (
    <div className="relative w-full">
      {leadingIcon && (
        <div className="pointer-events-none absolute top-1/2 left-4 z-10 -translate-y-1/2 text-sm text-gray-950 opacity-50">
          {leadingIcon}
        </div>
      )}
      <SelectPrimitive.Trigger
        data-slot="select-trigger"
        className={selectTrigger({
          size,
          variant: effectiveVariant,
          leadingIcon: !!leadingIcon,
          trailingIcon: !!trailingIcon || true, // Always true because we have the dropdown icon
          className,
        })}
        {...props}
      >
        {children}
        <SelectPrimitive.Icon asChild>
          <RiArrowDownSLine
            color="#000000"
            size={24}
            className="size-5 opacity-50"
          />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    </div>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  align = "start",
  sideOffset = 7,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "bg-white rounded-xl overflow-clip",
          "shadow-[0px_2px_1.5px_0.5px_rgba(0,0,0,0.16)]",
          "z-50",
          "w-[var(--radix-select-trigger-width)]",
          className,
        )}
        position={position}
        align={align}
        sideOffset={sideOffset}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(position === "popper" && "w-full")}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("font-poppins flex space-x-1 tracking-normal", className)}
      {...props}
    >
      <Typography weight="semibold" size="md" variant="black">
        {children}
      </Typography>
    </SelectPrimitive.Label>
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "flex w-full cursor-default select-none items-center",
        "px-4 py-[14px]",
        "h-[49px]",
        "rounded-xl",
        "bg-white",
        "hover:bg-[#E8F7EF]",
        "focus:bg-[#E8F7EF]",
        "data-[state=checked]:bg-[#E8F7EF]",
        "outline-none",
        "transition-colors duration-150",
        "font-poppins font-normal text-sm text-[#222] leading-[1.5] tracking-[-0.2px]",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className,
      )}
      {...props}
    >
      <RiArrowUpSLine className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className,
      )}
      {...props}
    >
      <RiArrowDownSLine className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
