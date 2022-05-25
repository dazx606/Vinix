const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('category', {
    // id: {
    //   type: DataTypes.STRING(6),
    //   primaryKey: true,
      
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
};