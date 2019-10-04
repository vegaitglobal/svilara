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
        type: DataTypes.TEXT,
        allowNull: false
      },
      fieldType: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'input'
      },
      values: {
        type: DataTypes.TEXT,
        defaultValue: null
      },
      order: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      mandatory: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      timestamps: false
    }
  );
  
  return Model;
};