'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('BlogPosts', 'isPaid', {
      type: Sequelize.BOOLEAN,
      defaultValue: 'TRUE'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('BlogPosts', 'isPaid');
  }
};
