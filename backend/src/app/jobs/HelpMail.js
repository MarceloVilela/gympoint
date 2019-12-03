import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'HelpMail';
  }

  async handle({ data }) {
    const { helpOrder } = data;

    await Mail.sendMail({
      to: `${helpOrder.student.name} <${helpOrder.student.email}>`,
      subject: 'Pedido de auxílio',
      template: 'help',
      context: {
        student: helpOrder.student.name,
        question: helpOrder.question,
        answer: helpOrder.answer,
        date: format(parseISO(helpOrder.created_at), "'dia' dd 'de' MMMM', às ' H:mm:'h'", {
          locale: pt,
        }),
      },
    });
  }
}

export default new CancellationMail();
