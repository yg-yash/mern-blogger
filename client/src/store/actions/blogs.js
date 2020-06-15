import {
  CREATE_BLOG,
  LOADING_BLOG,
  GET_BLOGS,
  SET_ERROR,
  CLEAR_ERROR,
  LIKE_BLOG,
  UNLIKE_BLOG,
  EDIT_BLOG,
  DELETE_BLOG
} from "../types";
import axios from "axios";
import { getNotifications } from "./notifications";

export const getBlogs = () => async (dispatch, getState) => {
  dispatch({ type: LOADING_BLOG });
  try {
    const response = await axios.get("/blog/blogs");
    dispatch({ type: GET_BLOGS, payload: response.data });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.response.data });
  }
};

export const createBlog = (blogValues, history) => async dispatch => {
  try {
    const response = await axios.post("/blog/create", blogValues);
    dispatch({ type: CREATE_BLOG, payload: response.data });
    dispatch({ type: CLEAR_ERROR });
    dispatch(getNotifications());
    history.push("/");
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.response.data });
  }
};

export const likeBlog = blogId => async dispatch => {
  try {
    const response = await axios.get(`/blog/${blogId}/like`);
    dispatch({ type: LIKE_BLOG, payload: response.data });
    dispatch(getNotifications());
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.response.data });
  }
};
export const unlikeBlog = blogId => async dispatch => {
  try {
    const response = await axios.get(`/blog/${blogId}/unlike`);
    dispatch({ type: UNLIKE_BLOG, payload: response.data });
    dispatch(getNotifications());
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.response.data });
  }
};

export const editBlog = (blogValues, blogId) => async dispatch => {
  try {
    const response = await axios.patch(`/blog/blogs/${blogId}`, blogValues);
    dispatch({ type: EDIT_BLOG, payload: response.data });
    dispatch(getNotifications());
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.response.data });
  }
};

export const deleteBlog = blogId => async dispatch => {
  try {
    const response = await axios.delete(`/blog/blogs/${blogId}`);
    dispatch({ type: DELETE_BLOG, payload: response.data });
    dispatch(getNotifications());
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.response.data });
  }
};
