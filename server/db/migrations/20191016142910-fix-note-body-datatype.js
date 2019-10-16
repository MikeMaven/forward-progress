'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Notes', 'body', {
        type: Sequelize.TEXT,
        allowNull: false
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Notes', 'body', {
        type: Sequelize.STRING,
        allowNull: true
      })
    ]);
  }
};
