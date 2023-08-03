'use strict';
import { PitchDetector } from "pitchy";
import FrequencyMap from "note-frequency-map";

let audioContext, analyser, microphone, javascriptNode
let dataArray, bufferLength, energy, src

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

      console.log(microphone)

    //   canvasContext = $("#canvas")[0].getContext("2d");

      javascriptNode.onaudioprocess = function() {
          var array = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(array);
          var values = 0;
          bufferLength = analyser.frequencyBinCount;
          dataArray = new Uint8Array(bufferLength);


          var length = array.length;
          for (var i = 0; i < length; i++) {
            values += (array[i]);
          }

          var average = values / length;
          energy = average * 0.09


        //   energy = 0;


        // const meyda_analyser = Meyda.createMeydaAnalyzer({

        //     audioContext: audioContext,
        //     source: microphone,
        //     buffersize: 512,
        //     featureExtractors: ["energy"],
        //     callback: (features) => {
        //         energy = features['energy']
        //         console.log('energy', energy)
        //     }
        // })
        // meyda_analyser.start();

        } // end fn stream
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
    console.log('노트', myNote.note);
}



function pitchDetector(){
    const detector = PitchDetector.forFloat32Array(analyser.fftSize);
    const input = new Float32Array(detector.inputLength);
    updatePitch(analyser, detector, input, audioContext.sampleRate);
}







export { audioContext, src, analyser, energy, bufferLength, dataArray, pitchDetector }