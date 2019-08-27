'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    'Tag',
    {
      name: DataTypes.STRING,
      userID: DataTypes.INTEGER
    },
    {}
  );
  Tag.associate = function(models) {
    Tag.hasOne(models.NoteTag, { foreignKey: 'tagId' });
    Tag.belongsToMany(models.Note, {
      through: 'NoteTags',
      as: 'notes'
      foreignKey: 'tagId',
      otherKey: 'noteId'
    })
  };
  return Tag;
};
