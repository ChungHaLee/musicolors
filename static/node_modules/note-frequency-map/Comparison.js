const frequency = require('./util/frequency');
const scale = require('./util/scale');

class Comparison {

    constructor (note1, note2) {
        this.note1 = note1;
        this.note2 = note2;

        this.semitones = getSemitones(getAllSemitones(note1, note2));
        this.octaves = getOctaves(getAllSemitones(note1, note2));

        let semitoneSum = `${this.semitones} semitone${(this.semitones === 1) ? '' : 's'}`;
        let octaveSum = `${this.octaves} octave${(this.octaves === 1) ? '' : 's'}`;

        if (getAllSemitones(note1, note2) === 0)
        this.summary = `There is no difference between the notes, they are both ${note1.name + note1.octave}`;
        else this.summary = `The note ${this.note1.name + this.note1.octave} is ${(this.octaves === 0) ? '' : octaveSum}${(this.semitones === 0 || this.octaves === 0) ? '' : ' and '}${(this.semitones === 0) ? '' : semitoneSum} away from ${note2.name + note2.octave}`;
    }
}

function getAllSemitones (note1, note2) {
    return frequency.getSemitonesFromNote(note1.name, note1.octave, note2.name, note2.octave);
}

function getSemitones (allSemitones) {
    let result = allSemitones % scale.length;
    if (result === 0) result = 0; // Else, it results in -0, which is ridiculous
    return result;
}

function getOctaves (allSemitones) {
    let result;
    if (allSemitones < 0) {
        result = Math.floor((allSemitones * -1) / scale.length) * -1;
        if (result === 0) result = 0; // Else, it results in -0, which is ridiculous
    }
    else result = Math.floor(allSemitones / scale.length);
    return result;
}

module.exports = Comparison;