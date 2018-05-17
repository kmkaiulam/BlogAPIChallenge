const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const {BlogPosts} = require('./models');

const jsonParser = bodyParser.json();
const app = express();

app.get('/blogChallenge', (req, res) => {
    res.json(BlogPosts.get());
});













app.listen(process.env.PORT || 8080, () => {
    console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
  });