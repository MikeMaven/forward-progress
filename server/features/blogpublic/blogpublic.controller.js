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

exports.getBlogPosts = (req, res) => {
  res.json('testing public route');
};

exports.getPageOfBlogPosts = (req, res) => {
  if (isNaN(req.params.page) || req.params.page < 1) {
    return res.status(401).send({});
  } else {
    const currentPageIndex = (req.params.page - 1) * 10;
    BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['firstName', 'lastName']
        }
      ]
    }).then(blogPosts => {
      let fetchedPosts = [];
      let postCount = blogPosts.length;
      for (let x = 0; x < 10; x++) {
        if (blogPosts[currentPageIndex + x]) {
          fetchedPosts.push(blogPosts[currentPageIndex + x]);
        } else {
          break;
        }
      }
      res.json({ fetchedPosts, postCount });
    });
  }
};
