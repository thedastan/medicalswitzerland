import { ActionFilesIdType, FilesIdTypes } from "../types/Types";

export const ActionFilesId = (paylaod: string): ActionFilesIdType => {
  return { type: FilesIdTypes.ID_FILES, paylaod };
};
