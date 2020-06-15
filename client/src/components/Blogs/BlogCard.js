import React, { Component, Fragment } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { connect } from "react-redux";
import { likeBlog, unlikeBlog } from "../../store/actions/blogs";
import BlogOptions from "./BlogOptions";
import BlogDetails from "./BlogDetails";
import CommentCount from "../Comments/CommentCount";
import moment from "moment";

class BlogCard extends Component {
  state = {
    anchorEl: null,
    menuOpen: false,
    detailsOpen: false
  };

  handleDetailsOpen = () => {
    this.setState({ detailsOpen: true });
  };

  handleDetailsClose = () => {
    this.setState({ detailsOpen: false });
  };

  handleClick = event => {
    const anchorEl = event.currentTarget;
    this.setState({ anchorEl, menuOpen: !this.state.menuOpen });
  };

  render() {
    const {
      blog,
      classes,
      likeBlog,
      unlikeBlog,
      user,
      isDetailsOpen
    } = this.props;
    const date = moment
      .utc(blog.created_at)
      .toDate()
      .toString();
    return (
      <Fragment>
        <BlogDetails
          open={this.state.detailsOpen}
          handleDetailsClose={this.handleDetailsClose}
          handleDetailsOpen={this.handleDetailsOpen}
          blog={blog}
        />
        <Card className={classes.root} variant="outlined">
          <CardHeader
            className={classes.cardHeader}
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {blog.user.name[0]}
              </Avatar>
            }
            action={
              blog.user._id.toString() === user.user._id.toString() && (
                <Tooltip title="Settings">
                  <IconButton
                    aria-label="settings"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={this.handleClick}
                  >
                    <BlogOptions
                      className={classes.options}
                      handleClick={this.handleClick}
                      anchorEl={this.state.anchorEl}
                      open={this.state.menuOpen}
                      blog={blog}
                    />
                    <MoreVertIcon />
                  </IconButton>
                </Tooltip>
              )
            }
            subheader={
              <Typography
                variant="overline"
                component="p"
                color="textSecondary"
              >
                {moment(date, "ddd MMM DD YYYY HH:mm:ss GMT Z").fromNow()}
              </Typography>
            }
          />
          <CardContent
            style={{ cursor: "pointer" }}
            onClick={isDetailsOpen ? this.handleDetailsOpen : null}
          >
            <Typography variant="h5" component="h5" color="secondary">
              {blog.title}
            </Typography>
            <Typography
              variant="body2"
              component="p"
              color="textPrimary"
              style={{
                wordWrap: "break-word",
                whiteSpace: "initial"
              }}
            >
              {blog.body}
            </Typography>
          </CardContent>

          <CardActions>
            {blog.likedBy.find(curblog => {
              return curblog.author.toString() === user.user._id.toString();
            }) ? (
              <Tooltip title="UnLike">
                <IconButton
                  aria-label="add to favorites"
                  onClick={() => unlikeBlog(blog._id)}
                >
                  <FavoriteIcon color="error" />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Like">
                <IconButton
                  aria-label="add to favorites"
                  onClick={() => likeBlog(blog._id)}
                >
                  <FavoriteBorderIcon color="error" />
                </IconButton>
              </Tooltip>
            )}
            {blog.likeCount}
            <Tooltip title="Comments">
              <IconButton
                aria-label="share"
                positions="right"
                color="secondary"
                onClick={isDetailsOpen ? this.handleDetailsOpen : null}
              >
                <InsertCommentIcon />
                <CommentCount blog={blog} />
              </IconButton>
            </Tooltip>
          </CardActions>
        </Card>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({ user: state.user });
export default connect(mapStateToProps, { likeBlog, unlikeBlog })(BlogCard);
