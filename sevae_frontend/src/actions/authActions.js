import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";

export const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const startLogin = (schoolId, password) => {
  return async (dispatch) => {
    const resp = await fetchSinToken(
      "auth/login",
      { schoolId, password },
      "POST"
    );
    const body = await resp.json();
    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(login({ uid: body.uid, name: body.name }));
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const startChecking = () => {
  return async (dispatch) => {
    const resp = await fetchConToken("auth/renew");
    const body = await resp.json();
    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(login({ uid: body.uid }));
    } else {
      dispatch(checkingFinish());
    }
  };
};

export const checkingFinish = () => ({ type: types.authCheckingFinish });

export const startLogout = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    dispatch(logout());
  };
};
const logout = () => ({ type: types.authLogout });
