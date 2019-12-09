"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/

    var order_number = 1;

    return queryInterface.bulkInsert(
      "Questions",
      [
        {
          text: "Email address",
          fieldType: "input",
          name: "email",
          values: "",
          order: order_number++,
          mandatory: true
        },
        {
          text:
            "Naziv organizacije/udruženja/institucije/pojedinca - The name of organisation/association/institution/individual",
          fieldType: "input",
          name: "question1",
          values: "",
          order: order_number++,
          mandatory: true
        },
        {
          text: "Kontakt-osoba - Contact person",
          fieldType: "input",
          name: "question2",
          values: "",
          order: order_number++,
          mandatory: true
        },
        {
          text: "Zvanični kontakt-telefon - Official phone number",
          fieldType: "input",
          name: "question3",
          values: "",
          order: order_number++,
          mandatory: true
        },
        {
          text:
            "Opis organizacije/udruženja/institucije/pojedinca, čime se bavi - The description of organization/association/institution/individual including activities",
          fieldType: "input",
          name: "question4",
          values: "",
          order: order_number++,
          mandatory: true
        },
        {
          text:
            "Logo organizacije/udruženja/institucije - Upload logo of your organization/association/institution",
          fieldType: "file",
          name: "logo",
          values: "",
          order: order_number++,
          mandatory: true
        },
        {
          text:
            "Profil organizacije na društvenim mrežama (link) - URL of official social network's accounts",
          fieldType: "input",
          name: "question5",
          values: "",
          order: order_number++,
          mandatory: true
        },
        {
          text: "Naziv programa - The event name",
          fieldType: "input",
          name: "question6",
          values: "",
          order: order_number++,
          mandatory: true
        },
        {
          text: "Kategorija programa / Programme categories",
          fieldType: "radiobutton",
          name: "question7",
          values:
            '["Izložba / Exhibition", "Muzički program / Musical event", "Igranka / Dance", "Audio-vizuelni program / Audio-visual event", "Predstava / Play", "Festival / Festival", "Predavanje / Lecture, Seminar", "Radionica / Workshop", "Drugo / Other"]',
          order: order_number++,
          mandatory: true
        },
        {
          text:
            "Da li je program komercijalne prirode i ako jeste, na koji način? - Is the event commercial? In what way?",
          fieldType: "input",
          name: "question8",
          values: "",
          order: order_number++,
          mandatory: true
        },
        {
          text:
            "Da li je Vaš program finansijski podržan? - Is your event financially supported in any way?",
          fieldType: "input",
          name: "question9",
          values: "",
          order: order_number++,
          mandatory: true
        },
        {
          text:
            "Ako jeste, kratko objasnite na koji način/If yes, please explain shortly in what way?",
          fieldType: "input",
          name: "question10",
          values: "",
          order: order_number++,
          mandatory: false
        },
        {
          text: "Vrsta programa - Event type",
          fieldType: "radiobutton",
          name: "question11",
          values:
            '["Otvoren događaj (slobodan ulaz bez prijave)/Open event (Visitors do not need to apply beforehand)", "Otvoren događaj (slobodan ulaz sa prijavom)/Open event (Visitors need to apply beforehand)", "Zatvoren događaj/Closed event"]', // radio box
          order: order_number++,
          mandatory: true
        },
        {
          text:
            "Planirani datum ili period (uneti i rezervni termin) - Prefered date or time period (enter alternative dates)",
          fieldType: "input",
          name: "question12",
          values: "",
          order: order_number++,
          mandatory: true
        },
        {
          text: "Vreme početka i kraja programa - Start/end time of the event",
          fieldType: "input",
          name: "question13",
          values: "",
          order: order_number++,
          mandatory: true
        },
        {
          text: "Ukupno trajanje programa(montaža i demontaža)",
          fieldType: "input",
          name: "question23",
          values: "",
          order: order_number++,
          mandatory: true
        },
        {
          text: "Opis programa - Description of the event",
          fieldType: "input",
          name: "question14",
          values: "",
          order: order_number++,
          mandatory: true
        },
        {
          text:
            "Planirani prostor za Vaš program / Prefered space for your event",
          fieldType: "checkbox",
          name: "question15",
          values:
            '["Velika sala / Grand Hall", "Mala sala / Small hall", "Dvorište / Courtyard", "Sportski tereni sa tribinama / The sports court", "Drugo / Other"]',
          order: order_number++,
          mandatory: true
        },
        {
          text:
            "Da li organizator pravi događaj na društvenim mrežama? - Is the organiser creating the event on social media?",
          fieldType: "radiobutton",
          name: "question16",
          values:
            '["Da (navedite KS Eđšeg kao koorganizatora)/ Yes (tag CS Eđšeg as the co-organizer)", "Ne (KS Eđšeg pravi događaj)/ No (CS Eđšeg will create the event)", "Ne pravi se događaj/ No event is needed"]', // radio box
          order: order_number++,
          mandatory: true
        },
        {
          text:
            "Otpremite fotografiju koja ilustruje Vaš program / Upload a photo that illustrates your event",
          fieldType: "file",
          name: "picture",
          values: "",
          order: order_number++,
          mandatory: true
        },
        {
          text:
            "Da li ste zainteresovani za gostovanja u medijima - Are you interested in media appearance?",
          fieldType: "radiobutton",
          name: "question17",
          values: '["Da / Yes", "Ne / No"]',
          order: order_number++,
          mandatory: true
        },
        {
          text: "Očekivani uzrast publike - The expected age of visitors",
          fieldType: "radiobutton",
          name: "question18",
          values:
            '["Deca - Children", "Mladi - Youth", "Odrasli - Adults", "Starija publika - Elderly", "Profesionalna publika - Professionals", "Svi - All of the above"]', // radiobutton
          order: order_number++,
          mandatory: true
        },
        {
          text:
            "Planirani broj realizatora programa ili učesnika u radionici - Expected number of participants and visitors",
          fieldType: "input",
          name: "question19",
          values: "",
          order: order_number++,
          mandatory: true
        },
        {
          text:
            "Oprema koju donosi organizator - The equipment provided by the organiser",
          fieldType: "input",
          name: "question20",
          values: "",
          order: order_number++,
          mandatory: true
        },
        {
          text:
            "Oprema koja se očekuje od KS Eđšeg - The equipment that you would need from 'Egység' CS",
          fieldType: "input",
          name: "question21",
          values: "",
          order: order_number++,
          mandatory: true
        },
        {
          text: "Da li je potreban volonter? Ako jeste, koja vrsta volontera?",
          fieldType: "input",
          name: "question24",
          values: "",
          order: order_number++,
          mandatory: true
        },
        {
          text: "Da li prihvatate da budete deo platforme?",
          fieldType: "input",
          name: "question25",
          values: "",
          order: order_number++,
          mandatory: true
        },
        {
          text: "Posebne napomene - Special notes",
          fieldType: "input",
          name: "question22",
          values: "",
          order: order_number++,
          mandatory: false
        },
      ],
      {}
    );
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
