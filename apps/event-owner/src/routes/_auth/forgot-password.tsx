import { createFileRoute } from "@tanstack/react-router";
import ForgotPassword from "@/pages/(auth)/forgot-password";

export const Route = createFileRoute("/_auth/forgot-password")({
  component: ForgotPassword,
});
