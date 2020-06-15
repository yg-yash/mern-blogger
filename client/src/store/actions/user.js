import {
  SET_USER,
  SET_UNAUTHENTICATED,
  SET_ERROR,
  USER_LOADING,
  CLEAR_ERROR
} from "../types";
import axios from "axios";
import setAuthToken from "../../util/setAuthToken";

export const logIn = (userDetails, history) => async dispatch => {
  try {
    const response = await axios.post("/user/login", userDetails);
    const { token } = response.data;
    localStorage.setItem("jwtToken", token);
    setAuthToken(token);
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERROR });
    setTimeout(() => {
      return history.push("/");
    }, 100);
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.response.data });
  }
};

export const signup = (userDetails, history) => async dispatch => {
  try {
    await axios.post("/user/signup", userDetails);
    dispatch({ type: CLEAR_ERROR });
    history.push("/login");
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.response.data });
  }
};

export const getUserData = () => async dispatch => {
  dispatch({ type: USER_LOADING });
  try {
    const response = await axios.get("/user/current_user");
    dispatch({ type: SET_USER, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};
export const logout = history => async dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch({ type: SET_UNAUTHENTICATED });
  history.push("/login");
};

export const editUser = editedUser => async (dispatch, getState) => {
  try {
    await axios.patch("user/edit", editedUser);
    dispatch({ type: USER_LOADING });
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERROR });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.response.data });
  }
};
