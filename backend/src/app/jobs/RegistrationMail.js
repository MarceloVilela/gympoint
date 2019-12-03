import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const { registration } = data;

    await Mail.sendMail({
      to: `${registration.student.name} <${registration.student.email}>`,
      subject: 'Detalhes da inscrição na GymPoint',
      template: 'registration',
      context: {
        student: registration.student.name,
        plan: registration.plan.title,
        date: format(parseISO(registration.createdAt), "'dia' dd 'de' MMMM', às ' H:mm:'h'", {
          locale: pt,
        }),
      },
    });
  }
}

export default new CancellationMail();
