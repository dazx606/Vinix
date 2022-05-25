const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('status', {
    status: {
      type: DataTypes.STRING,
      primaryKey: true,
    }
  });
};