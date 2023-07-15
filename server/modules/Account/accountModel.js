'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      const { Expense, User, Income, incomeCategory, ExpenseCategory, Investment } = models;
      // define association here
      this.hasMany(Expense);

      this.hasMany(Income);

      this.hasMany(incomeCategory);

      this.hasMany(ExpenseCategory);

      this.hasMany(Investment);

      this.belongsToMany(User, { through: 'Portfolio', hooks: true });
    }
  }
  Account.init({
    name: DataTypes.STRING,
    totalIncome: DataTypes.INTEGER,
    totalExpense: DataTypes.INTEGER,
    savingPercentage: DataTypes.INTEGER,
    investmentPercentage: DataTypes.INTEGER,
    isSelected: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Account'
  });
  return Account;
};
