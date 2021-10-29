import { combineReducers } from "redux";
import adminReducer from "./adminReducer";
import errorReducer from "./errorReducer";
import studentReducer from "./studentReducer";
import messageReducer from "./messageReducer";
import doctorReducer from "./doctorReducer";

export default combineReducers({
  admin: adminReducer,
  doctor: doctorReducer,
  student: studentReducer,
  errors: errorReducer,
  message: messageReducer,
});
