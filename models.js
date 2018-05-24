'use strict';
const mongoose = require('mongoose');


//write schema for blogposts


const blogPostSchema = mongoose.schema({
  title:  {type: String , required: true},
  author: {
    firstName: {type: String, required: true},
    lastName:  {type: String, required: true}
          },
  content: {type: String, required: true}
  });
  
//virtual fullName
blogPostSchema.virtual('fullName').get(function(){
  return `${this.firstName} ${this.lastName}`.trim()
});



//instance
blogPostSchema.methods.serialize = function(){
  return {
    id: this._id,
    title: this.title,
    author: this.fullName,
    content: this.content,
  }
}


const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = {BlogPost};