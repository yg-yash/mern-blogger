import React, { Component } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import withStyles from "@material-ui/core/styles/withStyles";
import BlogEdit from "./BlogEdit";
import { deleteBlog } from "../../store/actions/blogs";
import { connect } from "react-redux";

const styles = theme => ({
  menu: {
    // marginLeft: "-50.8%",
    //top: "50px"
  }
});

class BlogOptions extends Component {
  state = {
    open: false
  };

  handleDialogOpen = () => {
    this.setState({ open: true });
  };
  handleDialogClose = () => {
    this.setState({ open: false });
  };
  render() {
    const {
      anchorEl,
      handleClick,
      classes,
      open,
      blog,
      deleteBlog
    } = this.props;
    return (
      <>
        <BlogEdit
          handleDialogClose={this.handleDialogClose}
          open={this.state.open}
          blog={blog}
        />
        <Menu
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          // anchorOrigin={{ vertical: "top", horizontal: "left" }}
          // transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            style: {
              left: "60%",
              transform: "translateX(-77%) translateY(32%)"
            }
          }}
          MenuListProps={{
            style: {
              padding: 0
            }
          }}
          open={open}
          onClose={handleClick}
          className={classes.menu}
        >
          <MenuItem onClick={handleClick}>
            <Tooltip title="Edit">
              <IconButton onClick={this.handleDialogOpen}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </MenuItem>
          <MenuItem onClick={handleClick}>
            <Tooltip title="Delete" onClick={() => deleteBlog(blog._id)}>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </MenuItem>
        </Menu>
      </>
    );
  }
}

export default connect(null, { deleteBlog })(withStyles(styles)(BlogOptions));
