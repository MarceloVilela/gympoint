import * as Yup from 'yup';
import Student from '../models/Student';
import Registration from '../models/Registration';

class IdentifierController {
  async show(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const options = {
      where: { id },
      include: [
        {
          model: Registration,
          as: 'registration',
          required: false,
          where: { canceled_at: null },
        },
      ],
    };

    const student = await Student.findOne(options);

    if (!student) {
      return res.status(400).json({ error: 'Aluno não encontrado' });
    }

    if (student.registration && student.registration.active) {
      return res.json({ id });
    }

    // Although the student is registered on the platform,
    // this does not mean that the student has an active registration and can access the gym.
    return res.status(400).json({ error: 'Sem matrícula ativa' });
  }
}

export default new IdentifierController();
