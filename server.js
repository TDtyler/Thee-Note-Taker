const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const app = express();
const PORT = process.env.Port || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('./Develop/public'));

app.get('api/notes', function(req, res) {
    readFileAsync('./Develop/db/db.json', 'utf8').then(function(data) {
        notes = [].concat(JSON.parse(data))
        res.json(notes);
    })
});

app.post('/api/notes', function(req, res) {
    const note = req.body;
    readFileAsync('./Develop/db/db.json', 'utf8').then(function(data) {
        const notes = [].concat(JSON.parse(data));
        note.id = notes.length + 1
        notes.push(notes);
        return notes
    }).then(function(notes) {
        writeFileAsync('./Develop/db/db.json', JSON.stringify(notes))
        res.json(note);
    })
});

app.delete('/api/notes/:id', function(req, res) {
    const idDelete = parseInt(req.params.id);
    readFileAsync('./Develop/db/db.json', 'utf8').then(function(data) {
        const notes = [].concat(JSON.parse(data));
        const newNotes = []
        for (let i = 0; i<notes.length; i++) {
            if(idDelete !== notes[i].id) {
                newNotes.push(notes[i])
            }
        }
        return newNotes
    }).then(function(notes) {
        writeFileAsync('./Develop/db/db.json', JSON.stringify(notes))
        res.send('SAVED!')
    })
})

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
})

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
})


app.listen(PORT, function() {
    console.log('app listening on PORT' + PORT);
});