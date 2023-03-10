'use strict';
import { PitchDetector } from "pitchy";
import FrequencyMap from "note-frequency-map";



let file, audio
var audio_context;

let analyser, src, bufferLength, dataArray;
let chroma, energy, perceptualSharpness, oneChroma;


const audioButton = document.getElementById('audio');
let chromaArray = new Array();




// LOAD MUSIC (vizInit)
function FileInit() {
    file = document.getElementById("thefile");
    audio = document.getElementById("audio");
    
    audio_context = audio_context || new AudioContext();
    
  }



function istheOne(lst){
    for (let i = 0; i < lst.length; i++){
        if (lst[i] == 1){
            return i
        }
    }
}
    
function FileChange(){
    file.onchange = function(){
        audio.load(); //load the new source
        let files = this.files;
        audio.src = URL.createObjectURL(files[0]);
        analyser  = audio_context.createAnalyser();
        src = audio_context.createMediaElementSource(audio)

        audio.volume = 0.4;
        AnalyzerPlay(audio_context, src);
        
}}

function updatePitch(analyser, detector, input, sampleRate) {
    analyser.getFloatTimeDomainData(input);
    let [pitch, clarity] = detector.findPitch(input, sampleRate);
    let myNote = FrequencyMap.noteFromFreq(pitch);
    console.log(myNote.note);
}



function pitchDetector(){
    const detector = PitchDetector.forFloat32Array(analyser.fftSize);
    const input = new Float32Array(detector.inputLength);
    updatePitch(analyser, detector, input, audio_context.sampleRate);
}



function AnalyzerPlay(audio_context, src) {
    analyser = audio_context.createAnalyser();
    src.connect(analyser);

    analyser.connect(audio_context.destination);
    analyser.fftSize = 512;
    
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);



    const meyda_analyser = Meyda.createMeydaAnalyzer({
        audioContext: audio_context,
        source: src,
        buffersize: 256,
        featureExtractors: ["energy", "chroma", "perceptualSharpness"],
        callback: (features) => {
            chroma = features['chroma']
            energy = features['energy']
            oneChroma = istheOne(chroma)
            perceptualSharpness = features['perceptualSharpness']

            let audioJson = {
                timestamp: audioButton.currentTime,
                chroma: oneChroma
            }
            let stringfied = audioJson;
            if (audioButton.currentTime != audioButton.duration && audioButton.currentTime != 0){
                chromaArray.push(stringfied)
            } else {
                localStorage.setItem("audioJsonData", JSON.stringify(chromaArray));
            }
        }
    })
    meyda_analyser.start();
}



FileInit();
FileChange();


export { audio, audio_context, src, analyser, energy, bufferLength, dataArray,  pitchDetector }