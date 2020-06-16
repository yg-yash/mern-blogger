import React, { Component } from 'react';
import PropTypes from 'prop-types';
//redux
import { connect } from 'react-redux';
//ui
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
//icons
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import MailIcon from '@material-ui/icons/Mail';
import LockIcon from '@material-ui/icons/Lock';
import { Link } from 'react-router-dom';

import { logIn } from '../store/actions/user';

const styles = (theme) => ({
  center: {
    margin: 'auto',
    width: '50%',
    padding: '10px',
    textAlign: 'center',
  },
  pageTitle: {
    margin: '10px auto 10px auto',
  },
  textField: {
    margin: '20px auto 20px auto',
  },
  button: {
    margin: '20px auto 20px auto',
  },
  iconB: {
    marginRight: '5px',
  },
  error: {
    color: 'red',
  },
});

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: [],
  };
  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.authenticated) {
      this.props.history.push('/');
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onFormSubmit = (e) => {
    e.preventDefault();
    const userDetails = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.logIn(userDetails, this.props.history);
  };
  render() {
    const { classes } = this.props;
    const errors = this.state.errors;
    return (
      <Grid container className={classes.center}>
        <Grid item sm>
          <Typography
            variant="h3"
            component="h3"
            color="secondary"
            className={classes.pageTitle}
          >
            Login
          </Typography>
          <form onSubmit={this.onFormSubmit}>
            <TextField
              id="email"
              type="text"
              name="email"
              error={errors.email ? true : false}
              fullWidth
              helperText={errors && errors.email}
              placeholder="Email"
              onChange={this.handleInputChange}
              value={this.state.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailIcon color="secondary" />
                  </InputAdornment>
                ),
              }}
              className={classes.textField}
            />
            <TextField
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              error={errors.password ? true : false}
              fullWidth
              helperText={errors && errors.password}
              onChange={this.handleInputChange}
              value={this.state.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="secondary" />
                  </InputAdornment>
                ),
              }}
              className={classes.textField}
            />
            <br />
            <Typography variant="caption" className={classes.error}>
              {errors && errors.error}
            </Typography>
            <br />
            <Button
              variant="contained"
              type="submit"
              color="primary"
              className={classes.button}
            >
              <VpnKeyIcon className={classes.iconB} />
              Login
            </Button>
          </form>
          <Typography variant="subtitle1">
            Don't Have An Account?
            <Link to="/signup" style={{ cursor: 'pointer' }}>
              Sign Up
            </Link>
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

Login.propTypes = {
  logIn: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.ui.errors,
  authenticated: state.user.authenticated,
});

const mapDispatchToProps = { logIn };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Login));
