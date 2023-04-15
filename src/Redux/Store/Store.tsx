/* External dependencies */
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

/* Local dependencies */
import { authReducer } from "../../Components/Registration/redux/reducer/Reducer";
import { filesReducer } from "../../Components/Interface/redux-image/reducer/Reducer";
import { userReducer } from "../../Components/Interface/redux/reducer/Reducer";
import { idReducer } from "../../Components/Interface/popup/redux-for-modal/reducer/Reducer";

const rootReducer = combineReducers({
  authReducer,
  filesReducer,
  userReducer,
  idReducer,
});

export const setUpStore = () => {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setUpStore>;
export type AppDispatch = AppStore["dispatch"];
