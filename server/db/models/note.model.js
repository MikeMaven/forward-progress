'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define(
    'Note',
    {
      title: DataTypes.STRING,
      body: DataTypes.STRING,
      starred: DataTypes.BOOLEAN
    },
    {}
  );
  Note.associate = function(models) {
    Note.belongsToMany(models.User, {
      through: 'Usernotes',
      as: 'users',
      foreignKey: 'NoteId',
      otherKey: 'UserId'
    });

    Note.belongsToMany(models.User, {
      through: 'UserSharedNotes',
      as: 'sharedusers',
      foreignKey: 'NoteId',
      otherKey: 'UserId',
      timestamps: false
    });

    Note.belongsToMany(models.Tag, {
      through: 'NoteTags',
      as: 'tags',
      foreignKey: 'NoteId',
      otherKey: 'TagId'
    });
  };
  return Note;
};
