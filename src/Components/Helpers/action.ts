import axios from "axios";

import { API_ADDRESS } from "../../Api";
import { getAccessToken } from ".";

export const tokenVerification = (setValidToken: (value: boolean) => void) => {
  if (getAccessToken()) {
    axios
      .post(`${API_ADDRESS}users/auth/verify/`, { token: getAccessToken() })
      .then(() => {
        setValidToken(true);
      })
      .catch(() => {
        setValidToken(false);
      });
  } else {
    setValidToken(false);
  }
};
