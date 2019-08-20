/* eslint consistent-return: "off" */
const passport = require('passport');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const _ = require('lodash');
const DB = require('../../db/models');
const { Note, User, Usernote } = DB;
const errorHandler = require('../core/errorHandler');
const { getAccessToken } = require('../users/token');
const logger = require('../logger');

exports.getNotes = (req, res) => {
  let notes = null;
  Note.findAll().then(notes => {
    res.json(notes);
  });
};

exports.myNotes = (req, res) => {
  let notes = null;
  if (req.user) {
    console.log(req);
    User.findByPk(req.user.dataValues.id, {
      include: [
        {
          model: Note,
          as: 'notes'
        }
      ]
    }).then(user => {
      res.json(user);
    });
  } else {
    return res.status(401).send({});
  }
};
