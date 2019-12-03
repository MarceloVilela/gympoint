import * as Yup from 'yup';

import Registration from '../models/HelpOrder';
import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';
import User from '../models/User';

class RegistrationController {
  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { student_id } = req.params;
    const { question } = req.body;
    const answer_at = new Date();

    const { id } = await Registration.create({ question, student_id });

    return res.json({
      id, question,
    });
  }

  async index(req, res) {
    const schema = Yup.object().shape({
      page: Yup.number().required(),
    });

    if (!(await schema.isValid(req.query))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { student_id } = req.params;
    const { page = 1 } = req.query;

    const orders = await HelpOrder.findAll({
      where: { student_id },
      order: ['created_at'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    return res.json(orders);
  }
}

export default new RegistrationController();
