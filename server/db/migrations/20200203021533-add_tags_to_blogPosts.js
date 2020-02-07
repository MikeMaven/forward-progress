'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('BlogPosts', 'tags', {
      type: Sequelize.ARRAY(Sequelize.STRING)
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('BlogPosts', 'tags')
  }
};
