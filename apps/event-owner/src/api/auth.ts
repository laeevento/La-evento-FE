import { post } from "./client";
import type {
  LoginFormData,
  ForgotPasswordFormData,
  ResetPasswordFormData,
  KycFormData,
  AuthResponse,
  MessageResponse,
  RegisterPayload,
} from "@/types";

export const registerUser = (data: RegisterPayload) =>
  post<AuthResponse>("/auth/signup", data);

export const loginUser = (data: LoginFormData) =>
  post<AuthResponse>("/auth/login", data);

export const forgotPassword = (data: ForgotPasswordFormData) =>
  post<MessageResponse>("/auth/forgot-password", data);

export const resetPassword = (data: ResetPasswordFormData) =>
  post<MessageResponse>("/auth/reset-password", data);

export const submitKyc = (data: KycFormData) =>
  post<MessageResponse>("/auth/kyc", data);
