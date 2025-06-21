const API_VERSION = "v1";
const API = "api";

// User API
export const LOGIN_API = `${API}/${API_VERSION}/users/login`;
export const SIGN_API = `${API}/${API_VERSION}/users/create`;
export const FORGET_PASSWORD_API = `${API}/${API_VERSION}/users/forget-password`;
export const FORGET_PASSWORD_WITH_TOKEN_API = `${API}/${API_VERSION}/users/reset-password`;
