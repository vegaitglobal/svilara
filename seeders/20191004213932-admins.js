"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Admins",
      [
        {
          email: "admin@demo.com",
          password:
            "$2b$10$g3jFu2yedNFwI.fIgonSh.Wl1202xBOyjVxESWap.wMDeYuA1lCKS",
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
