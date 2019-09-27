/* eslint-disable */

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'role', {
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
    Role.belongsToMany(models.user, {
      timestamps: false,
      through: 'UserRole',
      foreignKey: 'userid',
    });
  };

  return Role;
};
