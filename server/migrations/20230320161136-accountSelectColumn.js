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
      await queryInterface.addColumn('Accounts', 'isSelected', {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }, { transaction });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
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
      await queryInterface.removeColumn('Accounts', 'isSelected', {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }, { transaction });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
    }
  }
};
