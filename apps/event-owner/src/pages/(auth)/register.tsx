import { useState } from "react";
import { useRegister } from "@/hooks/auth";
import { registerSchema } from "@/schemas/auth";
import { RegisterFormData } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Checkbox,
  GoogleIcon,
  Input,
  Stack,
} from "@laevento/components";
import { Typography } from "@laevento/components";
import {
  RiCheckboxCircleLine,
  RiEyeLine,
  RiEyeOffLine,
} from "@remixicon/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Link from "@/components/link";

function Register() {
  const { mutate } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      acceptedTerms: false,
    },
  });

  const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
    mutate({ ...data, userType: "EVENT_OWNER" });
  };

  return (
    <Stack className="max-w-127 mx-auto">
      <Stack direction="row" align="center" justify="between" className="mb-2">
        <Typography component="h2" className="text-[2rem]" weight="medium">
          Sign up as a Event Creator
        </Typography>
        <Typography>1/3</Typography>
      </Stack>
      <Typography size="sm">
        Create, plan and manage your personal event such as birthday, party,
        conference, wedding and others
      </Typography>
      <>
        <Button
          leadingIcon={<GoogleIcon />}
          width="full"
          className="mt-6 bg-white hover:bg-white active:bg-white text-black border border-grey-959 rounded-xl"
        >
          Sign up with Google
        </Button>
        <Stack direction="row" align="center" gap="3" className="my-6">
          <Stack className="flex-1 h-0.5 bg-[#D9D9D9]" />
          <Typography size="sm">or</Typography>
          <Stack className="flex-1 h-0.5 bg-[#D9D9D9]" />
        </Stack>

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
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <Input.Root>
                <Input.Label required htmlFor="whatsapp">
                  WhatsApp Phone Number
                </Input.Label>
                <Input.Field
                  {...field}
                  id="whatsapp"
                  type="tel"
                  placeholder="+234 7065426253"
                />
                {errors.phoneNumber && (
                  <Input.Error>{errors.phoneNumber.message}</Input.Error>
                )}
              </Input.Root>
            )}
          />

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
                    <button
                      type="button"
                      className="cursor-pointer"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <RiEyeLine /> : <RiEyeOffLine />}
                    </button>
                  }
                  {...field}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="*************"
                />
                <Input.Info className="flex gap-2 items-center mt-2">
                  <RiCheckboxCircleLine color="#14AD5B" />
                  <span className="text-sm">
                    Must be at least 8 characters long, include an uppercase,
                    lowercase, number and a symbol among @#$%^&amp;*?&amp;
                  </span>
                </Input.Info>
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
                  Confirm Password
                </Input.Label>
                <Input.Field
                  trailingIcon={
                    <button
                      type="button"
                      className="cursor-pointer"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      {showConfirmPassword ? <RiEyeLine /> : <RiEyeOffLine />}
                    </button>
                  }
                  {...field}
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="*************"
                />
                {errors.confirmPassword && (
                  <Input.Error>{errors.confirmPassword.message}</Input.Error>
                )}
              </Input.Root>
            )}
          />

          <Controller
            name="acceptedTerms"
            control={control}
            render={({ field }) => (
              <Stack>
                <Stack direction="row" gap="2" align="center">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) =>
                      field.onChange(checked === true)
                    }
                  />
                  <Typography size="sm">
                    By continuing, you agree to La Evento Terms of Service and
                    Privacy Policy
                  </Typography>
                </Stack>
                {errors.acceptedTerms && (
                  <Input.Error>{errors.acceptedTerms.message}</Input.Error>
                )}
              </Stack>
            )}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            width="full"
            buttonText="Sign up"
          />
        </form>

        <Typography size="sm" align="center" weight="semibold" className="mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            variant="secondary"
            underline="always"
            className="ml-1"
          >
            Log in
          </Link>
        </Typography>
      </>
    </Stack>
  );
}

export default Register;
