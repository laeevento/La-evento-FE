import { Button, Input } from "@laevento/components";
import Link from "@/components/link";
import Illustration from "@/assets/forgot-password-illustration.png";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { ForgotPasswordFormData } from "@/types";
import { forgotPasswordSchema } from "@/schemas/auth";
import { useForgotPassword } from "@/hooks/auth";

export function ForgotPasswordForm() {
  const { mutate } = useForgotPassword();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormData> = (data) => {
    mutate(data);
  };

  return (
    <>
      <img src={Illustration} alt="Verify Illustration" />
      <h2 className="text-3xl font-medium text-center my-3">
        Forgotten Password
      </h2>
      <p className="text-sm">
        Enter the email you sign up with to change your password{" "}
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-6 mt-10"
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
        <Button
          type="submit"
          variant="primary"
          size="lg"
          width="full"
          buttonText="Get OTP"
        />
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
