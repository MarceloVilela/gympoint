import * as Yup from 'yup';
import Student from '../models/Student';

class IdentifierController {
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

    return res.json({ id });
  }
}

export default new IdentifierController();
