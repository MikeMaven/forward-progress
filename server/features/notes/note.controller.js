/* eslint consistent-return: "off" */
const passport = require('passport');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const _ = require('lodash');
const DB = require('../../db/models');
const { Note, User, Usernote, Tag, NoteTag } = DB;
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
    User.findByPk(req.user.dataValues.id, {
      include: [
        {
          model: Note,
          as: 'notes'
        }
      ]
    }).then(user => {
      user.notes = user.notes.sort((earlier, later) => {
        return later.updatedAt - earlier.updatedAt;
      });
      res.json(user);
    });
  } else {
    return res.status(401).send({});
  }
};

exports.getNote = (req, res) => {
  if (req.user) {
    Note.findByPk(req.params.id, {
      include: [
        {
          model: Tag,
          as: 'tags'
        }
      ]
    })
      .then(note => {
        res.json(note);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  } else {
    return res.status(401).send({});
  }
};

exports.newNote = (req, res) => {
  let newNoteScoped = null;

  if (req.user && (req.body.title && req.body.body)) {
    // Create new Note
    const newNote = Object.assign({
      title: req.body.title,
      body: req.body.body
    });
    Note.create(newNote)
      .then(newNote => {
        // Create new UserNote association
        const newUsernote = Object.assign({
          UserId: req.user.dataValues.id,
          NoteId: newNote.id
        });
        Usernote.create(newUsernote);
        newNoteScoped = newNote;
        return newNote;
      })
      .then(newNote => {
        // Create all NEW tags
        let promises = [];
        req.body.newTags.forEach(tag => {
          const newTag = Object.assign({
            name: tag.name,
            UserId: req.user.dataValues.id
          });
          let newPromise = Tag.create(newTag);
          promises.push(newPromise);
        });
        return Promise.all(promises);
      })
      .then(newNote => {
        // Create all TAG/NOTE associations
        req.body.tags.forEach(tag => {
          Tag.findOne({ where: { name: tag.name } }).then(tag => {
            const newNoteTag = Object.assign({
              NoteId: newNoteScoped.id,
              TagId: tag.id
            });
            NoteTag.create(newNoteTag);
          });
        });
        return newNoteScoped;
      })
      .then(note => {
        res.json(note);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  } else {
    return res.status(401).send({});
  }
};

exports.editNote = (req, res) => {
  let updatedNoteScoped = null;
  let oldTagsScoped = [];
  if (req.user) {
    // Update note
    Note.update(
      { title: req.body.title, body: req.body.body },
      { returning: true, where: { id: req.body.id } }
    )
      .then(function([rowsUpdate, [updatedNote]]) {
        updatedNoteScoped = updatedNote;
        // GET TAGS ASSOCIATED WITH EDITED NOTE
        let noteWithTags = Note.findByPk(req.body.id, {
          include: [
            {
              model: Tag,
              as: 'tags'
            }
          ]
        });
        return noteWithTags;
      })
      .then(noteWithTags => {
        const requestTags = req.body.tags;
        const oldTags = noteWithTags.tags;
        oldTagsScoped = noteWithTags.tags;
        let removedNoteTags = [];
        // Compare saved associated tags with newly passed tags and look for any missing ones
        oldTags.forEach(tag => {
          const foundTag = requestTags.find(reqTag => {
            return reqTag.id === tag.id;
          });
          if (!foundTag) {
            removedNoteTags.push(tag.NoteTags);
          }
        });
        // Delete missing (removed) associations
        let promises = [];
        removedNoteTags.forEach(noteTag => {
          let newPromise = NoteTag.destroy({
            where: {
              NoteId: noteTag.NoteId,
              TagId: noteTag.TagId
            }
          });
          promises.push(newPromise);
        });
        return Promise.all(promises);
      })
      .then(result => {
        // Create new Tags (if any)
        let promises = [];
        req.body.newTags.forEach(tag => {
          const newTag = Object.assign({
            name: tag.name,
            UserId: req.user.dataValues.id
          });
          let newPromise = Tag.create(newTag);
          promises.push(newPromise);
        });
        return Promise.all(promises);
      })
      .then(returned => {
        // SEARCH OLD TAGS COMPARED WITH TAGS ON REQUEST TO FIND ANY NEW ONES (ADD CONNECTIONS)
        // CREATE CONNECTIONS WITH NEWLY CREATED TAGS
        console.log(oldTagsScoped);
        return res.json(updatedNoteScoped);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  } else {
    return res.status(401).send({});
  }
};

exports.getTags = (req, res) => {
  if (req.user) {
    Tag.findAll({
      userId: null
    }).then(tags => {
      res.json(tags);
    });
  } else {
    return res.status(401).send({});
  }
};
