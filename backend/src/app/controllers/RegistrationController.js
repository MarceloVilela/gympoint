import * as Yup from 'yup';
import { addMonths, parseISO, isBefore } from 'date-fns';

import Registration from '../models/Registration';
import Student from '../models/Student';
import Plan from '../models/Plan';

import RegistrationMail from '../jobs/RegistrationMail';
import Queue from '../../lib/Queue';

class RegistrationController {
  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { student_id, plan_id, start_date } = req.body;

    /**
     * Check student
     */
    const studentFound = await Student.findOne({
      where: { id: student_id },
    });

    if (!studentFound) {
      return res.status(401).json({
        error: 'You can only create registrations whit students',
      });
    }

    /**
     * Check plan
     */
    const planFound = await Plan.findOne({
      where: { id: plan_id },
    });

    if (!planFound) {
      return res.status(401).json({
        error: 'You can only create registrations whit plans',
      });
    }

    // Check for past dates
    if (isBefore(start_date, new Date())) {
      return res.status(400).json({
        error: 'Past dates are not permitted',
      });
    }

    const end_date = addMonths(parseISO(start_date), planFound.duration);
    const price = planFound.price * planFound.duration;

    const { id } = await Registration.create({
      ...req.body, end_date, price,
    });

    const registration = await Registration.findByPk(req.body.plan_id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title'],
        },
      ],
    });

    await Queue.add(
      RegistrationMail.key,
      { registration },
    );

    return res.json({
      id, student_id, plan_id, start_date, end_date, price,
    });
  }

  async index(req, res) {
    const schema = Yup.object().shape({
      page: Yup.number().required(),
    });

    if (!(await schema.isValid(req.query))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { page = 1 } = req.query;

    const registration = await Registration.findAll({
      attributes: ['id', 'start_date', 'end_date', 'price'],
      order: ['created_at'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title'],
        },
      ],
    });

    if (!registration) {
      return res.status(400).json({ error: 'Registration not found' });
    }

    return res.json(registration);
  }

  async show(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const registration = await Registration.findOne({
      where: { id },
      attributes: ['id', 'start_date', 'end_date', 'price', 'canceled_at'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title'],
        },
      ],
    });

    if (!registration) {
      return res.status(400).json({ error: 'Registration not found' });
    }

    return res.json(registration);
  }

  /*
   * Cancel previous registration then create new, for same Student
   */
  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { student_id, plan_id, start_date } = req.body;
    const { id } = req.params;

    // Check registration and student
    const registrationFound = await Registration.findByPk(id);

    if (!registrationFound) {
      return res.status(401).json({
        error: 'Registration not found',
      });
    }

    if (registrationFound.student_id != student_id) {
      return res.status(401).json({
        error: 'Registration does not currently belong to this student',
      });
    }

    // Check plan
    const planFound = await Plan.findOne({
      where: { id: plan_id },
    });

    if (!planFound) {
      return res.status(401).json({
        error: 'You can only create registrations whit plans',
      });
    }

    // Check for past dates
    if (isBefore(start_date, new Date())) {
      return res.status(400).json({
        error: 'Past dates are not permitted',
      });
    }

    const end_date = addMonths(parseISO(start_date), planFound.duration);
    const price = planFound.price * planFound.duration;

    // Cancel previous registration
    registrationFound.canceled_at = new Date();
    await registrationFound.save();

    // Create new registration
    const { idNew } = await Registration.create({
      ...req.body, end_date, price,
    });

    return res.json({
      idNew, student_id, plan_id, start_date, end_date, price,
    });
  }


  async delete(req, res) {
    const registration = await Registration.findByPk(req.params.id);

    registration.canceled_at = new Date();
    await registration.save();

    return res.json(registration);
  }
}

export default new RegistrationController();
