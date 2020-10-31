import Sequelize, { Model } from 'sequelize';

class Harvest extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        code: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        mill_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        start_date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        end_date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Mill, {
      foreignKey: 'mill_id',
      as: 'mill',
    });
  }
}

export default Harvest;
