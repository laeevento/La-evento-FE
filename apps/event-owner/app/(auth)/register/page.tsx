import { Stack, Typography } from "@laevento/components";
import { RegisterForm } from "./register-form";

const Register = () => {
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
      <RegisterForm />
    </Stack>
  );
};

export default Register;
