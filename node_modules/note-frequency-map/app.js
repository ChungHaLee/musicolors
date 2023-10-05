const parser = require('./util/parser');
const Note = require('./Note');

let rootNote = {
    name: 'A',
    octave: 4,
    frequency: 440
}

function setRoot (note, freq) {
    let parsed = parser.parseString(note);
    if (parsed.err !== undefined) return false;
    if (isNaN(freq) || freq <= 0) return false;
    rootNote.name = parsed.name;
    rootNote.octave = parsed.octave;
    rootNote.frequency = freq;
    return true;
}

function noteFromName (note) {
    let parsed = parser.parseString(note);
    return new Note(parsed.name, parsed.octave, null, rootNote);
}

function noteFromFreq (freq) {
    return new Note(null, null, freq, rootNote);
}

module.exports = {
    setRoot: (string, freq) => setRoot(string, freq),
    noteFromName: string => noteFromName(string),
    noteFromFreq: float => noteFromFreq(float)
}
