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
