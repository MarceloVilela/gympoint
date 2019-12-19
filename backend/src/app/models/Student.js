import Sequelize, { Model } from 'sequelize';
import sequelizePaginate from 'sequelize-paginate';
import { differenceInCalendarYears } from 'date-fns';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        age: {
          type: Sequelize.VIRTUAL,
          get() {
            return differenceInCalendarYears(new Date(), this.birth);
          },
        },
        birth: Sequelize.DATE,
        weight: Sequelize.FLOAT,
        height: Sequelize.FLOAT,
        canceled_at: Sequelize.DATE,
      },
      {
        sequelize,
      },
    );

    sequelizePaginate.paginate(this);

    return this;
  }
}

export default Student;
