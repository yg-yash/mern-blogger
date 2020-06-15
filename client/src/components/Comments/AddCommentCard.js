import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import AddCommentIcon from "@material-ui/icons/AddComment";
import { connect } from "react-redux";
import { createComment } from "../../store/actions/comments";

class AddCommentCard extends Component {
  state = {
    body: "",
    errors: {}
  };
  UNSAFE_componentWillReceiveProps = nextProps => {
    if (nextProps.ui.errors) {
      return this.setState({ errors: nextProps.ui.errors });
    }
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = () => {
    const commentValue = {
      body: this.state.body
    };
    this.props.createComment(this.props.blog._id, commentValue);
    this.setState({ body: "" });
  };
  render() {
    const { classes } = this.props;
    const errors = this.state.errors;

    return (
      <Card className={classes.root} variant="outlined">
        <CardHeader className={classes.cardHeader} title="Add a Comment" />
        <CardContent>
          <TextField
            autoFocus
            margin="dense"
            id="comment"
            name="body"
            label="Enter Comment"
            type="text"
            style={{ width: "80%" }}
            error={errors.body ? true : false}
            onChange={this.handleInputChange}
            value={this.state.body}
            className={classes.textField}
            helperText={errors && errors.body}
          />
          <Tooltip title="add">
            <IconButton color="primary" onClick={this.handleSubmit}>
              <AddCommentIcon />
            </IconButton>
          </Tooltip>
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = state => ({ ui: state.ui });
export default connect(mapStateToProps, { createComment })(AddCommentCard);
