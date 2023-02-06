'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IncomeCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Account, Income }) {
      // define association here
      this.hasOne(Income);

      this.belongsTo(Account, {
        foreignKey: {
          allowNull: false,
        },
      });
    }
  }
  IncomeCategory.init({
    category: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'IncomeCategory',
  });
  return IncomeCategory;
};