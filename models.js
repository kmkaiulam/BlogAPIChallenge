'use strict';
const mongoose = require('mongoose');



const blogPostSchema = mongoose.Schema({
  title: {type: String , required: true},
  author: {
    firstName: {type: String, required: true},
    lastName:  {type: String, required: true}
          },
    content: {type: String, required: true}
  });
  
//virtual fullName
blogPostSchema.virtual('authorName').get(function(){
  return `${this.author.firstName} ${this.author.lastName}`.trim()
});



//instance
blogPostSchema.methods.serialize = function(){
  return {
    id: this._id,
    title: this.title,
    author: this.authorName,
    content: this.content,
  };
};

//mongoose.model looks for a database plural version of your collection name
const BlogPost = mongoose.model('blogpostdata', blogPostSchema);

module.exports = {BlogPost};