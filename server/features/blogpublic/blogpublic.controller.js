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
    BlogPost.findAll().then(blogPosts => {
      let fetchedPosts = [];
      let postCount = blogPosts.length;
      for (postCount = 0; postCount < 10; postCount++) {
        if (blogPosts[currentPageIndex + postCount]) {
          fetchedPosts.push(blogPosts[currentPageIndex + postCount]);
        } else {
          break;
        }
      }
      res.json({ fetchedPosts, postCount });
    });
  }
};
