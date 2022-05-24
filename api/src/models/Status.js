const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('pet', {
    status: {
      type: DataTypes.STRING,
      primaryKey: true,
    }
  });
};