const Blog = require("../models/Blog");
const Comment = require("../models/Comments");
const { validateBlogData } = require("../utils/validation");
const mongoose = require("mongoose");
const User = require("../models/User");

exports.createBlog = async (req, res) => {
  const newBlog = {
    title: req.body.title,
    body: req.body.body,
    author: req.user.id,
    likesCount: 0
  };
  const { valid, errors } = validateBlogData(newBlog);
  if (!valid) {
    return res.status(406).json(errors);
  }
  try {
    const blog = await new Blog(newBlog);
    const user = await User.findOne({ _id: blog.author });
    blog.user = { name: user.name, email: user.email, _id: req.user.id };
    await blog.save();
    return res.status(201).json(blog);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// exports.getAllBlogs = async (req, res) => {
//   try {
//     const blogs = await Blog.find()
//       .sort({ created_at: -1 })
//       .populate({
//         path: "comments"
//       })
//       .exec();
//     // await Promise.all(
//     //   blogs.map(async blog => {
//     //     const user = await User.findOne({ _id: blog.author });
//     //     blog.user = { name: user.name, email: user.email };
//     //     return blog;
//     //   })
//     // );

//     if (blogs.length === 0) {
//       return res.status(404).json({ message: "No Blogs Found" });
//     }
//     return res.status(200).json(blogs);
//   } catch (error) {
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({})
      .sort({ created_at: -1 })
      .populate("author", "-password")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "-password"
        }
      });

    return res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findOne({ author: req.user.id })
      .sort({ created_at: -1 })
      .populate({
        path: "comments"
      })
      .exec();

    if (blogs === null) {
      return res.status(404).json({ message: "No Blogs Found! Create Some" });
    }
    return res.status(200).json(blogs);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.editBlog = async (req, res) => {
  const _id = req.params.id;

  const newBlog = {
    title: req.body.title,
    body: req.body.body
  };
  const { valid, errors } = validateBlogData(newBlog);
  if (!valid) {
    return res.status(406).json(errors);
  }

  try {
    const blog = await Blog.findById({ _id });
    if (blog.author.toString() === req.user.id.toString()) {
      blog.body = newBlog.body;
      blog.title = newBlog.title;
      blog.save();
      return res.status(201).json(blog);
    }
    return res.status(406).json({ error: "You Cant update this Blog" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.likeBlog = async (req, res) => {
  try {
    const id = req.params.blogId;
    const userId = req.user.id;
    const ObjectId = mongoose.Types.ObjectId;

    const blog = await Blog.findByIdAndUpdate({ _id: new ObjectId(id) })
      .populate("author", "-password")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "-password"
        }
      });

    await blog.likeCount++;
    blog.likedBy.push({ author: userId, isLiked: true });
    await blog.save();

    return res.status(200).json(blog);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};
exports.unlikeBlog = async (req, res) => {
  try {
    const id = req.params.blogId;
    const userId = req.user.id;
    const ObjectId = mongoose.Types.ObjectId;
    const blog = await Blog.findByIdAndUpdate({ _id: new ObjectId(id) })
      .populate("author", "-password")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "-password"
        }
      });
    await blog.likeCount--;
    blog.likedBy = blog.likedBy.filter(like => {
      return like.author.toString() !== userId.toString();
    });

    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.deleteBlog = async (req, res) => {
  const _id = req.params.id;
  try {
    const blog = await Blog.findOne({ _id });
    if (!blog) {
      return res.status(404).json({ error: "No Blog Found" });
    }
    if (blog.author.toString() === req.user.id.toString()) {
      await blog.remove();
      await Comment.remove()
        .where("blog")
        .equals(blog._id);

      return res.status(200).json(blog);
    }
    return res.status(406).json({ error: "You Cant delete this blog" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error });
  }
};
