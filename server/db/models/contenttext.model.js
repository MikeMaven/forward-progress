module.exports = (sequelize, DataTypes) => {
  const ContentText = sequelize.define(
    'content_text',
    {
      text: DataTypes.STRING
    },
    {
      timestamps: false
    }
  );

  ContentText.associate = models => {
    ContentText.belongsTo(models.language, { foreignKey: 'languageid' });
    ContentText.belongsTo(models.content, { foreignKey: 'contentid' });
  };

  return ContentText;
};
