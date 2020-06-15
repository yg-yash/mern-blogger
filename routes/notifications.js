const router = require("express").Router();
const Notifications = require("../models/Notifications");
router.get("/", async (req, res) => {
  try {
    const data = await Notifications.find()
      .sort({ created_at: -1 })
      .limit(5);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
