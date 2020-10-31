import * as Yup from 'yup';

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
      return res.status(401).json({ error: 'Field already registered' });
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
    const fields = await Field.findAll({
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
