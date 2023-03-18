export const Login = (value) => {
  return {
    type: "LOGIN",
    payload: value,
  };
};

export const LogoutUser = () => {
  return async (dispatch) => {
    console.log("logout dispatch");
    dispatch({
      type: "LOGOUT",
    });
  };
};

export const StoreRegisterDetails = (value) => {
  return (dispatch) => {
    console.log("value", value);
    dispatch({
      type: "STOREREGISTERDETAILS",
      payload: value,
    });
  };
};
