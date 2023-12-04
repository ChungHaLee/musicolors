const scale = require('./scale');
const symbols = require('./symbols');
const Error = require('../Error');

function parseString (string) {
    let input = string.split('');
    let inputNoPitching = null;
    let name = null;
    let pitched = null;
    let octave = null;

    // Too few characters
    if (input.length < 2) {
        return new Error(4, ``, string);
    }

    // Too many characters
    if (input.length > 3) {
        return new Error(1, `The characters "${string.substring(3).split('').join(',')}" is exceeding the max number of characters allowed`, string);
    }

    // If string includes flat or sharp
    if (input.length === 3) {
        // If sharp or flat symbol is invalid
        if (!(symbols.sharp.includes(input[1]) || symbols.flat.includes(input[1]))) {
            return new Error(2, `The character "${input[2]}" is invalid`, string)
        }
        // Pitch modifier is valid
        pitched = input[1];
        inputNoPitching = Array.from(input[0] + input[2]);
    }
    else {
        inputNoPitching = input;
        pitched = null;
    }

    // If note name is not valid
    if (!scale.join('').toLowerCase().split('').includes(input[0].toLowerCase())) {
        return new Error(0, `The characer "${input[0]}" is invalid`, string);
    }
    
    // If note name is valid
    name = input[0].toUpperCase();
    
    // If octave is not a number
    if (isNaN(inputNoPitching[1])) {
        return new Error(3, `The character "${inputNoPitching[1]}" is not a number`, string);
    }

    // If the octave is valid
    octave = Number(inputNoPitching[1]);

    // If it's pitched, change the name of the note
    if (pitched !== null) {
        let index = null;
        if (symbols.sharp.includes(pitched)) index = scale.indexOf(name) + 1;
        else index = scale.indexOf(name) - 1;

        if (index < 0) {
            index = scale.length - 1;
            octave--;
        }

        if (index > scale.length - 1) {
            index = 0;
            octave++;
        }

        if (octave < 0) {
            return new Error(7, `This result in octave being "${octave}"`, string);
        }

        name = scale[index];
    }

    return {name, octave};
}

module.exports.parseString = parseString;