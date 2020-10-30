/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scripts/sections/components/component-ingredients.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/scripts/sections/components/component-ingredients.js":
/*!******************************************************************!*\
  !*** ./src/scripts/sections/components/component-ingredients.js ***!
  \******************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_sections_components_component_ingredients_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @styles/sections/components/component-ingredients.scss */ \"./src/styles/sections/components/component-ingredients.scss\");\n/* harmony import */ var _styles_sections_components_component_ingredients_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_sections_components_component_ingredients_scss__WEBPACK_IMPORTED_MODULE_0__);\n\nwindow.addEventListener('DOMContentLoaded', () => {\n  const {\n    tns\n  } = window.Scoutside.vendors;\n\n  if (tns) {\n    const containers = document.querySelectorAll('[data-ingredients]');\n    containers.forEach(container => {\n      const contentSlider = container.querySelector('[data-ingredients-content-slider]');\n      const imageSlider = container.querySelector('[data-ingredients-image-slider]');\n      const imageSliderNext = container.querySelector('[data-ingredients-image-slider-next]');\n      const imageSliderPrev = container.querySelector('[data-ingredients-image-slider-prev]');\n      const content = tns({\n        container: contentSlider,\n        controls: false,\n        loop: false,\n        nav: false,\n        speed: 400,\n        touch: false\n      });\n      const image = tns({\n        container: imageSlider,\n        controls: true,\n        mode: 'gallery',\n        navPosition: 'bottom',\n        navAsThumbnails: true,\n        nextButton: imageSliderNext,\n        prevButton: imageSliderPrev,\n        preventActionWhenRunning: true,\n        preventScrollOnTouch: 'auto',\n        speed: 400\n      });\n      image.events.on('indexChanged', info => {\n        container.style.backgroundColor = info.slideItems[info.displayIndex - 1].getAttribute('data-item-color');\n        content.goTo(info.displayIndex - 1);\n      });\n    });\n  }\n\n  const triggers = document.querySelectorAll('[data-expand-trigger]');\n  triggers.forEach(trigger => {\n    trigger.addEventListener('click', () => {\n      const container = trigger.closest('[data-expand]');\n      container.classList.toggle('expand-active');\n    });\n  });\n});\n\n//# sourceURL=webpack:///./src/scripts/sections/components/component-ingredients.js?");

/***/ }),

/***/ "./src/styles/sections/components/component-ingredients.scss":
/*!*******************************************************************!*\
  !*** ./src/styles/sections/components/component-ingredients.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/styles/sections/components/component-ingredients.scss?");

/***/ })

/******/ });