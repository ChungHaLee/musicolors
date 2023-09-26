# musicolors

<img width="797" alt="logo" src="https://github.com/ChungHaLee/musicolors/assets/59073612/d9dc0c54-4235-4061-bee0-f7d80b9d2dd1">

**musicolors** is a javascript music visualization library, which you can use with pitch, energy, and timbre of the music.
<br><br>
The source of the visualization comes from the user audio, so it is totally up to your sound (*e.g*, singing voice to the mic.) Feel free to try visual effects and see thorugh your sound!
<br><br>

## Installation

```
$ npm i musicolors
```

## Usage

#### Initial Step
you need this step when you want to visualize the object for the first time.

```javascript
musicolors.init();
musicolors.createVanilla();
```

#### Music Visualization
you can visualize by three features of music: pitch, energy and timbre.
```javascript
// pitch visualization
musicolors.animatePitch();

// energy visualization
musicolors.animateEnergy();

// timbre visualization
musicolors.animateTimbre();
```
more version of visualizations will be updated soon!
