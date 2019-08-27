'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    'Tag',
    {
      name: DataTypes.STRING
      // user_id: DataTypes.INTEGER
    },
    {}
  );
  Tag.associate = function(models) {
    Tag.belongsToMany(models.Note, {
      through: 'NoteTags',
      as: 'notes',
      foreignKey: 'tagId',
      otherKey: 'noteId'
    });
  };
  return Tag;
};
