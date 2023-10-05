# musicolors

<img width="797" alt="logo" src="https://github.com/ChungHaLee/musicolors/assets/59073612/d9dc0c54-4235-4061-bee0-f7d80b9d2dd1">

**musicolors** is a javascript music visualization library, using the pitch, energy, and timbral features of the music.
<br><br>
The source of the visualization comes from the user audio, so it is totally up to your sound (*e.g. singing voice to the mic.*) Feel free to try visual effects and see thorugh your sound!
<br><br>

## Installation

```
$ npm i musicolors
```

## Usage


#### Import the Module
```javascript
import musicolors from musicolors
```

#### Initial Step
you need this step when you want to visualize the object for the first time.

```javascript
musicolors.init();
musicolors.createVanilla();
```

#### Music Visualization
you can visualize by three features of music: pitch, energy and timbre.
| pitch | energy | timbre | 
:-------------------------:|:-------------------------:|:-------------------------:|
| <img width="240" height="240" alt="image" src="https://github.com/ChungHaLee/musicolors/assets/59073612/f9594593-19f9-4d9b-928e-1da2b857c651"> |  <img width="240" height="240" alt="image" src="https://github.com/ChungHaLee/musicolors/assets/59073612/2cd0a4f6-f29f-42cc-b5d8-59810937d67b"> | <img width="240" height="240" alt="image" src="https://github.com/ChungHaLee/musicolors/assets/59073612/5e5b8db4-77aa-49e5-bcf5-0f4ca05577e5"> | 

```javascript
// pitch visualization
musicolors.animatePitch();

// energy visualization
musicolors.animateEnergy();

// timbre visualization
musicolors.animateTimbre();
```
more version of visualizations will be updated soon!
