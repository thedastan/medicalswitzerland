import { ActionGuest, IGuestTypes, initialGuestState } from "../types/Types";

const initialState: initialGuestState = {
  activeModal: false,
  idGuest: "",
};

export const guestReducer = (
  state = initialState,
  action: ActionGuest
): initialGuestState => {
  switch (action.type) {
    case IGuestTypes.GUEST_ID:
      return { ...state, idGuest: action.payload };

    case IGuestTypes.MODAL_GUEST:
      return { ...state, activeModal: action.payload };

    default:
      return state;
  }
};
