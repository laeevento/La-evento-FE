"use client";

import * as React from "react";
import { tv } from "tailwind-variants";

import { cn } from "../lib/utils";
import Typography, { TypographyProps } from "./typography";

export interface DateRendererProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  label?: string;
  placeholder?: string;
  value?: string;
  errorText?: string;
  hasError?: boolean;
  disabled?: boolean;
  required?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  labelProps?: TypographyProps;
  onDateClick?: () => void;
}

const root = tv({
  base: ["flex", "flex-col", "relative", "items-start", "gap-2", "w-full"],
});

const fieldWrapper = tv({
  base: [
    "relative",
    "w-full",
    "border",
    "rounded-xl",
    "p-4",
    "bg-grey-200",
    "flex",
    "items-center",
    "justify-between",
    "select-none",
    "transition-colors",
    "duration-300",
  ],
  variants: {
    variant: {
      default: "border-grey-700",
      error: "border-secondary-500",
    },
    disabled: {
      true: "opacity-50 cursor-not-allowed",
      false: "cursor-pointer",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const valueText = tv({
  base: ["font-poppins", "text-base", "tracking-normal", "truncate"],
  variants: {
    placeholder: {
      true: "text-grey-700",
      false: "text-black",
    },
  },
});

function Label({
  htmlFor,
  children,
  required,
  labelProps,
}: {
  htmlFor: string;
  children?: React.ReactNode;
  required?: boolean;
  labelProps?: TypographyProps;
}) {
  if (!children) return null;

  return (
    <label htmlFor={htmlFor} className="flex space-x-1">
      <Typography weight="semibold" size="md" variant="black" {...labelProps}>
        {children}
      </Typography>
      {required && <span className="text-lg font-bold text-[#FD0909]">*</span>}
    </label>
  );
}

function Error({ children }: { children?: React.ReactNode }) {
  if (!children) return null;

  return (
    <Typography size="sm" weight="medium" className="text-red-500">
      {children}
    </Typography>
  );
}

const DateRenderer = React.forwardRef<HTMLDivElement, DateRendererProps>(
  (props, ref) => {
    const {
      id,
      label,
      placeholder = "DD - MM - YYYY",
      value,
      errorText,
      hasError,
      disabled,
      required,
      leadingIcon,
      trailingIcon,
      className,
      labelProps,
      onDateClick,
      ...rest
    } = props;

    const showPlaceholder = !value;

    return (
      <div ref={ref} className={root({ className })} {...rest}>
        <Label htmlFor={id} required={required} labelProps={labelProps}>
          {label}
        </Label>

        <div
          id={id}
          aria-disabled={disabled}
          onClick={!disabled ? onDateClick : undefined}
          className={fieldWrapper({
            variant: hasError ? "error" : "default",
            disabled,
          })}
        >
          {leadingIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50">
              {leadingIcon}
            </div>
          )}

          <Typography
            className={cn(
              valueText({ placeholder: showPlaceholder }),
              leadingIcon && "pl-6",
              trailingIcon && "pr-6",
            )}
          >
            {showPlaceholder ? placeholder : value}
          </Typography>

          {trailingIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-70">
              {trailingIcon}
            </div>
          )}
        </div>

        <Error>{errorText}</Error>
      </div>
    );
  },
);

DateRenderer.displayName = "DateRenderer";

export { DateRenderer };
export default DateRenderer;
