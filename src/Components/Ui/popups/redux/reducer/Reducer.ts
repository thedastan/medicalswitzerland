import {
  ActionTypesPopupMessage,
  PopupTypesFormEssage,
  initialPopupMessageState,
} from "../types/Types";

const initialState: initialPopupMessageState = {
  error: false,
  reset_password: false,
  success: false,
  upload: false,
};

export const messageReducer = (
  state = initialState,
  action: ActionTypesPopupMessage
): initialPopupMessageState => {
  switch (action.type) {
    case PopupTypesFormEssage.ERROR:
      return { ...state, error: action.payload };

    case PopupTypesFormEssage.RESSET_PASSWORD:
      return { ...state, reset_password: action.payload };

    case PopupTypesFormEssage.SUCCESS:
      return { ...state, success: action.payload };

    case PopupTypesFormEssage.UPLOAD:
      return { ...state, upload: action.payload };

    default:
      return state;
  }
};
