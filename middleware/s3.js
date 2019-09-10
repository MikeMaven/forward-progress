const AWS = require('aws-sdk');

// Function takes an object with the file name.
// In the future you can add more query parameters here that can be considered when generating the S3 key
function getDropzone({ filename }, bucket, client) {
  // Here you decide what you want to name your S3 filename (key)
  const key = `images/${filename}`;

  // Parmas that we use to create our signature
  const params = {
    Bucket: bucket,
    Expires: 3600,
    Conditions: [
      // This depicts the ACL the file will have when uploaded
      { acl: 'public-read-write' },
      { success_action_status: '201' },
      ['starts-with', '$Content-Type', ''],
      ['starts-with', '$key', '']
    ]
  };

  // Use the aws-sdk method to create the signature
  const res = client.createPresignedPost(params);

  // Parameters taken straight from the example at
  // https://rowanwins.github.io/vue-dropzone/docs/dist/#/aws-s3-upload
  return {
    signature: {
      'Content-Type': '',
      acl: 'public-read-write',
      success_action_status: '201',
      key,
      ...res.fields // Additional fields submitted as headers to S3
    },
    postEndpoint: res.url
  };
}

exports.signedUrl = function signedUrl({
  accessKeyId,
  secretAccessKey,
  region,
  bucket
}) {
  // Start up a new S3 client
  const client = new AWS.S3({
    accessKeyId,
    secretAccessKey,
    region
  });
  return function(req, res, next) {
    // FIXME: Don't forget to lock this endpoint down with some authentication
    return res.json(aws.getDropzone(req.query, bucket, client));
  };
};
