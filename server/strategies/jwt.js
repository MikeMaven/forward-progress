const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const DB = require('../db/models');
const { User } = DB;

module.exports = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: global.appConfig.Security.JWT_SECRET
  },
  async (payload, done) => {
    try {
      const user = await User.findOne({
        include: [
          { model: DB.Role },
          { model: DB.UserImage, attributes: ['id'] }
        ],
        where: {
          id: payload.id
        }
      });
      return user ? done(null, user) : done(null, false);
    }
    catch(error) {
      done(err, false);
    }
  }
)