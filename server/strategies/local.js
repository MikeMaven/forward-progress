const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const DB = require('../db/models');
const { User } = DB;

module.exports = new LocalStrategy(
  {
    usernameField: 'usernameOrEmail',
    passwordField: 'password'
  },
  async (usernameOrEmail, password, done) => {
    try {
      const user = await User.findOne({
        include: [
          { model: DB.Role, attributes: ['id', 'name'] },
          { model: DB.UserImage, attributes: ['id'] }
        ],
        where: {
          $or: [
            {
              username: {
                $eq: usernameOrEmail.toLowerCase()
              }
            },
            {
              email: {
                $eq: usernameOrEmail.toLowerCase()
              }
            }
          ]
        }
      });
      return user && user.validPassword(password)
        ? done(null, user)
        : done(null, false, `Invalid username or password (${new Date().toLocaleTimeString()})`)
    }
    catch(error) {
      done(error);
    }
  }
)