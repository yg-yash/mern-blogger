const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    body: {
      type: String,
      required: true
    },
    likesCount: {
      type: Number
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog"
    },
    author: {}
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
