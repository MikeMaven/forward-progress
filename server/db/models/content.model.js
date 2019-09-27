/* eslint-disable */

module.exports = function (sequelize, DataTypes) {
  const Content = sequelize.define(
    'content', {
      key: DataTypes.STRING,
    },
    {
      timestamps: false,
      indexes: [
        // Create a unique index on poem
        {
          unique: true,
          fields: ['key'],
        },
      ],
    }
  );

  Content.associate = function (models) {
    // Using additional options like CASCADE etc for demonstration
    // Can also simply do Content.belongsTo(models.User);
    Content.hasMany(models.content_text, { foreignKey: 'contentid' });
  };

  return Content;
};
