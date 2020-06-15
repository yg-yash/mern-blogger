import {
  GET_BLOGS,
  LOADING_BLOG,
  CREATE_BLOG,
  LIKE_BLOG,
  UNLIKE_BLOG,
  EDIT_BLOG,
  DELETE_BLOG,
  INCREASE_COMMENT_COUNT,
  DECREASE_COMMENT_COUNT
} from "../types";

const initialState = {
  blogs: [],
  myblogs: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BLOGS:
      return { ...state, blogs: action.payload, loading: false };
    case CREATE_BLOG:
      return {
        ...state,
        blogs: [action.payload, ...state.blogs],
        loading: false
      };
    case LOADING_BLOG:
      return { ...state, loading: true };
    case LIKE_BLOG:
      const likeIndex = state.blogs.findIndex(
        blog => blog._id === action.payload._id
      );
      state.blogs[likeIndex] = action.payload;

      return { ...state };
    case UNLIKE_BLOG:
      const unlikeIndex = state.blogs.findIndex(
        blog => blog._id === action.payload._id
      );
      state.blogs[unlikeIndex] = action.payload;

      return { ...state };
    case EDIT_BLOG:
      const editBlogIndex = state.blogs.findIndex(
        blog => blog._id === action.payload._id
      );
      state.blogs[editBlogIndex] = action.payload;
      return { ...state };
    case DELETE_BLOG:
      const blogs = state.blogs.filter(blog => blog._id !== action.payload._id);
      return { ...state, blogs };
    case INCREASE_COMMENT_COUNT:
      let outerBlog;
      const blogIndex = state.blogs.findIndex(blog => {
        if (blog._id === action.payload) {
          blog.commentCount++;
          outerBlog = blog;
        }
        return blog._id === action.payload;
      });
      state.blogs[blogIndex] = outerBlog;
      return { ...state };
    case DECREASE_COMMENT_COUNT:
      let foundBlog;
      const blogFoundIndex = state.blogs.findIndex(blog => {
        if (blog._id === action.payload) {
          blog.commentCount--;
          foundBlog = blog;
        }
        return blog._id === action.payload;
      });
      state.blogs[blogFoundIndex] = foundBlog;
      return { ...state };

    default:
      return state;
  }
};
