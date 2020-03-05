'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('BlogPostCategories', [
      {BlogPostId: 1, CategoryId: 1, createdAt: new Date(), updatedAt: new Date()},
      {BlogPostId: 1, CategoryId: 2, createdAt: new Date(), updatedAt: new Date()},
      {BlogPostId: 2, CategoryId: 1, createdAt: new Date(), updatedAt: new Date()},
      {BlogPostId: 2, CategoryId: 2, createdAt: new Date(), updatedAt: new Date()},
      {BlogPostId: 3, CategoryId: 1, createdAt: new Date(), updatedAt: new Date()},
      {BlogPostId: 3, CategoryId: 2, createdAt: new Date(), updatedAt: new Date()},
      {BlogPostId: 4, CategoryId: 1, createdAt: new Date(), updatedAt: new Date()},
      {BlogPostId: 4, CategoryId: 2, createdAt: new Date(), updatedAt: new Date()},
      {BlogPostId: 5, CategoryId: 1, createdAt: new Date(), updatedAt: new Date()},
      {BlogPostId: 5, CategoryId: 2, createdAt: new Date(), updatedAt: new Date()},
      {BlogPostId: 6, CategoryId: 1, createdAt: new Date(), updatedAt: new Date()},
      {BlogPostId: 6, CategoryId: 2, createdAt: new Date(), updatedAt: new Date()},
      {BlogPostId: 7, CategoryId: 1, createdAt: new Date(), updatedAt: new Date()},
      {BlogPostId: 7, CategoryId: 2, createdAt: new Date(), updatedAt: new Date()},
      {BlogPostId: 8, CategoryId: 1, createdAt: new Date(), updatedAt: new Date()},
      {BlogPostId: 8, CategoryId: 2, createdAt: new Date(), updatedAt: new Date()}
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('BlogPostCategories', null, {});
  }
};
