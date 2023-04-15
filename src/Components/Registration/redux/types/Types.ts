export enum AuthTypes {
  AUTH_USER = "AUTH_USER",
  AUTH_USER_ERROR = "AUTH_USER_ERROR",
  AUTH_USER_LOADER = "AUTH_USER_LOADER",

  LOGIN_USER = "LOGIN_USER",
  LOGIN_USER_ERROR = "LOGIN_USER_ERROR",
  LOGIN_USER_LOADING = "LOGIN_USER_LOADING",
}

export interface IAuthState {
  authorized: boolean;
  error: string | unknown;
  loading: boolean;

  loginLoder: boolean;
  loginError: string | unknown;
}

export interface IAuthPostData {
  email: string;
  password: string;
}

interface IActionAuthSucces {
  type: AuthTypes.AUTH_USER;
  payload: boolean;
}

interface IActionAuthError {
  type: AuthTypes.AUTH_USER_ERROR;
  payload: string | unknown;
}

interface IActionAuthLoading {
  type: AuthTypes.AUTH_USER_LOADER;
  payload: boolean;
}

interface IActionLoginSuccess {
  type: AuthTypes.LOGIN_USER;
}

interface IActionLoginError {
  type: AuthTypes.LOGIN_USER_ERROR;
  payload: string | unknown;
}

interface IActionLoginLoading {
  type: AuthTypes.LOGIN_USER_LOADING;
  payload: boolean;
}

export type ActionTypesAuth =
  | IActionAuthError
  | IActionAuthLoading
  | IActionAuthSucces
  | IActionLoginError
  | IActionLoginLoading
  | IActionLoginSuccess;
