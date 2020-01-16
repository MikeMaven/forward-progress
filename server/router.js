const globby = require('globby');
const path = require('path');

module.exports = function apiMiddlewares(app) {
  
  /* eslint global-require: "off" */
  globby([`${__dirname}/./features/*/**/*.policy.js`]).then(policies => {
    policies.forEach(policyPath => {
      require(path.resolve(policyPath)).invokeRolesPolicies();
    });
  });

  // ========= Public routes
  // App public routes
  require('./features/app/app.routes')(app);
  require('./features/blogpublic')(app);
  // Content public routes
  require('./features/content/content-public.routes')(app);
  // ========= Secure routes
  // User's feature, this incldues auth middleware as well
  require('./features/users')(app);
  require('./features/notes')(app);
  require('./features/blog')(app);
  require('./features/fileupload')(app);
  // Content public routes
  require('./features/content/content.routes')(app);
};
