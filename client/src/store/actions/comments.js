import {
  CREATE_COMMENT,
  SET_ERROR,
  LOADING_COMMENT,
  GET_COMMENTS,
  DELETE_COMMENT,
  EDIT_COMMENT,
  INCREASE_COMMENT_COUNT,
  DECREASE_COMMENT_COUNT,
  CLEAR_ERROR
} from "../types";
import axios from "axios";
import { getNotifications } from "./notifications";

export const createComment = (blogId, commentValues) => async dispatch => {
  try {
    const response = await axios.post(
      `/comment/${blogId}/newcomment`,
      commentValues
    );
    dispatch({ type: CREATE_COMMENT, payload: response.data });
    dispatch({ type: INCREASE_COMMENT_COUNT, payload: blogId });
    dispatch({ type: CLEAR_ERROR });
    dispatch(getNotifications());
  } catch (error) {
    console.log(error);
    dispatch({ type: SET_ERROR, payload: error.response.data });
  }
};

export const getComments = blogId => async dispatch => {
  dispatch({ type: LOADING_COMMENT });
  try {
    const response = await axios.get(`/comment/${blogId}`);
    dispatch({ type: GET_COMMENTS, payload: response.data });
    dispatch(getNotifications());
  } catch (error) {
    console.log(error);
    dispatch({ type: SET_ERROR, payload: error.response.data });
  }
};

export const deleteComment = (blogId, commentId) => async dispatch => {
  try {
    const response = await axios.delete(`/comment/${blogId}/${commentId}`);
    dispatch({ type: DELETE_COMMENT, payload: response.data });
    dispatch({ type: DECREASE_COMMENT_COUNT, payload: blogId });
    dispatch(getNotifications());
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.response.data });
  }
};
export const editComment = (
  blogId,
  commentId,
  commentValue
) => async dispatch => {
  try {
    const response = await axios.patch(
      `/comment/${blogId}/${commentId}`,
      commentValue
    );
    dispatch({ type: EDIT_COMMENT, payload: response.data });
    dispatch(getNotifications());
    dispatch({ type: CLEAR_ERROR });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.response.data });
  }
};
