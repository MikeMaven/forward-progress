const passport = require('passport');

module.exports = app => {
  // Add passport's middleware
  app.use(passport.initialize());
  app.use(passport.session());
  require('./blog.routes')(app);
};
