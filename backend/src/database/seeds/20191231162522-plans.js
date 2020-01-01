'use strict';

module.exports = {
  up: (QueryInterface) => QueryInterface.bulkInsert(
    'plans',
    [
      {
        "id": 2,
        "title": "Gold",
        "duration": 3,
        "price": 109,
        "canceled_at": null,
        "created_at": "2019-10-25T13:45:14.272Z",
        "updated_at": "2019-10-25T13:45:14.272Z"
      },
      {
        "id": 3,
        "title": "Diamond",
        "duration": 6,
        "price": 89,
        "canceled_at": null,
        "created_at": "2019-10-25T13:45:21.523Z",
        "updated_at": "2019-10-25T13:45:21.523Z"
      },
      {
        "id": 6,
        "title": "Teste1207",
        "duration": 2,
        "price": 222,
        "canceled_at": "2019-12-16T14:39:11.801Z",
        "created_at": "2019-12-08T02:23:15.104Z",
        "updated_at": "2019-12-16T14:39:11.801Z"
      },
      {
        "id": 4,
        "title": "Teste__",
        "duration": 1,
        "price": 111,
        "canceled_at": "2019-12-16T14:40:30.131Z",
        "created_at": "2019-10-25T13:45:27.215Z",
        "updated_at": "2019-12-16T14:40:30.132Z"
      },
      {
        "id": 7,
        "title": "TesteA",
        "duration": 1,
        "price": 129,
        "canceled_at": null,
        "created_at": "2019-12-19T16:44:34.007Z",
        "updated_at": "2019-12-19T16:44:34.007Z"
      },
      {
        "id": 8,
        "title": "TesteB",
        "duration": 1,
        "price": 129,
        "canceled_at": null,
        "created_at": "2019-12-19T16:44:42.221Z",
        "updated_at": "2019-12-19T16:44:42.221Z"
      },
      {
        "id": 9,
        "title": "TesteC",
        "duration": 1,
        "price": 129,
        "canceled_at": null,
        "created_at": "2019-12-19T16:44:45.470Z",
        "updated_at": "2019-12-19T16:44:45.470Z"
      },
      {
        "id": 10,
        "title": "TesteD",
        "duration": 2,
        "price": 119,
        "canceled_at": null,
        "created_at": "2019-12-19T16:44:52.939Z",
        "updated_at": "2019-12-19T16:44:52.939Z"
      },
      {
        "id": 11,
        "title": "TesteE",
        "duration": 2,
        "price": 119,
        "canceled_at": null,
        "created_at": "2019-12-19T16:44:56.910Z",
        "updated_at": "2019-12-19T16:44:56.910Z"
      },
      {
        "id": 12,
        "title": "TesteF",
        "duration": 2,
        "price": 119,
        "canceled_at": null,
        "created_at": "2019-12-19T16:45:00.201Z",
        "updated_at": "2019-12-19T16:45:00.201Z"
      },
      {
        "id": 13,
        "title": "TesteG",
        "duration": 3,
        "price": 99,
        "canceled_at": null,
        "created_at": "2019-12-19T16:46:37.062Z",
        "updated_at": "2019-12-19T16:46:37.062Z"
      },
      {
        "id": 14,
        "title": "TesteH",
        "duration": 3,
        "price": 99,
        "canceled_at": null,
        "created_at": "2019-12-19T16:46:42.172Z",
        "updated_at": "2019-12-19T16:46:42.172Z"
      },
      {
        "id": 15,
        "title": "TesteI",
        "duration": 3,
        "price": 99,
        "canceled_at": null,
        "created_at": "2019-12-19T16:46:44.590Z",
        "updated_at": "2019-12-19T16:46:44.590Z"
      },
      {
        "id": 1,
        "title": "Start",
        "duration": 1,
        "price": 129,
        "canceled_at": null,
        "created_at": "2019-10-25T13:45:08.116Z",
        "updated_at": "2019-12-23T12:45:27.827Z"
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => {}
};
