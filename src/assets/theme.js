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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scripts/theme.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/cookie/index.js":
/*!**************************************!*\
  !*** ./node_modules/cookie/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*!\n * cookie\n * Copyright(c) 2012-2014 Roman Shtylman\n * Copyright(c) 2015 Douglas Christopher Wilson\n * MIT Licensed\n */\n\n\n\n/**\n * Module exports.\n * @public\n */\n\nexports.parse = parse;\nexports.serialize = serialize;\n\n/**\n * Module variables.\n * @private\n */\n\nvar decode = decodeURIComponent;\nvar encode = encodeURIComponent;\nvar pairSplitRegExp = /; */;\n\n/**\n * RegExp to match field-content in RFC 7230 sec 3.2\n *\n * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]\n * field-vchar   = VCHAR / obs-text\n * obs-text      = %x80-FF\n */\n\nvar fieldContentRegExp = /^[\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+$/;\n\n/**\n * Parse a cookie header.\n *\n * Parse the given cookie header string into an object\n * The object has the various cookies as keys(names) => values\n *\n * @param {string} str\n * @param {object} [options]\n * @return {object}\n * @public\n */\n\nfunction parse(str, options) {\n  if (typeof str !== 'string') {\n    throw new TypeError('argument str must be a string');\n  }\n\n  var obj = {}\n  var opt = options || {};\n  var pairs = str.split(pairSplitRegExp);\n  var dec = opt.decode || decode;\n\n  for (var i = 0; i < pairs.length; i++) {\n    var pair = pairs[i];\n    var eq_idx = pair.indexOf('=');\n\n    // skip things that don't look like key=value\n    if (eq_idx < 0) {\n      continue;\n    }\n\n    var key = pair.substr(0, eq_idx).trim()\n    var val = pair.substr(++eq_idx, pair.length).trim();\n\n    // quoted values\n    if ('\"' == val[0]) {\n      val = val.slice(1, -1);\n    }\n\n    // only assign once\n    if (undefined == obj[key]) {\n      obj[key] = tryDecode(val, dec);\n    }\n  }\n\n  return obj;\n}\n\n/**\n * Serialize data into a cookie header.\n *\n * Serialize the a name value pair into a cookie string suitable for\n * http headers. An optional options object specified cookie parameters.\n *\n * serialize('foo', 'bar', { httpOnly: true })\n *   => \"foo=bar; httpOnly\"\n *\n * @param {string} name\n * @param {string} val\n * @param {object} [options]\n * @return {string}\n * @public\n */\n\nfunction serialize(name, val, options) {\n  var opt = options || {};\n  var enc = opt.encode || encode;\n\n  if (typeof enc !== 'function') {\n    throw new TypeError('option encode is invalid');\n  }\n\n  if (!fieldContentRegExp.test(name)) {\n    throw new TypeError('argument name is invalid');\n  }\n\n  var value = enc(val);\n\n  if (value && !fieldContentRegExp.test(value)) {\n    throw new TypeError('argument val is invalid');\n  }\n\n  var str = name + '=' + value;\n\n  if (null != opt.maxAge) {\n    var maxAge = opt.maxAge - 0;\n    if (isNaN(maxAge)) throw new Error('maxAge should be a Number');\n    str += '; Max-Age=' + Math.floor(maxAge);\n  }\n\n  if (opt.domain) {\n    if (!fieldContentRegExp.test(opt.domain)) {\n      throw new TypeError('option domain is invalid');\n    }\n\n    str += '; Domain=' + opt.domain;\n  }\n\n  if (opt.path) {\n    if (!fieldContentRegExp.test(opt.path)) {\n      throw new TypeError('option path is invalid');\n    }\n\n    str += '; Path=' + opt.path;\n  }\n\n  if (opt.expires) {\n    if (typeof opt.expires.toUTCString !== 'function') {\n      throw new TypeError('option expires is invalid');\n    }\n\n    str += '; Expires=' + opt.expires.toUTCString();\n  }\n\n  if (opt.httpOnly) {\n    str += '; HttpOnly';\n  }\n\n  if (opt.secure) {\n    str += '; Secure';\n  }\n\n  if (opt.sameSite) {\n    var sameSite = typeof opt.sameSite === 'string'\n      ? opt.sameSite.toLowerCase() : opt.sameSite;\n\n    switch (sameSite) {\n      case true:\n        str += '; SameSite=Strict';\n        break;\n      case 'lax':\n        str += '; SameSite=Lax';\n        break;\n      case 'strict':\n        str += '; SameSite=Strict';\n        break;\n      case 'none':\n        str += '; SameSite=None';\n        break;\n      default:\n        throw new TypeError('option sameSite is invalid');\n    }\n  }\n\n  return str;\n}\n\n/**\n * Try decoding a string using a decoding function.\n *\n * @param {string} str\n * @param {function} decode\n * @private\n */\n\nfunction tryDecode(str, decode) {\n  try {\n    return decode(str);\n  } catch (e) {\n    return str;\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/cookie/index.js?");

/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*\nobject-assign\n(c) Sindre Sorhus\n@license MIT\n*/\n\n\n/* eslint-disable no-unused-vars */\nvar getOwnPropertySymbols = Object.getOwnPropertySymbols;\nvar hasOwnProperty = Object.prototype.hasOwnProperty;\nvar propIsEnumerable = Object.prototype.propertyIsEnumerable;\n\nfunction toObject(val) {\n\tif (val === null || val === undefined) {\n\t\tthrow new TypeError('Object.assign cannot be called with null or undefined');\n\t}\n\n\treturn Object(val);\n}\n\nfunction shouldUseNative() {\n\ttry {\n\t\tif (!Object.assign) {\n\t\t\treturn false;\n\t\t}\n\n\t\t// Detect buggy property enumeration order in older V8 versions.\n\n\t\t// https://bugs.chromium.org/p/v8/issues/detail?id=4118\n\t\tvar test1 = new String('abc');  // eslint-disable-line no-new-wrappers\n\t\ttest1[5] = 'de';\n\t\tif (Object.getOwnPropertyNames(test1)[0] === '5') {\n\t\t\treturn false;\n\t\t}\n\n\t\t// https://bugs.chromium.org/p/v8/issues/detail?id=3056\n\t\tvar test2 = {};\n\t\tfor (var i = 0; i < 10; i++) {\n\t\t\ttest2['_' + String.fromCharCode(i)] = i;\n\t\t}\n\t\tvar order2 = Object.getOwnPropertyNames(test2).map(function (n) {\n\t\t\treturn test2[n];\n\t\t});\n\t\tif (order2.join('') !== '0123456789') {\n\t\t\treturn false;\n\t\t}\n\n\t\t// https://bugs.chromium.org/p/v8/issues/detail?id=3056\n\t\tvar test3 = {};\n\t\t'abcdefghijklmnopqrst'.split('').forEach(function (letter) {\n\t\t\ttest3[letter] = letter;\n\t\t});\n\t\tif (Object.keys(Object.assign({}, test3)).join('') !==\n\t\t\t\t'abcdefghijklmnopqrst') {\n\t\t\treturn false;\n\t\t}\n\n\t\treturn true;\n\t} catch (err) {\n\t\t// We don't expect any of the above to throw, but better to be safe.\n\t\treturn false;\n\t}\n}\n\nmodule.exports = shouldUseNative() ? Object.assign : function (target, source) {\n\tvar from;\n\tvar to = toObject(target);\n\tvar symbols;\n\n\tfor (var s = 1; s < arguments.length; s++) {\n\t\tfrom = Object(arguments[s]);\n\n\t\tfor (var key in from) {\n\t\t\tif (hasOwnProperty.call(from, key)) {\n\t\t\t\tto[key] = from[key];\n\t\t\t}\n\t\t}\n\n\t\tif (getOwnPropertySymbols) {\n\t\t\tsymbols = getOwnPropertySymbols(from);\n\t\t\tfor (var i = 0; i < symbols.length; i++) {\n\t\t\t\tif (propIsEnumerable.call(from, symbols[i])) {\n\t\t\t\t\tto[symbols[i]] = from[symbols[i]];\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\treturn to;\n};\n\n\n//# sourceURL=webpack:///./node_modules/object-assign/index.js?");

/***/ }),

/***/ "./node_modules/universal-cookie/es6/Cookies.js":
/*!******************************************************!*\
  !*** ./node_modules/universal-cookie/es6/Cookies.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cookie */ \"./node_modules/cookie/index.js\");\n/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cookie__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ \"./node_modules/universal-cookie/es6/utils.js\");\n\r\n\r\n// We can't please Rollup and TypeScript at the same time\r\n// Only way to make both of them work\r\nvar objectAssign = __webpack_require__(/*! object-assign */ \"./node_modules/object-assign/index.js\");\r\nvar Cookies = /** @class */ (function () {\r\n    function Cookies(cookies, options) {\r\n        var _this = this;\r\n        this.changeListeners = [];\r\n        this.HAS_DOCUMENT_COOKIE = false;\r\n        this.cookies = Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"parseCookies\"])(cookies, options);\r\n        new Promise(function () {\r\n            _this.HAS_DOCUMENT_COOKIE = Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"hasDocumentCookie\"])();\r\n        }).catch(function () { });\r\n    }\r\n    Cookies.prototype._updateBrowserValues = function (parseOptions) {\r\n        if (!this.HAS_DOCUMENT_COOKIE) {\r\n            return;\r\n        }\r\n        this.cookies = cookie__WEBPACK_IMPORTED_MODULE_0__[\"parse\"](document.cookie, parseOptions);\r\n    };\r\n    Cookies.prototype._emitChange = function (params) {\r\n        for (var i = 0; i < this.changeListeners.length; ++i) {\r\n            this.changeListeners[i](params);\r\n        }\r\n    };\r\n    Cookies.prototype.get = function (name, options, parseOptions) {\r\n        if (options === void 0) { options = {}; }\r\n        this._updateBrowserValues(parseOptions);\r\n        return Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"readCookie\"])(this.cookies[name], options);\r\n    };\r\n    Cookies.prototype.getAll = function (options, parseOptions) {\r\n        if (options === void 0) { options = {}; }\r\n        this._updateBrowserValues(parseOptions);\r\n        var result = {};\r\n        for (var name_1 in this.cookies) {\r\n            result[name_1] = Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"readCookie\"])(this.cookies[name_1], options);\r\n        }\r\n        return result;\r\n    };\r\n    Cookies.prototype.set = function (name, value, options) {\r\n        var _a;\r\n        if (typeof value === 'object') {\r\n            value = JSON.stringify(value);\r\n        }\r\n        this.cookies = objectAssign({}, this.cookies, (_a = {}, _a[name] = value, _a));\r\n        if (this.HAS_DOCUMENT_COOKIE) {\r\n            document.cookie = cookie__WEBPACK_IMPORTED_MODULE_0__[\"serialize\"](name, value, options);\r\n        }\r\n        this._emitChange({ name: name, value: value, options: options });\r\n    };\r\n    Cookies.prototype.remove = function (name, options) {\r\n        var finalOptions = (options = objectAssign({}, options, {\r\n            expires: new Date(1970, 1, 1, 0, 0, 1),\r\n            maxAge: 0\r\n        }));\r\n        this.cookies = objectAssign({}, this.cookies);\r\n        delete this.cookies[name];\r\n        if (this.HAS_DOCUMENT_COOKIE) {\r\n            document.cookie = cookie__WEBPACK_IMPORTED_MODULE_0__[\"serialize\"](name, '', finalOptions);\r\n        }\r\n        this._emitChange({ name: name, value: undefined, options: options });\r\n    };\r\n    Cookies.prototype.addChangeListener = function (callback) {\r\n        this.changeListeners.push(callback);\r\n    };\r\n    Cookies.prototype.removeChangeListener = function (callback) {\r\n        var idx = this.changeListeners.indexOf(callback);\r\n        if (idx >= 0) {\r\n            this.changeListeners.splice(idx, 1);\r\n        }\r\n    };\r\n    return Cookies;\r\n}());\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Cookies);\r\n\n\n//# sourceURL=webpack:///./node_modules/universal-cookie/es6/Cookies.js?");

/***/ }),

