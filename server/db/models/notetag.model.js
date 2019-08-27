'use strict';
module.exports = (sequelize, DataTypes) => {
  const NoteTag = sequelize.define(
    'NoteTag',
    {
      NoteId: DataTypes.INTEGER,
      TagId: DataTypes.INTEGER
    },
    {}
  );
  NoteTag.associate = function(models) {
    NoteTag.belongsTo(models.Note);
    NoteTag.belongsTo(models.Tag);
  };
  return NoteTag;
};
