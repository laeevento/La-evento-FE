import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { Stack } from "@laevento/components";

function ResetPassword() {
  return (
    <Stack className="max-w-127 mx-auto h-full" justify="center" align="center">
      <ResetPasswordForm />
    </Stack>
  );
}

export default ResetPassword;
