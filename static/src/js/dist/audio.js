/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/audio.js":
/*!*************************!*\
  !*** ./src/js/audio.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"analyser\": () => (/* binding */ analyser),\n/* harmony export */   \"audio\": () => (/* binding */ audio),\n/* harmony export */   \"audio_context\": () => (/* binding */ audio_context),\n/* harmony export */   \"bufferLength\": () => (/* binding */ bufferLength),\n/* harmony export */   \"dataArray\": () => (/* binding */ dataArray),\n/* harmony export */   \"energy\": () => (/* binding */ energy),\n/* harmony export */   \"src\": () => (/* binding */ src)\n/* harmony export */ });\n\n\nlet file, audio, audio_context;\n\nlet analyser, src, bufferLength, dataArray;\nlet chroma, maxChroma, energy, amplitudeSpectrum;\n\n\n// LOAD MUSIC (vizInit)\nfunction FileInit() {\n    file = document.getElementById(\"thefile\");\n    audio = document.getElementById(\"audio\");\n    audio_context = audio_context || new AudioContext();\n  }\n\n\nfunction FileChange(){\n    file.onchange = function(){\n        audio_context.resume();\n\n        audio.load(); //load the new source\n        let files = this.files;\n        audio.src = URL.createObjectURL(files[0]);\n\n        analyser  = audio_context.createAnalyser();\n        src = audio_context.createMediaElementSource(audio)\n\n        audio.volume = 0.4;\n        AnalyzerPlay(audio_context, src);\n\n    }\n}\n\n\n\nfunction AnalyzerPlay(audio_context, src) {\n    analyser = audio_context.createAnalyser();\n    src.connect(analyser);\n\n    analyser.connect(audio_context.destination);\n    analyser.fftSize = 512;\n    bufferLength = analyser.frequencyBinCount;\n    dataArray = new Uint8Array(bufferLength);\n\n    energy = 0;\n\n    const meyda_analyser = Meyda.createMeydaAnalyzer({\n        audioContext: audio_context,\n        source: src,\n        buffersize: 1024,\n        featureExtractors: [\"energy\"],\n        callback: (features) => {\n        \n            energy = features['energy']\n\n            console.log(energy);\n        }\n    })\n    meyda_analyser.start();\n}\n\n\n\nFileInit();\n// audio_context.resume();\nFileChange();\n\n\n\n\n\n//# sourceURL=webpack://music/./src/js/audio.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/audio.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;