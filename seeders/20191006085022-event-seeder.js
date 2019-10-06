'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */

      return queryInterface.bulkInsert('Events', [{
        title: 'Ćorave slike',
        description: 'Šta su to ćorave slike? Dođite na izložbu i saznajte!',
        status: 'approved',
        category: 'izlozba',
        type: 'otvorenbp',
        space: 'velikasala',
        price: 0,
        age: 'svi',
        contactEmail: 'edsegpr@gmail.com',
        startTime: '2019-10-01T18:00:00',
        endTime: '2019-10-05T13:00:00'
      },
      {
        title: 'Likovne radionice',
        description: 'Deca su nepresušan izvor mašte. Dovedite ih na likovne radionice da otkriju prostrana mora svoje mašte.',
        status: 'approved',
        category: 'radionica',
        type: 'otvorenbp',
        space: 'malasala',
        price: 0,
        age: 'deca',
        contactEmail: 'edsegpr@gmail.com',
        startTime: '2019-10-02T18:00:00',
        endTime: '2019-10-02T20:00:00'
      },
      {
        title: 'Koncert Rumbaristas',
        description: '',
        status: 'approved',
        category: 'koncert',
        type: 'otvorenbp',
        space: 'dvoriste',
        price: 0,
        age: 'mladi',
        contactEmail: 'edsegpr@gmail.com',
        startTime: '2019-10-02T20:00:00',
        endTime: '2019-10-03T00:00:00'
      },
      {
        title: 'Daniel Lazar & Almir Mešković',
        description: '',
        status: 'approved',
        category: 'koncert',
        type: 'otvorenbp',
        space: 'dvoriste',
        price: 0,
        age: 'mladi',
        contactEmail: 'edsegpr@gmail.com',
        startTime: '2019-10-03T20:00:00',
        endTime: '2019-10-04T00:00:00'
      },
      {
        title: 'Daniel Lazar & Almir Mešković',
        description: '',
        status: 'approved',
        category: 'koncert',
        type: 'otvorenbp',
        space: 'dvoriste',
        price: 0,
        age: 'mladi',
        contactEmail: 'edsegpr@gmail.com',
        startTime: '2019-10-03T20:00:00',
        endTime: '2019-10-03T23:59:59'
      },
      {
        title: 'Visoko C proba',
        description: '',
        status: 'approved',
        category: 'koncert',
        type: 'zatvoren',
        space: 'dvoriste',
        price: 0,
        age: 'mladi',
        contactEmail: 'edsegpr@gmail.com',
        startTime: '2019-10-04T09:00:00',
        endTime: '2019-10-04T14:00:00'
      },
      {
        title: 'Festival Biserna grana',
        description: 'Odličan probod zagarantovan na ovom sjajnom festivalu!',
        status: 'approved',
        category: 'festival',
        type: 'otvorenbp',
        space: 'velikasala',
        price: 0,
        age: 'svi',
        contactEmail: 'edsegpr@gmail.com',
        startTime: '2019-10-04T20:00:00',
        endTime: '2019-10-05T00:00:00'
      },
      {
        title: 'Pozorišna predstava "Lav i miš"',
        description: 'Saznajte kako je miš prepao lava',
        status: 'approved',
        category: 'predstava',
        type: 'otvorenbp',
        space: 'plato',
        price: 0,
        age: 'deca',
        contactEmail: 'edsegpr@gmail.com',
        startTime: '2019-10-05T10:00:00',
        endTime: '2019-10-05T10:45:00'
      },
      {
        title: 'Kreativna radionica za decu "Sam svoj majstor"',
        description: 'Neka vaša deca nauče da koriste osnovne alate: čekić, metar i šrafciger',
        status: 'approved',
        category: 'radionica',
        type: 'otvorenbp',
        space: 'malasala',
        price: 0,
        age: 'deca',
        contactEmail: 'edsegpr@gmail.com',
        startTime: '2019-10-05T10:45:00',
        endTime: '2019-10-05T11:15:00'
      },
      {
        title: 'S Mokranjcem u svet',
        description: '',
        status: 'approved',
        category: 'koncert',
        type: 'otvorenbp',
        space: 'plato',
        price: 0,
        age: 'odrasli',
        contactEmail: 'edsegpr@gmail.com',
        startTime: '2019-10-05T20:00:00',
        endTime: '2019-10-05T12:45:00'
      },
      {
        title: 'Razmena knjiga',
        description: '',
        status: 'approved',
        category: 'drugo',
        type: 'otvorenbp',
        space: 'drucentar',
        price: 0,
        age: 'svi',
        contactEmail: 'edsegpr@gmail.com',
        startTime: '2019-10-06T14:00:00',
        endTime: '2019-10-06T20:00:00'
      },
      {
        title: 'Fondacija Đula',
        description: '',
        status: 'approved',
        category: 'drugo',
        type: 'zatvoren',
        space: 'malasala',
        price: 0,
        age: 'svi',
        contactEmail: 'edsegpr@gmail.com',
        startTime: '2019-10-07T09:00:00',
        endTime: '2019-10-07T15:00:00'
      },
      {
        title: 'Smeh joga',
        description: 'Kako smehom do života bez stresa?',
        status: 'approved',
        category: 'radionica',
        type: 'otvorenbp',
        space: 'malasala',
        price: 0,
        age: 'svi',
        contactEmail: 'edsegpr@gmail.com',
        startTime: '2019-10-07T18:00:00',
        endTime: '2019-10-07T19:00:00'
      },
      {
        title: 'Otvaranje izložba Art[]KVADRAT-SRBIJA_2019-2020',
        description: 'Kako smehom do života bez stresa?',
        status: 'approved',
        category: 'radionica',
        type: 'otvorenbp',
        space: 'malasala',
        price: 0,
        age: 'svi',
        contactEmail: 'edsegpr@gmail.com',
        startTime: '2019-10-07T18:00:00',
        endTime: '2019-10-10T23:59:59'
      },
      {
        title: 'Promocija knjiga o modi',
        description: 'Šta je to moda? Saznajte u novoj knjizi Bojane Vunturišević',
        status: 'approved',
        category: 'drugo',
        type: 'otvorenbp',
        space: 'malasala',
        price: 0,
        age: 'svi',
        contactEmail: 'edsegpr@gmail.com',
        startTime: '2019-10-08T18:00:00',
        endTime: '2019-10-08T19:00:00'
      },
      {
        title: 'Likovne radionice',
        description: 'Deca su nepresušan izvor mašte. Dovedite ih na likovne radionice da otkriju prostrana mora svoje mašte.',
        status: 'approved',
        category: 'radionica',
        type: 'otvorenbp',
        space: 'malasala',
        price: 0,
        age: 'deca',
        contactEmail: 'edsegpr@gmail.com',
        startTime: '2019-10-09T18:00:00',
        endTime: '2019-10-09T20:00:00'
      },
      {
        title: 'Festival mentalnog zdravlja',
        description: 'Okrugli sto “Prevazilaženje kriza iz ugla psihoterapeuta”',
        status: 'approved',
        category: 'festival',
        type: 'otvorenbp',
        space: 'valikasala',
        price: 0,
        age: 'svi',
        contactEmail: 'edsegpr@gmail.com',
        startTime: '2019-10-11T18:30:00',
        endTime: '2019-10-11T21:30:00'
      },
      {
        title: 'Festival mentalnog zdravlja',
        description: 'ciklus filmova i diskusija “RazvojNe krize i film”:Mladost',
        status: 'approved',
        category: 'festival',
        type: 'otvorenbp',
        space: 'valikasala',
        price: 0,
        age: 'svi',
        contactEmail: 'edsegpr@gmail.com',
        startTime: '2019-10-12T18:00:00',
        endTime: '2019-10-12T21:30:00'
      },
      {
        title: 'Radionica 12 Frames per Second',
        description: '',
        status: 'approved',
        category: 'radionica',
        type: 'otvorenbp',
        space: 'malaasala',
        price: 0,
        age: 'svi',
        contactEmail: 'edsegpr@gmail.com',
        startTime: '2019-10-12T10:00:00',
        endTime: '2019-10-12T14:00:00'
      },
      {
        title: 'Festival mentalnog zdravlja',
        description: 'predstava interkativna “Priče iz duše” ',
        status: 'approved',
        category: 'predstava',
        type: 'otvorenbp',
        space: 'valikasala',
        price: 0,
        age: 'svi',
        contactEmail: 'edsegpr@gmail.com',
        startTime: '2019-10-13T19:00:00',
        endTime: '2019-10-13T21:30:00'
      },
      {
        title: 'Festival mentalnog zdravlja',
        description: 'ciklus filmova i diskusija “RazvojNe krize i film”:Srednje doba',
        status: 'approved',
        category: 'predstava',
        type: 'otvorenbp',
        space: 'valikasala',
        price: 0,
        age: 'svi',
        contactEmail: 'edsegpr@gmail.com',
        startTime: '2019-10-14T19:00:00',
        endTime: '2019-10-14T21:30:00'
      },
      {
        title: 'Radionica praljenja marioneta OPENS',
        description: 'Čuli ste za marionetske vlade? Šta su to zapravo marionete? Dođite na radionicu i saznajte.',
        status: 'approved',
        category: 'radionica',
        type: 'otvorenbp',
        space: 'valikasala',
        price: 0,
        age: 'svi',
        contactEmail: 'edsegpr@gmail.com',
        startTime: '2019-10-15T11:00:00',
        endTime: '2019-10-15T14:00:00'
      },
      {
        title: 'poseta TONSA i organizacija sa keteringom',
        description: '',
        status: 'approved',
        category: 'drugo',
        type: 'zatvoren',
        space: 'drugo',
        price: 0,
        age: 'svi',
        contactEmail: 'edsegpr@gmail.com',
        startTime: '2019-10-21T13:00:00',
        endTime: '2019-10-21T15:00:00'
      },
      ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
