module.exports = (sequelize, DataTypes) => {
    let Model = sequelize.define(
      "Script",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        value: {
          type: DataTypes.TEXT,
          allowNull: false
        },
      },
      {
        timestamps: false
      }
    );
    
    return Model;
  };