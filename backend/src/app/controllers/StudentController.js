import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      birth: Yup.date().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const studentExists = await Student.findOne({ where: { email: req.body.email } });

    if (studentExists) {
      return res.status(400).json({ error: 'Student already exists.' });
    }

    const {
      id, name, email, age, weight, height,
    } = await Student.create(req.body);

    return res.json({
      id, name, email, age, weight, height,
    });
  }

  async index(req, res) {
    const Students = await Student.findAll();

    return res.json(Students);
  }

  async show(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const student = await Student.findOne({ where: { id } });

    if (!student) {
      return res.status(400).json({ error: 'Student not found' });
    }

    return res.json(student);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      birth: Yup.date().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const studentExists = await Student.findOne({ where: { id: req.params.id } });

    if (!studentExists) {
      return res.status(400).json({ error: 'Student not found.' });
    }

    const returnUpdate = await Student.update(
      req.body,
      { where: { id: req.params.id }, returning: true },
    );

    const [, [{
      id, name, email, age, weight, height,
    }]] = returnUpdate;

    return res.json({
      id, name, email, age, weight, height,
    });
  }
}

export default new StudentController();
