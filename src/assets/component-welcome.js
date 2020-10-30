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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scripts/snippets/components/component-welcome.js");
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

/***/ "./node_modules/dayjs/dayjs.min.js":
/*!*****************************************!*\
  !*** ./node_modules/dayjs/dayjs.min.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("!function(t,e){ true?module.exports=e():undefined}(this,function(){\"use strict\";var t=\"millisecond\",e=\"second\",n=\"minute\",r=\"hour\",i=\"day\",s=\"week\",u=\"month\",a=\"quarter\",o=\"year\",f=\"date\",h=/^(\\d{4})[-/]?(\\d{1,2})?[-/]?(\\d{0,2})[^0-9]*(\\d{1,2})?:?(\\d{1,2})?:?(\\d{1,2})?.?(\\d+)?$/,c=/\\[([^\\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,d=function(t,e,n){var r=String(t);return!r||r.length>=e?t:\"\"+Array(e+1-r.length).join(n)+t},$={s:d,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?\"+\":\"-\")+d(r,2,\"0\")+\":\"+d(i,2,\"0\")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.add(r,u),s=n-i<0,a=e.add(r+(s?-1:1),u);return+(-(r+(n-i)/(s?i-a:a-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(h){return{M:u,y:o,w:s,d:i,D:f,h:r,m:n,s:e,ms:t,Q:a}[h]||String(h||\"\").toLowerCase().replace(/s$/,\"\")},u:function(t){return void 0===t}},l={name:\"en\",weekdays:\"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday\".split(\"_\"),months:\"January_February_March_April_May_June_July_August_September_October_November_December\".split(\"_\")},y=\"en\",M={};M[y]=l;var m=function(t){return t instanceof S},D=function(t,e,n){var r;if(!t)return y;if(\"string\"==typeof t)M[t]&&(r=t),e&&(M[t]=e,r=t);else{var i=t.name;M[i]=t,r=i}return!n&&r&&(y=r),r||!n&&y},v=function(t,e){if(m(t))return t.clone();var n=\"object\"==typeof e?e:{};return n.date=t,n.args=arguments,new S(n)},g=$;g.l=D,g.i=m,g.w=function(t,e){return v(t,{locale:e.$L,utc:e.$u,$offset:e.$offset})};var S=function(){function d(t){this.$L=this.$L||D(t.locale,null,!0),this.parse(t)}var $=d.prototype;return $.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(g.u(e))return new Date;if(e instanceof Date)return new Date(e);if(\"string\"==typeof e&&!/Z$/i.test(e)){var r=e.match(h);if(r){var i=r[2]-1||0,s=(r[7]||\"0\").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.init()},$.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},$.$utils=function(){return g},$.isValid=function(){return!(\"Invalid Date\"===this.$d.toString())},$.isSame=function(t,e){var n=v(t);return this.startOf(e)<=n&&n<=this.endOf(e)},$.isAfter=function(t,e){return v(t)<this.startOf(e)},$.isBefore=function(t,e){return this.endOf(e)<v(t)},$.$g=function(t,e,n){return g.u(t)?this[e]:this.set(n,t)},$.unix=function(){return Math.floor(this.valueOf()/1e3)},$.valueOf=function(){return this.$d.getTime()},$.startOf=function(t,a){var h=this,c=!!g.u(a)||a,d=g.p(t),$=function(t,e){var n=g.w(h.$u?Date.UTC(h.$y,e,t):new Date(h.$y,e,t),h);return c?n:n.endOf(i)},l=function(t,e){return g.w(h.toDate()[t].apply(h.toDate(\"s\"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),h)},y=this.$W,M=this.$M,m=this.$D,D=\"set\"+(this.$u?\"UTC\":\"\");switch(d){case o:return c?$(1,0):$(31,11);case u:return c?$(1,M):$(0,M+1);case s:var v=this.$locale().weekStart||0,S=(y<v?y+7:y)-v;return $(c?m-S:m+(6-S),M);case i:case f:return l(D+\"Hours\",0);case r:return l(D+\"Minutes\",1);case n:return l(D+\"Seconds\",2);case e:return l(D+\"Milliseconds\",3);default:return this.clone()}},$.endOf=function(t){return this.startOf(t,!1)},$.$set=function(s,a){var h,c=g.p(s),d=\"set\"+(this.$u?\"UTC\":\"\"),$=(h={},h[i]=d+\"Date\",h[f]=d+\"Date\",h[u]=d+\"Month\",h[o]=d+\"FullYear\",h[r]=d+\"Hours\",h[n]=d+\"Minutes\",h[e]=d+\"Seconds\",h[t]=d+\"Milliseconds\",h)[c],l=c===i?this.$D+(a-this.$W):a;if(c===u||c===o){var y=this.clone().set(f,1);y.$d[$](l),y.init(),this.$d=y.set(f,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},$.set=function(t,e){return this.clone().$set(t,e)},$.get=function(t){return this[g.p(t)]()},$.add=function(t,a){var f,h=this;t=Number(t);var c=g.p(a),d=function(e){var n=v(h);return g.w(n.date(n.date()+Math.round(e*t)),h)};if(c===u)return this.set(u,this.$M+t);if(c===o)return this.set(o,this.$y+t);if(c===i)return d(1);if(c===s)return d(7);var $=(f={},f[n]=6e4,f[r]=36e5,f[e]=1e3,f)[c]||1,l=this.$d.getTime()+t*$;return g.w(l,this)},$.subtract=function(t,e){return this.add(-1*t,e)},$.format=function(t){var e=this;if(!this.isValid())return\"Invalid Date\";var n=t||\"YYYY-MM-DDTHH:mm:ssZ\",r=g.z(this),i=this.$locale(),s=this.$H,u=this.$m,a=this.$M,o=i.weekdays,f=i.months,h=function(t,r,i,s){return t&&(t[r]||t(e,n))||i[r].substr(0,s)},d=function(t){return g.s(s%12||12,t,\"0\")},$=i.meridiem||function(t,e,n){var r=t<12?\"AM\":\"PM\";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:g.s(a+1,2,\"0\"),MMM:h(i.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:g.s(this.$D,2,\"0\"),d:String(this.$W),dd:h(i.weekdaysMin,this.$W,o,2),ddd:h(i.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:g.s(s,2,\"0\"),h:d(1),hh:d(2),a:$(s,u,!0),A:$(s,u,!1),m:String(u),mm:g.s(u,2,\"0\"),s:String(this.$s),ss:g.s(this.$s,2,\"0\"),SSS:g.s(this.$ms,3,\"0\"),Z:r};return n.replace(c,function(t,e){return e||l[t]||r.replace(\":\",\"\")})},$.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},$.diff=function(t,f,h){var c,d=g.p(f),$=v(t),l=6e4*($.utcOffset()-this.utcOffset()),y=this-$,M=g.m(this,$);return M=(c={},c[o]=M/12,c[u]=M,c[a]=M/3,c[s]=(y-l)/6048e5,c[i]=(y-l)/864e5,c[r]=y/36e5,c[n]=y/6e4,c[e]=y/1e3,c)[d]||y,h?M:g.a(M)},$.daysInMonth=function(){return this.endOf(u).$D},$.$locale=function(){return M[this.$L]},$.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=D(t,e,!0);return r&&(n.$L=r),n},$.clone=function(){return g.w(this.$d,this)},$.toDate=function(){return new Date(this.valueOf())},$.toJSON=function(){return this.isValid()?this.toISOString():null},$.toISOString=function(){return this.$d.toISOString()},$.toString=function(){return this.$d.toUTCString()},d}(),p=S.prototype;return v.prototype=p,[[\"$ms\",t],[\"$s\",e],[\"$m\",n],[\"$H\",r],[\"$W\",i],[\"$M\",u],[\"$y\",o],[\"$D\",f]].forEach(function(t){p[t[1]]=function(e){return this.$g(e,t[0],t[1])}}),v.extend=function(t,e){return t(e,S,v),v},v.locale=D,v.isDayjs=m,v.unix=function(t){return v(1e3*t)},v.en=M[y],v.Ls=M,v});\n\n\n//# sourceURL=webpack:///./node_modules/dayjs/dayjs.min.js?");

/***/ }),

