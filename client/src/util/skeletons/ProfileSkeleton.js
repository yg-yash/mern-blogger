import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Skeleton from "@material-ui/lab/Skeleton";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/AlternateEmail";

const styles = theme => ({
  card: {
    minWidth: 400,
    textAlign: "center",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
  },
  cardHeader: {
    margin: "5px 0 0 0",
    padding: 0
  },
  avatar: {
    margin: "20px",
    width: theme.spacing(15),
    height: theme.spacing(15),
    textTransform: "uppercase",
    left: "30%",
    backgroundColor: "pink"
  },
  list: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

function ProfileSkeleton({ classes }) {
  return (
    <Skeleton variant="rect" width={210} height={118}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia>
            <Avatar aria-label="recipe" className={classes.avatar}></Avatar>
          </CardMedia>
          <CardContent>
            <List aria-label="main mailbox folders">
              <Tooltip title="name" placement="left-start">
                <ListItem button>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText />
                </ListItem>
              </Tooltip>
              <Tooltip title="email" placement="left-start">
                <ListItem button>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText />
                </ListItem>
              </Tooltip>
            </List>
          </CardContent>
        </CardActionArea>
      </Card>
    </Skeleton>
    // <div>
    //   <Skeleton variant="text" />
    //   <Skeleton variant="circle" width={40} height={40} />
    //   <Skeleton variant="rect" width={210} height={118} />
    // </div>
  );
}

export default withStyles(styles)(ProfileSkeleton);
