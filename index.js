const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRouter = require('./routes/user');
const blogRouter = require('./routes/blogs');
const commentRouter = require('./routes/comments');
const notificationRouter = require('./routes/notifications');

require('./config/mongoose');

app.use(bodyParser.json());

//routes
app.use('/user', userRouter);
app.use('/blog', blogRouter);
app.use('/comment', commentRouter);
app.use('/notifications', notificationRouter);

//to serve our client side files(react)
if (process.env.NODE_ENV.trim() === 'production') {
  //to serve our js and css assets
  app.use(express.static('client/build'));

  //to server our index.html file
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is up on ${PORT}`);
});
