import {
  CREATE_COMMENT,
  LOADING_COMMENT,
  GET_COMMENTS,
  DELETE_COMMENT,
  EDIT_COMMENT
} from "../types";

const initialState = {
  comments: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_COMMENT:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
        loading: false
      };
    case LOADING_COMMENT:
      return { ...state, loading: true };
    case GET_COMMENTS:
      return { ...state, comments: action.payload, loading: false };
    case EDIT_COMMENT:
      const editCommentIndex = state.comments.findIndex(
        comment => comment._id === action.payload._id
      );
      state.comments[editCommentIndex] = action.payload;

      return { ...state };
    case DELETE_COMMENT:
      const comments = state.comments.filter(
        comment => comment._id !== action.payload._id
      );
      return { ...state, comments };
    default:
      return state;
  }
};
