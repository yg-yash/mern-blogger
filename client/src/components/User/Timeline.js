import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { connect } from "react-redux";

import TimelineList from "./TimelineList";
import TimelineSkeleton from "../../util/skeletons/TimelineSkeleton";
const styles = theme => ({
  root: {
    minWidth: 275,
    textAlign: "center",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    maxHeight: 200,
    overflow: "auto"
  },
  cardHeader: {
    margin: "5px 0 0 0",
    padding: 0
  },
  avatar: {
    left: "20px",
    top: "5px",
    backgroundColor: "pink"
  }
});

class Timeline extends Component {
  render() {
    const {
      classes,
      notifications: { notifications, loading }
    } = this.props;

    return (
      <Card className={classes.root}>
        <CardHeader title="Timeline"></CardHeader>
        <CardContent>
          {loading ? (
            <TimelineSkeleton />
          ) : notifications ? (
            notifications.map(notification => {
              console.log(notification);

              return (
                <TimelineList
                  key={notification._id}
                  message={notification.message}
                  user={notification.user}
                />
              );
            })
          ) : (
            ""
          )}
        </CardContent>
      </Card>
    );
  }
}
const mapStateToProps = state => ({ notifications: state.notifications });
export default connect(mapStateToProps)(withStyles(styles)(Timeline));
