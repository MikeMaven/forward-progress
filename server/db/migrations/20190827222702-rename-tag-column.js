'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Tags', 'userId', 'UserId');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Tags', 'UserId', 'userId');
  }
};
