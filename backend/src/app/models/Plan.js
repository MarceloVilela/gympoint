import Sequelize, { Model } from 'sequelize';
import sequelizePaginate from 'sequelize-paginate';

class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        price_total: {
          type: Sequelize.VIRTUAL,
          get() {
            return this.price * this.duration;
          },
        },
        price: Sequelize.FLOAT,
        duration: Sequelize.INTEGER,
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

export default Plan;
