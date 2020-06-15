const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    message: {
      type: String
    },
    user: {
      type: String
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Notifications = mongoose.model("Notifications", notificationSchema);
module.exports = Notifications;
