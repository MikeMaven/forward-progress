/* eslint-disable */

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'Role', {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      timestamps: false,
      classMethods: {
        associate(models) {
          // associations can be defined here
        },
      },
    }
  );

  Role.associate = function (models) {
    Role.belongsToMany(models.User, {
      timestamps: false,
      through: 'Userroles',
      foreignKey: 'RoleId',
      otherKey: 'UserId'
    })
  };

  return Role;
};
