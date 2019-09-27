'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usernote = sequelize.define(
    'usernote',
    {
      user_id: DataTypes.INTEGER,
      note_id: DataTypes.INTEGER
    },
    {}
  );
  Usernote.associate = function(models) {
    Usernote.belongsTo(models.user);
    Usernote.belongsTo(models.note);
  };
  return Usernote;
};