/***/ "./node_modules/dayjs/plugin/advancedFormat.js":
/*!*****************************************************!*\
  !*** ./node_modules/dayjs/plugin/advancedFormat.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("!function(e,t){ true?module.exports=t():undefined}(this,function(){\"use strict\";return function(e,t,r){var n=t.prototype,o=n.format;r.en.ordinal=function(e){var t=[\"th\",\"st\",\"nd\",\"rd\"],r=e%100;return\"[\"+e+(t[(r-20)%10]||t[r]||t[0])+\"]\"},n.format=function(e){var t=this,r=this.$locale(),n=this.$utils(),a=(e||\"YYYY-MM-DDTHH:mm:ssZ\").replace(/\\[([^\\]]+)]|Q|wo|ww|w|gggg|Do|X|x|k{1,2}|S/g,function(e){switch(e){case\"Q\":return Math.ceil((t.$M+1)/3);case\"Do\":return r.ordinal(t.$D);case\"gggg\":return t.weekYear();case\"wo\":return r.ordinal(t.week(),\"W\");case\"w\":case\"ww\":return n.s(t.week(),\"w\"===e?1:2,\"0\");case\"k\":case\"kk\":return n.s(String(0===t.$H?24:t.$H),\"k\"===e?1:2,\"0\");case\"X\":return Math.floor(t.$d.getTime()/1e3);case\"x\":return t.$d.getTime();default:return e}});return o.bind(this)(a)}}});\n\n\n//# sourceURL=webpack:///./node_modules/dayjs/plugin/advancedFormat.js?");

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

/***/ "./src/scripts/snippets/components/component-welcome.js":
/*!**************************************************************!*\
  !*** ./src/scripts/snippets/components/component-welcome.js ***!
  \**************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_snippets_components_component_welcome_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @styles/snippets/components/component-welcome.scss */ \"./src/styles/snippets/components/component-welcome.scss\");\n/* harmony import */ var _styles_snippets_components_component_welcome_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_snippets_components_component_welcome_scss__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _scripts_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @scripts/utils */ \"./src/scripts/utils/index.js\");\n/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dayjs */ \"./node_modules/dayjs/dayjs.min.js\");\n/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var dayjs_plugin_advancedFormat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dayjs/plugin/advancedFormat */ \"./node_modules/dayjs/plugin/advancedFormat.js\");\n/* harmony import */ var dayjs_plugin_advancedFormat__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_advancedFormat__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\ndayjs__WEBPACK_IMPORTED_MODULE_2___default.a.extend(dayjs_plugin_advancedFormat__WEBPACK_IMPORTED_MODULE_3___default.a);\ndocument.addEventListener('DOMContentLoaded', () => {\n  const box = document.querySelector('[data-welcome-box]');\n  if (!box) return;\n  const getNextChargeDate = setInterval(async () => {\n    const {\n      api\n    } = window.Scoutside;\n\n    if (api.ready) {\n      clearInterval(getNextChargeDate);\n      const headers = await Object(_scripts_utils__WEBPACK_IMPORTED_MODULE_1__[\"_buildHeaders\"])();\n      const charges = await fetch(`${api.base_url}/v1/customer/resources?resources[]=charges`, {\n        headers\n      });\n      const json = await charges.json();\n      if (!json || json && json.resources.charges.length === 0) return;\n      const nextDate = json.resources.charges.reduce((a, b) => {\n        if (a.status !== \"QUEUED\") return b;\n        if (b.status !== \"QUEUED\") return a;\n        return dayjs__WEBPACK_IMPORTED_MODULE_2___default()(a.scheduled_at).isBefore(dayjs__WEBPACK_IMPORTED_MODULE_2___default()(b.scheduled_at)) ? a : b;\n      });\n      if (!nextDate || nextDate && nextDate.status !== \"QUEUED\") return;\n      const date = box.querySelector('[data-welcome-date]');\n      date.innerHTML = dayjs__WEBPACK_IMPORTED_MODULE_2___default()(nextDate.scheduled_at).format('MMMM Do');\n      box.classList.remove('u-hide');\n    }\n  }, 500);\n});\n\n//# sourceURL=webpack:///./src/scripts/snippets/components/component-welcome.js?");

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

/***/ "./src/styles/snippets/components/component-welcome.scss":
/*!***************************************************************!*\
  !*** ./src/styles/snippets/components/component-welcome.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/styles/snippets/components/component-welcome.scss?");

/***/ })

/******/ });