import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import BlogCard from "./BlogCard";
import AddCommentCard from "../Comments/AddCommentCard";
import CommentCard from "../Comments/CommentCard";
import { connect } from "react-redux";
import { getComments } from "../../store/actions/comments";
import CommentListSkeleton from "../../util/skeletons/comment/CommentListSkeleton";
const styles = theme => ({
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  root: {
    minWidth: "80%",
    margin: "10px auto 10px auto",
    textAlign: "center",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
  },
  cardHeader: {
    margin: "5px 0 0 0",
    padding: 0,
    color: theme.palette.secondary.light
  },
  avatar: {
    left: "20px",
    top: "5px",
    backgroundColor: theme.palette.secondary.light
  },
  body: {
    margin: "7px"
  },
  addComment: {
    padding: "20px 0 20px 0"
  }
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class BlogDetails extends Component {
  componentDidMount() {
    this.props.getComments(this.props.blog._id);
  }
  render() {
    const { classes, open, handleDetailsClose, blog, comment } = this.props;

    return (
      <div>
        <Dialog
          fullScreen
          open={open}
          onClose={handleDetailsClose}
          TransitionComponent={Transition}
          scroll="body"
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleDetailsClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                {`${blog.user.name}'s Blog`}
              </Typography>
            </Toolbar>
          </AppBar>
          <BlogCard blog={blog} classes={classes} />
          <AddCommentCard
            blog={blog}
            classes={classes}
            className={classes.addComment}
          />
          {comment.loading ? (
            <CommentListSkeleton />
          ) : (
            <CommentCard comment={comment} classes={classes} />
          )}
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({ comment: state.comment });

export default connect(mapStateToProps, { getComments })(
  withStyles(styles)(BlogDetails)
);
