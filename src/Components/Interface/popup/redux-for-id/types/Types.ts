export enum FilesIdTypes {
  ID_FILES = "ID_FILES",
}

export interface InterfaceFilesIdState {
  filesId: string;
}

interface IActionFilesId {
  type: FilesIdTypes.ID_FILES;
  paylaod: string;
}

export type ActionFilesIdType = IActionFilesId;
