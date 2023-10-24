// Import necessary dependencies
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Noise } from 'noisejs';
import Meyda from 'meyda';
import FrequencyMap from 'note-frequency-map';
import { PitchDetector } from 'pitchy';

// Import functions and values from audio.js and colors.js
import {
  audioContext,
  analyser,
  energy,
  roughness,
  warmth,
  richness,
  sharpness,
  bufferLength,
  dataArray,
  pitchDetector,
  realpitch,
  realoctave,
} from './src/js/audio';

import {
  HSLToHex,
  getColorByPitch,
  init,
  render,
  deleteBasics,
  createVanilla,
  applyPitch,
  applyEnergy,
  applyTimbre,
  animatePitch,
  animateEnergy,
  animateTimbre,
  update
} from './src/js/colors';



// Define your JavaScript API module
const musicolors = {
  // Exported functions or properties
  init: init,
  createVanilla: createVanilla,
  applyPitch: applyPitch,
  applyEnergy: applyEnergy,
  applyTimbre: applyTimbre,
  render: render,
  deleteBasics: deleteBasics,

  // Exported variables or constants
  audioContext: audioContext,
  analyser: analyser,
  energy: energy,
  roughness: roughness,
  warmth: warmth,
  richness: richness,
  sharpness: sharpness,
  realpitch: realpitch,
  realoctave: realoctave,
  bufferLength: bufferLength,
  dataArray: dataArray,
  pitchDetector: pitchDetector,
  update: update,
  animatePitch: animatePitch,
  animateEnergy: animateEnergy,
  animateTimbre: animateTimbre

};

export default musicolors;
