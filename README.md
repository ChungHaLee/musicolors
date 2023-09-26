# musicolors
musicolors is a javascript music visualization library, which you can use with pitch, energy, and timbre of the music.
The source of the visualization comes from the user audio, so it is totally up to your sound (*e.g*, singing voice to the mic.)
Feel free to try visual effects and see thorugh your

<!-- 
<img width="960" alt="image" src=""> -->


<br>

## Installation

```
$ npm i musicolors
```


<br>

## Usage

#### 0. Initial Stage
you need this step when you want to visualize the object for the first time.

```
$ musicolors.init();
$ musicolors.createVanilla();

```

#### 1. Pitch Visualization
```
$ musicolors.animatePitch();

```


#### 2. Energy Visualization
```
$ musicolors.animateEnergy();

```


#### 3. Timbre Visualization
```
$ musicolors.animateTimbre();

```