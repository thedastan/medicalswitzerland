/* External dependencies */
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

/* Local dependencies */
import ActionsAuth from "../Components/Registration/redux/action/Index";
import ActionsUser from "../Components/Interface/redux/action/Index";
import ActionsFile from "../Components/Interface/redux-image/action/Index";

export const useActionsUser = () => {
  const dispatch = useDispatch();
  return bindActionCreators(ActionsUser, dispatch);
};

export const useActionsAuth = () => {
  const dispatch = useDispatch();
  return bindActionCreators(ActionsAuth, dispatch);
};

export const useActionsFile = () => {
  const dispatch = useDispatch();
  return bindActionCreators(ActionsFile, dispatch);
};
