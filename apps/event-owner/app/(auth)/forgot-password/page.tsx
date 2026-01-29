import { Button, Stack, Typography, Input, Link } from "@laevento/components";

const ForgotPassword = () => {
  return (
    <Stack className="max-w-127 mx-auto h-full" justify="center">
      <Typography component="h2" className="text-[2rem]" weight="medium">
        Forgotten Password
      </Typography>
      <Typography size="sm">
        Enter the email you sign up with to change your password{" "}
      </Typography>
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
      <Typography size="sm" align="center" weight="semibold" className="mt-6">
        Have an account?
        <Link
          href="/login"
          variant="secondary"
          underline="always"
          className="ml-1"
        >
          Sign in
        </Link>
      </Typography>
    </Stack>
  );
};
export default ForgotPassword;
