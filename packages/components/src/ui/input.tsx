import * as React from "react";
import { tv, VariantProps } from "tailwind-variants";

import { cn } from "../lib/utils";
import Typography, { TypographyProps } from "./typography";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorText?: string;
  hasError?: boolean;
  classNames?: string;
}

const root = tv({
  base: [
    // Basic root layout
    "flex",
    "flex-col",
    "relative",
    "items-start",

    "[&>div>input]:ring-0",
    "[&>div>input]:bg-grey-200",
    "focus:[&>div>input]:outline-none",

    "focus-visible:[&>div>input]:outline-0",
    "focus-visible:[&>div>input]:ring-0",
    "focus-visible:[&>div>input]:border-transparent",

    "[&>div>textarea]:ring-0",
    "[&>div>textarea]:border-transparent",
    "[&>div>textarea]:placeholder-[#858D9D]",
    "focus:[&>div>textarea]:outline-none",

    // Disabled state
    "[&>div>input:disabled]:cursor-not-allowed",
    "[&>div>textarea:disabled]:cursor-not-allowed",
    "[&>div>input:disabled]:opacity-50",
    "[&>div>textarea:disabled]:opacity-50",
    "[&>div>input:disabled]:border-grey-600",
    "[&>div>textarea:disabled]:border-grey-600",
    "[&>div>input:disabled]:placeholder-grey-600",
    "[&>div>textarea:disabled]:placeholder-grey-600",

    // Typography
    "[&>div>input]:font-poppins",
    "[&>div>textarea]:font-poppins",
  ],
  variants: {
    size: {
      base: [
        // Spacing the input composition elements
        "gap-2",

        // Input sizing
        "[&>div>input]:p-4",
        "[&>div>input]:rounded-xl",
        "[&>div>input]:text-base",

        // Textarea sizing
        "[&>div>textarea]:p-4",
        "[&>div>textarea]:rounded-xl",
        "[&>div>textarea]:text-base",

        // Icon sizing
        "[&>svg]:h-4.5",
        "[&>svg]:w-4.5",
      ],
    },
    variant: {
      default: [
        "[&>div>input]:border-grey-700",
        "[&>div>input]:placeholder-grey-700",
      ],
      error: ["[&>div>input]:border-secondary-500"],
    },
    leadingIcon: {
      true: [],
      false: [],
    },
    trailingIcon: {
      true: [],
      false: [],
    },
    width: {
      full: [
        "w-full",
        "[&>div]:w-full",
        "[&>div>input]:w-full",
        "[&>div>textarea]:w-full",
      ],
    },
  },
  compoundVariants: [
    {
      size: "base",
      leadingIcon: true,
      className: [
        "[&>svg]:left-2",
        "[&>div>input]:pl-8",
        "[&>div>textarea]:pl-8",
      ],
    },
    {
      size: "base",
      trailingIcon: true,
      className: [
        "[&>svg]:right-2",
        "[&>div>input]:pr-8",
        "[&>div>textarea]:pr-8",
      ],
    },
  ],
  defaultVariants: {
    size: "base",
    variant: "default",
  },
});

const field = tv({
  base: [
    // Basic reset
    "appearance-none",
    "block",
    "box-border",
    "flex-1",
    "border",
    "no-underline",
    "w-full",
    "border",
    "select-none",
    "focus-visible:outline-none",
    // Typography
    "font-normal",
    "text-ellipsis",
    "tracking-normal",
    "text-base",

    // Transition
    "duration-300",
    "ease-smooth",
    "transition-combined",
  ],
});

interface RootProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof root>, "leadingIcon" | "trailingIcon"> {
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

const Root = React.forwardRef(function Root(
  props: RootProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { children, className, size, variant, width, ...rest } = props;
  return (
    <div
      className={root({
        size,
        variant,
        width,
        className,
      })}
      ref={ref}
      {...rest}
    >
      {children}
    </div>
  );
});

type FieldProps = Required<
  Pick<React.InputHTMLAttributes<HTMLInputElement>, "id">
>;

type FieldVariantProps = Omit<VariantProps<typeof field>, "trailingIcon">;

const Field = React.forwardRef(
  (
    props: React.InputHTMLAttributes<HTMLInputElement> &
      FieldProps & {
        parentClassName?: string;
        leadingIcon?: React.ReactNode;
        trailingIcon?: React.ReactNode;
      } & FieldVariantProps,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const { parentClassName, className, leadingIcon, trailingIcon, ...rest } =
      props;

    return (
      <div
        className={`${cn("w-full", parentClassName, "relative align-middle")}`}
      >
        {leadingIcon ? (
          <div className="pointer-events-none absolute top-1/2 left-3 z-10 -translate-y-1/2 text-sm text-gray-950 opacity-50">
            {leadingIcon}
          </div>
        ) : null}
        <input
          className={cn(
            field({ className }),
            leadingIcon ? "mt-1 pl-8" : "pl-2.5",
          )}
          ref={ref}
          {...rest}
        />
        {trailingIcon ? (
          <div className="absolute top-1/2 right-6 z-10 flex -translate-y-1/2 items-center text-sm text-gray-950 opacity-50">
            {trailingIcon}
          </div>
        ) : null}
      </div>
    );
  },
);
Field.displayName = "Field";

const Textarea = React.forwardRef(function Textarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement> &
    FieldProps & {
      parentClassName?: string;
    },
  ref: React.Ref<HTMLTextAreaElement>,
) {
  const { className, ...rest } = props;
  return (
    <div className={cn("w-full", props.parentClassName)}>
      <textarea className={field({ className })} ref={ref} {...rest} />
    </div>
  );
});

const label = tv({
  base: ["font-poppins", "flex", "space-x-1", "tracking-normal"],
});

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> &
  Required<Pick<React.LabelHTMLAttributes<HTMLLabelElement>, "htmlFor">> & {
    labelProps?: TypographyProps;
    required?: boolean;
    fileUpload?: boolean;
  };

function Label(props: LabelProps) {
  const {
    className,
    children,
    htmlFor,
    labelProps,
    fileUpload,
    required,
    ...rest
  } = props;
  return (
    <label className={label({ className })} htmlFor={htmlFor} {...rest}>
      {fileUpload ? (
        children
      ) : (
        <Typography weight="semibold" size="md" variant="black" {...labelProps}>
          {children}
        </Typography>
      )}

      {required && <span className="font-bold text-lg text-[#FD0909]">*</span>}
    </label>
  );
}

function Error(props: React.HTMLAttributes<HTMLSpanElement>) {
  const { children, className, ...rest } = props;
  return (
    <Typography
      size="sm"
      weight="medium"
      {...rest}
      className={cn("text-red-500", className)}
    >
      {children}
    </Typography>
  );
}

type InfoProps = React.HTMLAttributes<HTMLSpanElement> & {
  labelProps?: TypographyProps;
  required?: boolean;
};

function Info(props: InfoProps) {
  const { children, className, ...rest } = props;
  return (
    <Typography {...rest} className={className}>
      {children}
    </Typography>
  );
}

const Input = {
  Error,
  Field,
  Info,
  Label,
  Root,
  Textarea,
};

export default Input;
