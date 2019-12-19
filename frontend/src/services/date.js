import { format, parseISO } from 'date-fns';
import locale from 'date-fns/locale/pt';

const textualDate = date => {
  return format(parseISO(date), "dd 'de' MMMM 'de' yyyy", { locale });
};

export { textualDate };
