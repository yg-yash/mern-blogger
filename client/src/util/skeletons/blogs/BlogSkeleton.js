import React, { Fragment } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import withStyles from "@material-ui/core/styles/withStyles";
const styles = theme => ({
  root: {
    minWidth: 275,
    margin: "20px auto 10px auto",
    textAlign: "center",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
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
function BlogSkeleton({ classes }) {
  const card = ["1", "2", "3", "4"];
  return (
    <Fragment>
      {card.map(value => (
        <Card className={classes.root} variant="outlined" key={value}>
          <CardHeader
            className={classes.cardHeader}
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}></Avatar>
            }
            action={
              <Tooltip title="Settings">
                <IconButton
                  aria-label="settings"
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                >
                  <MoreVertIcon />
                </IconButton>
              </Tooltip>
            }
            subheader={
              <Typography
                variant="overline"
                component="p"
                color="textSecondary"
              >
                <Skeleton variant="text" />
              </Typography>
            }
          />
          <CardContent style={{ cursor: "pointer" }}>
            <Typography variant="h5" component="h5" color="secondary">
              <Skeleton variant="text" />
            </Typography>
            <Typography
              variant="body2"
              component="p"
              color="textPrimary"
              style={{
                wordWrap: "break-word",
                whiteSpace: "initial"
              }}
            >
              <Skeleton variant="text" />
            </Typography>
          </CardContent>

          <CardActions>
            <Tooltip title="UnLike">
              <IconButton aria-label="add to favorites">
                <FavoriteIcon color="error" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Comments">
              <IconButton
                aria-label="share"
                positions="right"
                color="secondary"
              >
                <InsertCommentIcon />
              </IconButton>
            </Tooltip>
          </CardActions>
        </Card>
      ))}
    </Fragment>
  );
}

export default withStyles(styles)(BlogSkeleton);
