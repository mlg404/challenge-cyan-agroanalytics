import Sequelize, { Model } from 'sequelize';

class Farm extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        code: Sequelize.STRING,
        name: Sequelize.STRING,
        harvest_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Harvest, {
      foreignKey: 'harvest_id',
      as: 'harvest',
    });
  }
}

export default Farm;
