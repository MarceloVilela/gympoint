import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number()
        .required()
        .min(2),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const planExists = await Plan.findOne({ where: { title: req.body.title } });

    if (planExists) {
      return res.status(400).json({ error: 'Plan already exists.' });
    }

    const {
      id, title, duration, price,
    } = await Plan.create(req.body);

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async index(req, res) {
    const Plans = await Plan.findAll();

    return res.json(Plans);
  }

  async show(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const plan = await Plan.findOne({ where: { id } });

    if (!plan) {
      return res.status(400).json({ error: 'Plan not found' });
    }

    return res.json(plan);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number()
        .required()
        .min(2),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const planExists = await Plan.findOne({ where: { id: req.params.id } });

    if (!planExists) {
      return res.status(400).json({ error: 'Plan not found.' });
    }

    const updated = await Plan.update(
      req.body,
      { where: { id: req.params.id }, returning: true },
    );

    const {
      id,
      title,
      duration,
      price,
    } = updated[1][0];

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    plan.canceled_at = new Date();
    await plan.save();

    return res.json(plan);
  }
}

export default new PlanController();
