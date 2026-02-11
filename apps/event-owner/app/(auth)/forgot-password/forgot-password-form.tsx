"use client";

import { Button, Input, Link } from "@laevento/components";
import Image from "next/image";
import Illustration from "@/assets/forgot-password-illustration.png";

export function ForgotPasswordForm() {
  return (
    <>
      <Image src={Illustration} alt="Verify Illustration" />
      <h2 className="text-3xl font-medium text-center my-3">
        Forgotten Password
      </h2>
      <p className="text-sm">
        Enter the email you sign up with to change your password{" "}
      </p>
      <form className="w-full flex flex-col gap-6 mt-10">
        <Input.Root>
          <Input.Label required htmlFor="email">
            Email
          </Input.Label>
          <Input.Field
            id="email"
            type="email"
            placeholder="Enter your email address"
          />
        </Input.Root>
        <Button variant="primary" size="lg" width="full" buttonText="Get OTP" />
      </form>
      <p className="text-sm text-center font-semibold mt-6">
        Have an account?
        <Link
          href="/login"
          variant="secondary"
          underline="always"
          className="ml-1"
        >
          Sign in
        </Link>
      </p>
    </>
  );
}
