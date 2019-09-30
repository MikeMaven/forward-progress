const upload = require('../../../src/services/file-upload');
const singleUpload = upload.single('image');

exports.uploadPhoto = (req, res) => {
  singleUpload(req, res, function(err) {
    console.log(req.file);
    return res.json({ imageUrl: req.file.location });
  });
};
