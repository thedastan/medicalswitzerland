import { ActionFilesIdType, ModalTypes } from "../types/Types";

export const ActionFilesId = (payload: string): ActionFilesIdType => {
  return { type: ModalTypes.ID_FILES, payload };
};

export const ActionActiveModalMedia = (payload: boolean): ActionFilesIdType => {
  return { type: ModalTypes.ACTIVE_MODAL_MEDIA, payload };
};

export const ActionActiveSubtrac = (payload: boolean): ActionFilesIdType => {
  return { type: ModalTypes.SUBTRACT, payload };
};

export const ActionActiveProfile = (payload: boolean): ActionFilesIdType => {
  return { type: ModalTypes.PROFILE, payload };
};

export const ActionActiveIsAkte = (payload: boolean): ActionFilesIdType => {
  return { type: ModalTypes.IS_AKTE, payload };
};

export const ACtionActiveMore = (payload: boolean): ActionFilesIdType => {
  return { type: ModalTypes.MORE, payload };
};
