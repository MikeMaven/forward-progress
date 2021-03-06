module.exports = {
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
