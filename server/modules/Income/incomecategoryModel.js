'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class incomeCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate ({ Income, Account }) {
      this.hasMany(Income, { onDelete: 'CASCADE' });
      this.belongsTo(Account);

      // this.belongsTo(IncomeCategory);
      // define association here
    }
  }
  incomeCategory.init({
    name: DataTypes.STRING
  }, {
    hooks: {
      afterCreate: (record) => {
        delete record.dataValues.AccountId;
      },
      afterUpdate: (record) => {
        delete record.dataValues.AccountId;
      }
    },
    sequelize,
    modelName: 'incomeCategory'
  });
  return incomeCategory;
};
