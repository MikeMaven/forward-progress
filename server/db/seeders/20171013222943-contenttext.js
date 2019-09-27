/* eslint-disable */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('content_texts', [
      // English
      { languageid: 1, contentid: 1, text: 'Forward Progress' },
      { languageid: 1, contentid: 2, text: 'A web based SaaS platform for front office NFL executives.' },
      { languageid: 1, contentid: 3, text: 'https://github.com/MikeMaven' },
      { languageid: 1, contentid: 4, text: 'Home' },
      { languageid: 1, contentid: 5, text: 'About Us' },
      { languageid: 1, contentid: 6, text: 'Login' },
      { languageid: 1, contentid: 7, text: 'Logout' },
      { languageid: 1, contentid: 8, text: 'Register' },
      { languageid: 1, contentid: 9, text: 'Admin' },
      { languageid: 1, contentid: 10, text: 'Examples' },
      // French
      { languageid: 2, contentid: 1, text: 'Forward Progress' },
      { languageid: 2, contentid: 2, text: 'Oui!' },
      { languageid: 2, contentid: 3, text: 'https://github.com/MikeMaven' },
      { languageid: 2, contentid: 4, text: 'Accueil' },
      { languageid: 2, contentid: 5, text: 'Sur' },
      { languageid: 2, contentid: 6, text: 'S\'identifier' },
      { languageid: 2, contentid: 7, text: 'Connectez - Out' },
      { languageid: 2, contentid: 8, text: 'registre' },
      { languageid: 2, contentid: 9, text: 'Admin' },
      { languageid: 2, contentid: 10, text: 'Traduire' },
    ], {}).catch(e => Promise.resolve());
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('content_texts', null, {}),
};
