import * as Yup from 'yup';

import sequelize from 'sequelize';

import Mill from '../models/Mill';
import Harvest from '../models/Harvest';
import Farm from '../models/Farm';
import Field from '../models/Field';

class FieldController {
  async store(req, res) {
    const schema = Yup.object().shape({
      code: Yup.string().required(),
      farm_id: Yup.number().required(),
      gps: Yup.object().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const fieldExists = await Field.findOne({
      where: { code: req.body.code },
    });
    if (fieldExists) {
      return res.status(400).json({ error: 'Field already registered' });
    }
    const field = await Field.create(req.body);
    return res.json(field);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      code: Yup.string().required(),
      farm_id: Yup.number().required(),
      gps: Yup.array().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const field = await Field.findByPk(req.params.id);

    if (!field) {
      return res.status(400).json({ error: 'No Field found' });
    }

    const fieldUpdate = await field.update(req.body);
    return res.json(fieldUpdate);
  }

  async show(req, res) {
    let nested = '';
    switch (req.query.type) {
      case 'mills':
        nested = '"farm->harvest->mill"';
        break;

      case 'harvests':
        nested = '"farm->harvest"';
        break;

      case 'farms':
        nested = '"farm"';
        break;

      default:
        nested = '"Field"';
        break;
    }
    delete req.query.type;

    const keyValues = Object.entries(req.query);

    const literalQuery = keyValues.reduce((acc, curr, index) => {
      let queryString = acc;
      queryString += `${nested}.${curr[0]} = '${curr[1]}'`;
      if (index === keyValues.length) queryString += ' AND ';
      return queryString;
    }, '');

    const fields = await Field.findAll({
      where: sequelize.literal(literalQuery),
      include: [
        {
          model: Farm,
          as: 'farm',
          include: [
            {
              model: Harvest,
              as: 'harvest',
              include: [
                {
                  model: Mill,
                  as: 'mill',
                },
              ],
            },
          ],
        },
      ],
      attributes: ['id', 'code', 'gps', 'created_at', 'updated_at'],
    });
    if (!fields) {
      return res.status(200).json({});
    }
    return res.json(fields);
  }

  async index(req, res) {
    const field = await Field.findByPk(req.params.id, {
      include: [
        {
          model: Harvest,
          as: 'harvest',
          include: [
            {
              model: Mill,
              as: 'mill',
            },
          ],
        },
      ],
      attributes: ['id', 'code', 'name', 'created_at', 'updated_at'],
    });
    if (!field) {
      return res.status(400).json({ error: 'No Field found' });
    }
    return res.json(field);
  }

  async destroy(req, res) {
    const field = await Field.findByPk(req.params.id);
    if (!field) {
      return res.status(400).json({ error: 'No Field found' });
    }
    await field.destroy();
    return res.json({ message: 'Field deleted.' });
  }
}

export default new FieldController();
