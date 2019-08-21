'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usernote = sequelize.define(
    'Usernote',
    {
      user_id: DataTypes.INTEGER,
      note_id: DataTypes.INTEGER
    },
    {}
  );
  Usernote.associate = function(models) {
    Usernote.belongsTo(models.User);
    Usernote.belongsTo(models.Note);
  };
  return Usernote;
};
