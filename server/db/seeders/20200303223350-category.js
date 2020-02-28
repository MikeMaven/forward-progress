'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [
      {name: 'News', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Opinion', createdAt: new Date(), updatedAt: new Date()}
    ]).catch(err => Promise.resolve());
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
