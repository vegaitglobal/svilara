'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert('Settings', [
      { key: 'glavni logo', value: '', keyShown: 0, sidebar: 0},
      { key: 'sporedni logo 1', value: '', keyShown: 0, sidebar: 0 },
      { key: 'sporedni logo 2', value: '', keyShown: 0, sidebar: 0 },
      { key: 'facebook', value: 'https://www.facebook.com/svilara/', keyShown: 0, sidebar: 0},
      { key: 'instagram', value: 'https://www.instagram.com/svilara_ks/?hl=en', keyShown: 0, sidebar: 0},
      { key: 'twitter', value: '', keyShown: 0, sidebar: 0},
      { key: 'youtube', value: '', keyShown: 0, sidebar: 0},
      { key: 'email', value: 'mailto:svilarans@gmail.com', keyShown: 0, sidebar: 0},
      { key: 'otvoren bez prijave', value: '#fc3a54', keyShown: 0, sidebar: 0},
      { key: 'otvoren sa prijavom', value: '#fc3af6', keyShown: 0, sidebar: 0},
      { key: 'zatvoren', value: '#3a9bfc', keyShown: 0, sidebar: 0},
      { key: 'placanje', value: '#6bfc03', keyShown: 0, sidebar: 0},
      { key: 'favicon', value: 'default-picture.png', keyShown: 0, sidebar: 0},
      { key: 'naslov sajta', value: 'Kulturna stanica', keyShown: 0, sidebar: 0},
      { key: 'naziv u pravilniku', value: 'Svilara', keyShown: 0, sidebar: 0},
      { key: 'tekst pravilnika na srpskom', value: 'Popunjavanjem ovog formulara aplicirate za korišćenje prostora Kulturne stanice Svilara i pristajete na uslove i pravila korišćenja iste.'

      + 'Prijave se vrše najkasnije do 15. u mesecu pre onog u kome bi se Vaš događaj održavao. Slanjem formulara u ovom roku realizacija Vašeg događaja nije prihvaćena, već to znači da formulari poslati nakon ovog roka za naredni mesec neće biti razmatrani.'
      
      + 'Da bi događaj Vaše organizacije bio uvršten u naš raspored, vaš zahtev mora odobriti tim Kulturne stanice Svilara. Ukoliko imate više različitih događaja koje biste želeli da uvrstimo u program Svilara, morate popuniti formular za svaki od njih posebno.'
      
      + 'Prihvatanjem realizacije željenog događaja, predlagač automatski prihvata Pravilnik o radu KS Svilara i potvrđuje da je sa njim upoznat.'
      
      + 'Popunjavanjem ovog formulara, predlagač programa za priređivanje izložbe u KS prihvata činjenicu da je izlagački prostor multifunkcionalan i da se u njemu održavaju različiti događaji u periodu trajanja izložbe, na način da ne ugroze postavku ili oštete dela.'
      
      + 'KS može da organizuje koje se dogovaraju na pripremnim sastancima. Izvođački programi imaju prednost u odnosu na probe/sastanke i pripreme programa, te je najpoželjnije uneti u željene termine rezervni datum.'
      
      + 'Prilikom održavanja događaja u kulturnoj stanici Svilara biće fotografisanja i snimanja prisutnih u cilju promocije programa Fondacije „Novi Sad 2021 - Evropska prestonica kulture" i u skladu sa Zakonom o zaštiti podataka o ličnosti i Zakona o javnom informisanju, ovo se smatra pristanakom na eventualno objavljivanje predmetnih fotografija i video-zapisa na društvenim mrežama, sajtu Fondacije i kulturne stanice.'
      
      + 'Popunjavanjem upitnika potvrđujete verodostojnost i tačnost unetih podataka.', keyShown: 0, sidebar: 0},
      { key: 'tekst pravilnika na engleskom', value: 'By filling in this application form you are applying to use facilities of the Svilara Cultural Station and you agree to its terms and conditions.'

      + 'The applications have to be submitted by 15th of the month which precedes the month in which your event is taking place (e.g. if your event takes place in May, you have to submit your application by 15 April). Applications that do not meet this condition will not be taken into consideration.'
      
      + 'In order to include your organisation’s event into our schedule, it needs to be approved by the team of the Svilara Cultural Station. In case you have more than one event that you wish to be included in the programme of Svilara CS, you need to fill in a form for each the events separately.'
      
      + 'By accepting the organisation of the event, the applicant automatically accepts the Rules of Procedure of the Svilara Cultural Station and confirms that he / she is familiar with them.'
      
      + 'By filling in this application form, the applicant of the exhibition accepts the fact that the Cultural Station is a multi-functional facility and that events of various types may take place during the exhibition, though in such a way that they do not endanger the exhibition or damage it.'
      
      + 'The Cultural Station can offer commercial services that are discussed during preparatory meetings.'
      
      + 'Performances have advantage over rehearsals/meetings and preparatory activities, therefore you are advised to enter alternative dates.'
      + 'During the events organised in the Svilara Cultural Station, we usually photograph and record events in order to promote the programme of the \'Novi Sad 2021 - European Capital of Culture\' Foundation in accordance with the Law on Personal Data Protection and Law on Public Information, and this application is deemed acceptance to possible publication of the said photographs and video recordings on social networks and websites of the Foundation and Cultural Station.'
      
      + 'By filling in this application form you confirm that the data entered are true and correct.', keyShown: 0, sidebar: 0},
      { key: 'naslov korisničke forme', value: 'Upitnik za prijavu programa u kulturnoj stanici Svilara', keyShown: 0, sidebar: 0},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('People', null, {});
  }
};
