import * as Yup from 'yup';

import Mill from '../models/Mill';

class MillController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const millExists = await Mill.findOne({
      where: { name: req.body.name },
    });
    if (millExists) {
      return res.status(400).json({ error: 'Mill already registered' });
    }
    const mill = await Mill.create(req.body);
    return res.json(mill);
  }

  async update(req, res) {
    const mill = await Mill.findByPk(req.params.id);
    if (!mill) {
      return res.status(400).json({ error: 'No Mill found' });
    }
    const millUpdate = await mill.update(req.body);
    return res.json(millUpdate);
  }

  async show(req, res) {
    const mills = await Mill.findAll();
    if (!mills) {
      return res.status(200).json({});
    }
    return res.json(mills);
  }

  async index(req, res) {
    const mill = await Mill.findByPk(req.params.id);
    if (!mill) {
      return res.status(400).json({ error: 'No Mill found' });
    }
    return res.json(mill);
  }

  async destroy(req, res) {
    const mill = await Mill.findByPk(req.params.id);
    if (!mill) {
      return res.status(400).json({ error: 'No Mill found' });
    }
    await mill.destroy();
    return res.json({ message: 'Mill deleted.' });
  }
}

export default new MillController();
