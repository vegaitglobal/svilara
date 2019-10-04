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
        allowNull: false
      },
      timestamp: {
        type: DataTypes.(10),
        allowNull: true
      },
      organisationName: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      contactPerson: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      contactPhone: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      organisationDescription: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      organisationLogo: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      organisationSocial: {
        type: DataTypes.STRING(100),
        allowNull: false
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
