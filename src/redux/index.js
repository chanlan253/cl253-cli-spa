//redux
import { createStore } from "redux";
const defaultValue = {
  userInfo: {},
};
const reducers = (state = defaultValue, action) => {
  switch (action.type) {
    case "SET_LOGIN_USER":
      return { ...state, ...{ userInfo: action.userInfo } };
    default:
      return { ...state, ...{ userInfo: {} } };
  }
};

export default createStore(reducers);
