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
import { createBlog } from "../../store/actions/blogs";

const styles = theme => ({
  textField: {
    margin: "20px auto 20px auto"
  }
});

class CreateBlog extends Component {
  state = {
    title: "",
    body: "",
    errors: {}
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.ui.errors) {
      this.setState({ errors: nextProps.ui.errors });
    }
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = () => {
    const blogValues = {
      title: this.state.title,
      body: this.state.body
    };
    this.props.createBlog(blogValues, this.props.history);
    if (blogValues.title && blogValues.body) {
      this.props.handleDialogClose();
      this.setState({ title: "", body: "" });
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
        <DialogTitle id="form-dialog-title">Create New Blog</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name="title"
            label="Enter Title"
            type="text"
            error={errors.title ? true : false}
            fullWidth
            onChange={this.handleInputChange}
            helperText={errors && errors.title}
            value={this.state.title}
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
            id="body"
            name="body"
            label="Enter Body"
            type="textarea"
            fullWidth
            multiline
            error={errors.body ? true : false}
            rows="2"
            rowsMax="4"
            onChange={this.handleInputChange}
            helperText={errors && errors.body}
            value={this.state.body}
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
            Create
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({ ui: state.ui });

export default connect(mapStateToProps, { createBlog })(
  withStyles(styles)(CreateBlog)
);
