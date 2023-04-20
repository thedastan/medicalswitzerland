import { ActionTypesPopupMessage, PopupTypesFormEssage } from "../types/Types";

export const ActionSuccess = (payload: boolean): ActionTypesPopupMessage => {
  return { type: PopupTypesFormEssage.SUCCESS, payload };
};

export const ActionError = (payload: boolean): ActionTypesPopupMessage => {
  return { type: PopupTypesFormEssage.ERROR, payload };
};

export const ActionReset = (payload: boolean): ActionTypesPopupMessage => {
  return { type: PopupTypesFormEssage.RESSET_PASSWORD, payload };
};

export const ActionUpload = (payload: boolean) => {
  return { type: PopupTypesFormEssage.UPLOAD, payload };
};
