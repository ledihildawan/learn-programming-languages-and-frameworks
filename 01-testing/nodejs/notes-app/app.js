const chalk = require('chalk');
const yargs = require('yargs')(process.argv.slice(2));
const getNotes = require('./notes.js');

yargs.version('1.1.0');

yargs
  .command({
    command: 'add',
    desc: 'Adding a new note',
    builder: {
      title: {
        desc: 'Note title',
        demandOption: true,
      },
    },
    handler: () => {
      console.log('Adding a new note!');
    },
  })
  // .command(
  //   'delete',
  //   'Removing a note',
  //   () => {},
  //   () => {
  //     console.log('Removing a note!');
  //   }
  // )
  // .command(
  //   'read',
  //   'Reading a note',
  //   () => {},
  //   () => {
  //     console.log('Reading a note!');
  //   }
  // )
  // .command(
  //   'list',
  //   'List of note',
  //   () => {},
  //   () => {
  //     console.log('List of note!');
  //   }
  // )
  .help().argv;
