import { Stack, Typography } from "@laevento/components";
import { LoginForm } from "./login-form";

const Login = () => {
  return (
    <Stack className="max-w-127 mx-auto h-full" justify="center">
      <Typography component="h2" className="text-[2rem]" weight="medium">
        Sign in as a Party Planner
      </Typography>
      <Typography size="sm">
        List services, Find Party Plans, Manage bookings and get secure payment
      </Typography>
      <LoginForm />
    </Stack>
  );
};

export default Login;
