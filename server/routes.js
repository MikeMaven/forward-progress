const router = require('express').Router();

const passport = require('passport');
const multer = require('multer');
const multerConfig = require('./multerConfig');
const upload = multer(multerConfig);

const app = require('./api/app.controller');
const blog = require('./api/blog.controller');
const content = require('./api/content.controller');
const fileUpload = require('./api/fileupload.controller');
const users = require('./api/user.controller');
const adminUsers = require('./api/admin.controller');
const notes = require('./api/note.controller');
const adminPolicy = require('./policy/admin.policy');
const contentPolicy = require('./policy/content.policy');

router
  .get('/applicationdata', app.get)
  .post('/SetLanguage', app.setLanguage)

  .get('/blog', blog.getBlogPosts)
  .get('/blog/index', blog.indexBlogPosts)
  .get('/blog/:id', blog.getBlog)
  .delete('/blog/:id', blog.deleteBlog)
  .post('/blog/new', blog.newBlog)

  .get('/blogs', blog.getPageOfBlogPosts)

  .get('/content/list', content.list)
  .all('/content/:locale', contentPolicy.isAllowed)
  .get('/content/:locale', content.get)
  .put('/content/:locale', content.put)

  .post('/fileupload', upload.single('image'), fileUpload.uploadPhoto)

  .get('/auth/reset/:token', users.validateResetToken)
  .post('/auth/reset/:token', users.reset)
  .post('/auth/forgotpassword', users.forgot)

  .post('/auth/signin', users.signin)
  .post('/auth/signup', users.signup)
  .get('/auth/signout', users.signout)

  .get('/auth/facebook',
    users.oauthCall('facebook',
      {
        session: false,
        scope: ['email']
      })
  )
  .get('/auth/facebook/callback', users.oauthCallback('facebook'))

  .get('/auth/windowslive',
    users.oauthCall('windowslive',
      {
        session: false,
        scope: ['wl.signin', 'wl.basic']
      })
  )
  .get('/auth/windowslive/callback', users.oauthCallback('windowslive'))

  .get('/auth/google',
    users.oauthCall('google',
      {
        session: false,
        scope: ['openid', 'profile', 'email']
      })
  )
  .get('/auth/google/callback', users.oauthCallback('google'))

  .get('/auth/linkedin',
    users.oauthCall('linkedin',
      {
        session: false,
        scope: ['r_basicprofile', 'r_emailaddress']
      })
  )

  .get('/auth/linkedin/callback', users.oauthCallback('linkedin'))

  .get('/auth/github', users.oauthCall('github'))
  .get('/auth/github/callback', users.oauthCallback('github'))

  .get('/auth/paypal', users.oauthCall('paypal'))
  .get('/auth/paypal/callback', users.oauthCallback('paypal'))

  // ==== all routes after this will be secured
  .all('/*', passport.authenticate('jwt', { session: false }))

  // =============== USERS ROUTES (secure routes) =================
  .get('/profile', users.getProfile)
  .put('/profile', users.updateProfile)
  .delete('/users/accounts', users.removeOAuthProvider)
  .post('/users/password', users.changePassword)
  .post('/users/picture',
    upload.single('newProfilePicture'),
    users.changeProfilePicture
  )
  .get('/users/picture/:id', users.getProfilePicture)
  .get('/usersToShareWith', users.getUsersToShareWith)
  .post('/usersToShareWith', users.updateUsersToShareWith)

  .get('/users', adminPolicy.isAllowed)
  .get('/users', adminUsers.list)

  .all('/users/:userId', adminPolicy.isAllowed)
  .get('/users/:userId', adminUsers.read)
  .put('/users/:userId', adminUsers.update)
  .delete('/users/:userId', adminUsers.delete)

  .get('/allNotes', notes.allNotes)
  .get('/sharedNotes', notes.sharedNotes)
  .get('/getNote/:id', notes.getNote)
  .get('/myNotes', notes.myNotes)
  .post('/starToggle', notes.starToggle)
  .post('/shareNote', notes.createShares)
  .post('/newNote', notes.newNote)
  .post('/editNote', notes.editNote)
  .post('/deleteNote', notes.deleteNote)
  .get('/myTags', notes.getTags);

module.exports = router;