/***/ "./node_modules/universal-cookie/es6/index.js":
/*!****************************************************!*\
  !*** ./node_modules/universal-cookie/es6/index.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Cookies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Cookies */ \"./node_modules/universal-cookie/es6/Cookies.js\");\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (_Cookies__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\r\n\n\n//# sourceURL=webpack:///./node_modules/universal-cookie/es6/index.js?");

/***/ }),

/***/ "./node_modules/universal-cookie/es6/utils.js":
/*!****************************************************!*\
  !*** ./node_modules/universal-cookie/es6/utils.js ***!
  \****************************************************/
/*! exports provided: hasDocumentCookie, cleanCookies, parseCookies, isParsingCookie, readCookie */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hasDocumentCookie\", function() { return hasDocumentCookie; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cleanCookies\", function() { return cleanCookies; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"parseCookies\", function() { return parseCookies; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isParsingCookie\", function() { return isParsingCookie; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"readCookie\", function() { return readCookie; });\n/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cookie */ \"./node_modules/cookie/index.js\");\n/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cookie__WEBPACK_IMPORTED_MODULE_0__);\n\r\nfunction hasDocumentCookie() {\r\n    // Can we get/set cookies on document.cookie?\r\n    return typeof document === 'object' && typeof document.cookie === 'string';\r\n}\r\nfunction cleanCookies() {\r\n    document.cookie.split(';').forEach(function (c) {\r\n        document.cookie = c\r\n            .replace(/^ +/, '')\r\n            .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');\r\n    });\r\n}\r\nfunction parseCookies(cookies, options) {\r\n    if (typeof cookies === 'string') {\r\n        return cookie__WEBPACK_IMPORTED_MODULE_0__[\"parse\"](cookies, options);\r\n    }\r\n    else if (typeof cookies === 'object' && cookies !== null) {\r\n        return cookies;\r\n    }\r\n    else {\r\n        return {};\r\n    }\r\n}\r\nfunction isParsingCookie(value, doNotParse) {\r\n    if (typeof doNotParse === 'undefined') {\r\n        // We guess if the cookie start with { or [, it has been serialized\r\n        doNotParse =\r\n            !value || (value[0] !== '{' && value[0] !== '[' && value[0] !== '\"');\r\n    }\r\n    return !doNotParse;\r\n}\r\nfunction readCookie(value, options) {\r\n    if (options === void 0) { options = {}; }\r\n    var cleanValue = cleanupCookieValue(value);\r\n    if (isParsingCookie(cleanValue, options.doNotParse)) {\r\n        try {\r\n            return JSON.parse(cleanValue);\r\n        }\r\n        catch (e) {\r\n            // At least we tried\r\n        }\r\n    }\r\n    // Ignore clean value if we failed the deserialization\r\n    // It is not relevant anymore to trim those values\r\n    return value;\r\n}\r\nfunction cleanupCookieValue(value) {\r\n    // express prepend j: before serializing a cookie\r\n    if (value && value[0] === 'j' && value[1] === ':') {\r\n        return value.substr(2);\r\n    }\r\n    return value;\r\n}\r\n\n\n//# sourceURL=webpack:///./node_modules/universal-cookie/es6/utils.js?");

