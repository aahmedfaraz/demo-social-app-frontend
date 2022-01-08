import { combineReducers } from "redux";
import userDataReducer from "./userDataReducer";
import menuDataReducer from "./menuDataReducer";
export default combineReducers({
  user: userDataReducer,
  menu: menuDataReducer,
});
