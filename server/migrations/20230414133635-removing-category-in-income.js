'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('Incomes', 'category', { transaction });

      await queryInterface.addColumn('Incomes', 'incomeCategoryId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
          model: 'incomeCategory',
          key: 'id'
        }
      }, { transaction });
      await queryInterface.addConstraint('Incomes', {
        fields: ['incomeCategoryId'],
        type: 'foreign key',
        references: {
          table: 'incomeCategories',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }, {
        transaction
      });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // await queryInterface.addColumn('Incomes', 'category', {
      //   type: Sequelize.STRING,
      //   allowNull: false
      // }, { transaction });
      await queryInterface.removeColumn('Incomes', 'incomeCategoryId', { transaction });
      await queryInterface.removeConstraint('Incomes', {
        fields: ['incomeCategoryId'],
        type: 'foreign key',
        references: {
          table: 'incomeCategories',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }, {
        transaction
      });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      console.log(JSON.stringify(err));
      throw err;
    }
  }
};
