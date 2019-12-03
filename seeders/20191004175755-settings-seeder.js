'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert('Settings', [
      { key: 'glavni logo', value: '' },
      { key: 'sporedni logo 1', value: '' },
      { key: 'sporedni logo 2', value: '' },
      { key: 'facebook', value: 'https://www.facebook.com/svilara/'},
      { key: 'instagram', value: 'https://www.instagram.com/svilara_ks/?hl=en'},
      { key: 'twitter', value: ''},
      { key: 'youtube', value: ''},
      { key: 'email', value: 'mailto:svilarans@gmail.com'},
      { key: 'otvoren bez plaćanja', value: '#fc3a54'},
      { key: 'otvoren sa plaćanjem', value: '#fc3af6'},
      { key: 'zatvoren', value: '#3a9bfc'},
      { key: 'placanje', value: '#6bfc03'},
      { key: 'favicon', value: 'default-picture.png'},
      { key: 'naslov', value: 'Kulturna stanica'},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('People', null, {});
  }
};
