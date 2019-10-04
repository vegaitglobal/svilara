"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Admins",
      [
        {
          email: "admin@demo.com",
          password:
            "$2y$12$Z72t0KZ2Va5eEpQAMcG9.ugiXmmPE1S4TJxq6YRMfIob/Qr3zern6",
          phone: "+38164987654",
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
