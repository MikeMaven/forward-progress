/* eslint consistent-return: "off" */
const passport = require('passport');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const _ = require('lodash');
const DB = require('../db/models');
const { BlogPost, User, Category, BlogPostCategory } = DB;
const errorHandler = require('../errorHandler');
const getAccessToken = require('../token');
const logger = require('../logger');

exports.getBlogPosts = async (req, res) => {
  const blogPosts = await BlogPost.findAll({
    limit: 10,
    include: [
      {
        model: User,
        as: 'author',
        attributes: ['firstName', 'lastName']
      },
      {
        model: Category,
        as: 'categories'
      }
    ]
  });
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

  if (!req.body || !req.user) {
    res.status(401).send('Cannot create new blog post');
  }
  const { body } = req;

  const blogData = {
    title: body.title,
    body: body.body,
    Author: req.user.id,
    coverImageURL: body.imageURL,
    subTitle: body.subTitle,
    isPaid: body.isPaid,
    photoGallery: body.photoGallery
  };

  let newBlogScoped = null;

  BlogPost.create(blogData)
    .then(newBlog => {
      console.log(newBlog);
      newBlogScoped = newBlog;
      let promises = [];
      let newCategories = body.categories.filter(category => category.new);
      newCategories.forEach(category => {
        const newCategory = Object.assign({
          name: category.name
        });
        let newPromise = Category.create(newCategory);
        promises.push(newPromise);
      });
      return Promise.all(promises)
    }).then(newBlog => {
      body.categories.forEach(category => {
        Category.findOne({ where: { name: category.name } }).then(category => {
          const newBlogPostCategory =  Object.assign({
            BlogPostId: newBlogScoped.id,
            CategoryId: category.id
          });
          BlogPostCategory.create(newBlogPostCategory);
        })
      })
      return newBlogScoped;
    })
    .then(blog => {
      res.json(blog);
    })
    .catch(error => {
      res.status(400).send(error);
    })
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

exports.getAllCategories = (req, res) => {
  Category.findAll().then(categories => {
    res.json(categories)
  });
}
