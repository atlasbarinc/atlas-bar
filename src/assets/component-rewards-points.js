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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scripts/sections/components/component-rewards-points.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/scripts/sections/components/component-rewards-points.js":
/*!*********************************************************************!*\
  !*** ./src/scripts/sections/components/component-rewards-points.js ***!
  \*********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_sections_components_component_rewards_points_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @styles/sections/components/component-rewards-points.scss */ \"./src/styles/sections/components/component-rewards-points.scss\");\n/* harmony import */ var _styles_sections_components_component_rewards_points_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_sections_components_component_rewards_points_scss__WEBPACK_IMPORTED_MODULE_0__);\n\nwindow.addEventListener('DOMContentLoaded', () => {\n  const container = document.querySelector('[data-lion-rules-list]');\n  if (!container) return;\n  const config = {\n    subtree: true,\n    childList: true\n  };\n  const llObserver = new MutationObserver(mutationsList => {\n    mutationsList.forEach(mutation => {\n      if (mutation.type === 'childList') {\n        const rulesButtons = document.querySelector('#rulesButtons');\n        if (!rulesButtons) return;\n        const json = JSON.parse(rulesButtons.innerHTML);\n        if (!json.buttons.length) return;\n        json.buttons.forEach(button => {\n          const rule = container.querySelector('.lion-rules-list').children[button.index];\n          if (rule.classList.contains('lion-rule-item--completed-forever')) return;\n          if (rule.querySelector('.lion-action-button')) return;\n          const link = document.createElement('a');\n          link.href = button.link;\n          link.target = \"_blank\";\n          const div = document.createElement('div');\n          div.setAttribute('class', 'lion-action-button lion-action-button--tile lion-rule-item__button');\n          div.setAttribute('data-testid', 'rule-item-button');\n          div.innerText = button.label;\n          link.appendChild(div);\n          rule.querySelector('.lion-rule-item__content').appendChild(link);\n        });\n      }\n    });\n  });\n  llObserver.observe(container, config);\n});\n\n//# sourceURL=webpack:///./src/scripts/sections/components/component-rewards-points.js?");

/***/ }),

/***/ "./src/styles/sections/components/component-rewards-points.scss":
/*!**********************************************************************!*\
  !*** ./src/styles/sections/components/component-rewards-points.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/styles/sections/components/component-rewards-points.scss?");

/***/ })

/******/ });