'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('BlogPosts', 'photoGallery', {
      type: Sequelize.ARRAY(Sequelize.STRING)
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('BlogPosts', 'photoGallery');
  }
};
