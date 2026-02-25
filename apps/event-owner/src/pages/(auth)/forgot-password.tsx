import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { Stack } from "@laevento/components";

function ForgotPassword() {
  return (
    <Stack className="max-w-127 mx-auto h-full" justify="center" align="center">
      <ForgotPasswordForm />
    </Stack>
  );
}

export default ForgotPassword;
