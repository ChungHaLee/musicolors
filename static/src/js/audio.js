'use strict';
import { PitchDetector } from "pitchy";
import * as Meyda from "meyda";
import FrequencyMap from "note-frequency-map";

let audioContext, analyser, microphone, javascriptNode
let dataArray, bufferLength, perceptualSpread, 
    spectralFlux, perceptualSharpness, spectralFlatness, spectralKurtosis, src


let energy, roughness, warmth, richness, sharpness
let realpitch;

// source = audioContext.createMediaStreamSource(stream);
// scriptProcessor = audioContext.createScriptProcessor(4096, 1, 1);

// scriptProcessor.onaudioprocess = (event) => {
// const buffer = event.inputBuffer.getChannelData(0);
// // ~_~
// // };

//   source.connect(scriptProcessor);
//   scriptProcessor.connect(audioContext.destination);

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


    //   canvasContext = $("#canvas")[0].getContext("2d");

      javascriptNode.onaudioprocess = function() {
          var array = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(array);
          // var values = 0;
          bufferLength = analyser.frequencyBinCount;
          dataArray = new Uint8Array(bufferLength);



        } // end fn stream
        const meyda_analyser = Meyda.createMeydaAnalyzer({

          audioContext: audioContext,
          source: microphone,
          buffersize: 720,
          featureExtractors: ["energy", "perceptualSpread", "perceptualSharpness", 
                              "spectralFlatness", "spectralKurtosis", "spectralCentroid"],
                              
          callback: (features) => { // mapping rules
              energy = features['energy'] // size
              roughness = features['spectralFlatness']  // perlin noise
              warmth = features['spectralCentroid']     // hue
              richness = features['perceptualSpread']   // saturation
              sharpness = features['perceptualSharpness'] // luminance

            
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
    // console.log(realpitch)

}



function pitchDetector(){
    const detector = PitchDetector.forFloat32Array(analyser.fftSize);
    const input = new Float32Array(detector.inputLength);
    updatePitch(analyser, detector, input, audioContext.sampleRate);
}







export { realpitch, audioContext, src, analyser, energy, roughness, warmth, richness, sharpness, bufferLength, dataArray, pitchDetector }