'use strict';

module.exports = {
  up: (QueryInterface) => QueryInterface.bulkInsert(
    'students',
    [
      {
        "id": 4,
        "name": "Larissa Martins Goncalves",
        "email": "larissamartinsgoncalves@dayrep.com",
        "birth": "1958-05-24T00:00:00.000Z",
        "weight": 57,
        "height": 1.69,
        "created_at": "2019-12-07T11:09:28.796Z",
        "updated_at": "2019-12-19T11:02:18.330Z",
        "canceled_at": null
      },
      {
        "id": 6,
        "name": "Raissa Azevedo Castro",
        "email": "raissaazevedocastro@dayrep.com",
        "birth": "1965-05-06T00:00:00.000Z",
        "weight": 86,
        "height": 1.62,
        "created_at": "2019-12-08T00:24:44.146Z",
        "updated_at": "2019-12-19T11:04:37.667Z",
        "canceled_at": null
      },
      {
        "id": 3,
        "name": "Renan Costa Rodrigues",
        "email": "renancostarodrigues@armyspy.com",
        "birth": "1950-11-12T00:00:00.000Z",
        "weight": 75,
        "height": 1.64,
        "created_at": "2019-10-25T11:25:05.637Z",
        "updated_at": "2019-12-19T11:05:26.323Z",
        "canceled_at": null
      },
      {
        "id": 8,
        "name": "Rebeca Ribeiro Ferreira",
        "email": "rebecaribeiroferreira@jourrapide.com",
        "birth": "1987-06-11T00:00:00.000Z",
        "weight": 80,
        "height": 1.68,
        "created_at": "2019-12-16T14:31:34.183Z",
        "updated_at": "2019-12-19T11:06:12.042Z",
        "canceled_at": null
      },
      {
        "id": 9,
        "name": "Breno Rocha Castro",
        "email": "brenorochacastro@teleworm.us",
        "birth": "1972-08-12T00:00:00.000Z",
        "weight": 92,
        "height": 1.67,
        "created_at": "2019-12-19T11:07:15.174Z",
        "updated_at": "2019-12-19T11:07:15.174Z",
        "canceled_at": null
      },
      {
        "id": 10,
        "name": "Diego Santos Souza",
        "email": "diegosantossouza@teleworm.us",
        "birth": "1969-04-30T00:00:00.000Z",
        "weight": 100,
        "height": 1.8,
        "created_at": "2019-12-19T11:08:11.863Z",
        "updated_at": "2019-12-19T11:08:11.863Z",
        "canceled_at": null
      },
      {
        "id": 11,
        "name": "Rebeca Araujo Martins",
        "email": "rebecaaraujomartins@dayrep.com",
        "birth": "1969-09-16T00:00:00.000Z",
        "weight": 95,
        "height": 1.54,
        "created_at": "2019-12-19T11:09:35.545Z",
        "updated_at": "2019-12-19T11:09:35.545Z",
        "canceled_at": null
      },
      {
        "id": 12,
        "name": "Maria Alves Ribeiro",
        "email": "mariaalvesribeiro@rhyta.com",
        "birth": "1991-02-14T00:00:00.000Z",
        "weight": 59,
        "height": 1.72,
        "created_at": "2019-12-19T11:10:51.611Z",
        "updated_at": "2019-12-19T11:10:51.611Z",
        "canceled_at": null
      },
      {
        "id": 5,
        "name": "Tomás Araujo Fernandes",
        "email": "tomasaraujofernandes@teleworm.us",
        "birth": "1954-08-05T00:00:00.000Z",
        "weight": 101.5,
        "height": 1.7,
        "created_at": "2019-12-07T11:13:06.736Z",
        "updated_at": "2019-12-31T11:38:59.102Z",
        "canceled_at": null
      },
      {
        "id": 1,
        "name": "Marcelo Vilela",
        "email": "marcelo.vilela.s@gmail.com",
        "birth": "1993-06-04T00:00:00.000Z",
        "weight": 70,
        "height": 1.73,
        "created_at": "2019-10-25T10:48:49.328Z",
        "updated_at": "2019-12-23T12:29:47.211Z",
        "canceled_at": null
      },
      {
        "id": 7,
        "name": "AAA",
        "email": "aaa@gmail2_.com",
        "birth": "1992-06-07T00:00:00.000Z",
        "weight": 73,
        "height": 1.73,
        "created_at": "2019-12-08T01:11:57.940Z",
        "updated_at": "2019-12-16T14:26:39.274Z",
        "canceled_at": "2019-12-16T14:26:39.272Z"
      },
      {
        "id": 2,
        "name": "Gabrielle Martins Souza",
        "email": "gabriellemartinssouza@teleworm.us",
        "birth": "1960-09-01T00:00:00.000Z",
        "weight": 70,
        "height": 1.55,
        "created_at": "2019-10-25T10:52:51.168Z",
        "updated_at": "2019-12-19T11:01:18.208Z",
        "canceled_at": null
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => {}
};
