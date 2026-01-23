import { Button, Input, Stack } from "@laevento/components";

export default function Home() {
  return (
    <div className="min-h-screen rounded-xl flex items-center justify-center">
      <Stack justify="center" align="center">
        <Button
          className="h1 border-grey"
          variant="primary"
          size="lg"
          rounded="full"
        >
          This is a button
        </Button>
        <Input.Root variant="error">
          <Input.Label htmlFor="input">New Label</Input.Label>
          <Input.Field placeholder="Placeholder" id="input" />
          <Input.Info>Info</Input.Info>
          <Input.Error>Error</Input.Error>
        </Input.Root>
      </Stack>
    </div>
  );
}
