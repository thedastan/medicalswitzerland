/* External dependencies */
import { Dispatch } from "redux";

/* Local dependencies */
import {
  ActionTypesUser,
  IInterfaceUser,
  InterfaceUserTypes,
} from "../types/Types";
import API, { API_ADDRESS } from "../../../../Api";
import axios from "axios";

export const ActionGetUser = (id?: string) => {
  return async (dispatch: Dispatch<ActionTypesUser>) => {
    try {
      dispatch({ type: InterfaceUserTypes.USER_LOADER, payload: true });
      const response = await axios.post(`${API_ADDRESS}users/${id}`);
      const data = response.data;

      response.status === 200 ||
        (201 &&
          dispatch({ type: InterfaceUserTypes.USER_LOADER, payload: false }));

      dispatch({ type: InterfaceUserTypes.USERS, payload: data });
    } catch (e) {
      dispatch({ type: InterfaceUserTypes.USER_LOADER, payload: false });
      dispatch({ type: InterfaceUserTypes.USER_ERROR, payload: e });
    }
  };
};

export const ActionPutUser = (postData?: IInterfaceUser) => {
  return async (dispatch: Dispatch<ActionTypesUser>) => {
    try {
      const response = await API.put(`users/`, postData);
      const data = response.data;

      dispatch({ type: InterfaceUserTypes.USER_UPLOAD, payload: data });
    } catch (e) {
      dispatch({ type: InterfaceUserTypes.USER_ERROR, payload: e });
    }
  };
};

export const ActionBearbeiten = (payload: boolean): ActionTypesUser => {
  return { type: InterfaceUserTypes.BEARBEITEN, payload };
};
