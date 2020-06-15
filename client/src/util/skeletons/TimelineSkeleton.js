import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  avatar: {
    backgroundColor: "pink"
  }
});

const TimelineSkeleton = ({ classes }) => {
  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem>
          <ListItemAvatar>
            <Avatar aria-label="recipe" className={classes.avatar}></Avatar>
          </ListItemAvatar>
          <Skeleton variant="rect" />
        </ListItem>
        <Divider />
      </List>
    </div>
  );
};

export default withStyles(styles)(TimelineSkeleton);
