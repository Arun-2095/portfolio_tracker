'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      // creation of table
      await queryInterface.createTable('portfolio', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        AccountId: {
          type: Sequelize.INTEGER,
          reference: {
            model: 'Account',
            key: 'id'
          }
        },
        UserId: {
          type: Sequelize.INTEGER,
          reference: {
            model: 'User',
            key: 'id'
          }
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }, {
        transaction
      });

      // adding forignKey Constraints

      queryInterface.addConstraint('portfolio', {
        fields: ['UserId'],
        type: 'foreign key',
        references: {
          table: 'user',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }, {
        transaction
      });

      queryInterface.addConstraint('portfolio', {
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
      throw err;
    }
  },
  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.dropTable('portfolio', { transaction });

      queryInterface.removeConstraint('portfolio', {
        fields: ['UserId'],
        type: 'foreign key',
        references: {
          table: 'user',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }, {
        transaction
      });

      queryInterface.addConstraint('portfolio', {
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
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
