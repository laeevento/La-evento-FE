import * as yup from "yup";
import type {
  RegisterFormData,
  LoginFormData,
  ForgotPasswordFormData,
  ResetPasswordFormData,
  KycFormData,
} from "@/types";

export const registerSchema: yup.ObjectSchema<RegisterFormData> = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Must be at least 8 characters")
    .matches(/[A-Z]/, "Must include an uppercase letter")
    .matches(/[a-z]/, "Must include a lowercase letter")
    .matches(/[0-9]/, "Must include a number")
    .matches(/[@#$%^&*?]/, "Must include a symbol (@#$%^&*?)"),
  confirmPassword: yup
    .string()
    .required("Confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
  acceptedTerms: yup
    .boolean()
    .oneOf([true], "You must accept the terms")
    .required(),
});

export const loginSchema: yup.ObjectSchema<LoginFormData> = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const forgotPasswordSchema: yup.ObjectSchema<ForgotPasswordFormData> =
  yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
  });

export const resetPasswordSchema: yup.ObjectSchema<ResetPasswordFormData> =
  yup.object({
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Must be at least 8 characters")
      .matches(/[A-Z]/, "Must include an uppercase letter")
      .matches(/[a-z]/, "Must include a lowercase letter")
      .matches(/[0-9]/, "Must include a number")
      .matches(/[@#$%^&*?]/, "Must include a symbol (@#$%^&*?)"),
    confirmPassword: yup
      .string()
      .required("Confirm your password")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

export const kycSchema: yup.ObjectSchema<KycFormData> = yup.object({
  username: yup.string().required("Username is required"),
  fullName: yup.string().required("Full name is required"),
  about: yup.string().required("Tell us about yourself"),
  dateOfBirth: yup.string().required("Date of birth is required"),
  gender: yup
    .string()
    .oneOf(["male", "female"], "Select a valid gender")
    .required("Gender is required"),
});
