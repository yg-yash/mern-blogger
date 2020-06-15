const express = require("express");
const router = express.Router();
const auth = require("../utils/auth");
const {
  createBlog,
  getMyBlogs,
  getAllBlogs,
  editBlog,
  deleteBlog,
  likeBlog,
  unlikeBlog
} = require("../controllers/blogs");

router.post("/create", auth, createBlog);
router.get("/myblogs", auth, getMyBlogs);
router.get("/blogs", auth, getAllBlogs);
router.get("/:blogId/like", auth, likeBlog);
router.get("/:blogId/unlike", auth, unlikeBlog);
router.patch("/blogs/:id", auth, editBlog);
router.delete("/blogs/:id", auth, deleteBlog);

module.exports = router;
