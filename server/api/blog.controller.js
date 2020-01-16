/* eslint consistent-return: "off" */
const passport = require('passport');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const _ = require('lodash');
const DB = require('../../db/models');
const {
  BlogPost,
  Note,
  User,
  Usernote,
  Tag,
  NoteTag,
  Role,
  UserSharedNote
} = DB;
const errorHandler = require('../core/errorHandler');
const { getAccessToken } = require('../users/token');
const logger = require('../logger');

exports.newBlog = (req, res) => {
  if (req.user && (req.body.title && req.body.body)) {
    const newBlog = Object.assign({
      title: req.body.title,
      subTitle: req.body.subTitle,
      body: req.body.body,
      coverImageURL: req.body.imageURL,
      isPaid: req.body.isPaid,
      Author: req.user.dataValues.id
    });
    BlogPost.create(newBlog).then(blog => {
      const responseBlog = JSON.stringify(blog);
      res.json(responseBlog);
    });
  } else {
    res.status(401).send([]);
  }
};
