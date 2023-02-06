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
      const { Expense} = models;

      this.belongsTo(Expense, {
        foreignKey:{
          allowNull: false
        }
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