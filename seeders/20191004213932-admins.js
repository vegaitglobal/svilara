"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Admins",
      [
        {
          email: "admin@demo.com",
          password:
            "$2b$10$5Us97B7yX9AfRT3KUaCrTub3BbOMO9Z18fkq6AgeTCouzoXOWTQ8.",
          // phone: "+38164987654",
          resetCode: "2579"
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
