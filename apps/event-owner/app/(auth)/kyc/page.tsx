import {
  Button,
  Input,
  OtpInput,
  Stack,
  Typography,
} from "@laevento/components";

const Kyc = () => {
  return (
    <Stack className="h-full max-w-127 mx-auto">
      <Stack direction="row" align="center" justify="between" className="mb-2">
        <Typography component="h2" className="text-[2rem]" weight="medium">
          Let&apos;s Meet you
        </Typography>
        <Typography> 3/3</Typography>
      </Stack>
      <Typography size="sm">
        Tell us about yourself and create a username for people to locate you
      </Typography>
      <form className="w-full flex flex-col gap-8 mt-6">
        <Input.Root>
          <Input.Label required htmlFor="username">
            Choose a username
          </Input.Label>
          <Input.Field id="username" type="text" placeholder="@user_name" />
        </Input.Root>
        <Input.Root>
          <Input.Label required htmlFor="username">
            Full Name
          </Input.Label>
          <Input.Field
            id="username"
            type="text"
            placeholder="Enter your email address"
          />
        </Input.Root>
        <Input.Root>
          <Input.Label required htmlFor="username">
            About yourself
          </Input.Label>
          <Input.Field
            id="username"
            type="text"
            placeholder="Enter your email address"
          />
        </Input.Root>
        <Stack direction="row" gap="6">
          <Input.Root className="w-full">
            <Input.Label required htmlFor="username">
              Date of birth
            </Input.Label>
            <Input.Field
              id="username"
              type="text"
              placeholder="Enter your email address"
            />
          </Input.Root>
          <Input.Root className="w-full">
            <Input.Label required htmlFor="username">
              Gender
            </Input.Label>
            <Input.Field
              id="username"
              type="text"
              placeholder="Enter your email address"
            />
          </Input.Root>
        </Stack>
        <Button variant="primary" size="lg" width="full" buttonText="Finish" />
      </form>
    </Stack>
  );
};

export default Kyc;
