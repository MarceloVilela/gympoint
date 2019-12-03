import * as Yup from 'yup';
import { Op } from 'sequelize';

import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { student_id } = req.params;

    const registrations = await Checkin.findAll({
      where: {
        student_id,
        [Op.and]: [{
          created_at: {
            [Op.gte]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
            // [Op.lte]: new Date(new Date()),
          },
        }],
      },
    });

    // The user can only do 5 checkins within 7 calendar days.
    if (registrations && registrations.length >= 5) {
      return res.status(401).json({
        error: 'The user can only do 5 checkins within 7 calendar days.',
      });
    }

    const created_at = new Date();
    const update_at = null;

    const { id } = await Checkin.create({
      student_id, created_at, update_at,
    });

    return res.json({
      id, student_id, created_at, update_at,
    });
  }

  async index(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { student_id } = req.params;
    const { page = 1 } = req.query;

    const registrations = await Checkin.findAll({
      where: {
        student_id,
      },
      order: ['created_at'],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(registrations);
  }
}

export default new CheckinController();
