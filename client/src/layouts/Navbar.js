import React, { Component, Fragment } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Hidden from "@material-ui/core/Hidden";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import { logout } from "../store/actions/user";
import { withRouter } from "react-router-dom";
import SideNav from "./SideNav";
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    textDecoration: "none"
  },
  link: {
    textDecoration: "none",
    backgroudColor: "white"
  }
});

class Navbar extends Component {
  state = {
    left: false
  };
  handleOpenSidenav = () => {
    this.setState({ left: true });
  };
  toggleDrawer = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    this.setState({ left: open });
  };
  render() {
    const { authenticated, classes, history } = this.props;
    return (
      <React.Fragment>
        <SideNav
          left={this.state.left}
          toggleDrawer={this.toggleDrawer}
          history={history}
        />
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Hidden mdUp>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                  onClick={this.handleOpenSidenav}
                >
                  <MenuIcon />
                </IconButton>
              </Hidden>
              <Typography
                variant="h6"
                className={classes.title}
                component={Link}
                to="/"
                color="inherit"
              >
                Blogger
              </Typography>
              <Hidden mdDown>
                {authenticated ? (
                  <Button
                    onClick={() => this.props.logout(history)}
                    color="inherit"
                  >
                    <Typography variant="button">Logout</Typography>
                  </Button>
                ) : (
                  <Fragment>
                    <Button component={Link} to="/login" color="inherit">
                      <Typography variant="button">Log in</Typography>
                    </Button>
                    <Button component={Link} to="/signup" color="inherit">
                      <Typography variant="button">Sign Up</Typography>
                    </Button>
                  </Fragment>
                )}
              </Hidden>
            </Toolbar>
          </AppBar>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({ authenticated: state.user.authenticated });
export default connect(mapStateToProps, { logout })(
  withStyles(styles)(withRouter(Navbar))
);
