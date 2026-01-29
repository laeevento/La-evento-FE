import { Button, OtpInput, Stack, Typography } from "@laevento/components";

const Verify = () => {
  return (
    <Stack className="h-full max-w-127 mx-auto" justify="center" align="center">
      <Typography
        component="h2"
        align="center"
        className="text-[2rem]"
        weight="medium"
      >
        Verify your phone number
      </Typography>
      <Typography align="center" size="sm">
        We just sent you an otp via WhatsApp to verify your phone number
      </Typography>
      <OtpInput className="justify-between w-full" />
      <Stack
        direction="row"
        align="center"
        gap="10"
        className="my-10"
        justify="center"
      >
        <Typography>5:00</Typography>
        <Button variant="secondary">Resend Otp</Button>
      </Stack>
      <Button width="full">Verify OTP</Button>
    </Stack>
  );
};

export default Verify;
