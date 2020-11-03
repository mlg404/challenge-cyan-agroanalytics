import * as Yup from 'yup';
import { Op } from 'sequelize';

import Mill from '../models/Mill';
import Harvest from '../models/Harvest';
import Farm from '../models/Farm';

class FarmController {
  async store(req, res) {
    const schema = Yup.object().shape({
      code: Yup.string().required(),
      name: Yup.string().required(),
      harvest_id: Yup.number().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const farmExists = await Farm.findOne({
      where: {
        [Op.or]: [{ code: req.body.code }, { name: req.body.name }],
      },
    });
    if (farmExists) {
      return res.status(400).json({ error: 'Farm already registered' });
    }
    const farm = await Farm.create(req.body);
    return res.json(farm);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      code: Yup.string(),
      name: Yup.string(),
      harvest_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const farm = await Farm.findByPk(req.params.id);

    if (!farm) {
      return res.status(400).json({ error: 'No Farm found' });
    }

    const farmUpdate = await farm.update(req.body);
    return res.json(farmUpdate);
  }

  async show(req, res) {
    const farms = await Farm.findAll({
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
    if (!farms) {
      return res.status(200).json({});
    }
    return res.json(farms);
  }

  async index(req, res) {
    const farm = await Farm.findByPk(req.params.id, {
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
    if (!farm) {
      return res.status(400).json({ error: 'No Farm found' });
    }
    return res.json(farm);
  }

  async destroy(req, res) {
    const farm = await Farm.findByPk(req.params.id);
    if (!farm) {
      return res.status(400).json({ error: 'No Farm found' });
    }
    await farm.destroy();
    return res.json({ message: 'Farm deleted.' });
  }
}

export default new FarmController();