/***/ }),

/***/ "./src/scripts/theme.js":
/*!******************************!*\
  !*** ./src/scripts/theme.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @scripts/utils */ \"./src/scripts/utils/index.js\");\n/* harmony import */ var _styles_theme_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @styles/theme.scss */ \"./src/styles/theme.scss\");\n/* harmony import */ var _styles_theme_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_theme_scss__WEBPACK_IMPORTED_MODULE_1__);\n//  Import all theme scripts here\n\nwindow.addEventListener('DOMContentLoaded', () => {\n  Object(_scripts_utils__WEBPACK_IMPORTED_MODULE_0__[\"_lightBox\"])();\n}); //  Import all theme styles here\n\n\n\n//# sourceURL=webpack:///./src/scripts/theme.js?");

/***/ }),

/***/ "./src/scripts/utils/_buildHeaders.js":
/*!********************************************!*\
  !*** ./src/scripts/utils/_buildHeaders.js ***!
  \********************************************/
/*! exports provided: _buildHeaders */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"_buildHeaders\", function() { return _buildHeaders; });\n/* harmony import */ var universal_cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! universal-cookie */ \"./node_modules/universal-cookie/es6/index.js\");\n\nconst cookies = new universal_cookie__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nconst _buildHeaders = async () => ({\n  \"X-Api-Key\": await cookies.get('ss_api_key'),\n  \"X-Api-Customer-Token\": await cookies.get('ss_customer_token'),\n  \"X-Api-Access-Token\": await cookies.get('ss_access_token')\n});\n\n//# sourceURL=webpack:///./src/scripts/utils/_buildHeaders.js?");

