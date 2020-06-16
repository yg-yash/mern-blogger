const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');
module.exports = function (req, res, next) {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      const idToken = req.headers.authorization.split('Bearer ')[1];
      // var authorization = req.headers.authorization,
      const decoded = jwt.verify(idToken, keys.secret);

      var userId = decoded.id;

      // Fetch the user by id
      User.findOne({ _id: userId }).then(function (user) {
        // Do something with the user
        req.user = user;
        return next();
      });
    } else {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};
