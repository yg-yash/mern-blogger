import React from "react";
import { connect } from "react-redux";

const CommentCount = props => {
  return <>{props.commentCount}</>;
};

const mapStateToProps = (state, ownProps) => {
  let outerBlog;
  state.blog.blogs.forEach(blog => {
    if (ownProps.blog._id === blog._id) {
      outerBlog = blog;
    }
  });

  return { commentCount: outerBlog.commentCount };
};
export default connect(mapStateToProps)(CommentCount);
