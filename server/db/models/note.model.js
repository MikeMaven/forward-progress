'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define(
    'note',
    {
      title: DataTypes.STRING,
      body: DataTypes.STRING,
      starred: DataTypes.BOOLEAN
    },
    {}
  );
  Note.associate = function(models) {
    Note.belongsToMany(models.User, {
      through: 'user_notes',
      as: 'users',
      foreignKey: 'noteid',
      otherKey: 'userid'
    });

    Note.belongsToMany(models.Tag, {
      through: 'note_tags',
      as: 'tags',
      foreignKey: 'noteid',
      otherKey: 'tagid'
    });
  };
  return Note;
};
