import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
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
import Fab from "@material-ui/core/Fab";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/AlternateEmail";
import BioIcon from "@material-ui/icons/Details";
import WebsiteIcon from "@material-ui/icons/Language";
import EditIcon from "@material-ui/icons/Edit";
import UserEdit from "./UserEdit";
import { connect } from "react-redux";
import ProfileSkeleton from "../../util/skeletons/ProfileSkeleton";

const styles = theme => ({
  card: {
    minWidth: 275,
    textAlign: "center",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    overflow: "auto"
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
  edit: {
    margin: 0,
    top: 0,
    right: "auto",
    bottom: "auto",
    left: "40%",
    position: "relative"
  },
  body: {
    margin: "7px"
  },
  list: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

class UserCard extends Component {
  state = {
    open: false
  };

  handleDialogOpen = () => {
    this.props.ui.errors = {};
    this.setState({ open: true });
  };
  handleDialogClose = () => {
    this.setState({ open: false });
  };
  render() {
    const {
      classes,
      user: { user, loading }
    } = this.props;
    return (
      <Fragment>
        {loading ? (
          <ProfileSkeleton />
        ) : (
          <Fragment>
            <Card className={classes.card}>
              <Tooltip title="Edit Profile" placement="left">
                <Fab
                  color="secondary"
                  aria-label="edit"
                  className={classes.edit}
                  onClick={this.handleDialogOpen}
                >
                  <EditIcon />
                </Fab>
              </Tooltip>
              <CardActionArea>
                <CardMedia>
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    {user && user.name}
                  </Avatar>
                </CardMedia>

                <CardContent>
                  <List aria-label="main mailbox folders">
                    <Tooltip title="name" placement="left-start">
                      <ListItem button>
                        <ListItemIcon>
                          <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary={user && user.name} />
                      </ListItem>
                    </Tooltip>
                    <Tooltip title="email" placement="left-start">
                      <ListItem button>
                        <ListItemIcon>
                          <EmailIcon />
                        </ListItemIcon>
                        <ListItemText primary={user && user.email} />
                      </ListItem>
                    </Tooltip>
                    {user && user.website && (
                      <Tooltip title="website" placement="left-start">
                        <ListItem button>
                          <ListItemIcon>
                            <WebsiteIcon />
                          </ListItemIcon>
                          <ListItemText primary={user && user.website} />
                        </ListItem>
                      </Tooltip>
                    )}

                    {user && user.bio && (
                      <Tooltip title="bio" placement="left-start">
                        <ListItem button>
                          <ListItemIcon>
                            <BioIcon />
                          </ListItemIcon>
                          <ListItemText primary={user && user.bio} />
                        </ListItem>
                      </Tooltip>
                    )}
                  </List>
                </CardContent>
              </CardActionArea>
            </Card>
            <UserEdit
              open={this.state.open}
              handleDialogClose={this.handleDialogClose}
            />
          </Fragment>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({ user: state.user, ui: state.ui });
export default connect(mapStateToProps)(withStyles(styles)(UserCard));
