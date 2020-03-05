'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      name: DataTypes.STRING
    },
    {}
  );
  Category.associate = function(models) {
    Category.belongsToMany(models.BlogPost, {
      through: 'BlogPostCategories',
      as: 'blogPosts',
      foreignKey: 'CategoryId',
      otherKey: 'BlogPostId'
    });
  };
  return Category;
};
