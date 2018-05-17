const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const {BlogPosts} = require('./models');

const jsonParser = bodyParser.json();
const app = express();

app.get('/blogChallenge', (req, res) => {
    res.json(BlogPosts.get());
});

