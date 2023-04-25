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
      await queryInterface.removeColumn('Expenses', 'category', { transaction });

      await queryInterface.addColumn('Expenses', 'ExpenseCategoryId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
          model: 'ExpenseCategory',
          key: 'id'
        }
      }, { transaction });
      await queryInterface.addConstraint('Expenses', {
        fields: ['ExpenseCategoryId'],
        type: 'foreign key',
        references: {
          table: 'ExpenseCategory',
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

    const transaction = Sequelize.transaction();

    try {
      await queryInterface.removeColumn('Expenses', 'ExpenseCategoryId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
          model: 'ExpenseCategory',
          key: 'id'
        }
      }, { transaction });
      await queryInterface.removeConstraint('Expenses', {
        fields: ['ExpenseCategoryId'],
        type: 'foreign key',
        references: {
          table: 'ExpenseCategory',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }, {
        transaction
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
