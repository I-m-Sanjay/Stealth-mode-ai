import qs from 'qs';
import { RequestMethod  } from '../utils/httpMethods';

const API_KEY = import.meta.env.VITE_API_KEY;
const API_TIMEOUT = 30000;
const TOKEN = 'token';
const ID_TOKEN = 'idToken';

export const formatRequest = (path: string, method: RequestMethod , data: any = null, useAuth: boolean = true, useIdToken: boolean = false,customHeaders: Record<string, string> = {}, timeout: number = API_TIMEOUT) => {
  const apiVersion = import.meta.env.VITE_API_VERSION || "v1";
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  let headers: Record<string, string> = {
    "x-api-key": API_KEY,
    "x-api-version": apiVersion,
    "x-user-platform": "WEB",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    ...customHeaders,
  };

  if (useAuth) {
    const accessToken = localStorage.getItem(TOKEN);
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }
  }

  if (useIdToken) {
    const idToken = localStorage.getItem(ID_TOKEN);
    if (idToken) {
      headers["x-id-token"] = idToken;
    }
  }

  let query = qs.stringify({ ...(method.toLowerCase() === "get" ? data : undefined) });
  const url = `${BASE_URL}${path}${query !== "" ? "?" + query : ""}`;
  return { method, url, data, headers, timeout };
};