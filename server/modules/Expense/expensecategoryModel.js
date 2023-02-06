'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExpenseCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { Expense, Account } = models;

      this.hasOne(Expense);

       this.belongsTo(Account, {
         foreignKey: {
           allowNull: false,
         },
       });
      // define association here
    }
  }
  ExpenseCategory.init({
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ExpenseCategory',
  });
  return ExpenseCategory;
};