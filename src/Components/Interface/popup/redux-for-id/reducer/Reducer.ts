import {
  ActionFilesIdType,
  FilesIdTypes,
  InterfaceFilesIdState,
} from "../types/Types";

const initalStateFilesId: InterfaceFilesIdState = {
  filesId: "",
};

export const idReducer = (
  state = initalStateFilesId,
  action: ActionFilesIdType
): InterfaceFilesIdState => {
  switch (action.type) {
    case FilesIdTypes.ID_FILES:
      return { ...state, filesId: action.paylaod };
    default:
      return state;
  }
};
