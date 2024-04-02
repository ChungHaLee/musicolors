# musicolors

<img width="797" alt="logo" src="https://github.com/ChungHaLee/musicolors/assets/59073612/d9dc0c54-4235-4061-bee0-f7d80b9d2dd1">

**musicolors** is a javascript music visualization library, using the pitch, energy, and timbral features of the music.
<br><br>
The source of the visualization comes from the user audio, so it is totally up to your sound (*e.g. singing voice to the mic.*) Feel free to try visual effects and see thorugh your sound!
<br><br>
DEMO Page: http://www.musicolors.art/
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


#### Music Visualization
you can visualize by three features of music: pitch, energy and timbre.
| pitch | energy | timbre | 
:-------------------------:|:-------------------------:|:-------------------------:|
| <img width="300" height="300" alt="image" src="https://github.com/ChungHaLee/musicolors/assets/59073612/f9594593-19f9-4d9b-928e-1da2b857c651"> |  <img width="300" height="300" alt="image" src="https://github.com/ChungHaLee/musicolors/assets/59073612/2cd0a4f6-f29f-42cc-b5d8-59810937d67b"> | <img width="300" height="300" alt="image" src="https://github.com/ChungHaLee/musicolors/assets/59073612/1a7e2e77-f1a4-4d6e-bbd4-3d3e703a10bc"> | 

```javascript
// pitch visualization
musicolors.animatePitch();

// energy visualization
musicolors.animateEnergy();

// timbre visualization
musicolors.animateTimbre();
```

#### Dynamic Background
now you can also see the dynamic changing background based your time zone.
<br>
check out the visuals of changing dynamically with the specific time of the day.
<br>

```javascript
// changes the background by the time, this only works in the browser settings.
musicolors.updateBackground();
```

| morning | afternoon | evening | night |
:-------------------------:|:-------------------------:|:-------------------------:|:-------------------------:|
| <img width="225" height="225" alt="image" src="https://github.com/ChungHaLee/musicolors/assets/59073612/c1c11986-edd1-48b0-b1e6-8b364aa9bf08"> |  <img width="225" height="225" alt="image" src="https://github.com/ChungHaLee/musicolors/assets/59073612/51317d15-4059-4931-a37b-04f7833367f8"> | <img width="225" height="225" alt="image" src="https://github.com/ChungHaLee/musicolors/assets/59073612/fab0e085-f779-448a-9eef-63ab8f5a0bd7"> | <img width="225" height="225" alt="image" src="https://github.com/ChungHaLee/musicolors/assets/59073612/36f0377e-eae2-49e9-a5f0-913cdb8db61f"> | 
