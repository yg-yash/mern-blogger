import { SET_ERROR, CLEAR_ERROR } from "../types";

const initialState = {
  loading: false,
  errors: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR:
      return { ...state, errors: action.payload };
    case CLEAR_ERROR:
      return { ...state, errors: [] };
    default:
      return state;
  }
};
