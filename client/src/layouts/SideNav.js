import React, { Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/actions/user";

const styles = theme => ({
  list: {
    width: 250
  }
});

const SideNav = ({
  classes,
  left,
  toggleDrawer,
  authenticated,
  history,
  logout
}) => {
  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {authenticated ? (
          <Fragment>
            <ListItem button>
              <Button color="inherit" onClick={() => history.push("/profile")}>
                <Typography variant="button">Profile</Typography>
              </Button>
            </ListItem>
            <ListItem button>
              <Button color="inherit" onClick={() => logout(history)}>
                <Typography variant="button">Logout</Typography>
              </Button>
            </ListItem>
          </Fragment>
        ) : (
          <Fragment>
            <ListItem button>
              <Button color="inherit" component={Link} to="/login">
                <Typography variant="button">Login</Typography>
              </Button>
            </ListItem>
            <ListItem button>
              <Button color="inherit" component={Link} to="/signup">
                <Typography variant="button">Sign Up</Typography>
              </Button>
            </ListItem>
          </Fragment>
        )}
      </List>
    </div>
  );

  return (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Drawer open={left} onClose={toggleDrawer(false)}>
        {sideList("left")}
      </Drawer>
    </div>
  );
};
const mapStateToProps = state => ({ authenticated: state.user.authenticated });
export default connect(mapStateToProps, { logout })(
  withStyles(styles)(SideNav)
);
