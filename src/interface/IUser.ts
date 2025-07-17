export interface SignUpFormValues {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  success: boolean;
  message: string;
}

export interface UserProfile {
  _id: string;
  email: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserProfileResponse {
  message: string;
  user: UserProfile;
}
