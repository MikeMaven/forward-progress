const User = require('./user.model.js');

('use strict');
module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define(
    'BlogPost',
    {
      title: DataTypes.STRING,
      body: DataTypes.TEXT,
      Author: {
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: 'id'
        }
      },
      coverImageURL: DataTypes.STRING,
      subTitle: DataTypes.STRING,
      isPaid: DataTypes.BOOLEAN,
      photoGallery: DataTypes.ARRAY(DataTypes.STRING),
      tags: DataTypes.ARRAY(DataTypes.STRING)
    },
    {}
  );
  BlogPost.associate = function(models) {
    BlogPost.belongsTo(models.User, { foreignKey: 'Author' });
  };
  return BlogPost;
};
