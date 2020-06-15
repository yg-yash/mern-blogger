import {
  SET_USER,
  SET_UNAUTHENTICATED,
  SET_AUTHENTICATED,
  USER_LOADING
} from "../types";

const initialState = {
  user: null,
  authenticated: false,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case SET_USER:
      return {
        ...state,
        loading: false,
        authenticated: true,
        user: action.payload
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
