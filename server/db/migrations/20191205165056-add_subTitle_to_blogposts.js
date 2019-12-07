'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('BlogPosts', 'subTitle', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('BlogPosts', 'isPaid', {
        type: Sequelize.BOOLEAN,
        defaultValue: 'TRUE'
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('BlogPosts', 'subTitle'),
      queryInterface.removeColumn('BlogPosts', 'isPaid')
    ]);
  }
};
