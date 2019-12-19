import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';
import User from '../models/User';
import Student from '../models/Student';

import HelpMail from '../jobs/HelpMail';
import Queue from '../../lib/Queue';

class HelpAnswerController {
  async store(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const user_id = req.userId;
    const { answer } = req.body;
    const answer_at = new Date();

    const updated = await HelpOrder.update(
      { user_id, answer, answer_at },
      { where: { id }, returning: true },
    );

    const helpOrder = await HelpOrder.findByPk(id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    await Queue.add(
      HelpMail.key,
      { helpOrder },
    );

    return res.json(helpOrder);
  }

  async index(req, res) {
    const schema = Yup.object().shape({
      page: Yup.number().required(),
    });

    if (!(await schema.isValid(req.query))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { page = 1 } = req.query;

    const options = {
      where: { answer_at: null },
      page,
      paginate: 10,
      order: [['id', 'ASC']],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    };

    const { docs, pages, total } = await HelpOrder.paginate(options);

    return res.json({ docs, pages, total });
  }
}

export default new HelpAnswerController();
