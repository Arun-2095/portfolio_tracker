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
      console.log(models, 'models');
      const { Expense, ExpenseCategory, User } = models;
      // define association here
      this.hasMany(Expense, {
        foreignKey: 'account_id',
        allowNull: false
      });

      this.hasMany(ExpenseCategory, {
        allowNull: false
      });

      this.belongsToMany(User, { through: 'Portfolio' });
    }
  }
  Account.init({
    name: DataTypes.STRING,
    totalIncome: DataTypes.INTEGER,
    totalExpense: DataTypes.INTEGER,
    savingPercentage: DataTypes.INTEGER,
    investmentPercentage: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Account'
  });
  return Account;
};
