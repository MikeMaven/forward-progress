'use strict';
module.exports = (sequelize, DataTypes) => {
  const NoteTag = sequelize.define(
    'NoteTag',
    {
      note_id: DataTypes.INTEGER,
      tag_id: DataTypes.INTEGER
    },
    {}
  );
  NoteTag.associate = function(models) {
    NoteTag.belongsTo(models.Note);
    NoteTag.belongsTo(models.Tag);
  };
  return NoteTag;
};
