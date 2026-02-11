"use client";

import { Button, GoogleIcon, Input, Link, Stack } from "@laevento/components";
import { RiEyeOffLine } from "@remixicon/react";

export function LoginForm() {
  return (
    <>
      <Button
        leadingIcon={<GoogleIcon />}
        width="full"
        className="mt-6 bg-white hover:bg-white active:bg-white text-black border border-grey-959 rounded-xl"
      >
        Sign in with Google
      </Button>
      <div className="flex flex-row items-center gap-3 my-6">
        <div className="flex-1 h-0.5 bg-[#D9D9D9]" />
        <span className="text-sm">or</span>
        <div className="flex-1 h-0.5 bg-[#D9D9D9]" />
      </div>
      <form className="w-full flex flex-col gap-6">
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
        <Input.Root>
          <Stack className="flex flex-row justify-between items-center mb-1">
            <Input.Label required htmlFor="password">
              Password
            </Input.Label>
            <Link href="/forgot-password">Forgot password?</Link>
          </Stack>
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

        <Button variant="primary" size="lg" width="full" buttonText="Sign in" />
      </form>
      <p className="text-sm text-center font-semibold mt-6">
        Don&apos;t have an account?
        <Link
          href="/register"
          variant="secondary"
          underline="always"
          className="ml-1"
        >
          Sign up
        </Link>
      </p>
    </>
  );
}
