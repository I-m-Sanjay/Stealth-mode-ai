import type { ILoginCredentials, ILoginResponse, IForgotPasswordRequest, IForgotPasswordResponse, IResetPasswordRequest, IResetPasswordResponse } from '../../interface/IAuth';
import type { SignUpPayload, SignUpResponse } from '../../interface/IUser';
import { AUTH_LOGIN_URL, AUTH_SIGN_API, FORGOT_PASSWORD_URL, RESET_PASSWORD_URL } from '../../constants/apiConstants';
import axiosInstance from '../axiosInstance';

export const doLogin = async (loginPayload: ILoginCredentials): Promise<ILoginResponse> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(AUTH_LOGIN_URL, loginPayload)
      .then((res)=> {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const doSignUp = async (signUpPayload: SignUpPayload): Promise<SignUpResponse> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(AUTH_SIGN_API, signUpPayload)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const ForgotPassword = async (forgotPasswordPayload: IForgotPasswordRequest): Promise<IForgotPasswordResponse> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(FORGOT_PASSWORD_URL, forgotPasswordPayload)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const ResetPasswordAPI = async (resetPasswordPayload: IResetPasswordRequest): Promise<IResetPasswordResponse> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(RESET_PASSWORD_URL, resetPasswordPayload)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

