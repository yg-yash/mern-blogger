import React from "react";
import BlogCard from "./BlogCard";
import withStyles from "@material-ui/core/styles/withStyles";
import BlogSkeleton from "../../util/skeletons/blogs/BlogSkeleton";
import NoBlogs from "./NoBlogs";
const styles = theme => ({
  root: {
    minWidth: 275,
    margin: "10px auto 10px auto",
    textAlign: "center",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
  },
  cardHeader: {
    margin: "5px 0 0 0",
    padding: 0
  },
  avatar: {
    left: "20px",
    top: "5px",
    backgroundColor: "pink"
  },
  body: {
    margin: "7px"
  }
});
const BlogList = props => {
  const {
    classes,
    blog: { blogs, loading }
  } = props;
  return loading ? (
    <BlogSkeleton />
  ) : blogs.length === 0 ? (
    <NoBlogs />
  ) : (
    blogs.map(blog => (
      <BlogCard
        blog={blog}
        key={blog._id}
        classes={classes}
        isDetailsOpen={true}
      />
    ))
  );
};

export default withStyles(styles)(BlogList);
