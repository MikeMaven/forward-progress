const express = require('express');
const router = express.Router();
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

const appCtrl = require('./api/app.controller');
const blog = require('./api/blog.controller');
const contentCtrl = require('./api/content.controller');
const fileUpload = require('./api/fileupload.controller');
const notes = require('./api/note.controller');
const users = require('./api/user.controller');
const adminUsers = require('./api/admin.controller');


const contentPolicy = require('./policy/content.policy');
const adminPolicy = require('./policy/admin.policy');

module.exports = (app) => {
  // app
  router.get('/api/applicationdata', appCtrl.get);
  router.post('/api/SetLanguage', appCtrl.setLanguage);

  // blog
  router.get('/api/getBlogPosts', blog.getBlogPosts);
  router.get('/api/getPageOfBlogPosts/:page', blog.getPageOfBlogPosts);
  router.post('/api/newBlog', blog.newBlog);

  // content
  router.get('/api/content/list', contentCtrl.list);
  router.all('/api/content/:locale', contentPolicy.isAllowed);
  router.get('/api/content/:locale', contentCtrl.get);
  router.put('/api/content/:locale', contentCtrl.put);

  // file upload
  router.post('/api/fileupload', fileUpload.uploadPhoto);

  // notes
  router.get('/api/allNotes', notes.allNotes);
  router.get('/api/sharedNotes', notes.sharedNotes);
  router.get('/api/getNote/:id', notes.getNote);
  router.get('/api/myNotes', notes.myNotes);
  router.get('/api/myTags', notes.getTags);
  router.post('/api/starToggle', notes.starToggle);
  router.post('/api/shareNote', notes.createShares);
  router.post('/api/newNote', notes.newNote);
  router.post('/api/editNote', notes.editNote);
  router.post('/api/deleteNote', notes.deleteNote);

  // user

  // =============== OAUTH ROUTES (public routes) =================
  // Setting up the users password api
  router.get('/api/auth/reset/:token', users.validateResetToken);
  router.post('/api/auth/reset/:token', users.reset);
  router.post('/api/auth/forgotpassword', users.forgot);

  // Setting up the users authentication api
  router.post('/api/auth/signin', users.signin);
  router.post('/api/auth/signup', users.signup);
  router.get('/api/auth/signout', users.signout);

  // Setting the facebook oauth routes
  router.get('/api/auth/facebook', users.oauthCall(
    'facebook',
    {
      session: false,
      scope: ['email']
    })
  );
  router.get('/api/auth/facebook/callback', users.oauthCallback('facebook'));

  // Setting the windowslive oauth routes
  router.get('/api/auth/windowslive', users.oauthCall(
    'windowslive',
    {
      session: false,
      scope: ['wl.signin', 'wl.basic']
    }
    )
  );
  router.get('/api/auth/windowslive/callback', users.oauthCallback('windowslive'));

  // Setting the google oauth routes
  router.get('/api/auth/google', users.oauthCall(
    'google',
    {
      session: false,
      scope: ['openid', 'profile', 'email']
    })
  );
  router.get('/api/auth/google/callback', users.oauthCallback('google'));

  // Setting the linkedin oauth routes
  router.get('/api/auth/linkedin', users.oauthCall(
    'linkedin',
    {
      session: false,
      scope: ['r_basicprofile', 'r_emailaddress']
    })
  );

  router.get('/api/auth/linkedin/callback', users.oauthCallback('linkedin'));

  // Setting the github oauth routes
  router.get('/api/auth/github', users.oauthCall('github'));
  router.get('/api/auth/github/callback', users.oauthCallback('github'));

  // Setting the paypal oauth routes
  router.get('/api/auth/paypal', users.oauthCall('paypal'));
  router.get('/api/auth/paypal/callback', users.oauthCallback('paypal'));

  // ==== all routes after this will be secured
  router.all('/api/*', passport.authenticate('jwt', { session: false }));

  // =============== USERS ROUTES (secure routes) =================
  // Setting up the users profile api
  router.get('/api/profile', users.getProfile);
  router.put('/api/profile', users.updateProfile);
  router.delete('/api/users/accounts', users.removeOAuthProvider);
  router.post('/api/users/password', users.changePassword);
  router.post('/api/users/picture',
    multer(multerConfig).single('newProfilePicture'),
    users.changeProfilePicture
  );
  router.get('/api/users/picture/:id', users.getProfilePicture);
  router.get('/api/usersToShareWith', users.getUsersToShareWith);
  router.post('/api/usersToShareWith', users.updateUsersToShareWith);

  // admin

  // Users collection routes
  router.get('/api/users', adminPolicy.isAllowed);
  router.get('/api/users', adminUsers.list);

  // Single user routes
  router.all('/api/users/:userId', adminPolicy.isAllowed);
  router.get('/api/users/:userId', adminUsers.read);
  router.put('/api/users/:userId', adminUsers.update);
  router.delete('/api/users/:userId', adminUsers.delete);
}
