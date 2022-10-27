let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//create a model class
let contactModel = mongoose.Schema(
  {
    Name: String,
    ContactNumber: String,
    EmailAddress: String,
    
  },

  {
    collection: "contact",
  }
);

//booksmodel to create new book more powerful than just class
module.exports = mongoose.model("Contact", contactModel);
