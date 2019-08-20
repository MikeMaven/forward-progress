'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define(
    'Note',
    {
      title: DataTypes.STRING,
      body: DataTypes.STRING
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
  };
  return Note;
};
