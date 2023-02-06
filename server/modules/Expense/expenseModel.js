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
    static associate(models) {
      const { Account, ExpenseCategory } = models;
       this.belongsTo(Account,{
          foreignKey:'account_id',
          allowNull: false 
       })

      this.hasMany(ExpenseCategory); 
      // define association here
    }
  }
  Expense.init({
    description: DataTypes.STRING,
    amount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Expense',
  });
  return Expense;
};