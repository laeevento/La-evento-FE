import { useMutation } from "@tanstack/react-query";
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  submitKyc,
} from "@/api/auth";
import type {
  LoginFormData,
  ForgotPasswordFormData,
  ResetPasswordFormData,
  KycFormData,
  RegisterPayload,
} from "@/types";

export const useRegister = () =>
  useMutation({
    mutationFn: (data: RegisterPayload) => registerUser(data),
  });

export const useLogin = () =>
  useMutation({
    mutationFn: (data: LoginFormData) => loginUser(data),
  });

export const useForgotPassword = () =>
  useMutation({
    mutationFn: (data: ForgotPasswordFormData) => forgotPassword(data),
  });

export const useResetPassword = () =>
  useMutation({
    mutationFn: (data: ResetPasswordFormData) => resetPassword(data),
  });

export const useSubmitKyc = () =>
  useMutation({
    mutationFn: (data: KycFormData) => submitKyc(data),
  });
