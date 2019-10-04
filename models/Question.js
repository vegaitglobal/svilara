const bcrypt = require("bcrypt");
const { to } = require("../helpers/utils");
module.exports = (sequelize, DataTypes) => {
  let Model = sequelize.define(
    "Question",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      text: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      fieldType: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: 'input'
      },
      values: {
        type: DataTypes.TEXT
        defaultValue: null
      },
      order: {
          type: DataTypes.INTEGER,
          allowNull: false
      }
    },
    {
      timestamps: false
    }
  );
  
  return Model;
};
