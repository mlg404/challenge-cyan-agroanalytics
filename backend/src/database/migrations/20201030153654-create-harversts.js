module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('harvests', {
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
      mill_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'mills', key: 'id' },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATE,
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
    return queryInterface.dropTable('harvests');
  },
};
