import {
  Button,
  Stack,
  Typography,
  GoogleIcon,
  Input,
  Checkbox,
  Link,
} from "@laevento/components";
import { RiCheckboxCircleLine, RiEyeOffLine } from "@remixicon/react";

const Register = () => {
  return (
    <Stack className="max-w-127 mx-auto">
      <Stack direction="row" align="center" justify="between" className="mb-2">
        <Typography component="h2" className="text-[2rem]" weight="medium">
          Sign up as a Event Creator
        </Typography>
        <Typography> 1/3</Typography>
      </Stack>
      <Typography size="sm">
        Create, plan and manage your personal event such as birthday, party,
        conference, wedding and others
      </Typography>
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
          <Input.Label required htmlFor="whatsapp">
            WhatsApp Phone Number
          </Input.Label>
          <Input.Field id="whatsapp" type="tel" placeholder="+234 7065426253" />
        </Input.Root>
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
          <Input.Info className="flex gap-2 items-center mt-2">
            <RiCheckboxCircleLine color="#14AD5B" />
            <span className="text-sm">
              Must be at least 8 characters long, nclude an uppercase,
              lowercase, number and a symbol among @#$%^&*?&
            </span>
          </Input.Info>
        </Input.Root>
        <Input.Root>
          <Input.Label required htmlFor="password">
            Confirm Password
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
        <Stack direction="row" gap="2" align="center">
          <Checkbox />
          <Typography size="sm">
            By continuing, you agree to La Evento Terms of Service and Privacy
            Policy
          </Typography>
        </Stack>
        <Button variant="primary" size="lg" width="full" buttonText="Sign up" />
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
    </Stack>
  );
};
export default Register;
