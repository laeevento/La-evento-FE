import { Button, Input } from "@laevento/components";
import { RiEyeOffLine } from "@remixicon/react";
import Illustration from "@/assets/reset-password-illustration.png";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { ResetPasswordFormData } from "@/types";
import { resetPasswordSchema } from "@/schemas/auth";
import { useResetPassword } from "@/hooks/auth";

export function ResetPasswordForm() {
  const { mutate } = useResetPassword();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordFormData> = (data) => {
    mutate(data);
  };

  return (
    <>
      <img src={Illustration} alt="Reset Password Illustration" />
      <h2 className="text-3xl font-medium text-center my-3">
        Create New Password
      </h2>
      <p className="text-sm">
        Make sure it is a password you can always remember{" "}
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-6 mt-10"
      >
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input.Root>
              <Input.Label required htmlFor="password">
                Password
              </Input.Label>
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

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <Input.Root>
              <Input.Label required htmlFor="confirmPassword">
                Confirm New Password
              </Input.Label>
              <Input.Field
                trailingIcon={
                  <button type="button" className="cursor-pointer">
                    <RiEyeOffLine />
                  </button>
                }
                {...field}
                id="confirmPassword"
                type="password"
                placeholder="*************"
              />
              {errors.confirmPassword && (
                <Input.Error>{errors.confirmPassword.message}</Input.Error>
              )}
            </Input.Root>
          )}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          width="full"
          buttonText="Reset Password"
        />
      </form>
    </>
  );
}
