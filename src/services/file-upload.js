const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
  secretAccessKey: process.env.S3_ACCESS_SECRET,
  accessKeyId: process.env.S3_ACCESS_KEY,
  region: 'us-east-1'
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'forward-progress-images',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function(req, file, cb) {
      cb(null, Object.assign({}, req.body));
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});

module.exports = upload;
