import Sequelize, { Model } from 'sequelize';

class Field extends Model {
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
        farm_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        gps: {
          type: Sequelize.GEOMETRY('POLYGON'),
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
    this.belongsTo(models.Farm, {
      foreignKey: 'farm_id',
      as: 'farm',
    });
  }
}

export default Field;
