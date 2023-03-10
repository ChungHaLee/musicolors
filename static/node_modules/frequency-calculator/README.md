# Frequency calculator

This is a small library to convert frequencies to steps, notes and octaves.

To use this library, get the files with NPM or bower:
```
npm install frequency-calculator
```
or
```
bower install frequency-calculator
```

Once installed you can import the the library:
```javascript
import FrequencyCalculator from 'frequency-calculator';
```

## calculateSteps
You can calculate the number of half steps between the base note (A4) and a given note:
```javascript
FrequencyCalculator.calculateSteps('G', 4) // -> -2;
```

## calculateFrequencyByNote
Once imported you can calculate the frequency of a note by supplying the note name and octave:
```javascript
FrequencyCalculator.calculateFrequencyByNote('C', 0) // -> 16.35Hz;
```

## calculateFrequencyByStep
If you know the number of half steps, you can also calculate the frequency based on these steps, this can be a negative number if the note is below the base note (A4):
```javascript
FrequencyCalculator.calculateFrequencyByStep(-12) // -> 220.00Hz;
```

## calculateStepsFromFrequency
You calculate the amount of half steps between a frequency and A4 (440Hz). If you want to round the steps, you can add `true` as the second parameter:
```javascript
FrequencyCalculator.calculateStepsFromFrequency(415.30) // -> -1.0001958238467235;
```

or

```javascript
FrequencyCalculator.calculateStepsFromFrequency(415.30, true) // -> -1;
```

## calculateNoteBySteps
You can calculate a note based on the the distance in half steps of A4:
```javascript
FrequencyCalculator.calculateNoteBySteps(-12) // -> A;
```

## calculateOctaveBySteps
You can calculate an octave based on the the distance in half steps of A4, if you don't want the octave to be relative to A4, add `false` as the second parameter:
```javascript
FrequencyCalculator.calculateOctaveBySteps(-12); // -> -1
```

or

```javascript
FrequencyCalculator.calculateOctaveBySteps(-12, false); // -> -3
```

## calculateNoteByFrequency
You can calculate the note of a frequency:
```javascript
FrequencyCalculator.calculateNoteByFrequency(440); // -> A
```

## calculateOctaveByFrequency
You can calculate the octave of a frequency. If you don't want the octave to be relative to A4, add `false` as the second parameter:
```javascript
FrequencyCalculator.calculateOctaveByFrequency(440); // -> 0
```

or

```javascript
FrequencyCalculator.calculateOctaveByFrequency(440, false); // -> 4
```

## TODO
- [ ] Write tests
- [ ] Create a demo

## The MIT License (MIT)
Copyright © 2016 Sam Bellen

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
