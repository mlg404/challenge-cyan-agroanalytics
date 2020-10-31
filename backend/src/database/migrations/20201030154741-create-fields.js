const { DataTypes } = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('fields', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      farm_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'farms', key: 'id' },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      gps: {
        type: DataTypes.GEOMETRY('POLYGON'),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('fields');
  },
};
