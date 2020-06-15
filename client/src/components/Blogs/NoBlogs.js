import React, { Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  card: {
    marginTop: "20px",
    minWidth: 275,

    textAlign: "center",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    overflow: "auto"
  },
  content: {
    margin: "auto",
    width: "50%",

    padding: "100px"
  },
  title: {
    marginTop: "20px",
    fontSize: 14
  }
});

const NoBlog = ({ classes }) => {
  return (
    <Fragment>
      <Card className={classes.card}>
        <CardHeader
          title={
            <Typography variant="h6" component="h6" color="secondary">
              Blogger
            </Typography>
          }
          subheader={
            <Typography variant="caption" color="textSecondary">
              There is No Blogs yet you can create some
            </Typography>
          }
        ></CardHeader>
      </Card>
    </Fragment>
  );
};

export default withStyles(styles)(NoBlog);
