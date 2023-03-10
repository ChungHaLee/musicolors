/**
 * Author: Sam Bellen
 * Github: https://github.com/Sambego/frequency-calculator
 * Twitter: @Sambego
 *
 * This is a small library to convert frequencies to steps, notes and octaves.
 *
 * Examples:
 *
 * Convert a note to a frequency:
 * calculateFrequencyByNote(A, 4); // -> 440
 *
 * Convert a frequency to a note:
 * calculateNoteByFrequency(440); // -> A
 *
 * Convert a frequency to an octave:
 * calculateOctaveByFrequency(440); // -> 0
 */

/**
 * The base frequency, we'll use A4 since this is a nice whole number
 * @type {Number}
 */
const _base = 440.0; // An A-note in the fourth octave

/**
 * The amount of half steps a note is from A
 * @type {Object}
 */
const _steps = {
    C: -9,
    Csharp: -8,
    D: -7,
    Dsharp: -6,
    E: -5,
    F: -4,
    Fsharp: -3,
    G: -2,
    Gsharp: -1,
    A: 0,
    Asharp: 1,
    B: 2
};

export default class FrequencyCalculator {
    /**
     * Calculate the amount of half steps between A4 and a given note and octave
     * @param  {String} note   The note
     * @param  {Number} octave The octave
     * @return {Number}        The number of half steps
     */
    static calculateSteps(note, octave) {
        return ((4 - octave) * -12) + _steps[note];
    }

    /**
     * Calculate the frequency of a note based on the amount of half steps
     * above or below the base note (A4).
     * This can be a positive number (above) or a negative number (below).
     * @param  {Number} steps The number of half steps
     * @return {Number}       The calculated frequency
     */
    static calculateFrequencyByStep(steps) {
        return _base * Math.pow(Math.pow(2, (1/12)), steps);
    }

    /**
     * Calculate the frequency of a note based on the note and octave
     * @param  {String} note   The note
     * @param  {Number} octave The octave
     * @return {Number}        The frequency of the note
     */
    static calculateFrequencyByNote(note, octave) {
        return this.calculateFrequencyByStep(this.calculateSteps(note, octave))
    }

    /**
     * Calculate the amount of half steps between A4 and a given frequency
     * @param  {Float}   frequency The frequency
     * @param  {Boolean} round     Should the steps be rounded
     * @return {Number}            The amount of half steps
     */
    static calculateStepsFromFrequency(frequency, round = false) {
        const steps = 12 * Math.log(frequency / _base) / Math.log(2);

        if (round) {
            return Math.round(steps);
        }

        return steps;
    }

    /**
     * Calculate the note by the distance of half steps from A4
     * @param  {Number} steps The amount of half steps from A4
     * @return {String}       The note
     */
    static calculateNoteBySteps(steps) {
        const octave = steps / 12;
        const s = steps - ((steps < 0 ? Math.ceil(octave) : Math.floor(octave)) * 12);

        return Object.keys(_steps)[(s + 9)];
    }

    /**
     * Calculate the octave by the distance of half steps from A4
     * @param  {Number}  steps        The amount of half steps from A4
     * @param  {Boolean} relativeToA4 Should the octave be relative to A4
     * @return {Number}               The octave
     */
    static calculateOctaveBySteps(steps, relativeToA4 = true) {
        const octave = steps / 12;

        if (relativeToA4) {
            return steps < 0 ? Math.ceil(octave) : Math.floor(octave);
        }

        return (steps < 0 ? Math.ceil(octave) : Math.floor(octave) + 4);
    }

    /**
     * Calculate the note of a given frequency
     * @param  {Number} frequency The frequency of a note
     * @return {String}           The note
     */
    static calculateNoteByFrequency(frequency) {
        return this.calculateNoteBySteps(this.calculateStepsFromFrequency(frequency));
    }

    /**
     * Calculate the octave of a frequency
     * @param  {Number}  frequency    The frequency of an octave
     * @param  {Boolean} relativeToA4 Should the octave be relative to A4
     * @return {Number}               The octave
     */
    static calculateOctaveByFrequency(frequency, relativeToA4 = true) {
        return this.calculateOctaveBySteps(this.calculateStepsFromFrequency(frequency), relativeToA4);
    }
}
