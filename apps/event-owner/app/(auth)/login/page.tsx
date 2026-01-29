import {
  Button,
  Stack,
  Typography,
  GoogleIcon,
  Input,
  Link,
} from "@laevento/components";
import { RiEyeOffLine } from "@remixicon/react";

const Login = () => {
  return (
    <Stack className="max-w-127 mx-auto h-full" justify="center">
      <Typography component="h2" className="text-[2rem]" weight="medium">
        Sign in as a Party Planner
      </Typography>
      <Typography size="sm">
        List services, Find Party Plans, Manage bookings and get secure payment
      </Typography>
      <Button
        leadingIcon={<GoogleIcon />}
        width="full"
        className="mt-6 bg-white hover:bg-white active:bg-white text-black border border-grey-959 rounded-xl"
      >
        Sign in with Google
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
          <Stack
            direction="row"
            justify="between"
            align="center"
            className="mb-1"
          >
            <Input.Label required htmlFor="password">
              Password
            </Input.Label>
            <Link href="#">Forgot password?</Link>
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
      <Typography size="sm" align="center" weight="semibold" className="mt-6">
        Don&apos;t have an account?
        <Link
          href="/register"
          variant="secondary"
          underline="always"
          className="ml-1"
        >
          Sign up
        </Link>
      </Typography>
    </Stack>
  );
};
export default Login;
