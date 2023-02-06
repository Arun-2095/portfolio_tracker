'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InvestmentCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Account, Investment }) {
      // define association here
          this.hasOne(Investment);

          this.belongsTo(Account, {
            foreignKey: {
              allowNull: false,
            },
          });
    }
  }
  InvestmentCategory.init({
    category: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'InvestmentCategory',
  });
  return InvestmentCategory;
};