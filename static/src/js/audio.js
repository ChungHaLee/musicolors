'use strict';

let file, audio, audio_context;

let analyser, src, bufferLength, dataArray;
let chroma, maxChroma, energy, amplitudeSpectrum;


// LOAD MUSIC (vizInit)
function FileInit() {
    file = document.getElementById("thefile");
    audio = document.getElementById("audio");
    audio_context = audio_context || new AudioContext();
  }


function FileChange(){
    file.onchange = function(){
        audio_context.resume();

        audio.load(); //load the new source
        let files = this.files;
        audio.src = URL.createObjectURL(files[0]);

        analyser  = audio_context.createAnalyser();
        src = audio_context.createMediaElementSource(audio)

        audio.volume = 0.4;
        AnalyzerPlay(audio_context, src);

    }
}



function AnalyzerPlay(audio_context, src) {
    analyser = audio_context.createAnalyser();
    src.connect(analyser);

    analyser.connect(audio_context.destination);
    analyser.fftSize = 512;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    energy = 0;

    const meyda_analyser = Meyda.createMeydaAnalyzer({
        audioContext: audio_context,
        source: src,
        buffersize: 1024,
        featureExtractors: ["energy"],
        callback: (features) => {
        
            energy = features['energy']

            console.log(energy);
        }
    })
    meyda_analyser.start();
}



FileInit();
// audio_context.resume();
FileChange();



export { audio, audio_context, src, analyser, energy, bufferLength, dataArray  }