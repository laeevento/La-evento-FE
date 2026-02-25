import { createFileRoute } from "@tanstack/react-router";
import Kyc from "@/pages/(auth)/kyc";

export const Route = createFileRoute("/_auth/kyc")({
  component: Kyc,
});
