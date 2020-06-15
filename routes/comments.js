const express = require("express");
const router = express.Router();
const {
  createComment,
  deleteComment,
  editComment,
  getComments
} = require("../controllers/comments");
const auth = require("../utils/auth");

router.post("/:blogId/newcomment", auth, createComment);
router.patch("/:blogId/:id", auth, editComment);
router.delete("/:blogId/:id", auth, deleteComment);
router.get("/:blogId", auth, getComments);

module.exports = router;
