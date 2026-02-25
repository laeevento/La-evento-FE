import { KycForm } from "@/components/auth/kyc-form";
import { Stack, Typography } from "@laevento/components";

function Kyc() {
  return (
    <Stack className="h-full max-w-127 mx-auto">
      <Stack direction="row" align="center" justify="between" className="mb-2">
        <Typography component="h2" className="text-[2rem]" weight="medium">
          Let&apos;s Meet you
        </Typography>
        <Typography>3/3</Typography>
      </Stack>
      <Typography size="sm">
        Tell us about yourself and create a username for people to locate you
      </Typography>
      <KycForm />
    </Stack>
  );
}

export default Kyc;
