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
    userName: string;
    isActive: boolean;
    loginAttempts: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
    lastLoginAt: string;
  };
  accessToken: string;
}

export interface IUserSlice {
  data: null | ILoginResponse;
  isAuthenticated: boolean;
  loading: boolean;
  error: null | string;
} 