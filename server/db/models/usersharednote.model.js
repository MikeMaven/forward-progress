const User = require('./user.model.js');
const Note = require('./note.model.js');
('use strict');
module.exports = (sequelize, DataTypes) => {
  const UserSharedNote = sequelize.define(
    'UserSharedNote',
    {
      NoteId: {
        type: DataTypes.INTEGER,
        references: {
          model: Note,
          key: 'NoteId'
        }
      },
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: 'UserId'
        }
      },
      CreatorId: DataTypes.INTEGER
    },
    {}
  );
  UserSharedNote.associate = function(models) {
    UserSharedNote.belongsTo(models.Note);
    UserSharedNote.belongsTo(models.User);
  };
  return UserSharedNote;
};