/***/ }),

/***/ "./src/scripts/utils/_lightBox.js":
/*!****************************************!*\
  !*** ./src/scripts/utils/_lightBox.js ***!
  \****************************************/
/*! exports provided: _lightBox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"_lightBox\", function() { return _lightBox; });\nconst open = trigger => {\n  const body = document.querySelector('[data-body]');\n  const overlay = document.querySelector('[data-overlay]');\n  const id = trigger.getAttribute('data-lightbox-trigger');\n  body.classList.add('o-body--noScroll');\n  overlay.classList.remove('c-overlay--isInactive');\n  document.querySelector(`[data-lightbox=\"${id}\"]`).classList.add('c-lightbox__container--isActive');\n};\n\nconst close = () => {\n  const body = document.querySelector('[data-body]');\n  const overlay = document.querySelector('[data-overlay]');\n  const lightboxes = document.querySelectorAll('[data-lightbox]');\n  body.classList.remove('o-body--noScroll');\n  overlay.classList.add('c-overlay--isInactive');\n  lightboxes.forEach(el => {\n    el.classList.remove('c-lightbox__container--isActive');\n  });\n};\n\nconst _lightBox = () => {\n  const triggers = document.querySelectorAll('[data-lightbox-trigger]');\n  triggers.forEach(trigger => {\n    trigger.addEventListener('click', () => {\n      open(trigger);\n    });\n  });\n  const closeButtons = document.querySelectorAll('[data-lightbox-close]');\n  closeButtons.forEach(button => {\n    button.addEventListener('click', () => {\n      close();\n    });\n  });\n  const overlays = document.querySelectorAll('[data-overlay]');\n  overlays.forEach(overlay => {\n    overlay.addEventListener('click', () => {\n      close();\n    });\n  });\n};\n\n//# sourceURL=webpack:///./src/scripts/utils/_lightBox.js?");

/***/ }),

/***/ "./src/scripts/utils/index.js":
/*!************************************!*\
  !*** ./src/scripts/utils/index.js ***!
  \************************************/
/*! exports provided: _buildHeaders, _lightBox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _buildHeaders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_buildHeaders */ \"./src/scripts/utils/_buildHeaders.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"_buildHeaders\", function() { return _buildHeaders__WEBPACK_IMPORTED_MODULE_0__[\"_buildHeaders\"]; });\n\n/* harmony import */ var _lightBox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_lightBox */ \"./src/scripts/utils/_lightBox.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"_lightBox\", function() { return _lightBox__WEBPACK_IMPORTED_MODULE_1__[\"_lightBox\"]; });\n\n\n\n\n//# sourceURL=webpack:///./src/scripts/utils/index.js?");

/***/ }),

/***/ "./src/styles/theme.scss":
/*!*******************************!*\
  !*** ./src/styles/theme.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/styles/theme.scss?");

/***/ })

/******/ });