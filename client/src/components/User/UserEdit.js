import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputAdornment from "@material-ui/core/InputAdornment";
import withStyles from "@material-ui/core/styles/withStyles";
import TitleIcon from "@material-ui/icons/Title";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import { connect } from "react-redux";
import { editUser } from "../../store/actions/user";
const styles = theme => ({
  textField: {
    margin: "20px auto 20px auto"
  }
});

class UserEdit extends Component {
  state = {
    name: "",
    website: "",
    bio: "",
    errors: {}
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.ui.errors).length > 0) {
      return this.setState({ errors: nextProps.ui.errors });
    }

    this.setState({
      name: nextProps.user.name,
      website: nextProps.user.website,
      bio: nextProps.user.bio
    });
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = () => {
    const editedUser = {
      name: this.state.name,
      bio: this.state.bio,
      website: this.state.website
    };
    this.props.editUser(editedUser);
    if (editedUser.name) {
      this.props.handleDialogClose();
      this.setState({ name: "", website: "", bio: "" });
    }
  };

  render() {
    const { classes, open, handleDialogClose } = this.props;
    const errors = this.state.errors;
    return (
      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Enter Name"
            type="text"
            error={errors.name ? true : false}
            fullWidth
            onChange={this.handleInputChange}
            helperText={errors && errors.name}
            value={this.state.name}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TitleIcon color="secondary" />
                </InputAdornment>
              )
            }}
            className={classes.textField}
          />
          <TextField
            margin="dense"
            id="website"
            name="website"
            label="Enter Website"
            type="text"
            fullWidth
            multiline
            error={errors.website ? true : false}
            rows="2"
            rowsMax="4"
            onChange={this.handleInputChange}
            helperText={errors && errors.website}
            value={this.state.website}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FormatBoldIcon color="secondary" />
                </InputAdornment>
              )
            }}
            className={classes.textField}
          />
          <TextField
            margin="dense"
            id="bio"
            name="bio"
            label="Enter bio"
            type="text"
            fullWidth
            multiline
            error={errors.bio ? true : false}
            rows="2"
            rowsMax="4"
            onChange={this.handleInputChange}
            helperText={errors && errors.bio}
            value={this.state.bio}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FormatBoldIcon color="secondary" />
                </InputAdornment>
              )
            }}
            className={classes.textField}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({ ui: state.ui, user: state.user.user });

export default connect(mapStateToProps, { editUser })(
  withStyles(styles)(UserEdit)
);
