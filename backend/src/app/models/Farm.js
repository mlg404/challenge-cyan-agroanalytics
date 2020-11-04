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
        harvest_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Harvest',
            key: 'id',
          },
        },
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
    this.hasMany(models.Field, {
      foreignKey: 'farm_id',
    });
  }
}

export default Farm;
