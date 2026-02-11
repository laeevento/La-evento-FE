"use client";

import { unstable_OneTimePasswordField as OneTimePasswordField } from "radix-ui";

interface OtpInputProps {
  className?: string;
}

const OtpInput = ({ className }: OtpInputProps) => {
  return (
    <OneTimePasswordField.Root
      className={`gap-2 mt-12 inline-flex ${className}`}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <OneTimePasswordField.Input
          key={i}
          className="box-border inline-flex h-13.5 w-15 outline-none border items-center justify-center text-center bg-grey-200 border-grey-700 rounded-xl"
        />
      ))}
      <OneTimePasswordField.HiddenInput />
    </OneTimePasswordField.Root>
  );
};

export default OtpInput;
