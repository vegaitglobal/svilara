const bcrypt = require("bcrypt");
const { to } = require("../helpers/utils");
module.exports = (sequelize, DataTypes) => {
  let Model = sequelize.define(
    "Admin",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      emailFrom: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      nameFrom: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      type: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      // phone: {
      //   type: DataTypes.STRING(100),
      //   allowNull: false
      // },
      password: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      resetCode: {
        type: DataTypes.STRING(10),
        allowNull: true
      },
      created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn("NOW")
      }
    },
    {
      timestamps: false
    }
  );

  Model.beforeSave(async (admin, options) => {
    let err;
    if (admin.changed("password")) {
      let hash;

      [err, hash] = await to(bcrypt.hash(admin.password, 10));
      if (err) TE(err.message, true);
      admin.password = hash;
    }
  });

  return Model;
};
