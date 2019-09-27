const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const DB = require('../../../db/models');
const { user } = DB;

module.exports = () => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: global.appConfig.Security.JWT_SECRET
  };
  passport.use(
    new Strategy(opts, (payload, done) => {
      user
        .findOne({
          include: [
            { model: DB.role },
            { model: DB.user_image, attributes: ['id'] }
          ],
          where: {
            id: payload.id
          }
        })
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
          // or you could create a new account
        })
        .catch(err => done(err, false));
    })
  );
};
