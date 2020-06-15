import React, { Component } from 'react';
import PropTypes from 'prop-types';
//redux
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
import PersonPinIcon from '@material-ui/icons/PersonPin';
import DescriptionIcon from '@material-ui/icons/Description';
import LanguageIcon from '@material-ui/icons/Language';

import { signup } from '../store/actions/user';

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
    margin: '10px auto 10px auto',
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

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    cpassword: '',
    name: '',
    bio: '',
    website: '',
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
      cpassword: this.state.cpassword,
      name: this.state.name,
      bio: this.state.bio,
      website: this.state.website,
    };
    this.props.signup(userDetails, this.props.history);
  };
  render() {
    const { classes } = this.props;
    const errors = this.state.errors;

    return (
      <Grid container spacing={6} className={classes.center}>
        <Grid item sm>
          <Typography
            variant="h3"
            component="h3"
            className={classes.pageTitle}
            color="secondary"
          >
            SignUp
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
            <br />
            <Grid container justify="space-between" spacing={10}>
              <Grid item md>
                <TextField
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  error={errors.password ? true : false}
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
              </Grid>
              <Grid item md>
                <TextField
                  id="cpassword"
                  type="password"
                  name="cpassword"
                  placeholder="Confirm Password"
                  error={errors.cpassword ? true : false}
                  helperText={errors && errors.cpassword}
                  onChange={this.handleInputChange}
                  value={this.state.cpassword}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="secondary" />
                      </InputAdornment>
                    ),
                  }}
                  className={classes.textField}
                />
              </Grid>
            </Grid>
            <TextField
              id="name"
              type="text"
              name="name"
              placeholder="name"
              error={errors.name ? true : false}
              fullWidth
              helperText={errors && errors.name}
              onChange={this.handleInputChange}
              value={this.state.name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonPinIcon color="secondary" />
                  </InputAdornment>
                ),
              }}
              className={classes.textField}
            />
            <br />
            <TextField
              id="bio"
              type="textarea"
              name="bio"
              placeholder="bio"
              multiline
              rows="2"
              rowsMax="4"
              error={errors.bio ? true : false}
              fullWidth
              helperText={errors && errors.bio}
              onChange={this.handleInputChange}
              value={this.state.bio}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DescriptionIcon color="secondary" />
                  </InputAdornment>
                ),
              }}
              className={classes.textField}
            />
            <br />
            <TextField
              id="website"
              type="text"
              name="website"
              placeholder="website"
              error={errors.website ? true : false}
              fullWidth
              helperText={errors && errors.website}
              onChange={this.handleInputChange}
              value={this.state.website}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LanguageIcon color="secondary" />
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
              SignUp
            </Button>
          </form>
          <Typography variant="subtitle1">
            Have An Account Already?
            <Link to="/login" style={{ cursor: 'pointer' }}>
              Log In
            </Link>
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

SignUp.propTypes = {
  signup: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.ui.errors,
  authenticated: state.user.authenticated,
});

const mapDispatchToProps = { signup };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SignUp));
