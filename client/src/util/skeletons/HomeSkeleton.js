import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Hidden from '@material-ui/core/Hidden';
import AddIcon from '@material-ui/icons/Add';
import withStyles from '@material-ui/core/styles/withStyles';
import BlogSkeleton from './blogs/BlogSkeleton';
import ProfileSkeleton from './ProfileSkeleton';

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

class HomeSkeleton extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Grid container spacing={2}>
          <Grid item md={8} xs={12}>
            <BlogSkeleton />
            <Tooltip title="Add Blog" placement="left">
              <Fab color="secondary" aria-label="add" className={classes.add}>
                <AddIcon />
              </Fab>
            </Tooltip>
          </Grid>
          <Hidden smDown>
            <Grid item md={4} xs={12} style={{ marginTop: '15px' }}>
              <ProfileSkeleton />
            </Grid>
          </Hidden>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(HomeSkeleton);
