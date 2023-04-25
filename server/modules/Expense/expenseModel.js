'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      const { Account, ExpenseCategory } = models;

      this.belongsTo(Account, {
        allowNull: false
      });
      this.belongsTo(ExpenseCategory, { allowNull: false });

      // define association here
    }
  }
  Expense.init({
    description: DataTypes.STRING,
    amount: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Expense'
  });
  return Expense;
};
