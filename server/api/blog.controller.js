/* eslint consistent-return: "off" */
const passport = require('passport');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const _ = require('lodash');
const DB = require('../db/models');
const { BlogPost, User } = DB;
const errorHandler = require('../errorHandler');
const getAccessToken = require('../token');
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

exports.getBlogPosts = async (req, res) => {
  const blogPosts = await BlogPost.findAll();

  res.json(blogPosts);
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
