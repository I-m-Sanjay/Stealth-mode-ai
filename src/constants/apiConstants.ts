const API_VERSION = "v1";
const API = "api";

// User API
export const LOGIN_API = `${API}/${API_VERSION}/users/login`;
export const SIGN_API = `${API}/${API_VERSION}/users/create`;
export const FORGET_PASSWORD_API = `${API}/${API_VERSION}/users/forget-password`;
export const FORGET_PASSWORD_WITH_TOKEN_API = `${API}/${API_VERSION}/users/reset-password`;

export const AUTH_LOGIN_URL = '/auth/login';
export const AUTH_SIGN_API = '/auth/create';
export const USER_PROFILE_API = `/user/profile`;
// export const AUTH_LOGOUT_URL = 'http://localhost:1509/api/v1/users/logout';
