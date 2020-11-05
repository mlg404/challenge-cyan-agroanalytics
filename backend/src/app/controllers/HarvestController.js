import * as Yup from 'yup';
import { broadcastMessage } from '../../websocket';

import Mill from '../models/Mill';
import Harvest from '../models/Harvest';
import Farm from '../models/Farm';
import Field from '../models/Field';

class HarvestController {
  async store(req, res) {
    const schema = Yup.object().shape({
      code: Yup.string().required(),
      mill_id: Yup.number().required(),
      start_date: Yup.date().required(),
      end_date: Yup.date().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const harvestExists = await Harvest.findOne({
      where: { code: req.body.code },
    });
    if (harvestExists) {
      return res.status(400).json({ error: 'Harvest already registered' });
    }
    const harvest = await Harvest.create(req.body);
    broadcastMessage(
      'new',
      `New Harvest registered with code "${harvest.code}"!`
    );
    return res.json(harvest);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      code: Yup.string(),
      mill_id: Yup.number(),
      start_date: Yup.date(),
      end_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const harvest = await Harvest.findByPk(req.params.id);

    if (!harvest) {
      return res.status(400).json({ error: 'No Harvest found' });
    }

    const harvestUpdate = await harvest.update(req.body);
    return res.json(harvestUpdate);
  }

  async show(req, res) {
    const harvests = await Harvest.findAll({
      where: req.query,
      include: [
        {
          model: Mill,
          as: 'mill',
          attributes: ['id', 'name'],
        },
        {
          model: Farm,
          include: {
            model: Field,
          },
        },
      ],
      attributes: [
        'id',
        'code',
        'start_date',
        'end_date',
        'created_at',
        'updated_at',
      ],
    });
    if (!harvests) {
      return res.status(200).json({});
    }
    return res.json(harvests);
  }

  async index(req, res) {
    const harvest = await Harvest.findByPk(req.params.id, {
      include: [
        {
          model: Mill,
          as: 'mill',
          attributes: ['id', 'name'],
        },
      ],
      attributes: [
        'id',
        'code',
        'start_date',
        'end_date',
        'created_at',
        'updated_at',
      ],
    });
    if (!harvest) {
      return res.status(400).json({ error: 'No Harvest found' });
    }
    return res.json(harvest);
  }

  async destroy(req, res) {
    const harvest = await Harvest.findByPk(req.params.id);
    if (!harvest) {
      return res.status(400).json({ error: 'No Harvest found' });
    }
    await harvest.destroy();
    return res.json({ message: 'Harvest deleted.' });
  }
}

export default new HarvestController();
