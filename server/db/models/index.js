const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../database.json')[env];
const models = {};
let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: true,
    },
  });
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

/* eslint global-require: off */
const modules = [
  require('./blogpost.model.js'),
  require('./content.model.js'),
  require('./contenttext.model.js'),
  require('./language.model.js'),
  require('./note.model.js'),
  require('./role.model.js'),
  require('./user-images.model.js'),
  require('./usernote.model.js'),
  require('./user.model.js'),
  require('./tag.model.js'),
  require('./notetag.model.js'),
  require('./userrole.model.js'),
  require('./usersharednote.model.js'),
  require('./blogpostcategory.model.js'),
  require('./category.model.js')
];

// Initialize models
modules.forEach(module => {
  const model = module(sequelize, Sequelize, config);
  models[model.name] = model;
});

// Apply associations
Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
