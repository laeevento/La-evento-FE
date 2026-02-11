"use client";

import { Button, Input } from "@laevento/components";
import { RiEyeOffLine } from "@remixicon/react";
import Image from "next/image";
import Illustration from "@/assets/reset-password-illustration.png";

export function ResetPasswordForm() {
  return (
    <>
      <Image src={Illustration} alt="Reset Password Illustration" />
      <h2 className="text-3xl font-medium text-center my-3">
        Create New Password
      </h2>
      <p className="text-sm">
        Make sure it is a password you can always remember{" "}
      </p>

      <form className="w-full flex flex-col gap-6 mt-10">
        <Input.Root>
          <Input.Label required htmlFor="password">
            Password
          </Input.Label>
          <Input.Field
            trailingIcon={
              <button className="cursor-pointer">
                <RiEyeOffLine />
              </button>
            }
            id="password"
            type="password"
            placeholder="*************"
          />
        </Input.Root>
        <Input.Root>
          <Input.Label required htmlFor="confirm-password">
            Confirm New Password
          </Input.Label>
          <Input.Field
            trailingIcon={
              <button className="cursor-pointer">
                <RiEyeOffLine />
              </button>
            }
            id="confirm-password"
            type="password"
            placeholder="*************"
          />
        </Input.Root>

        <Button
          variant="primary"
          size="lg"
          width="full"
          buttonText="Reset Password"
        />
      </form>
    </>
  );
}
