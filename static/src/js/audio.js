'use strict';
import { PitchDetector } from "pitchy";
import * as Meyda from "meyda";
import FrequencyMap from "note-frequency-map";

let audioContext, analyser, microphone, javascriptNode
let dataArray, bufferLength, perceptualSpread, 
    spectralFlux, perceptualSharpness, spectralFlatness, spectralKurtosis, src


let energy, roughness, warmth, richness, sharpness, kurtosis;
let realpitch, realoctave


navigator.getUserMedia = navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia;



if (navigator.getUserMedia) {
  navigator.getUserMedia({
      audio: true
    },
    function(stream) {
      audioContext = new AudioContext();
      analyser = audioContext.createAnalyser();
      microphone = audioContext.createMediaStreamSource(stream);

      javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

      analyser.smoothingTimeConstant = 0.8;
      analyser.fftSize = 1024;

      microphone.connect(analyser);
      analyser.connect(javascriptNode);
      javascriptNode.connect(audioContext.destination);

      javascriptNode.onaudioprocess = function() {
          var array = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(array);

          bufferLength = analyser.frequencyBinCount;
          dataArray = new Uint8Array(bufferLength);
          // pitchDetector();


        } // end fn stream
        const meyda_analyser = Meyda.createMeydaAnalyzer({

          audioContext: audioContext,
          source: microphone,
          buffersize: 512,
          featureExtractors: ["energy", "perceptualSpread", "perceptualSharpness", 
                              "spectralFlatness", "spectralKurtosis", "spectralCentroid"],
                              
          callback: (features) => { // mapping rules
              energy = features['energy'] // size
              roughness = features['spectralFlatness']  // perlin noise
              warmth = features['spectralCentroid']     // hue
              richness = features['perceptualSpread']   // saturation
              sharpness = features['perceptualSharpness'] // luminance
              kurtosis = features['spectralKurtosis']
          }
      })
      meyda_analyser.start();
    },
    function(err) {
      console.log("The following error occured: " + err.name)
    });

} else {
  console.log("getUserMedia not supported");
}




function updatePitch(analyser, detector, input, sampleRate) {
    analyser.getFloatTimeDomainData(input);
    let [pitch, clarity] = detector.findPitch(input, sampleRate);
    let myNote = FrequencyMap.noteFromFreq(pitch);
    realpitch = myNote.name
    realoctave = myNote.octave
}


function pitchDetector(){
    const detector = PitchDetector.forFloat32Array(analyser.fftSize);
    const input = new Float32Array(detector.inputLength);
    updatePitch(analyser, detector, input, audioContext.sampleRate);
}





export { realpitch, realoctave, audioContext, src, analyser, energy, roughness, warmth, richness, sharpness, kurtosis, bufferLength, dataArray, pitchDetector }