'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    'tag',
    {
      name: DataTypes.STRING,
      UserId: DataTypes.INTEGER
    },
    {}
  );
  Tag.associate = function(models) {
    Tag.belongsToMany(models.Note, {
      through: 'note_tags',
      as: 'notes',
      foreignKey: 'tagid',
      otherKey: 'noteid'
    });
  };
  return Tag;
};
