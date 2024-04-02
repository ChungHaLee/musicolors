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

/***/ "./src/js/timebytime.js":
/*!******************************!*\
  !*** ./src/js/timebytime.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   colors: () => (/* binding */ colors),\n/* harmony export */   updateBackground: () => (/* binding */ updateBackground)\n/* harmony export */ });\n// src/js/timebytime.js 파일 내에 배경 변경 로직을 모듈화합니다.\nconst colors = {\n    morning: \"linear-gradient(90deg, rgba(255,253,227,1) 0%, #ff912c 100%)\",\n    afternoon: \"linear-gradient(90deg, rgba(248,194,224,1) 0%, rgba(194,233,251,1) 100%)\",\n    evening: \"linear-gradient(90deg, rgba(0,55,241,1) 0%, rgba(255,73,111,1) 100%)\",\n    night: \"linear-gradient(90deg, rgba(255,248,239,1) 0%, rgba(73,51,109,1) 100%)\"\n};\n\nfunction updateBackground() {\n    // 여기에 window 객체나 document 객체 사용하는 부분을 조건부로 처리하거나, 이를 대체할 수 있는 방법을 고려해야 합니다.\n    // 예를 들어, Node.js 환경에서는 window 객체가 기본적으로 존재하지 않습니다.\n    const now = new Date();\n    const hours = now.getHours();\n    let background = hours >= 6 && hours < 12 ? colors.morning :\n                     hours >= 12 && hours < 17 ? colors.afternoon :\n                     hours >= 17 && hours < 22 ? colors.evening :\n                     colors.night;\n\n    // 배경 업데이트 로직을 환경에 따라 조건부로 실행\n    if (typeof document !== 'undefined') {\n        document.body.style.background = background;\n        document.body.style.backgroundSize = \"1600% 1600%\";\n        document.body.style.animation = \"gradient 15s ease infinite\";\n    } else {\n        // Node.js 환경이나 document 객체가 없는 경우에 대한 처리\n        console.log(\"updateBackground 함수는 브라우저 환경에서만 사용할 수 있습니다.\");\n    }\n}\n\n\nwindow.onload = updateBackground;\n\n\n//# sourceURL=webpack://musicolors/./src/js/timebytime.js?");

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
/******/ 	__webpack_modules__["./src/js/timebytime.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;