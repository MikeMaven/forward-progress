'use strict';
module.exports = (sequelize, DataTypes) => {
  const NoteTag = sequelize.define(
    'note_tag',
    {
      NoteId: DataTypes.INTEGER,
      TagId: DataTypes.INTEGER
    },
    {}
  );
  NoteTag.associate = function(models) {
    NoteTag.belongsTo(models.note);
    NoteTag.belongsTo(models.tag);
  };
  return NoteTag;
};
