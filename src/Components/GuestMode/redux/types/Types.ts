export enum IGuestTypes {
  MODAL_GUEST = "MODAL_GUEST",
  GUEST_ID = "GUEST_ID",
}

export interface initialGuestState {
  idGuest: string;
  activeModal: boolean;
}

interface IActiveModalGuest {
  type: IGuestTypes.MODAL_GUEST;
  payload: boolean;
}

interface IActionGetIdGuest {
  type: IGuestTypes.GUEST_ID;
  payload: string;
}

export type ActionGuest = IActionGetIdGuest | IActiveModalGuest;
