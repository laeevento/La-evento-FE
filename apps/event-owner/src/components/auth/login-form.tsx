import { Button, GoogleIcon, Input, Stack } from "@laevento/components";
import Link from "@/components/link";
import { RiEyeOffLine } from "@remixicon/react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { LoginFormData } from "@/types";
import { loginSchema } from "@/schemas/auth";
import { useLogin } from "@/hooks/auth";

export function LoginForm() {
  const { mutate } = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    mutate(data);
  };

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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-6"
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input.Root>
              <Input.Label required htmlFor="email">
                Email
              </Input.Label>
              <Input.Field
                {...field}
                id="email"
                type="email"
                placeholder="Enter your email address"
              />
              {errors.email && (
                <Input.Error>{errors.email.message}</Input.Error>
              )}
            </Input.Root>
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input.Root>
              <Stack className="flex flex-row justify-between items-center mb-1">
                <Input.Label required htmlFor="password">
                  Password
                </Input.Label>
                <Link href="/forgot-password">Forgot password?</Link>
              </Stack>
              <Input.Field
                trailingIcon={
                  <button type="button" className="cursor-pointer">
                    <RiEyeOffLine />
                  </button>
                }
                {...field}
                id="password"
                type="password"
                placeholder="*************"
              />
              {errors.password && (
                <Input.Error>{errors.password.message}</Input.Error>
              )}
            </Input.Root>
          )}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          width="full"
          buttonText="Sign in"
        />
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
