'use strict';
module.exports = (sequelize, DataTypes) => {
  const Userrole = sequelize.define(
    'Userrole',
    {
      user_id: DataTypes.INTEGER,
      role_id: DataTypes.INTEGER
    },
    {}
  );
  Userrole.associate = function(models) {
    Userrole.belongsTo(models.User);
    Userrole.belongsTo(models.Role);
  };
  return Userrole;
};
