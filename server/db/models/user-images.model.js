/* eslint-disable */

module.exports = function (sequelize, DataTypes) {
  const UserImage = sequelize.define(
    'user_image',
    {
      contentType: DataTypes.STRING,
      data: DataTypes.BLOB,
    },
    {
    }
  );

  UserImage.associate = function (models) {
    UserImage.belongsTo(models.user, { foreignKey: 'userid' });
  };

  return UserImage;
};
