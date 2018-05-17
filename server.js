const express = require('express');
const app = express();
const morgan = require('morgan');
const blogPostsRouter = require('./blogPostsRouter');


app.use(express.static('public'));
app.use(morgan('common'));
app.get('/', (req, res) => {
    res.sendFile(_dirname + '/public/index.html');
})


app.use('/blog-posts', blogPostsRouter);


app.listen(process.env.PORT || 8080, () => {
    console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
  });