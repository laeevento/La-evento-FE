import { Button, OtpInput, Stack, Typography } from "@laevento/components";
import Illustration from "@/assets/verify-illustration.png";

function Verify() {
  return (
    <Stack className="h-full max-w-127 mx-auto" justify="center" align="center">
      <Typography className="self-end"> 1/3</Typography>
      <img src={Illustration} alt="Verify Illustration" />
      <Typography
        component="h2"
        align="center"
        weight="medium"
        size="3xl"
        className="my-3"
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
}

export default Verify;
