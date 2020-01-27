/* eslint consistent-return: "off" */
const { BlogPost, User } = require('../db/models');

exports.getAllPosts = async (req, res) => {
  // if (!req.user.isAdmin) {
  //   return res.status(401).send('Unauthorized User');
  // }
  const blogPosts = await BlogPost.findAll({});

  res.json(blogPosts);
};

exports.getIndex = async (req, res) => {
  const blogPosts = await BlogPost.findAll({
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

exports.getPost = async (req, res) => {
  const { id } = req.params;

  if (!id || !/^\d+$/.test(id)) {
    return res.status(401).send('Cannot find specified blog');
  }

  const blog = await BlogPost.findByPk(id);

  res.json(blog);
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;

  if (!id || !/^\d+$/.test(id)) {
    return res.status(401).send('Cannot delete specified blog');
  }

  const blog = await BlogPost.destroy({ where: { id } });

  res.json(blog);
};

exports.newPost = async (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) {
    res.status(401).send('Cannot create new blog post');
  }

  const newBlog = {
    title,
    body,
    subTitle: req.body.subTitle,
    coverImageURL: req.body.imageURL,
    isPaid: req.body.isPaid,
    Author: req.user.dataValues.id,
    photoGallery: req.body.photoGallery
  };

  const blog = await BlogPost.create(newBlog);
  res.json(blog);
};

exports.getPageOfBlogPosts = (req, res) => {
  if (isNaN(req.params.page) || req.params.page < 1) {
    res.status(401).send({});
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
