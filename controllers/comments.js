const Comment = require("../models/Comments");
const User = require("../models/User");
const Blog = require("../models/Blog");
const { validateCommentData } = require("../utils/validation");

exports.createComment = async (req, res) => {
  const commentData = {
    blog: req.params.blogId,
    user: req.user.id,
    body: req.body.body
  };
  const { valid, errors } = validateCommentData(commentData.body);
  if (!valid) {
    return res.status(406).json(errors);
  }
  try {
    const comment = await new Comment(commentData);
    const user = await User.findOne({ _id: comment.user });
    comment.author = {
      name: user.name,
      email: user.email,
      _id: req.user.id
    };
    const blog = await Blog.findOne({ _id: commentData.blog });

    await blog.commentCount++;

    await blog.save();
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.deleteComment = async (req, res) => {
  const _id = req.params.id;
  try {
    const comment = await Comment.findOne({ _id });
    if (comment.user.toString() === req.user.id.toString()) {
      const blog = await Blog.findOne({ _id: comment.blog });

      await blog.commentCount--;
      blog.save();
      await comment.remove();

      return res.status(200).json(comment);
    }
    return res.status(406).json({ error: "You Cant delete this comment" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error });
  }
};

exports.editComment = async (req, res) => {
  const _id = req.params.id;
  const newComment = {
    body: req.body.body
  };
  const { valid, errors } = validateCommentData(newComment);
  if (!valid) {
    return res.status(406).json(errors);
  }
  try {
    const comment = await Comment.findById({ _id });
    if (comment.user.toString() === req.user.id.toString()) {
      comment.body = newComment.body;
      comment.save();
      return res.status(200).json(comment);
    }
    return res.status(406).json({ error: "You Cant update this comment" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getComments = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const comments = await Comment.find({ blog: blogId })
      .populate({
        path: "user",
        select: "-password"
      })
      .sort({ created_at: -1 });
    return res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error });
  }
};
