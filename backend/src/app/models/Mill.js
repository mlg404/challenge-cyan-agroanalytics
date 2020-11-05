import Sequelize, { Model } from 'sequelize';

class Mill extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Harvest, {
      foreignKey: 'mill_id',
    });
  }
}

export default Mill;
