//222
export const reducers = (state, action) => {
  switch (action.type) {
    case "SET_LOGIN_USER":
      return { ...state, ...{ userInfo: action.userInfo } };
    default:
      return { ...state, ...{ userInfo: {} } };
  }
};
