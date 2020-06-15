import { GET_NOTIFICATIONS } from "../types";

const initialState = {
  notifications: null,
  error: null,
  loading: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
        error: null,
        loading: false
      };
    default:
      return initialState;
  }
};
