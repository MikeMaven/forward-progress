'use strict';
module.exports = (sequelize, DataTypes) => {
  const NoteUser = sequelize.define(
    'UserSharedNote',
    {
      NoteId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
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
