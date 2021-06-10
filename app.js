const chalk = require('chalk')
const { demandOption, string } = require('yargs')
const yargs = require('yargs')
const notes = require('./notes')

// Customise yargs version
yargs.version('1.1.0')

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
      title: {
          describe: 'Note title',
          demandOption: true,
          type: 'string'
      }, 
      body: {
         describe: 'Note body',
         demandOption: true,
         type: 'string' 
      }  
    },
    handler(argv) { 
        notes.addNote (argv.title, argv.body)
    }
})

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Remove title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote (argv.title)
    }
})

// Create a list command
yargs.command({
    command: 'list',
    describe: 'Lists notes',
    handler() {
        notes.listNotes ()
    }    
})

// Create a read command
yargs.command({
    command: 'read',
    describe: 'Reads notes',
    handler() {
        console.log('Reads notes!')
    }
})

yargs.parse()