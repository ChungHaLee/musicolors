let codes = [
    {
        code: 'ERR_SYNTAX_NOTE',
        err:'That note does not exist'
    },
    {
        code: 'ERR_SYNTAX_TOO_MANY_CHARS',
        err: 'Too many characters'
    },
    {
        code: 'ERR_SYNTAX_PITCHED',
        err: 'Invalid pitch modifier'
    },
    {
        code: 'ERR_SYNTAX_OCTAVE',
        err: 'The octave was not set properly'
    },
    {
        code: 'ERR_SYNTAX_TOO_FEW_CHARS',
        err: 'Too few characters'
    },
    {
        code: 'ERR_NOTE_TOO_HIGH',
        err: 'The note is too high'
    },
    {
        code: 'ERR_NOTE_TOO_LOW',
        err: 'The note is too low'
    },
    {
        code: 'ERR_FREQUENCY_OUT_OF_RANGE',
        err: 'The frequency is either too low or too high'
    }
]

class Error {
    constructor (id, extra, input) {
        this.id = id;
        this.extra = extra;
        this.input = input;
        this.code = codes[id].code;
        this.err = codes[id].err;
    }
}

module.exports = Error;