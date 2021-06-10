const fs = require('fs')
const chalk = require('chalk')
const { array } = require('yargs')

const getNotes = () => 'Your notes...'

const addNotes = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter((note) => note.title === title)

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log('New note added!')
    } else {
        console.log('Note title taken!')
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const removeNote = (title) => {
    const notes = loadNotes()
    const findTitle = notes.filter((note) => note.title === title)

    if (findTitle.length === 0) {
        console.log(chalk.bgRed('No note found: ' + title))
    } else {
        const index = notes.findIndex(note => note.title === title)
        console.log('Index of title: ' + index)
        notes.splice(index, 1)

        //save changes
        saveNotes(notes)
        console.log(chalk.bgGreen('Changes saved!'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.bgBlue('Your notes'))
    console.log(chalk.bgBlue('-----------------'))
    notes.forEach(note => { 
        console.log('title: ' + note.title)
        console.log('body: ' + note.body)
        console.log('-----------------')
    })
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)    
    } catch (e) {
        return []
    }
}

module.exports = {
    getNote: getNotes,
    addNote: addNotes,
    removeNote: removeNote,
    listNotes: listNotes
}