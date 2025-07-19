export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface ILoginResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    email: string;
    password: string;
    name: string;
    isActive: boolean;
    loginAttempts: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
    lastLoginAt: string;
  };
  accessToken: string;
}

export interface IForgotPasswordRequest {
  email: string;
}

export interface IForgotPasswordResponse {
  success: boolean;
  message: string;
}

export interface IResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IResetPasswordResponse {
  success: boolean;
  message: string;
}

export interface IUserSlice {
  data: null | ILoginResponse;
  isAuthenticated: boolean;
  loading: boolean;
  error: null | string;
} 