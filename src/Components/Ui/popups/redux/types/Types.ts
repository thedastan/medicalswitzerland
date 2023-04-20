export enum PopupTypesFormEssage {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  UPLOAD = "UPLOAD",
  RESSET_PASSWORD = "RESSET_PASSWORD",
}

export interface initialPopupMessageState {
  success: boolean;
  upload: boolean;
  error: boolean;
  reset_password: boolean;
}

interface IActionPopupMessageSuccess {
  type: PopupTypesFormEssage.SUCCESS;
  payload: boolean;
}

interface IActionPopupMessageError {
  type: PopupTypesFormEssage.ERROR;
  payload: boolean;
}

interface IActionPopupMessageUpload {
  type: PopupTypesFormEssage.UPLOAD;
  payload: boolean;
}

interface IActionPopupMessageResetPassword {
  type: PopupTypesFormEssage.RESSET_PASSWORD;
  payload: boolean;
}

export type ActionTypesPopupMessage =
  | IActionPopupMessageError
  | IActionPopupMessageResetPassword
  | IActionPopupMessageSuccess
  | IActionPopupMessageUpload;
