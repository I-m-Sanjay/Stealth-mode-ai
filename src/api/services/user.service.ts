import axios from "axios";
import { formatRequest } from "../common";
import type { LoginForm, SignUpFormValues } from "../../interface/IUser";
import { LOGIN_API, SIGN_API, FORGET_PASSWORD_API, FORGET_PASSWORD_WITH_TOKEN_API } from "../../constants/apiConstants";
import { RequestMethod  } from "../../utils/httpMethods";



export function userLogin(data: Partial<LoginForm>) {
    return axios(formatRequest(LOGIN_API, RequestMethod.POST, data, true, true))
}

export function userSignUp(data: Partial<SignUpFormValues>) {
    return axios(formatRequest(SIGN_API, RequestMethod.POST, data, false, false))
}

export function forgetPassword(data: { email: string }) {
    return axios(formatRequest(FORGET_PASSWORD_API, RequestMethod.POST, data, false, false))
}

export function resetPassword(token: string, data: { password: string; confirmPassword: string }) {
    return axios(formatRequest(`${FORGET_PASSWORD_WITH_TOKEN_API}/${token}`, RequestMethod.POST, data, false, false))
}
