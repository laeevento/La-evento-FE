import { createFileRoute } from "@tanstack/react-router";
import AuthLayout from "@/layout/auth";

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
});
