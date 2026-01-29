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
        Create New Password
      </Typography>
      <Typography size="sm">
        Make sure it is a password you can always remember{" "}
      </Typography>

      <form className="w-full flex flex-col gap-6 mt-10">
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
        </Input.Root>
        <Input.Root>
          <Input.Label required htmlFor="confirm-password">
            Confirm New Password
          </Input.Label>
          <Input.Field
            trailingIcon={
              <button className="cursor-pointer">
                <RiEyeOffLine />
              </button>
            }
            id="confirm-password"
            type="password"
            placeholder="*************"
          />
        </Input.Root>

        <Button
          variant="primary"
          size="lg"
          width="full"
          buttonText="Reset Password"
        />
      </form>
    </Stack>
  );
};
export default Login;
