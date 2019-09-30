const passport = require('passport');
const multer = require('multer');

module.exports = app => {
  const fileUpload = require('./fileupload.controller');

  app.route('/api/fileupload').post(fileUpload.uploadPhoto);
};
