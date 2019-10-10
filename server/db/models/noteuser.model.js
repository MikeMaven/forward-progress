'use strict';
module.exports = (sequelize, DataTypes) => {
  const NoteUser = sequelize.define(
    'NoteUser',
    {
      NoteID: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      CreatorId: DataTypes.INTEGER
    },
    {}
  );
  NoteUser.associate = function(models) {
    NoteUser.belongsTo(models.Note);
    NoteUser.belongsTo(models.User);
  };
  return NoteUser;
};
