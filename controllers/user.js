const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const {
  validateSignUpData,
  validateLoginData,
  validateUpdateData
} = require("../utils/validation");

exports.signUp = async (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    cpassword: req.body.cpassword,
    name: req.body.name,
    website: req.body.website ? req.body.website : "",
    bio: req.body.bio ? req.body.bio : ""
  };
  const { valid, errors } = validateSignUpData(newUser);
  if (!valid) {
    return res.status(406).json(errors);
  }
  try {
    const isExists = await User.findOne({ email: newUser.email });
    if (isExists) {
      return res.status(400).json({ error: "User already exists" });
    }
    const user = await new User(newUser);
    await user.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong please try again" });
  }
};

exports.login = async (req, res, next) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password
  };
  const { valid, errors } = validateLoginData(newUser);
  if (!valid) {
    return res.status(406).json(errors);
  }

  try {
    const user = await User.findOne({ email: newUser.email });
    if (!user) {
      return res.status(404).json({ error: "User Not Found Please Sign Up" });
    }
    const isMatch = await bcrypt.compare(newUser.password, user.password);
    if (isMatch) {
      const payload = {
        id: user.id
      };
      const token = await jwt.sign(payload, keys.secret, {
        expiresIn: 315562926
      });
      if (token) {
        res.json({
          token: token,
          user
        });
      }
    } else {
      return res.status(400).json({ error: "Password Incorrect" });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error });
  }
};

exports.getCurrentUser = async (req, res) => {
  return res.status(200).json(req.user);
};

// exports.logOut = (req, res) => {
//   return res.status(200).json({ message: "User is Logged Out" });
// };

exports.editUser = async (req, res) => {
  const _id = req.user.id;
  const editedUser = {
    name: req.body.name,
    website: req.body.website ? req.body.website : "",
    bio: req.body.bio ? req.body.bio : ""
  };
  const { valid, errors } = validateUpdateData(editedUser);
  if (!valid) {
    return res.status(406).json(errors);
  }
  try {
    const user = await User.findById(_id);
    user.name = editedUser.name;
    user.bio = editedUser.bio;
    user.website = editedUser.website;
    user.save();
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
};
