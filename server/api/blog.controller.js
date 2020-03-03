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

exports.getBlogPosts = async (req, res) => {
  // if (!req.user.isAdmin) {
  //   return res.status(401).send('Unauthorized User');
  // }
  const blogPosts = await BlogPost.findAll({});
  res.json(blogPosts);
};

exports.indexBlogPosts = async (req, res) => {
  const blogPosts = await BlogPost.findAll({
    include: [
      {
        model: User,
        attributes: ['firstName', 'lastName']
      }
    ],
    attributes: [
      'title',
      'subTitle',
      'Author',
      'coverImageURL',
      'body',
      'isPaid'
    ],
    order: ['createdAt']
  });

  res.json(blogPosts);
};

exports.getBlog = async (req, res) => {
  const { id } = req.params;

  if (!id || !/^\d+$/.test(id)) {
    return res.status(401).send('Cannot find specified blog');
  }

  const blog = await BlogPost.findByPk(id);

  res.json(blog);
};

exports.deleteBlog = async (req, res) => {
  const { id } = req.params;

  if (!id || !/^\d+$/.test(id)) {
    return res.status(401).send('Cannot delete specified blog');
  }

  const blog = await BlogPost.destroy({ where: { id } });

  res.json(blog);
};

exports.newBlog = async (req, res) => {
  if (!req.body) {
    res.status(401).send('Cannot create new blog post');
  }
  const { body } = req;

  const newBlog = {
    title: body.title,
    body: body.content,
    Author: body.Author.id,
    coverImageURL: body.coverImageURL,
    subTitle: body.subtitle,
    isPaid: body.isPaid,
    photoGallery: body.photoGallery,
    tags: body.tags
  };

  const blog = await BlogPost.create(newBlog);
  return res.json(blog);
};

exports.getPageOfBlogPosts = (req, res) => {
  if (isNaN(req.query.page) || req.query.page < 1) {
    res.status(401).send({});
  } else {
    const currentPageIndex = (req.query.page - 1) * 10;
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
