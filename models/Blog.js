const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Notifications = require("./Notifications");
const MongooseTrigger = require("mongoose-trigger");

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    likeCount: {
      type: Number,
      default: 0
    },
    commentCount: {
      type: Number,
      default: 0
    },
    likedBy: [
      {
        author: mongoose.Schema.Types.ObjectId,
        isLiked: {
          type: Boolean
        }
      }
    ],
    user: {}
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    },
    toJSON: { virtuals: true }
  }
);

blogSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "blog"
});
// blogSchema.virtual("notifications", {
//   ref: "Notifications",
//   localField: "_id",
//   foreignField: "blog"
// });

const BlogEvents = MongooseTrigger(blogSchema, {
  events: {
    create: {
      select: "title user"
    },
    update: {
      select: "title user"
    },
    remove: {
      select: "title user"
    }
  },
  partials: [
    {
      eventName: "like",
      triggers: "likeCount",
      select: "title user likeCount"
    },
    {
      eventName: "comment",
      triggers: "commentCount",
      select: "title user commentCount"
    },
    {
      eventName: "edited",
      triggers: "title body",
      select: "title user"
    }
  ],
  debug: false
});

BlogEvents.on("create", data =>
  Notifications.create({
    message: `${data.user.name} created a new blog ${data.title}`,
    user: data.user.name
  })
);
// BlogEvents.on("update", data =>
//   Notifications.create({
//     message: `${data.user.name} edited a  blog ${data.title}`,
//     user: data.user.name
//   })
// );
BlogEvents.on("partial:like", data => {
  let countMessage;
  if (data.likeCount === 1) {
    countMessage = "liked a blog";
  } else {
    countMessage = "unliked a blog";
  }
  Notifications.create({
    message: `${data.user.name} ${countMessage} ${data.title}`,
    user: data.user.name
  });
});

BlogEvents.on("partial:comment", data => {
  let countMessage;
  if (data.commentCount++) {
    countMessage = "added a comment";
  } else if (data.commentCount--) {
    countMessage = "removed a comment";
  }
  Notifications.create({
    message: `${data.user.name} ${countMessage} on blog ${data.title}`,
    user: data.user.name
  });
});

BlogEvents.on("partial:edited", data => {
  let changeMessage;
  if (data.title) {
    changeMessage = "edited title";
  }
  if (data.body) {
    changeMessage = "edited body";
  }
  Notifications.create({
    message: `${data.user.name} ${changeMessage} ${data.title}`,
    user: data.user.name
  });
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
