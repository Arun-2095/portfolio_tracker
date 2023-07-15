'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('ExpenseCategory', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        category: {
          type: Sequelize.STRING
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }, { transaction });

      await queryInterface.addConstraint('ExpenseCategory', {
        fields: ['AccountId'],
        type: 'foreign key',
        references: {
          table: 'Accounts',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }, {
        transaction
      });

      await queryInterface.addConstraint('Incomes', {
        fields: ['AccountId'],
        type: 'foreign key',
        references: {
          table: 'Accounts',
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
    }
  },
  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable('ExpenseCategory', { transaction });
      await queryInterface.removeConstraint('ExpenseCategory', {
        fields: ['AccountId'],
        type: 'foreign key',
        references: {
          table: 'Accounts',
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
    }
  }
};
