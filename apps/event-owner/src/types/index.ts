export interface RegisterFormData {
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

export interface KycFormData {
  username: string;
  fullName: string;
  about: string;
  dateOfBirth: string;
  gender: string;
}

// API Response

export interface RegisterPayload extends RegisterFormData {
  userType: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

export interface MessageResponse {
  message: string;
}

export interface ApiError {
  success: boolean;
  error: {
    code: string;
    message: string;
    details?: {
      field: string;
      message: string;
    }[];
  };
}
