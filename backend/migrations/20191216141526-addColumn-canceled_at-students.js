module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('students', 'canceled_at', {
    type: Sequelize.DATE,
  }),

  down: (queryInterface) => queryInterface.removeColumn('students', 'canceled_at'),
};
