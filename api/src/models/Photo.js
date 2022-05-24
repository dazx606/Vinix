const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('pet', {
    photoUrls: {
        type: DataTypes.STRING,
        primaryKey: true,
        validate: {
          isUrl: true,
          isCorrectFormat: (value) => {
            if (value.match(/^http[^?].(jpg|jpeg|gif|png|tiff|bmp)(?(.))?$/gmi) === null) {
              throw new Error("Image format not valid!");
            }
        }
        },
      }
  });
};

