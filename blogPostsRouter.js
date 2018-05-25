const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const {BlogPost} = require('./models');


//GET all entries
router.get('/', (req, res) => {
    BlogPost
        .find()
        .then(blogpostdatas => {
            res.json(blogpostdatas.map(blogpostdata => blogpostdata.serialize()));
        })
          .catch(err => {
                console.error(err);
                res.status(500).json({ message: 'Internal server error' });
              }); 
          });
        
//GET a post by ID
router.get('/:id', (req, res) => {
    BlogPost
        .findById(req.params.id)
        .then(blogpostdata => {
            res.json(blogpostdata.serialize());
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
          }); 
      });

 
//POST
router.post('/',  (req, res) => {
    const requiredFields = ['title', 'content', 'author'];
    for (let i=0; i<requiredFields.length; i++){
        const field =requiredFields[i];
        if(!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }
    BlogPost
        .create({
            title: req.body.title,
            content: req.body.content,
            author: { 
                firstName: req.body.author.firstName,
                lastName: req.body.author.lastName    
            }
        })
        .then(blogpostdata => { 
            res.status(201).json(blogpostdata.serialize());
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' }); 
        });
    });


    
  /*  
    

//PUT
router.put('/:id', jsonParser, (req, res) => {
    const requiredFields = ['title', 'content', 'author', 'id'];
    for (let i=0; i<requiredFields.length; i++){
        const field =requiredFields[i];
        if(!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }
    if (req.params.id !== req.body.id){
        const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
        console.error(message);
        return res.status(400).send(message);
    }
    console.log(`Updating blog post entry \`${req.params.id}\``);
     const updatedBlogPosts =
     BlogPosts.update({
        id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        publishDate: req.body.publishDate
    });
    res.status(200).send(updatedBlogPosts);
});

//DELETE
router.delete('/:id', (req, res) => {
    BlogPosts.delete(req.params.id);
    console.log(`Deleted Shopping list item \`${req.params.id}\``);
    res.status(204).end();
});
*/
module.exports = router;