const express = require("express");
const router = express.Router();
const {
  signUp,
  login,
  getCurrentUser,
  logOut,
  editUser
} = require("../controllers/user");
const auth = require("../utils/auth");

router.post("/signup", signUp);
router.post("/login", login);
router.get("/current_user", auth, getCurrentUser);
router.patch("/edit", auth, editUser);
//router.get("/logout", auth, logOut);

module.exports = router;
