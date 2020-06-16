import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Hidden from '@material-ui/core/Hidden';
import AddIcon from '@material-ui/icons/Add';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { getBlogs } from '../store/actions/blogs';
import BlogList from '../components/Blogs/BlogList';
import Profile from '../components/User/Profile';
import CreateBlog from '../components/Blogs/CreateBlog';
import HomeSkeleton from '../util/skeletons/HomeSkeleton';

const styles = (theme) => ({
  container: {
    margin: '20px',
  },
  add: {
    margin: 0,
    top: 'auto',
    right: '5%',
    bottom: '0px',
    left: 'auto',
    position: 'absolute',
    zIndex: '3',
  },
});

class Home extends Component {
  state = {
    open: false,
  };

  componentDidMount() {
    this.props.getBlogs();
  }
  handleDialogOpen = () => {
    this.setState({ open: true });
  };
  handleDialogClose = () => {
    this.props.ui.errors = {};
    this.setState({ open: false });
  };
  render() {
    const {
      classes,
      blog,
      history,
      user: { loading },
    } = this.props;

    return (
      <>
        {loading ? (
          <HomeSkeleton />
        ) : (
          <div className={classes.container}>
            <Grid container spacing={2}>
              <Grid item md={8} xs={12}>
                <BlogList blog={blog} />
                <Tooltip title="Add Blog" placement="left">
                  <Fab
                    color="secondary"
                    aria-label="add"
                    className={classes.add}
                    onClick={this.handleDialogOpen}
                  >
                    <AddIcon />
                  </Fab>
                </Tooltip>
                <CreateBlog
                  handleDialogClose={this.handleDialogClose}
                  open={this.state.open}
                  history={history}
                />
              </Grid>
              <Hidden smDown>
                <Grid item md={4} xs={12} style={{ marginTop: '15px' }}>
                  <Profile />
                </Grid>
              </Hidden>
            </Grid>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  ui: state.ui,
  blog: state.blog,
  user: state.user,
});

const mapDispatchToProps = { getBlogs };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Home));
