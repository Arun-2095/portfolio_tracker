'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Income extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate ({ Account }) {
      this.belongsTo(Account);

      // this.belongsTo(IncomeCategory);
      // define association here
    }
  }
  Income.init({
    amount: DataTypes.STRING,
    category: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'Income'
  });
  return Income;
};
