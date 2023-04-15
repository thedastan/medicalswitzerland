import {
  ActionFilesIdType,
  ModalTypes,
  InterfaceFilesIdState,
} from "../types/Types";

const initalStateFilesId: InterfaceFilesIdState = {
  activeMediaModal: false,
  profile: false,
  subtract: false,
  isAkte: false,
  more: false,
  filesId: "",
};

export const idReducer = (
  state = initalStateFilesId,
  action: ActionFilesIdType
): InterfaceFilesIdState => {
  switch (action.type) {
    case ModalTypes.ID_FILES:
      return { ...state, filesId: action.payload };

    case ModalTypes.ACTIVE_MODAL_MEDIA:
      return { ...state, activeMediaModal: action.payload };

    case ModalTypes.PROFILE:
      return { ...state, profile: action.payload };

    case ModalTypes.SUBTRACT:
      return { ...state, subtract: action.payload };

    case ModalTypes.IS_AKTE:
      return { ...state, isAkte: action.payload };

    case ModalTypes.MORE:
      return { ...state, more: action.payload };

    default:
      return state;
  }
};
