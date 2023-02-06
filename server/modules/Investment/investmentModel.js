'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Investment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ InvestmentCategory, Account }) {
     

      this.belongsTo(Account);

      this.belongsTo(InvestmentCategory);
      // define association here
    }
  }
  Investment.init({
    amount: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Investment',
  });
  return Investment;
};