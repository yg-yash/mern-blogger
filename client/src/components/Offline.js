import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    minWidth: 275,
    height: "100%",
    textAlign: "center",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",

    overflow: "auto",
    marginTop: "20px"
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

const Offline = ({ classes }) => {
  return (
    <Card className={classes.root}>
      <CardHeader title="Oops A Problem "></CardHeader>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          You Are Offline.Make Sure You are Connected to internet!
        </Typography>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(Offline);
