import Sequelize, { Model } from 'sequelize';
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
      },
      {
        sequelize,
      },
    );

    return this;
  }
}

export default Student;
