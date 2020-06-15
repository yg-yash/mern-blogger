import React, { Fragment, Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import Skeleton from "@material-ui/lab/Skeleton";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  bodyText: {
    wordWrap: "break-word",
    whiteSpace: "initial"
  }
});

class CommentListSkeleton extends Component {
  render() {
    const { classes } = this.props;
    const values = ["1", "2"];
    return (
      <Fragment>
        {values.map(value => (
          <List className={classes.root}>
            <ListItem alignItems="center">
              <ListItemAvatar>
                <Avatar aria-label="user" className={classes.avatar}></Avatar>
              </ListItemAvatar>

              <ListItemText
                secondary={
                  <React.Fragment>
                    <Skeleton variant="rect" />
                  </React.Fragment>
                }
              />
              <ListItemSecondaryAction>
                <Tooltip title="edit">
                  <Skeleton variant="circle" />
                </Tooltip>
                <Tooltip title="delete">
                  <Skeleton variant="circle" />
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem className={classes.root}>
              <ListItemText
                primary={
                  <React.Fragment>
                    <Skeleton variant="rect" />
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" style={{ width: "100%" }} />
          </List>
        ))}
      </Fragment>
    );
  }
}

export default withStyles(styles)(CommentListSkeleton);
