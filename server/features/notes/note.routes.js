const passport = require('passport');
const multer = require('multer');
const multerConfig = {
  // dest: './profile/images/',
  limits: {
    fileSize: 1 * 1024 * 1024 // Max file size in bytes (1 MB)
  },
  fileFilter: (req, file, callback) => {
    if (
      file.mimetype !== 'image/png' &&
      file.mimetype !== 'image/jpg' &&
      file.mimetype !== 'image/jpeg' &&
      file.mimetype !== 'image/gif'
    ) {
      const err = new Error();
      err.code = 'UNSUPPORTED_MEDIA_TYPE';
      return callback(err, false);
    }
    return callback(null, true);
  }
};

module.exports = app => {
  const notes = require('./note.controller');

  app.route('/api/getNotes').get(notes.getNotes);
  app.route('/api/getNote/:id').get(notes.getNote);
  app.route('/api/myNotes').get(notes.myNotes);
  app.route('/api/newNote').post(notes.newNote);
};
