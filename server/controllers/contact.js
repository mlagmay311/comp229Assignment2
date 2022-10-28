let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");


let Contact = require("../models/contact");

module.exports.displayBookList = (req, res, next) => {
  Contact.find((err, contactList) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("contact/list", { title: "Contacts", ContactList: contactList });
     
    }
  });
};

module.exports.addpage = (req, res, next) => {
  res.render("contact/add", {
    title: "Add Contact",
    displayName: req.user ? req.user.displayName : "",
  });
};

module.exports.addprocesspage = (req, res, next) => {
  let newBook = Contact({
    Name: req.body.Name,
    ContactNumber: req.body.ContactNumber,
    EmailAddress: req.body.EmailAddress,
   
  });
  Contact.create(newBook, (err, Contact) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
 
      res.redirect("/contact-list");
    }
  });
};

module.exports.displayeditpage = (req, res, next) => {
  let id = req.params.id; 

  Contact.findById(id, (err, contacttoedit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
  
      res.render("contact/edit", { title: "Edit Contact", contact: contacttoedit });
    }
  });
};

module.exports.processingeditpage = (req, res, next) => {
  let id = req.params.id; //id of actual object

  let updatecontact = Contact({
    _id: id,
    Name: req.body.Name,
    ContactNumber: req.body.ContactNumber,
    EmailAddress: req.body.EmailAddress,
  });
  Contact.updateOne({ _id: id }, updatecontact, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh the book list
      res.redirect("/contact-list");
    }
  });
};

module.exports.deletepage = (req, res, next) => {
  let id = req.params.id;
  Contact.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh book list
      res.redirect("/contact-list");
    }
  });
};
