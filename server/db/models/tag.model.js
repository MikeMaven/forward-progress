'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    'Tag',
    {
      name: DataTypes.STRING,
      UserId: DataTypes.INTEGER
    },
    {}
  );
  Tag.associate = function(models) {
    Tag.belongsToMany(models.Note, {
      through: 'NoteTags',
      as: 'notes',
      foreignKey: 'TagId',
      otherKey: 'NoteId'
    });
  };
  return Tag;
};
