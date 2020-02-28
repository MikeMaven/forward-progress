'use strict';
module.exports = (sequelize, DataTypes) => {
  const BlogPostCategory = sequelize.define(
    'BlogPostCategory',
    {
      BlogPostId: DataTypes.INTEGER,
      CategoryId: DataTypes.INTEGER
    },
    {}
  );
  BlogPostCategory.associate = function(models) {
    BlogPostCategory.belongsTo(models.BlogPost);
    BlogPostCategory.belongsTo(models.Category);
  };
  return BlogPostCategory;
};
