import { Stack, Typography } from "@laevento/components";
import Illustration from "@/assets/auth-illustration.png";
import { Outlet } from "@tanstack/react-router";
import Logo from "@/components/logo";

function AuthLayout() {
  return (
    <Stack className="h-screen bg-foreground py-[1.02rem] px-5 overflow-hidden">
      <Stack direction="row" className="flex-1 h-full" gap="2" align="stretch">
        <Stack className="bg-primary-800 border relative rounded-xl flex-1 basis-1/2">
          <Logo />
          <Stack className="h-full" align="center" justify="center">
            <img src={Illustration} alt="La-Evento Illustration" />
            <Stack className="mt-16" align="center" gap="2">
              <Typography
                variant="white"
                component="h1"
                size="3xl"
                weight="semibold"
              >
                Find Trusted Event Vendors
              </Typography>
              <Typography variant="white" weight="medium" align="center">
                Hire verified planners, caterers, decorators, and <br /> more
                all in one place
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack className="flex-1 bg-white py-[4.312rem] px-[6.4rem] overflow-y-auto">
          <Outlet />
        </Stack>
      </Stack>
    </Stack>
  );
}
export default AuthLayout;
