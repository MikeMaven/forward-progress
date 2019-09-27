/* eslint-disable */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('languages', [
    { id: 1, locale: 'en-US', description: 'English' },
    { id: 2, locale: 'fr-FR', description: 'French' },
  ], {}).catch((e) => Promise.resolve()),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('languages', null, {}),
};
