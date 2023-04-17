export enum InterfaceUserTypes {
  USERS = "USERS",
  USER_UPLOAD = "USER_UPLOAD",
  USER_ERROR = "USER_ERROR",
  USER_LOADER = "USER_LOADER",
  BEARBEITEN = "BEARBEITEN",
}

export interface IInterfaceUser {
  email?: string | null;
  username?: string | null;
  avatar?: string | null;
  contact?: string | null;
  birth_date?: string | null;
  allergies?: string | null;
  emergency_contact?: string | null;
  particularities?: string | null;
  operation?: string | null;
  allergies_text?: string | null;
  medications?: string | null;
  why_diagnose?: string | null;
  profession?: string | null;
  card_id?: string | null;
  is_first_time?: string | null;
  location?: string | null;
  full_name?: string | null;
}

export interface IInterfaceUserState {
  user: IInterfaceUser;
  error: string | any | null;
  loading: boolean;
  bearbeiten: boolean;
}

interface IActionGetUser {
  type: InterfaceUserTypes.USERS;
  payload: IInterfaceUser;
}

interface IActionLoaderUser {
  type: InterfaceUserTypes.USER_LOADER;
  payload: boolean;
}

interface IActionErrorUser {
  type: InterfaceUserTypes.USER_ERROR;
  payload: string | unknown;
}

interface IActionUserPut {
  type: InterfaceUserTypes.USER_UPLOAD;
  payload: IInterfaceUser;
}

interface IActionBearbeiten {
  type: InterfaceUserTypes.BEARBEITEN;
  payload: boolean;
}

export type ActionTypesUser =
  | IActionErrorUser
  | IActionGetUser
  | IActionLoaderUser
  | IActionUserPut
  | IActionBearbeiten;
