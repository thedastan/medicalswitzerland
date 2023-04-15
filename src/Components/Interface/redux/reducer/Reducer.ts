/* Local dependencies */
import {
  ActionTypesUser,
  IInterfaceUserState,
  InterfaceUserTypes,
} from "../types/Types";

const initalStateUser: IInterfaceUserState = {
  error: "",
  loading: false,
  user: {},
  bearbeiten: true,
};

export const userReducer = (
  state = initalStateUser,
  action: ActionTypesUser
): IInterfaceUserState => {
  switch (action.type) {
    case InterfaceUserTypes.USER_LOADER:
      return { ...state, loading: true };

    case InterfaceUserTypes.USERS:
      return { ...state, loading: false, error: "", user: action.payload };

    case InterfaceUserTypes.USER_ERROR:
      return { ...state, loading: false, error: action.payload };

    case InterfaceUserTypes.BEARBEITEN:
      return {
        ...state,
        loading: false,
        bearbeiten: action.payload,
      };

    default:
      return state;
  }
};
