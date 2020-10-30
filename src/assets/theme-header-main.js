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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scripts/sections/theme/theme-header-main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/scripts/sections/theme/theme-header-main.js":
/*!*********************************************************!*\
  !*** ./src/scripts/sections/theme/theme-header-main.js ***!
  \*********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_sections_theme_theme_header_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @styles/sections/theme/theme-header-main.scss */ \"./src/styles/sections/theme/theme-header-main.scss\");\n/* harmony import */ var _styles_sections_theme_theme_header_main_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_sections_theme_theme_header_main_scss__WEBPACK_IMPORTED_MODULE_0__);\n\nwindow.addEventListener('DOMContentLoaded', () => {\n  const mobileButton = document.querySelector('[data-header-mobile]');\n  const mobileMenu = document.querySelector('[data-header-mobile-menu]');\n  const shopButton = document.querySelector('[data-header-shop]');\n  const shopMenu = document.querySelector('[data-header-shop-menu]');\n  const header = document.querySelector('[data-header]');\n  const body = document.querySelector('[data-body]');\n\n  const openSubMenu = () => {\n    shopButton.classList.add('isActive');\n    shopMenu.classList.add('isActive');\n    shopMenu.setAttribute('aria-hidden', false);\n  };\n\n  const closeSubMenu = () => {\n    shopButton.classList.remove('isActive');\n    shopMenu.classList.remove('isActive');\n    shopMenu.setAttribute('aria-hidden', true);\n  };\n\n  mobileButton.addEventListener('click', event => {\n    if (mobileMenu.classList.contains('isActive')) {\n      body.classList.remove('o-body--noScroll');\n    } else {\n      body.classList.add('o-body--noScroll');\n    }\n\n    mobileMenu.classList.toggle('isActive');\n    mobileButton.classList.toggle('isActive');\n  });\n\n  if (shopButton) {\n    shopButton.addEventListener('mouseenter', event => {\n      openSubMenu();\n    });\n    shopButton.addEventListener('focus', event => {\n      openSubMenu();\n    });\n    shopButton.addEventListener('click', event => {\n      event.preventDefault();\n    });\n    header.addEventListener('mouseleave', event => {\n      closeSubMenu();\n    });\n  }\n\n  let scrollPosition = window.scrollY;\n  window.addEventListener('scroll', event => {\n    if (window.scrollY > header.offsetHeight && !header.classList.contains('c-header--isSticky')) {\n      header.classList.add('c-header--isHidden');\n      setTimeout(() => {\n        header.classList.add('c-header--isSticky');\n      }, 100);\n    }\n\n    if (window.scrollY <= 0) {\n      header.classList.remove('c-header--isSticky');\n      header.classList.remove('c-header--isHidden');\n    }\n\n    if (header.classList.contains('c-header--isSticky')) {\n      if (scrollPosition > window.scrollY) {\n        header.classList.remove('c-header--isHidden');\n      } else {\n        header.classList.add('c-header--isHidden');\n      }\n    }\n\n    scrollPosition = window.scrollY;\n  });\n});\n\n//# sourceURL=webpack:///./src/scripts/sections/theme/theme-header-main.js?");

/***/ }),

/***/ "./src/styles/sections/theme/theme-header-main.scss":
/*!**********************************************************!*\
  !*** ./src/styles/sections/theme/theme-header-main.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/styles/sections/theme/theme-header-main.scss?");

/***/ })

/******/ });