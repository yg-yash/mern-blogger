import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CommentList from "./CommentList";

const CommentCard = ({ classes, comment: { comments } }) => {
  return (
    <Card className={classes.root}>
      <CardHeader title="Comments"></CardHeader>

      <CardContent>
        {comments.map(comment => (
          <CommentList comment={comment} key={comment._id} />
        ))}
      </CardContent>
    </Card>
  );
};

export default CommentCard;
