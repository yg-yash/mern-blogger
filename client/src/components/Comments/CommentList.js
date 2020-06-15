import React, { Fragment, Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { connect } from "react-redux";
import { deleteComment } from "../../store/actions/comments";
import EditCommentDialog from "./EditCommentDialog";
import moment from "moment";
const styles = theme => ({
  root: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.background.paper
  },
  bodyText: {
    wordWrap: "break-word",
    whiteSpace: "initial"
  }
});

class CommentList extends Component {
  state = {
    open: false
  };

  handleDialogOpen = () => {
    this.setState({ open: true });
  };
  handleDialogClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { comment, classes, user, deleteComment } = this.props;
    const date = moment
      .utc(comment.created_at)
      .toDate()
      .toString();
    return (
      <Fragment>
        <List className={classes.root}>
          <ListItem alignItems="center">
            <ListItemAvatar>
              <Avatar aria-label="user" className={classes.avatar}>
                {comment.author.name[0]}
              </Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={comment.author.name}
              secondary={
                <React.Fragment>
                  <Typography variant="caption">
                    {moment(date, "ddd MMM DD YYYY HH:mm:ss GMT Z").fromNow()}
                  </Typography>
                </React.Fragment>
              }
            />

            {comment.author._id.toString() === user.user._id.toString() && (
              <ListItemSecondaryAction>
                <Tooltip title="edit">
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={this.handleDialogOpen}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="delete">
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => deleteComment(comment.blog, comment._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            )}
          </ListItem>
          <ListItem className={classes.root}>
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.bodyText}
                    color="textPrimary"
                    noWrap
                  >
                    {comment.body}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" style={{ width: "100%" }} />
        </List>
        <EditCommentDialog
          handleDialogClose={this.handleDialogClose}
          open={this.state.open}
          blogId={comment.blog}
          commentId={comment._id}
          commentBody={comment.body}
        />
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({ user: state.user });
export default connect(mapStateToProps, { deleteComment })(
  withStyles(styles)(CommentList)
);
