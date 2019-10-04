const bcrypt = require("bcrypt");
const { to } = require("../helpers/utils");
module.exports = (sequelize, DataTypes) => {
  let Model = sequelize.define(
    "Event",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      location: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      html: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      status: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: "pending"
      },
      category: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      type: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      space: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      socialMedia: {
        type: DataTypes.STRING(150),
        allowNull: false
      },
      media: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      age: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      formData: {
        type: DataTypes.TEXT
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: true
      },
      endTime: {
        type: DataTypes.DATE,
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

  return Model;
};
