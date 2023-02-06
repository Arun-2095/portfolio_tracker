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
    static associate(models) {
      const { Expense, ExpenseCategory } = models;
      // define association here
      this.hasMany(Expense,{
          foreignKey:'account_id',
          allowNull: false 
       })

          this.hasMany(ExpenseCategory, {
            allowNull: false,
          });
    }
  }
  Account.init({
    name: DataTypes.STRING,
    totalIncome: DataTypes.INTEGER,
    totalExpense: DataTypes.INTEGER,
    savingPercentage: DataTypes.INTEGER,
    investmentPercentag: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};