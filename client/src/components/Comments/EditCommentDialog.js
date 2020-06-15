import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputAdornment from "@material-ui/core/InputAdornment";
import withStyles from "@material-ui/core/styles/withStyles";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import { connect } from "react-redux";
import { editComment } from "../../store/actions/comments";

const styles = theme => ({
  textField: {
    margin: "20px auto 20px auto"
  }
});

class EditCommentDialog extends Component {
  state = {
    body: "",
    errors: {}
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.ui.errors) {
      this.setState({ errors: nextProps.ui.errors });
    }

    this.setState({ body: nextProps.commentBody });
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = () => {
    const commentValue = {
      body: this.state.body
    };
    const { blogId, commentId } = this.props;
    this.props.editComment(blogId, commentId, commentValue);
    if (commentValue.body) {
      this.props.handleDialogClose();
      this.setState({ body: "" });
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
        <DialogTitle id="form-dialog-title">Edit Comment</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="body"
            name="body"
            label="Enter Comment"
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
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({ ui: state.ui });

export default connect(mapStateToProps, { editComment })(
  withStyles(styles)(EditCommentDialog)
);
