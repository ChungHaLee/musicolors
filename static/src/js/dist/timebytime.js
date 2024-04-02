/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/timebytime.js":
/*!******************************!*\
  !*** ./src/js/timebytime.js ***!
  \******************************/
/***/ (() => {

eval("const colors = {\n    morning: \"linear-gradient(90deg, rgba(255,253,227,1) 0%, #ff912c 100%)\",\n    afternoon: \"linear-gradient(90deg, rgba(248,194,224,1) 0%, rgba(194,233,251,1) 100%)\",\n    evening: \"linear-gradient(90deg, rgba(0,55,241,1) 0%, rgba(255,73,111,1) 100%)\",\n    night: \"linear-gradient(90deg, rgba(255,248,239,1) 0%, rgba(73,51,109,1) 100%)\"\n};\n\nfunction updateBackground() {\n    const now = new Date();\n    const hours = now.getHours();\n    console.log(hours)\n    document.body.style.background = hours >= 6 && hours < 12 ? colors.morning :\n                                     hours >= 12 && hours < 17 ? colors.afternoon :\n                                     hours >= 17 && hours < 22 ? colors.evening :\n                                     colors.night;\n    document.body.style.backgroundSize = \"1600% 1600%\";\n    document.body.style.animation = \"gradient 15s ease infinite\";\n}\n\nwindow.onload = updateBackground;\n\n\n//# sourceURL=webpack://musicolors/./src/js/timebytime.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/timebytime.js"]();
/******/ 	
/******/ })()
;