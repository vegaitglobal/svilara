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
      { key: 'logo', value: '' },
      { key: 'facebook', value: ''},
      { key: 'instagram', value: ''},
      { key: 'twitter', value: ''},
      { key: 'youtube', value: ''},
      { key: 'email', value: ''},
      { key: 'otvorenbp', value: '#fc3a54'},
      { key: 'otvorensp', value: '#fc3af6'},
      { key: 'zatvoren', value: '#3a9bfc'},
      { key: 'placanje', value: '#6bfc03'},
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
