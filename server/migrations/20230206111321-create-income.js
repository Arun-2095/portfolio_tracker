'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('Incomes', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        amount: {
          type: Sequelize.STRING
        },
        AccountId: {
          type: Sequelize.INTEGER,
          reference: {
            model: 'Accounts',
            key: 'id'
          }
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
    } catch (error) {
      await transaction.rollback();
    }
  },
  async down (queryInterface, Sequelize) {
    const transaction = Sequelize.transaction();

    try {
      await queryInterface.dropTable('Incomes');

      await queryInterface.removeConstraint('Incomes', {
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
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
