const jwt = require("jsonwebtoken");
const User = require("../models/User");
const keys = require("../config/keys");
module.exports = function(req, res, next) {
  try {
    if (req.headers && req.headers.authorization) {
      var authorization = req.headers.authorization,
        decoded;
      decoded = jwt.verify(authorization, keys.secret);
      var userId = decoded.id;
      // Fetch the user by id
      User.findOne({ _id: userId }).then(function(user) {
        // Do something with the user
        req.user = user;
        return next();
      });
    } else {
      return res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};
