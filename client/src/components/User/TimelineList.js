import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
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

const TimelineList = ({ classes, message, user }) => {
  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem>
          <ListItemAvatar>
            <Avatar aria-label="recipe" className={classes.avatar}>
              {user[0]}
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={message} />
        </ListItem>
        <Divider />
      </List>
    </div>
  );
};

export default withStyles(styles)(TimelineList);
