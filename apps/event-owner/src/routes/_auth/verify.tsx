import { createFileRoute } from "@tanstack/react-router";
import Verify from "@/pages/(auth)/verify";

export const Route = createFileRoute("/_auth/verify")({
  component: Verify,
});
