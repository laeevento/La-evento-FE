import { createFileRoute } from "@tanstack/react-router";
import Register from "@/pages/(auth)/register";

export const Route = createFileRoute("/_auth/register")({
  component: Register,
});
