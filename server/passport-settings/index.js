const passport = require('passport');

passport.use(require('./facebook'));
passport.use(require('./google'));
passport.use(require('./jwt'));
passport.use(require('./local'));

module.exports = passport;
