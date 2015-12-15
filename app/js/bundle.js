/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:12345/img/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	(function () {
	  var e, n, u, o, s, t, r, i;s = __webpack_require__(4), r = __webpack_require__(6), t = __webpack_require__(7), n = __webpack_require__(8), u = __webpack_require__(11), o = __webpack_require__(13), s.use(r), s.use(t), e = s.extend({}), i = new r(), n = s.component("signin-component", n), u = s.component("signup-component", u), o = s.component("tasks-component", o), i.redirect({ "/": "/tasks" }), i.map({ "/signin": { component: n }, "/signup": { component: u }, "/tasks": { component: o } }), i.start(e, "#app");
	}).call(this);

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*!
	 * Vue.js v1.0.11
	 * (c) 2015 Evan You
	 * Released under the MIT License.
	 */
	'use strict';
	
	function set(obj, key, val) {
	  if (hasOwn(obj, key)) {
	    obj[key] = val;
	    return;
	  }
	  if (obj._isVue) {
	    set(obj._data, key, val);
	    return;
	  }
	  var ob = obj.__ob__;
	  if (!ob) {
	    obj[key] = val;
	    return;
	  }
	  ob.convert(key, val);
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._proxy(key);
	      vm._digest();
	    }
	  }
	  return val;
	}
	
	/**
	 * Delete a property and trigger change if necessary.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 */
	
	function del(obj, key) {
	  if (!hasOwn(obj, key)) {
	    return;
	  }
	  delete obj[key];
	  var ob = obj.__ob__;
	  if (!ob) {
	    return;
	  }
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._unproxy(key);
	      vm._digest();
	    }
	  }
	}
	
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	/**
	 * Check whether the object has the property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @return {Boolean}
	 */
	
	function hasOwn(obj, key) {
	  return hasOwnProperty.call(obj, key);
	}
	
	/**
	 * Check if an expression is a literal value.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */
	
	var literalValueRE = /^\s?(true|false|[\d\.]+|'[^']*'|"[^"]*")\s?$/;
	
	function isLiteral(exp) {
	  return literalValueRE.test(exp);
	}
	
	/**
	 * Check if a string starts with $ or _
	 *
	 * @param {String} str
	 * @return {Boolean}
	 */
	
	function isReserved(str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F;
	}
	
	/**
	 * Guard text output, make sure undefined outputs
	 * empty string
	 *
	 * @param {*} value
	 * @return {String}
	 */
	
	function _toString(value) {
	  return value == null ? '' : value.toString();
	}
	
	/**
	 * Check and convert possible numeric strings to numbers
	 * before setting back to data
	 *
	 * @param {*} value
	 * @return {*|Number}
	 */
	
	function toNumber(value) {
	  if (typeof value !== 'string') {
	    return value;
	  } else {
	    var parsed = Number(value);
	    return isNaN(parsed) ? value : parsed;
	  }
	}
	
	/**
	 * Convert string boolean literals into real booleans.
	 *
	 * @param {*} value
	 * @return {*|Boolean}
	 */
	
	function toBoolean(value) {
	  return value === 'true' ? true : value === 'false' ? false : value;
	}
	
	/**
	 * Strip quotes from a string
	 *
	 * @param {String} str
	 * @return {String | false}
	 */
	
	function stripQuotes(str) {
	  var a = str.charCodeAt(0);
	  var b = str.charCodeAt(str.length - 1);
	  return a === b && (a === 0x22 || a === 0x27) ? str.slice(1, -1) : str;
	}
	
	/**
	 * Camelize a hyphen-delmited string.
	 *
	 * @param {String} str
	 * @return {String}
	 */
	
	var camelizeRE = /-(\w)/g;
	
	function camelize(str) {
	  return str.replace(camelizeRE, toUpper);
	}
	
	function toUpper(_, c) {
	  return c ? c.toUpperCase() : '';
	}
	
	/**
	 * Hyphenate a camelCase string.
	 *
	 * @param {String} str
	 * @return {String}
	 */
	
	var hyphenateRE = /([a-z\d])([A-Z])/g;
	
	function hyphenate(str) {
	  return str.replace(hyphenateRE, '$1-$2').toLowerCase();
	}
	
	/**
	 * Converts hyphen/underscore/slash delimitered names into
	 * camelized classNames.
	 *
	 * e.g. my-component => MyComponent
	 *      some_else    => SomeElse
	 *      some/comp    => SomeComp
	 *
	 * @param {String} str
	 * @return {String}
	 */
	
	var classifyRE = /(?:^|[-_\/])(\w)/g;
	
	function classify(str) {
	  return str.replace(classifyRE, toUpper);
	}
	
	/**
	 * Simple bind, faster than native
	 *
	 * @param {Function} fn
	 * @param {Object} ctx
	 * @return {Function}
	 */
	
	function bind$1(fn, ctx) {
	  return function (a) {
	    var l = arguments.length;
	    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
	  };
	}
	
	/**
	 * Convert an Array-like object to a real Array.
	 *
	 * @param {Array-like} list
	 * @param {Number} [start] - start index
	 * @return {Array}
	 */
	
	function toArray(list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret;
	}
	
	/**
	 * Mix properties into target object.
	 *
	 * @param {Object} to
	 * @param {Object} from
	 */
	
	function extend(to, from) {
	  var keys = Object.keys(from);
	  var i = keys.length;
	  while (i--) {
	    to[keys[i]] = from[keys[i]];
	  }
	  return to;
	}
	
	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */
	
	function isObject(obj) {
	  return obj !== null && typeof obj === 'object';
	}
	
	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */
	
	var toString = Object.prototype.toString;
	var OBJECT_STRING = '[object Object]';
	
	function isPlainObject(obj) {
	  return toString.call(obj) === OBJECT_STRING;
	}
	
	/**
	 * Array type check.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */
	
	var isArray = Array.isArray;
	
	/**
	 * Define a non-enumerable property
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 * @param {Boolean} [enumerable]
	 */
	
	function def(obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}
	
	/**
	 * Debounce a function so it only gets called after the
	 * input stops arriving after the given wait period.
	 *
	 * @param {Function} func
	 * @param {Number} wait
	 * @return {Function} - the debounced function
	 */
	
	function _debounce(func, wait) {
	  var timeout, args, context, timestamp, result;
	  var later = function later() {
	    var last = Date.now() - timestamp;
	    if (last < wait && last >= 0) {
	      timeout = setTimeout(later, wait - last);
	    } else {
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    }
	  };
	  return function () {
	    context = this;
	    args = arguments;
	    timestamp = Date.now();
	    if (!timeout) {
	      timeout = setTimeout(later, wait);
	    }
	    return result;
	  };
	}
	
	/**
	 * Manual indexOf because it's slightly faster than
	 * native.
	 *
	 * @param {Array} arr
	 * @param {*} obj
	 */
	
	function indexOf(arr, obj) {
	  var i = arr.length;
	  while (i--) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	}
	
	/**
	 * Make a cancellable version of an async callback.
	 *
	 * @param {Function} fn
	 * @return {Function}
	 */
	
	function cancellable(fn) {
	  var cb = function cb() {
	    if (!cb.cancelled) {
	      return fn.apply(this, arguments);
	    }
	  };
	  cb.cancel = function () {
	    cb.cancelled = true;
	  };
	  return cb;
	}
	
	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 *
	 * @param {*} a
	 * @param {*} b
	 * @return {Boolean}
	 */
	
	function looseEqual(a, b) {
	  /* eslint-disable eqeqeq */
	  return a == b || (isObject(a) && isObject(b) ? JSON.stringify(a) === JSON.stringify(b) : false);
	  /* eslint-enable eqeqeq */
	}
	
	var hasProto = ('__proto__' in {});
	
	// Browser environment sniffing
	var inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';
	
	var isIE9 = inBrowser && navigator.userAgent.toLowerCase().indexOf('msie 9.0') > 0;
	
	var isAndroid = inBrowser && navigator.userAgent.toLowerCase().indexOf('android') > 0;
	
	var transitionProp = undefined;
	var transitionEndEvent = undefined;
	var animationProp = undefined;
	var animationEndEvent = undefined;
	
	// Transition property/event sniffing
	if (inBrowser && !isIE9) {
	  var isWebkitTrans = window.ontransitionend === undefined && window.onwebkittransitionend !== undefined;
	  var isWebkitAnim = window.onanimationend === undefined && window.onwebkitanimationend !== undefined;
	  transitionProp = isWebkitTrans ? 'WebkitTransition' : 'transition';
	  transitionEndEvent = isWebkitTrans ? 'webkitTransitionEnd' : 'transitionend';
	  animationProp = isWebkitAnim ? 'WebkitAnimation' : 'animation';
	  animationEndEvent = isWebkitAnim ? 'webkitAnimationEnd' : 'animationend';
	}
	
	/**
	 * Defer a task to execute it asynchronously. Ideally this
	 * should be executed as a microtask, so we leverage
	 * MutationObserver if it's available, and fallback to
	 * setTimeout(0).
	 *
	 * @param {Function} cb
	 * @param {Object} ctx
	 */
	
	var nextTick = (function () {
	  var callbacks = [];
	  var pending = false;
	  var timerFunc;
	  function nextTickHandler() {
	    pending = false;
	    var copies = callbacks.slice(0);
	    callbacks = [];
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]();
	    }
	  }
	  /* istanbul ignore if */
	  if (typeof MutationObserver !== 'undefined') {
	    var counter = 1;
	    var observer = new MutationObserver(nextTickHandler);
	    var textNode = document.createTextNode(counter);
	    observer.observe(textNode, {
	      characterData: true
	    });
	    timerFunc = function () {
	      counter = (counter + 1) % 2;
	      textNode.data = counter;
	    };
	  } else {
	    timerFunc = setTimeout;
	  }
	  return function (cb, ctx) {
	    var func = ctx ? function () {
	      cb.call(ctx);
	    } : cb;
	    callbacks.push(func);
	    if (pending) return;
	    pending = true;
	    timerFunc(nextTickHandler, 0);
	  };
	})();
	
	function Cache(limit) {
	  this.size = 0;
	  this.limit = limit;
	  this.head = this.tail = undefined;
	  this._keymap = Object.create(null);
	}
	
	var p = Cache.prototype;
	
	/**
	 * Put <value> into the cache associated with <key>.
	 * Returns the entry which was removed to make room for
	 * the new entry. Otherwise undefined is returned.
	 * (i.e. if there was enough room already).
	 *
	 * @param {String} key
	 * @param {*} value
	 * @return {Entry|undefined}
	 */
	
	p.put = function (key, value) {
	  var entry = {
	    key: key,
	    value: value
	  };
	  this._keymap[key] = entry;
	  if (this.tail) {
	    this.tail.newer = entry;
	    entry.older = this.tail;
	  } else {
	    this.head = entry;
	  }
	  this.tail = entry;
	  if (this.size === this.limit) {
	    return this.shift();
	  } else {
	    this.size++;
	  }
	};
	
	/**
	 * Purge the least recently used (oldest) entry from the
	 * cache. Returns the removed entry or undefined if the
	 * cache was empty.
	 */
	
	p.shift = function () {
	  var entry = this.head;
	  if (entry) {
	    this.head = this.head.newer;
	    this.head.older = undefined;
	    entry.newer = entry.older = undefined;
	    this._keymap[entry.key] = undefined;
	  }
	  return entry;
	};
	
	/**
	 * Get and register recent use of <key>. Returns the value
	 * associated with <key> or undefined if not in cache.
	 *
	 * @param {String} key
	 * @param {Boolean} returnEntry
	 * @return {Entry|*}
	 */
	
	p.get = function (key, returnEntry) {
	  var entry = this._keymap[key];
	  if (entry === undefined) return;
	  if (entry === this.tail) {
	    return returnEntry ? entry : entry.value;
	  }
	  // HEAD--------------TAIL
	  //   <.older   .newer>
	  //  <--- add direction --
	  //   A  B  C  <D>  E
	  if (entry.newer) {
	    if (entry === this.head) {
	      this.head = entry.newer;
	    }
	    entry.newer.older = entry.older; // C <-- E.
	  }
	  if (entry.older) {
	    entry.older.newer = entry.newer; // C. --> E
	  }
	  entry.newer = undefined; // D --x
	  entry.older = this.tail; // D. --> E
	  if (this.tail) {
	    this.tail.newer = entry; // E. <-- D
	  }
	  this.tail = entry;
	  return returnEntry ? entry : entry.value;
	};
	
	var cache$1 = new Cache(1000);
	var filterTokenRE = /[^\s'"]+|'[^']*'|"[^"]*"/g;
	var reservedArgRE = /^in$|^-?\d+/;
	
	/**
	 * Parser state
	 */
	
	var str;
	var dir;
	var c;
	var prev;
	var i;
	var l;
	var lastFilterIndex;
	var inSingle;
	var inDouble;
	var curly;
	var square;
	var paren;
	/**
	 * Push a filter to the current directive object
	 */
	
	function pushFilter() {
	  var exp = str.slice(lastFilterIndex, i).trim();
	  var filter;
	  if (exp) {
	    filter = {};
	    var tokens = exp.match(filterTokenRE);
	    filter.name = tokens[0];
	    if (tokens.length > 1) {
	      filter.args = tokens.slice(1).map(processFilterArg);
	    }
	  }
	  if (filter) {
	    (dir.filters = dir.filters || []).push(filter);
	  }
	  lastFilterIndex = i + 1;
	}
	
	/**
	 * Check if an argument is dynamic and strip quotes.
	 *
	 * @param {String} arg
	 * @return {Object}
	 */
	
	function processFilterArg(arg) {
	  if (reservedArgRE.test(arg)) {
	    return {
	      value: toNumber(arg),
	      dynamic: false
	    };
	  } else {
	    var stripped = stripQuotes(arg);
	    var dynamic = stripped === arg;
	    return {
	      value: dynamic ? arg : stripped,
	      dynamic: dynamic
	    };
	  }
	}
	
	/**
	 * Parse a directive value and extract the expression
	 * and its filters into a descriptor.
	 *
	 * Example:
	 *
	 * "a + 1 | uppercase" will yield:
	 * {
	 *   expression: 'a + 1',
	 *   filters: [
	 *     { name: 'uppercase', args: null }
	 *   ]
	 * }
	 *
	 * @param {String} str
	 * @return {Object}
	 */
	
	function parseDirective(s) {
	
	  var hit = cache$1.get(s);
	  if (hit) {
	    return hit;
	  }
	
	  // reset parser state
	  str = s;
	  inSingle = inDouble = false;
	  curly = square = paren = 0;
	  lastFilterIndex = 0;
	  dir = {};
	
	  for (i = 0, l = str.length; i < l; i++) {
	    prev = c;
	    c = str.charCodeAt(i);
	    if (inSingle) {
	      // check single quote
	      if (c === 0x27 && prev !== 0x5C) inSingle = !inSingle;
	    } else if (inDouble) {
	      // check double quote
	      if (c === 0x22 && prev !== 0x5C) inDouble = !inDouble;
	    } else if (c === 0x7C && // pipe
	    str.charCodeAt(i + 1) !== 0x7C && str.charCodeAt(i - 1) !== 0x7C) {
	      if (dir.expression == null) {
	        // first filter, end of expression
	        lastFilterIndex = i + 1;
	        dir.expression = str.slice(0, i).trim();
	      } else {
	        // already has filter
	        pushFilter();
	      }
	    } else {
	      switch (c) {
	        case 0x22:
	          inDouble = true;break; // "
	        case 0x27:
	          inSingle = true;break; // '
	        case 0x28:
	          paren++;break; // (
	        case 0x29:
	          paren--;break; // )
	        case 0x5B:
	          square++;break; // [
	        case 0x5D:
	          square--;break; // ]
	        case 0x7B:
	          curly++;break; // {
	        case 0x7D:
	          curly--;break; // }
	      }
	    }
	  }
	
	  if (dir.expression == null) {
	    dir.expression = str.slice(0, i).trim();
	  } else if (lastFilterIndex !== 0) {
	    pushFilter();
	  }
	
	  cache$1.put(s, dir);
	  return dir;
	}
	
	var directive = Object.freeze({
	  parseDirective: parseDirective
	});
	
	var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	var cache = undefined;
	var tagRE = undefined;
	var htmlRE = undefined;
	/**
	 * Escape a string so it can be used in a RegExp
	 * constructor.
	 *
	 * @param {String} str
	 */
	
	function escapeRegex(str) {
	  return str.replace(regexEscapeRE, '\\$&');
	}
	
	function compileRegex() {
	  var open = escapeRegex(config.delimiters[0]);
	  var close = escapeRegex(config.delimiters[1]);
	  var unsafeOpen = escapeRegex(config.unsafeDelimiters[0]);
	  var unsafeClose = escapeRegex(config.unsafeDelimiters[1]);
	  tagRE = new RegExp(unsafeOpen + '(.+?)' + unsafeClose + '|' + open + '(.+?)' + close, 'g');
	  htmlRE = new RegExp('^' + unsafeOpen + '.*' + unsafeClose + '$');
	  // reset cache
	  cache = new Cache(1000);
	}
	
	/**
	 * Parse a template text string into an array of tokens.
	 *
	 * @param {String} text
	 * @return {Array<Object> | null}
	 *               - {String} type
	 *               - {String} value
	 *               - {Boolean} [html]
	 *               - {Boolean} [oneTime]
	 */
	
	function parseText(text) {
	  if (!cache) {
	    compileRegex();
	  }
	  var hit = cache.get(text);
	  if (hit) {
	    return hit;
	  }
	  text = text.replace(/\n/g, '');
	  if (!tagRE.test(text)) {
	    return null;
	  }
	  var tokens = [];
	  var lastIndex = tagRE.lastIndex = 0;
	  var match, index, html, value, first, oneTime;
	  /* eslint-disable no-cond-assign */
	  while (match = tagRE.exec(text)) {
	    /* eslint-enable no-cond-assign */
	    index = match.index;
	    // push text token
	    if (index > lastIndex) {
	      tokens.push({
	        value: text.slice(lastIndex, index)
	      });
	    }
	    // tag token
	    html = htmlRE.test(match[0]);
	    value = html ? match[1] : match[2];
	    first = value.charCodeAt(0);
	    oneTime = first === 42; // *
	    value = oneTime ? value.slice(1) : value;
	    tokens.push({
	      tag: true,
	      value: value.trim(),
	      html: html,
	      oneTime: oneTime
	    });
	    lastIndex = index + match[0].length;
	  }
	  if (lastIndex < text.length) {
	    tokens.push({
	      value: text.slice(lastIndex)
	    });
	  }
	  cache.put(text, tokens);
	  return tokens;
	}
	
	/**
	 * Format a list of tokens into an expression.
	 * e.g. tokens parsed from 'a {{b}} c' can be serialized
	 * into one single expression as '"a " + b + " c"'.
	 *
	 * @param {Array} tokens
	 * @return {String}
	 */
	
	function tokensToExp(tokens) {
	  if (tokens.length > 1) {
	    return tokens.map(function (token) {
	      return formatToken(token);
	    }).join('+');
	  } else {
	    return formatToken(tokens[0], true);
	  }
	}
	
	/**
	 * Format a single token.
	 *
	 * @param {Object} token
	 * @param {Boolean} single
	 * @return {String}
	 */
	
	function formatToken(token, single) {
	  return token.tag ? inlineFilters(token.value, single) : '"' + token.value + '"';
	}
	
	/**
	 * For an attribute with multiple interpolation tags,
	 * e.g. attr="some-{{thing | filter}}", in order to combine
	 * the whole thing into a single watchable expression, we
	 * have to inline those filters. This function does exactly
	 * that. This is a bit hacky but it avoids heavy changes
	 * to directive parser and watcher mechanism.
	 *
	 * @param {String} exp
	 * @param {Boolean} single
	 * @return {String}
	 */
	
	var filterRE$1 = /[^|]\|[^|]/;
	function inlineFilters(exp, single) {
	  if (!filterRE$1.test(exp)) {
	    return single ? exp : '(' + exp + ')';
	  } else {
	    var dir = parseDirective(exp);
	    if (!dir.filters) {
	      return '(' + exp + ')';
	    } else {
	      return 'this._applyFilters(' + dir.expression + // value
	      ',null,' + // oldValue (null for read)
	      JSON.stringify(dir.filters) + // filter descriptors
	      ',false)'; // write?
	    }
	  }
	}
	
	/**
	 * Replace all interpolation tags in a piece of text.
	 *
	 * @param {String} text
	 * @return {String}
	 */
	
	function removeTags(text) {
	  return text.replace(tagRE, '');
	}
	
	var text$1 = Object.freeze({
	  compileRegex: compileRegex,
	  parseText: parseText,
	  tokensToExp: tokensToExp,
	  removeTags: removeTags
	});
	
	var delimiters = ['{{', '}}'];
	var unsafeDelimiters = ['{{{', '}}}'];
	
	var config = Object.defineProperties({
	
	  /**
	   * Whether to print debug messages.
	   * Also enables stack trace for warnings.
	   *
	   * @type {Boolean}
	   */
	
	  debug: false,
	
	  /**
	   * Whether to suppress warnings.
	   *
	   * @type {Boolean}
	   */
	
	  silent: false,
	
	  /**
	   * Whether to use async rendering.
	   */
	
	  async: true,
	
	  /**
	   * Whether to warn against errors caught when evaluating
	   * expressions.
	   */
	
	  warnExpressionErrors: true,
	
	  /**
	   * Whether or not to handle fully object properties which
	   * are already backed by getters and seters. Depending on
	   * use case and environment, this might introduce non-neglible
	   * performance penalties.
	   */
	  convertAllProperties: false,
	
	  /**
	   * Internal flag to indicate the delimiters have been
	   * changed.
	   *
	   * @type {Boolean}
	   */
	
	  _delimitersChanged: true,
	
	  /**
	   * List of asset types that a component can own.
	   *
	   * @type {Array}
	   */
	
	  _assetTypes: ['component', 'directive', 'elementDirective', 'filter', 'transition', 'partial'],
	
	  /**
	   * prop binding modes
	   */
	
	  _propBindingModes: {
	    ONE_WAY: 0,
	    TWO_WAY: 1,
	    ONE_TIME: 2
	  },
	
	  /**
	   * Max circular updates allowed in a batcher flush cycle.
	   */
	
	  _maxUpdateCount: 100
	
	}, {
	  delimiters: { /**
	                 * Interpolation delimiters. Changing these would trigger
	                 * the text parser to re-compile the regular expressions.
	                 *
	                 * @type {Array<String>}
	                 */
	
	    get: function get() {
	      return delimiters;
	    },
	    set: function set(val) {
	      delimiters = val;
	      compileRegex();
	    },
	    configurable: true,
	    enumerable: true
	  },
	  unsafeDelimiters: {
	    get: function get() {
	      return unsafeDelimiters;
	    },
	    set: function set(val) {
	      unsafeDelimiters = val;
	      compileRegex();
	    },
	    configurable: true,
	    enumerable: true
	  }
	});
	
	var warn = undefined;
	
	if (process.env.NODE_ENV !== 'production') {
	  (function () {
	    var hasConsole = typeof console !== 'undefined';
	    warn = function (msg, e) {
	      if (hasConsole && (!config.silent || config.debug)) {
	        console.warn('[Vue warn]: ' + msg);
	        /* istanbul ignore if */
	        if (config.debug) {
	          if (e) {
	            throw e;
	          } else {
	            console.warn(new Error('Warning Stack Trace').stack);
	          }
	        }
	      }
	    };
	  })();
	}
	
	/**
	 * Append with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */
	
	function appendWithTransition(el, target, vm, cb) {
	  applyTransition(el, 1, function () {
	    target.appendChild(el);
	  }, vm, cb);
	}
	
	/**
	 * InsertBefore with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */
	
	function beforeWithTransition(el, target, vm, cb) {
	  applyTransition(el, 1, function () {
	    before(el, target);
	  }, vm, cb);
	}
	
	/**
	 * Remove with transition.
	 *
	 * @param {Element} el
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */
	
	function removeWithTransition(el, vm, cb) {
	  applyTransition(el, -1, function () {
	    remove(el);
	  }, vm, cb);
	}
	
	/**
	 * Apply transitions with an operation callback.
	 *
	 * @param {Element} el
	 * @param {Number} direction
	 *                  1: enter
	 *                 -1: leave
	 * @param {Function} op - the actual DOM operation
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */
	
	function applyTransition(el, direction, op, vm, cb) {
	  var transition = el.__v_trans;
	  if (!transition ||
	  // skip if there are no js hooks and CSS transition is
	  // not supported
	  !transition.hooks && !transitionEndEvent ||
	  // skip transitions for initial compile
	  !vm._isCompiled ||
	  // if the vm is being manipulated by a parent directive
	  // during the parent's compilation phase, skip the
	  // animation.
	  vm.$parent && !vm.$parent._isCompiled) {
	    op();
	    if (cb) cb();
	    return;
	  }
	  var action = direction > 0 ? 'enter' : 'leave';
	  transition[action](op, cb);
	}
	
	/**
	 * Query an element selector if it's not an element already.
	 *
	 * @param {String|Element} el
	 * @return {Element}
	 */
	
	function query(el) {
	  if (typeof el === 'string') {
	    var selector = el;
	    el = document.querySelector(el);
	    if (!el) {
	      process.env.NODE_ENV !== 'production' && warn('Cannot find element: ' + selector);
	    }
	  }
	  return el;
	}
	
	/**
	 * Check if a node is in the document.
	 * Note: document.documentElement.contains should work here
	 * but always returns false for comment nodes in phantomjs,
	 * making unit tests difficult. This is fixed by doing the
	 * contains() check on the node's parentNode instead of
	 * the node itself.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */
	
	function inDoc(node) {
	  var doc = document.documentElement;
	  var parent = node && node.parentNode;
	  return doc === node || doc === parent || !!(parent && parent.nodeType === 1 && doc.contains(parent));
	}
	
	/**
	 * Get and remove an attribute from a node.
	 *
	 * @param {Node} node
	 * @param {String} _attr
	 */
	
	function getAttr(node, _attr) {
	  var val = node.getAttribute(_attr);
	  if (val !== null) {
	    node.removeAttribute(_attr);
	  }
	  return val;
	}
	
	/**
	 * Get an attribute with colon or v-bind: prefix.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {String|null}
	 */
	
	function getBindAttr(node, name) {
	  var val = getAttr(node, ':' + name);
	  if (val === null) {
	    val = getAttr(node, 'v-bind:' + name);
	  }
	  return val;
	}
	
	/**
	 * Check the presence of a bind attribute.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {Boolean}
	 */
	
	function hasBindAttr(node, name) {
	  return node.hasAttribute(name) || node.hasAttribute(':' + name) || node.hasAttribute('v-bind:' + name);
	}
	
	/**
	 * Insert el before target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */
	
	function before(el, target) {
	  target.parentNode.insertBefore(el, target);
	}
	
	/**
	 * Insert el after target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */
	
	function after(el, target) {
	  if (target.nextSibling) {
	    before(el, target.nextSibling);
	  } else {
	    target.parentNode.appendChild(el);
	  }
	}
	
	/**
	 * Remove el from DOM
	 *
	 * @param {Element} el
	 */
	
	function remove(el) {
	  el.parentNode.removeChild(el);
	}
	
	/**
	 * Prepend el to target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */
	
	function prepend(el, target) {
	  if (target.firstChild) {
	    before(el, target.firstChild);
	  } else {
	    target.appendChild(el);
	  }
	}
	
	/**
	 * Replace target with el
	 *
	 * @param {Element} target
	 * @param {Element} el
	 */
	
	function replace(target, el) {
	  var parent = target.parentNode;
	  if (parent) {
	    parent.replaceChild(el, target);
	  }
	}
	
	/**
	 * Add event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 */
	
	function on$1(el, event, cb) {
	  el.addEventListener(event, cb);
	}
	
	/**
	 * Remove event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 */
	
	function off(el, event, cb) {
	  el.removeEventListener(event, cb);
	}
	
	/**
	 * In IE9, setAttribute('class') will result in empty class
	 * if the element also has the :class attribute; However in
	 * PhantomJS, setting `className` does not work on SVG elements...
	 * So we have to do a conditional check here.
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */
	
	function setClass(el, cls) {
	  /* istanbul ignore if */
	  if (isIE9 && el.hasOwnProperty('className')) {
	    el.className = cls;
	  } else {
	    el.setAttribute('class', cls);
	  }
	}
	
	/**
	 * Add class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */
	
	function addClass(el, cls) {
	  if (el.classList) {
	    el.classList.add(cls);
	  } else {
	    var cur = ' ' + (el.getAttribute('class') || '') + ' ';
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      setClass(el, (cur + cls).trim());
	    }
	  }
	}
	
	/**
	 * Remove class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */
	
	function removeClass(el, cls) {
	  if (el.classList) {
	    el.classList.remove(cls);
	  } else {
	    var cur = ' ' + (el.getAttribute('class') || '') + ' ';
	    var tar = ' ' + cls + ' ';
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ');
	    }
	    setClass(el, cur.trim());
	  }
	  if (!el.className) {
	    el.removeAttribute('class');
	  }
	}
	
	/**
	 * Extract raw content inside an element into a temporary
	 * container div
	 *
	 * @param {Element} el
	 * @param {Boolean} asFragment
	 * @return {Element}
	 */
	
	function extractContent(el, asFragment) {
	  var child;
	  var rawContent;
	  /* istanbul ignore if */
	  if (isTemplate(el) && el.content instanceof DocumentFragment) {
	    el = el.content;
	  }
	  if (el.hasChildNodes()) {
	    trimNode(el);
	    rawContent = asFragment ? document.createDocumentFragment() : document.createElement('div');
	    /* eslint-disable no-cond-assign */
	    while (child = el.firstChild) {
	      /* eslint-enable no-cond-assign */
	      rawContent.appendChild(child);
	    }
	  }
	  return rawContent;
	}
	
	/**
	 * Trim possible empty head/tail textNodes inside a parent.
	 *
	 * @param {Node} node
	 */
	
	function trimNode(node) {
	  trim(node, node.firstChild);
	  trim(node, node.lastChild);
	}
	
	function trim(parent, node) {
	  if (node && node.nodeType === 3 && !node.data.trim()) {
	    parent.removeChild(node);
	  }
	}
	
	/**
	 * Check if an element is a template tag.
	 * Note if the template appears inside an SVG its tagName
	 * will be in lowercase.
	 *
	 * @param {Element} el
	 */
	
	function isTemplate(el) {
	  return el.tagName && el.tagName.toLowerCase() === 'template';
	}
	
	/**
	 * Create an "anchor" for performing dom insertion/removals.
	 * This is used in a number of scenarios:
	 * - fragment instance
	 * - v-html
	 * - v-if
	 * - v-for
	 * - component
	 *
	 * @param {String} content
	 * @param {Boolean} persist - IE trashes empty textNodes on
	 *                            cloneNode(true), so in certain
	 *                            cases the anchor needs to be
	 *                            non-empty to be persisted in
	 *                            templates.
	 * @return {Comment|Text}
	 */
	
	function createAnchor(content, persist) {
	  var anchor = config.debug ? document.createComment(content) : document.createTextNode(persist ? ' ' : '');
	  anchor.__vue_anchor = true;
	  return anchor;
	}
	
	/**
	 * Find a component ref attribute that starts with $.
	 *
	 * @param {Element} node
	 * @return {String|undefined}
	 */
	
	var refRE = /^v-ref:/;
	
	function findRef(node) {
	  if (node.hasAttributes()) {
	    var attrs = node.attributes;
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      var name = attrs[i].name;
	      if (refRE.test(name)) {
	        return camelize(name.replace(refRE, ''));
	      }
	    }
	  }
	}
	
	/**
	 * Map a function to a range of nodes .
	 *
	 * @param {Node} node
	 * @param {Node} end
	 * @param {Function} op
	 */
	
	function mapNodeRange(node, end, op) {
	  var next;
	  while (node !== end) {
	    next = node.nextSibling;
	    op(node);
	    node = next;
	  }
	  op(end);
	}
	
	/**
	 * Remove a range of nodes with transition, store
	 * the nodes in a fragment with correct ordering,
	 * and call callback when done.
	 *
	 * @param {Node} start
	 * @param {Node} end
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Function} cb
	 */
	
	function removeNodeRange(start, end, vm, frag, cb) {
	  var done = false;
	  var removed = 0;
	  var nodes = [];
	  mapNodeRange(start, end, function (node) {
	    if (node === end) done = true;
	    nodes.push(node);
	    removeWithTransition(node, vm, onRemoved);
	  });
	  function onRemoved() {
	    removed++;
	    if (done && removed >= nodes.length) {
	      for (var i = 0; i < nodes.length; i++) {
	        frag.appendChild(nodes[i]);
	      }
	      cb && cb();
	    }
	  }
	}
	
	var commonTagRE = /^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/;
	
	/**
	 * Check if an element is a component, if yes return its
	 * component id.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Object|undefined}
	 */
	
	function checkComponentAttr(el, options) {
	  var tag = el.tagName.toLowerCase();
	  var hasAttrs = el.hasAttributes();
	  if (!commonTagRE.test(tag) && tag !== 'component') {
	    if (resolveAsset(options, 'components', tag)) {
	      return { id: tag };
	    } else {
	      var is = hasAttrs && getIsBinding(el);
	      if (is) {
	        return is;
	      } else if (process.env.NODE_ENV !== 'production') {
	        if (tag.indexOf('-') > -1 || /HTMLUnknownElement/.test(el.toString()) &&
	        // Chrome returns unknown for several HTML5 elements.
	        // https://code.google.com/p/chromium/issues/detail?id=540526
	        !/^(data|time|rtc|rb)$/.test(tag)) {
	          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly?');
	        }
	      }
	    }
	  } else if (hasAttrs) {
	    return getIsBinding(el);
	  }
	}
	
	/**
	 * Get "is" binding from an element.
	 *
	 * @param {Element} el
	 * @return {Object|undefined}
	 */
	
	function getIsBinding(el) {
	  // dynamic syntax
	  var exp = getAttr(el, 'is');
	  if (exp != null) {
	    return { id: exp };
	  } else {
	    exp = getBindAttr(el, 'is');
	    if (exp != null) {
	      return { id: exp, dynamic: true };
	    }
	  }
	}
	
	/**
	 * Set a prop's initial value on a vm and its data object.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} value
	 */
	
	function initProp(vm, prop, value) {
	  var key = prop.path;
	  vm[key] = vm._data[key] = assertProp(prop, value) ? value : undefined;
	}
	
	/**
	 * Assert whether a prop is valid.
	 *
	 * @param {Object} prop
	 * @param {*} value
	 */
	
	function assertProp(prop, value) {
	  // if a prop is not provided and is not required,
	  // skip the check.
	  if (prop.raw === null && !prop.required) {
	    return true;
	  }
	  var options = prop.options;
	  var type = options.type;
	  var valid = true;
	  var expectedType;
	  if (type) {
	    if (type === String) {
	      expectedType = 'string';
	      valid = typeof value === expectedType;
	    } else if (type === Number) {
	      expectedType = 'number';
	      valid = typeof value === 'number';
	    } else if (type === Boolean) {
	      expectedType = 'boolean';
	      valid = typeof value === 'boolean';
	    } else if (type === Function) {
	      expectedType = 'function';
	      valid = typeof value === 'function';
	    } else if (type === Object) {
	      expectedType = 'object';
	      valid = isPlainObject(value);
	    } else if (type === Array) {
	      expectedType = 'array';
	      valid = isArray(value);
	    } else {
	      valid = value instanceof type;
	    }
	  }
	  if (!valid) {
	    process.env.NODE_ENV !== 'production' && warn('Invalid prop: type check failed for ' + prop.path + '="' + prop.raw + '".' + ' Expected ' + formatType(expectedType) + ', got ' + formatValue(value) + '.');
	    return false;
	  }
	  var validator = options.validator;
	  if (validator) {
	    if (!validator.call(null, value)) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid prop: custom validator check failed for ' + prop.path + '="' + prop.raw + '"');
	      return false;
	    }
	  }
	  return true;
	}
	
	function formatType(val) {
	  return val ? val.charAt(0).toUpperCase() + val.slice(1) : 'custom type';
	}
	
	function formatValue(val) {
	  return Object.prototype.toString.call(val).slice(8, -1);
	}
	
	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 *
	 * All strategy functions follow the same signature:
	 *
	 * @param {*} parentVal
	 * @param {*} childVal
	 * @param {Vue} [vm]
	 */
	
	var strats = config.optionMergeStrategies = Object.create(null);
	
	/**
	 * Helper that recursively merges two data objects together.
	 */
	
	function mergeData(to, from) {
	  var key, toVal, fromVal;
	  for (key in from) {
	    toVal = to[key];
	    fromVal = from[key];
	    if (!hasOwn(to, key)) {
	      set(to, key, fromVal);
	    } else if (isObject(toVal) && isObject(fromVal)) {
	      mergeData(toVal, fromVal);
	    }
	  }
	  return to;
	}
	
	/**
	 * Data
	 */
	
	strats.data = function (parentVal, childVal, vm) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal;
	    }
	    if (typeof childVal !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.');
	      return parentVal;
	    }
	    if (!parentVal) {
	      return childVal;
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn() {
	      return mergeData(childVal.call(this), parentVal.call(this));
	    };
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn() {
	      // instance merge
	      var instanceData = typeof childVal === 'function' ? childVal.call(vm) : childVal;
	      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm) : undefined;
	      if (instanceData) {
	        return mergeData(instanceData, defaultData);
	      } else {
	        return defaultData;
	      }
	    };
	  }
	};
	
	/**
	 * El
	 */
	
	strats.el = function (parentVal, childVal, vm) {
	  if (!vm && childVal && typeof childVal !== 'function') {
	    process.env.NODE_ENV !== 'production' && warn('The "el" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.');
	    return;
	  }
	  var ret = childVal || parentVal;
	  // invoke the element factory if this is instance merge
	  return vm && typeof ret === 'function' ? ret.call(vm) : ret;
	};
	
	/**
	 * Hooks and param attributes are merged as arrays.
	 */
	
	strats.init = strats.created = strats.ready = strats.attached = strats.detached = strats.beforeCompile = strats.compiled = strats.beforeDestroy = strats.destroyed = function (parentVal, childVal) {
	  return childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
	};
	
	/**
	 * 0.11 deprecation warning
	 */
	
	strats.paramAttributes = function () {
	  /* istanbul ignore next */
	  process.env.NODE_ENV !== 'production' && warn('"paramAttributes" option has been deprecated in 0.12. ' + 'Use "props" instead.');
	};
	
	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */
	
	function mergeAssets(parentVal, childVal) {
	  var res = Object.create(parentVal);
	  return childVal ? extend(res, guardArrayAssets(childVal)) : res;
	}
	
	config._assetTypes.forEach(function (type) {
	  strats[type + 's'] = mergeAssets;
	});
	
	/**
	 * Events & Watchers.
	 *
	 * Events & watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */
	
	strats.watch = strats.events = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = {};
	  extend(ret, parentVal);
	  for (var key in childVal) {
	    var parent = ret[key];
	    var child = childVal[key];
	    if (parent && !isArray(parent)) {
	      parent = [parent];
	    }
	    ret[key] = parent ? parent.concat(child) : [child];
	  }
	  return ret;
	};
	
	/**
	 * Other object hashes.
	 */
	
	strats.props = strats.methods = strats.computed = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = Object.create(null);
	  extend(ret, parentVal);
	  extend(ret, childVal);
	  return ret;
	};
	
	/**
	 * Default strategy.
	 */
	
	var defaultStrat = function defaultStrat(parentVal, childVal) {
	  return childVal === undefined ? parentVal : childVal;
	};
	
	/**
	 * Make sure component options get converted to actual
	 * constructors.
	 *
	 * @param {Object} options
	 */
	
	function guardComponents(options) {
	  if (options.components) {
	    var components = options.components = guardArrayAssets(options.components);
	    var def;
	    var ids = Object.keys(components);
	    for (var i = 0, l = ids.length; i < l; i++) {
	      var key = ids[i];
	      if (commonTagRE.test(key)) {
	        process.env.NODE_ENV !== 'production' && warn('Do not use built-in HTML elements as component ' + 'id: ' + key);
	        continue;
	      }
	      def = components[key];
	      if (isPlainObject(def)) {
	        components[key] = Vue.extend(def);
	      }
	    }
	  }
	}
	
	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 *
	 * @param {Object} options
	 */
	
	function guardProps(options) {
	  var props = options.props;
	  var i, val;
	  if (isArray(props)) {
	    options.props = {};
	    i = props.length;
	    while (i--) {
	      val = props[i];
	      if (typeof val === 'string') {
	        options.props[val] = null;
	      } else if (val.name) {
	        options.props[val.name] = val;
	      }
	    }
	  } else if (isPlainObject(props)) {
	    var keys = Object.keys(props);
	    i = keys.length;
	    while (i--) {
	      val = props[keys[i]];
	      if (typeof val === 'function') {
	        props[keys[i]] = { type: val };
	      }
	    }
	  }
	}
	
	/**
	 * Guard an Array-format assets option and converted it
	 * into the key-value Object format.
	 *
	 * @param {Object|Array} assets
	 * @return {Object}
	 */
	
	function guardArrayAssets(assets) {
	  if (isArray(assets)) {
	    var res = {};
	    var i = assets.length;
	    var asset;
	    while (i--) {
	      asset = assets[i];
	      var id = typeof asset === 'function' ? asset.options && asset.options.name || asset.id : asset.name || asset.id;
	      if (!id) {
	        process.env.NODE_ENV !== 'production' && warn('Array-syntax assets must provide a "name" or "id" field.');
	      } else {
	        res[id] = asset;
	      }
	    }
	    return res;
	  }
	  return assets;
	}
	
	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 *
	 * @param {Object} parent
	 * @param {Object} child
	 * @param {Vue} [vm] - if vm is present, indicates this is
	 *                     an instantiation merge.
	 */
	
	function mergeOptions(parent, child, vm) {
	  guardComponents(child);
	  guardProps(child);
	  var options = {};
	  var key;
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      parent = mergeOptions(parent, child.mixins[i], vm);
	    }
	  }
	  for (key in parent) {
	    mergeField(key);
	  }
	  for (key in child) {
	    if (!hasOwn(parent, key)) {
	      mergeField(key);
	    }
	  }
	  function mergeField(key) {
	    var strat = strats[key] || defaultStrat;
	    options[key] = strat(parent[key], child[key], vm, key);
	  }
	  return options;
	}
	
	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 *
	 * @param {Object} options
	 * @param {String} type
	 * @param {String} id
	 * @return {Object|Function}
	 */
	
	function resolveAsset(options, type, id) {
	  var assets = options[type];
	  var camelizedId;
	  return assets[id] ||
	  // camelCase ID
	  assets[camelizedId = camelize(id)] ||
	  // Pascal Case ID
	  assets[camelizedId.charAt(0).toUpperCase() + camelizedId.slice(1)];
	}
	
	/**
	 * Assert asset exists
	 */
	
	function assertAsset(val, type, id) {
	  if (!val) {
	    process.env.NODE_ENV !== 'production' && warn('Failed to resolve ' + type + ': ' + id);
	  }
	}
	
	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto)
	
	/**
	 * Intercept mutating methods and emit events
	 */
	
	;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  def(arrayMethods, method, function mutator() {
	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length;
	    var args = new Array(i);
	    while (i--) {
	      args[i] = arguments[i];
	    }
	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted;
	    switch (method) {
	      case 'push':
	        inserted = args;
	        break;
	      case 'unshift':
	        inserted = args;
	        break;
	      case 'splice':
	        inserted = args.slice(2);
	        break;
	    }
	    if (inserted) ob.observeArray(inserted);
	    // notify change
	    ob.dep.notify();
	    return result;
	  });
	});
	
	/**
	 * Swap the element at the given index with a new value
	 * and emits corresponding event.
	 *
	 * @param {Number} index
	 * @param {*} val
	 * @return {*} - replaced element
	 */
	
	def(arrayProto, '$set', function $set(index, val) {
	  if (index >= this.length) {
	    this.length = index + 1;
	  }
	  return this.splice(index, 1, val)[0];
	});
	
	/**
	 * Convenience method to remove the element at given index.
	 *
	 * @param {Number} index
	 * @param {*} val
	 */
	
	def(arrayProto, '$remove', function $remove(item) {
	  /* istanbul ignore if */
	  if (!this.length) return;
	  var index = indexOf(this, item);
	  if (index > -1) {
	    return this.splice(index, 1);
	  }
	});
	
	var uid$3 = 0;
	
	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 *
	 * @constructor
	 */
	function Dep() {
	  this.id = uid$3++;
	  this.subs = [];
	}
	
	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null;
	
	/**
	 * Add a directive subscriber.
	 *
	 * @param {Directive} sub
	 */
	
	Dep.prototype.addSub = function (sub) {
	  this.subs.push(sub);
	};
	
	/**
	 * Remove a directive subscriber.
	 *
	 * @param {Directive} sub
	 */
	
	Dep.prototype.removeSub = function (sub) {
	  this.subs.$remove(sub);
	};
	
	/**
	 * Add self as a dependency to the target watcher.
	 */
	
	Dep.prototype.depend = function () {
	  Dep.target.addDep(this);
	};
	
	/**
	 * Notify all subscribers of a new value.
	 */
	
	Dep.prototype.notify = function () {
	  // stablize the subscriber list first
	  var subs = toArray(this.subs);
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};
	
	var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
	
	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 *
	 * @param {Array|Object} value
	 * @constructor
	 */
	
	function Observer(value) {
	  this.value = value;
	  this.dep = new Dep();
	  def(value, '__ob__', this);
	  if (isArray(value)) {
	    var augment = hasProto ? protoAugment : copyAugment;
	    augment(value, arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	}
	
	// Instance methods
	
	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 *
	 * @param {Object} obj
	 */
	
	Observer.prototype.walk = function (obj) {
	  var keys = Object.keys(obj);
	  var i = keys.length;
	  while (i--) {
	    this.convert(keys[i], obj[keys[i]]);
	  }
	};
	
	/**
	 * Observe a list of Array items.
	 *
	 * @param {Array} items
	 */
	
	Observer.prototype.observeArray = function (items) {
	  var i = items.length;
	  while (i--) {
	    observe(items[i]);
	  }
	};
	
	/**
	 * Convert a property into getter/setter so we can emit
	 * the events when the property is accessed/changed.
	 *
	 * @param {String} key
	 * @param {*} val
	 */
	
	Observer.prototype.convert = function (key, val) {
	  defineReactive(this.value, key, val);
	};
	
	/**
	 * Add an owner vm, so that when $set/$delete mutations
	 * happen we can notify owner vms to proxy the keys and
	 * digest the watchers. This is only called when the object
	 * is observed as an instance's root $data.
	 *
	 * @param {Vue} vm
	 */
	
	Observer.prototype.addVm = function (vm) {
	  (this.vms || (this.vms = [])).push(vm);
	};
	
	/**
	 * Remove an owner vm. This is called when the object is
	 * swapped out as an instance's $data object.
	 *
	 * @param {Vue} vm
	 */
	
	Observer.prototype.removeVm = function (vm) {
	  this.vms.$remove(vm);
	};
	
	// helpers
	
	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */
	
	function protoAugment(target, src) {
	  target.__proto__ = src;
	}
	
	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */
	
	function copyAugment(target, src, keys) {
	  var i = keys.length;
	  var key;
	  while (i--) {
	    key = keys[i];
	    def(target, key, src[key]);
	  }
	}
	
	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 *
	 * @param {*} value
	 * @param {Vue} [vm]
	 * @return {Observer|undefined}
	 * @static
	 */
	
	function observe(value, vm) {
	  if (!value || typeof value !== 'object') {
	    return;
	  }
	  var ob;
	  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if ((isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
	    ob = new Observer(value);
	  }
	  if (ob && vm) {
	    ob.addVm(vm);
	  }
	  return ob;
	}
	
	/**
	 * Define a reactive property on an Object.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 */
	
	function defineReactive(obj, key, val) {
	  var dep = new Dep();
	
	  // cater for pre-defined getter/setters
	  var getter, setter;
	  if (config.convertAllProperties) {
	    var property = Object.getOwnPropertyDescriptor(obj, key);
	    if (property && property.configurable === false) {
	      return;
	    }
	    getter = property && property.get;
	    setter = property && property.set;
	  }
	
	  var childOb = observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter() {
	      var value = getter ? getter.call(obj) : val;
	      if (Dep.target) {
	        dep.depend();
	        if (childOb) {
	          childOb.dep.depend();
	        }
	        if (isArray(value)) {
	          for (var e, i = 0, l = value.length; i < l; i++) {
	            e = value[i];
	            e && e.__ob__ && e.__ob__.dep.depend();
	          }
	        }
	      }
	      return value;
	    },
	    set: function reactiveSetter(newVal) {
	      var value = getter ? getter.call(obj) : val;
	      if (newVal === value) {
	        return;
	      }
	      if (setter) {
	        setter.call(obj, newVal);
	      } else {
	        val = newVal;
	      }
	      childOb = observe(newVal);
	      dep.notify();
	    }
	  });
	}
	
	var util = Object.freeze({
		defineReactive: defineReactive,
		set: set,
		del: del,
		hasOwn: hasOwn,
		isLiteral: isLiteral,
		isReserved: isReserved,
		_toString: _toString,
		toNumber: toNumber,
		toBoolean: toBoolean,
		stripQuotes: stripQuotes,
		camelize: camelize,
		hyphenate: hyphenate,
		classify: classify,
		bind: bind$1,
		toArray: toArray,
		extend: extend,
		isObject: isObject,
		isPlainObject: isPlainObject,
		def: def,
		debounce: _debounce,
		indexOf: indexOf,
		cancellable: cancellable,
		looseEqual: looseEqual,
		isArray: isArray,
		hasProto: hasProto,
		inBrowser: inBrowser,
		isIE9: isIE9,
		isAndroid: isAndroid,
		get transitionProp () { return transitionProp; },
		get transitionEndEvent () { return transitionEndEvent; },
		get animationProp () { return animationProp; },
		get animationEndEvent () { return animationEndEvent; },
		nextTick: nextTick,
		query: query,
		inDoc: inDoc,
		getAttr: getAttr,
		getBindAttr: getBindAttr,
		hasBindAttr: hasBindAttr,
		before: before,
		after: after,
		remove: remove,
		prepend: prepend,
		replace: replace,
		on: on$1,
		off: off,
		addClass: addClass,
		removeClass: removeClass,
		extractContent: extractContent,
		trimNode: trimNode,
		isTemplate: isTemplate,
		createAnchor: createAnchor,
		findRef: findRef,
		mapNodeRange: mapNodeRange,
		removeNodeRange: removeNodeRange,
		mergeOptions: mergeOptions,
		resolveAsset: resolveAsset,
		assertAsset: assertAsset,
		checkComponentAttr: checkComponentAttr,
		initProp: initProp,
		assertProp: assertProp,
		commonTagRE: commonTagRE,
		get warn () { return warn; }
	});
	
	var uid = 0;
	
	function initMixin (Vue) {
	
	  /**
	   * The main init sequence. This is called for every
	   * instance, including ones that are created from extended
	   * constructors.
	   *
	   * @param {Object} options - this options object should be
	   *                           the result of merging class
	   *                           options and the options passed
	   *                           in to the constructor.
	   */
	
	  Vue.prototype._init = function (options) {
	
	    options = options || {};
	
	    this.$el = null;
	    this.$parent = options.parent;
	    this.$root = this.$parent ? this.$parent.$root : this;
	    this.$children = [];
	    this.$refs = {}; // child vm references
	    this.$els = {}; // element references
	    this._watchers = []; // all watchers as an array
	    this._directives = []; // all directives
	
	    // a uid
	    this._uid = uid++;
	
	    // a flag to avoid this being observed
	    this._isVue = true;
	
	    // events bookkeeping
	    this._events = {}; // registered callbacks
	    this._eventsCount = {}; // for $broadcast optimization
	
	    // fragment instance properties
	    this._isFragment = false;
	    this._fragment = // @type {DocumentFragment}
	    this._fragmentStart = // @type {Text|Comment}
	    this._fragmentEnd = null; // @type {Text|Comment}
	
	    // lifecycle state
	    this._isCompiled = this._isDestroyed = this._isReady = this._isAttached = this._isBeingDestroyed = false;
	    this._unlinkFn = null;
	
	    // context:
	    // if this is a transcluded component, context
	    // will be the common parent vm of this instance
	    // and its host.
	    this._context = options._context || this.$parent;
	
	    // scope:
	    // if this is inside an inline v-for, the scope
	    // will be the intermediate scope created for this
	    // repeat fragment. this is used for linking props
	    // and container directives.
	    this._scope = options._scope;
	
	    // fragment:
	    // if this instance is compiled inside a Fragment, it
	    // needs to reigster itself as a child of that fragment
	    // for attach/detach to work properly.
	    this._frag = options._frag;
	    if (this._frag) {
	      this._frag.children.push(this);
	    }
	
	    // push self into parent / transclusion host
	    if (this.$parent) {
	      this.$parent.$children.push(this);
	    }
	
	    // merge options.
	    options = this.$options = mergeOptions(this.constructor.options, options, this);
	
	    // set ref
	    this._updateRef();
	
	    // initialize data as empty object.
	    // it will be filled up in _initScope().
	    this._data = {};
	
	    // call init hook
	    this._callHook('init');
	
	    // initialize data observation and scope inheritance.
	    this._initState();
	
	    // setup event system and option events.
	    this._initEvents();
	
	    // call created hook
	    this._callHook('created');
	
	    // if `el` option is passed, start compilation.
	    if (options.el) {
	      this.$mount(options.el);
	    }
	  };
	}
	
	var pathCache = new Cache(1000);
	
	// actions
	var APPEND = 0;
	var PUSH = 1;
	var INC_SUB_PATH_DEPTH = 2;
	var PUSH_SUB_PATH = 3;
	
	// states
	var BEFORE_PATH = 0;
	var IN_PATH = 1;
	var BEFORE_IDENT = 2;
	var IN_IDENT = 3;
	var IN_SUB_PATH = 4;
	var IN_SINGLE_QUOTE = 5;
	var IN_DOUBLE_QUOTE = 6;
	var AFTER_PATH = 7;
	var ERROR = 8;
	
	var pathStateMachine = [];
	
	pathStateMachine[BEFORE_PATH] = {
	  'ws': [BEFORE_PATH],
	  'ident': [IN_IDENT, APPEND],
	  '[': [IN_SUB_PATH],
	  'eof': [AFTER_PATH]
	};
	
	pathStateMachine[IN_PATH] = {
	  'ws': [IN_PATH],
	  '.': [BEFORE_IDENT],
	  '[': [IN_SUB_PATH],
	  'eof': [AFTER_PATH]
	};
	
	pathStateMachine[BEFORE_IDENT] = {
	  'ws': [BEFORE_IDENT],
	  'ident': [IN_IDENT, APPEND]
	};
	
	pathStateMachine[IN_IDENT] = {
	  'ident': [IN_IDENT, APPEND],
	  '0': [IN_IDENT, APPEND],
	  'number': [IN_IDENT, APPEND],
	  'ws': [IN_PATH, PUSH],
	  '.': [BEFORE_IDENT, PUSH],
	  '[': [IN_SUB_PATH, PUSH],
	  'eof': [AFTER_PATH, PUSH]
	};
	
	pathStateMachine[IN_SUB_PATH] = {
	  "'": [IN_SINGLE_QUOTE, APPEND],
	  '"': [IN_DOUBLE_QUOTE, APPEND],
	  '[': [IN_SUB_PATH, INC_SUB_PATH_DEPTH],
	  ']': [IN_PATH, PUSH_SUB_PATH],
	  'eof': ERROR,
	  'else': [IN_SUB_PATH, APPEND]
	};
	
	pathStateMachine[IN_SINGLE_QUOTE] = {
	  "'": [IN_SUB_PATH, APPEND],
	  'eof': ERROR,
	  'else': [IN_SINGLE_QUOTE, APPEND]
	};
	
	pathStateMachine[IN_DOUBLE_QUOTE] = {
	  '"': [IN_SUB_PATH, APPEND],
	  'eof': ERROR,
	  'else': [IN_DOUBLE_QUOTE, APPEND]
	};
	
	/**
	 * Determine the type of a character in a keypath.
	 *
	 * @param {Char} ch
	 * @return {String} type
	 */
	
	function getPathCharType(ch) {
	  if (ch === undefined) {
	    return 'eof';
	  }
	
	  var code = ch.charCodeAt(0);
	
	  switch (code) {
	    case 0x5B: // [
	    case 0x5D: // ]
	    case 0x2E: // .
	    case 0x22: // "
	    case 0x27: // '
	    case 0x30:
	      // 0
	      return ch;
	
	    case 0x5F: // _
	    case 0x24:
	      // $
	      return 'ident';
	
	    case 0x20: // Space
	    case 0x09: // Tab
	    case 0x0A: // Newline
	    case 0x0D: // Return
	    case 0xA0: // No-break space
	    case 0xFEFF: // Byte Order Mark
	    case 0x2028: // Line Separator
	    case 0x2029:
	      // Paragraph Separator
	      return 'ws';
	  }
	
	  // a-z, A-Z
	  if (code >= 0x61 && code <= 0x7A || code >= 0x41 && code <= 0x5A) {
	    return 'ident';
	  }
	
	  // 1-9
	  if (code >= 0x31 && code <= 0x39) {
	    return 'number';
	  }
	
	  return 'else';
	}
	
	/**
	 * Format a subPath, return its plain form if it is
	 * a literal string or number. Otherwise prepend the
	 * dynamic indicator (*).
	 *
	 * @param {String} path
	 * @return {String}
	 */
	
	function formatSubPath(path) {
	  var trimmed = path.trim();
	  // invalid leading 0
	  if (path.charAt(0) === '0' && isNaN(path)) {
	    return false;
	  }
	  return isLiteral(trimmed) ? stripQuotes(trimmed) : '*' + trimmed;
	}
	
	/**
	 * Parse a string path into an array of segments
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */
	
	function parse(path) {
	  var keys = [];
	  var index = -1;
	  var mode = BEFORE_PATH;
	  var subPathDepth = 0;
	  var c, newChar, key, type, transition, action, typeMap;
	
	  var actions = [];
	
	  actions[PUSH] = function () {
	    if (key !== undefined) {
	      keys.push(key);
	      key = undefined;
	    }
	  };
	
	  actions[APPEND] = function () {
	    if (key === undefined) {
	      key = newChar;
	    } else {
	      key += newChar;
	    }
	  };
	
	  actions[INC_SUB_PATH_DEPTH] = function () {
	    actions[APPEND]();
	    subPathDepth++;
	  };
	
	  actions[PUSH_SUB_PATH] = function () {
	    if (subPathDepth > 0) {
	      subPathDepth--;
	      mode = IN_SUB_PATH;
	      actions[APPEND]();
	    } else {
	      subPathDepth = 0;
	      key = formatSubPath(key);
	      if (key === false) {
	        return false;
	      } else {
	        actions[PUSH]();
	      }
	    }
	  };
	
	  function maybeUnescapeQuote() {
	    var nextChar = path[index + 1];
	    if (mode === IN_SINGLE_QUOTE && nextChar === "'" || mode === IN_DOUBLE_QUOTE && nextChar === '"') {
	      index++;
	      newChar = '\\' + nextChar;
	      actions[APPEND]();
	      return true;
	    }
	  }
	
	  while (mode != null) {
	    index++;
	    c = path[index];
	
	    if (c === '\\' && maybeUnescapeQuote()) {
	      continue;
	    }
	
	    type = getPathCharType(c);
	    typeMap = pathStateMachine[mode];
	    transition = typeMap[type] || typeMap['else'] || ERROR;
	
	    if (transition === ERROR) {
	      return; // parse error
	    }
	
	    mode = transition[0];
	    action = actions[transition[1]];
	    if (action) {
	      newChar = transition[2];
	      newChar = newChar === undefined ? c : newChar;
	      if (action() === false) {
	        return;
	      }
	    }
	
	    if (mode === AFTER_PATH) {
	      keys.raw = path;
	      return keys;
	    }
	  }
	}
	
	/**
	 * External parse that check for a cache hit first
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */
	
	function parsePath(path) {
	  var hit = pathCache.get(path);
	  if (!hit) {
	    hit = parse(path);
	    if (hit) {
	      pathCache.put(path, hit);
	    }
	  }
	  return hit;
	}
	
	/**
	 * Get from an object from a path string
	 *
	 * @param {Object} obj
	 * @param {String} path
	 */
	
	function getPath(obj, path) {
	  return parseExpression(path).get(obj);
	}
	
	/**
	 * Warn against setting non-existent root path on a vm.
	 */
	
	var warnNonExistent;
	if (process.env.NODE_ENV !== 'production') {
	  warnNonExistent = function (path) {
	    warn('You are setting a non-existent path "' + path.raw + '" ' + 'on a vm instance. Consider pre-initializing the property ' + 'with the "data" option for more reliable reactivity ' + 'and better performance.');
	  };
	}
	
	/**
	 * Set on an object from a path
	 *
	 * @param {Object} obj
	 * @param {String | Array} path
	 * @param {*} val
	 */
	
	function setPath(obj, path, val) {
	  var original = obj;
	  if (typeof path === 'string') {
	    path = parse(path);
	  }
	  if (!path || !isObject(obj)) {
	    return false;
	  }
	  var last, key;
	  for (var i = 0, l = path.length; i < l; i++) {
	    last = obj;
	    key = path[i];
	    if (key.charAt(0) === '*') {
	      key = parseExpression(key.slice(1)).get.call(original, original);
	    }
	    if (i < l - 1) {
	      obj = obj[key];
	      if (!isObject(obj)) {
	        obj = {};
	        if (process.env.NODE_ENV !== 'production' && last._isVue) {
	          warnNonExistent(path);
	        }
	        set(last, key, obj);
	      }
	    } else {
	      if (isArray(obj)) {
	        obj.$set(key, val);
	      } else if (key in obj) {
	        obj[key] = val;
	      } else {
	        if (process.env.NODE_ENV !== 'production' && obj._isVue) {
	          warnNonExistent(path);
	        }
	        set(obj, key, val);
	      }
	    }
	  }
	  return true;
	}
	
	var path = Object.freeze({
	  parsePath: parsePath,
	  getPath: getPath,
	  setPath: setPath
	});
	
	var expressionCache = new Cache(1000);
	
	var allowedKeywords = 'Math,Date,this,true,false,null,undefined,Infinity,NaN,' + 'isNaN,isFinite,decodeURI,decodeURIComponent,encodeURI,' + 'encodeURIComponent,parseInt,parseFloat';
	var allowedKeywordsRE = new RegExp('^(' + allowedKeywords.replace(/,/g, '\\b|') + '\\b)');
	
	// keywords that don't make sense inside expressions
	var improperKeywords = 'break,case,class,catch,const,continue,debugger,default,' + 'delete,do,else,export,extends,finally,for,function,if,' + 'import,in,instanceof,let,return,super,switch,throw,try,' + 'var,while,with,yield,enum,await,implements,package,' + 'proctected,static,interface,private,public';
	var improperKeywordsRE = new RegExp('^(' + improperKeywords.replace(/,/g, '\\b|') + '\\b)');
	
	var wsRE = /\s/g;
	var newlineRE = /\n/g;
	var saveRE = /[\{,]\s*[\w\$_]+\s*:|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")|new |typeof |void /g;
	var restoreRE = /"(\d+)"/g;
	var pathTestRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/;
	var identRE = /[^\w$\.](?:[A-Za-z_$][\w$]*)/g;
	var booleanLiteralRE = /^(?:true|false)$/;
	
	/**
	 * Save / Rewrite / Restore
	 *
	 * When rewriting paths found in an expression, it is
	 * possible for the same letter sequences to be found in
	 * strings and Object literal property keys. Therefore we
	 * remove and store these parts in a temporary array, and
	 * restore them after the path rewrite.
	 */
	
	var saved = [];
	
	/**
	 * Save replacer
	 *
	 * The save regex can match two possible cases:
	 * 1. An opening object literal
	 * 2. A string
	 * If matched as a plain string, we need to escape its
	 * newlines, since the string needs to be preserved when
	 * generating the function body.
	 *
	 * @param {String} str
	 * @param {String} isString - str if matched as a string
	 * @return {String} - placeholder with index
	 */
	
	function save(str, isString) {
	  var i = saved.length;
	  saved[i] = isString ? str.replace(newlineRE, '\\n') : str;
	  return '"' + i + '"';
	}
	
	/**
	 * Path rewrite replacer
	 *
	 * @param {String} raw
	 * @return {String}
	 */
	
	function rewrite(raw) {
	  var c = raw.charAt(0);
	  var path = raw.slice(1);
	  if (allowedKeywordsRE.test(path)) {
	    return raw;
	  } else {
	    path = path.indexOf('"') > -1 ? path.replace(restoreRE, restore) : path;
	    return c + 'scope.' + path;
	  }
	}
	
	/**
	 * Restore replacer
	 *
	 * @param {String} str
	 * @param {String} i - matched save index
	 * @return {String}
	 */
	
	function restore(str, i) {
	  return saved[i];
	}
	
	/**
	 * Rewrite an expression, prefixing all path accessors with
	 * `scope.` and generate getter/setter functions.
	 *
	 * @param {String} exp
	 * @return {Function}
	 */
	
	function compileGetter(exp) {
	  if (improperKeywordsRE.test(exp)) {
	    process.env.NODE_ENV !== 'production' && warn('Avoid using reserved keywords in expression: ' + exp);
	  }
	  // reset state
	  saved.length = 0;
	  // save strings and object literal keys
	  var body = exp.replace(saveRE, save).replace(wsRE, '');
	  // rewrite all paths
	  // pad 1 space here becaue the regex matches 1 extra char
	  body = (' ' + body).replace(identRE, rewrite).replace(restoreRE, restore);
	  return makeGetterFn(body);
	}
	
	/**
	 * Build a getter function. Requires eval.
	 *
	 * We isolate the try/catch so it doesn't affect the
	 * optimization of the parse function when it is not called.
	 *
	 * @param {String} body
	 * @return {Function|undefined}
	 */
	
	function makeGetterFn(body) {
	  try {
	    return new Function('scope', 'return ' + body + ';');
	  } catch (e) {
	    process.env.NODE_ENV !== 'production' && warn('Invalid expression. ' + 'Generated function body: ' + body);
	  }
	}
	
	/**
	 * Compile a setter function for the expression.
	 *
	 * @param {String} exp
	 * @return {Function|undefined}
	 */
	
	function compileSetter(exp) {
	  var path = parsePath(exp);
	  if (path) {
	    return function (scope, val) {
	      setPath(scope, path, val);
	    };
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid setter expression: ' + exp);
	  }
	}
	
	/**
	 * Parse an expression into re-written getter/setters.
	 *
	 * @param {String} exp
	 * @param {Boolean} needSet
	 * @return {Function}
	 */
	
	function parseExpression(exp, needSet) {
	  exp = exp.trim();
	  // try cache
	  var hit = expressionCache.get(exp);
	  if (hit) {
	    if (needSet && !hit.set) {
	      hit.set = compileSetter(hit.exp);
	    }
	    return hit;
	  }
	  var res = { exp: exp };
	  res.get = isSimplePath(exp) && exp.indexOf('[') < 0
	  // optimized super simple getter
	  ? makeGetterFn('scope.' + exp)
	  // dynamic getter
	  : compileGetter(exp);
	  if (needSet) {
	    res.set = compileSetter(exp);
	  }
	  expressionCache.put(exp, res);
	  return res;
	}
	
	/**
	 * Check if an expression is a simple path.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */
	
	function isSimplePath(exp) {
	  return pathTestRE.test(exp) &&
	  // don't treat true/false as paths
	  !booleanLiteralRE.test(exp) &&
	  // Math constants e.g. Math.PI, Math.E etc.
	  exp.slice(0, 5) !== 'Math.';
	}
	
	var expression = Object.freeze({
	  parseExpression: parseExpression,
	  isSimplePath: isSimplePath
	});
	
	// we have two separate queues: one for directive updates
	// and one for user watcher registered via $watch().
	// we want to guarantee directive updates to be called
	// before user watchers so that when user watchers are
	// triggered, the DOM would have already been in updated
	// state.
	var queue = [];
	var userQueue = [];
	var has = {};
	var circular = {};
	var waiting = false;
	var internalQueueDepleted = false;
	
	/**
	 * Reset the batcher's state.
	 */
	
	function resetBatcherState() {
	  queue = [];
	  userQueue = [];
	  has = {};
	  circular = {};
	  waiting = internalQueueDepleted = false;
	}
	
	/**
	 * Flush both queues and run the watchers.
	 */
	
	function flushBatcherQueue() {
	  runBatcherQueue(queue);
	  internalQueueDepleted = true;
	  runBatcherQueue(userQueue);
	  // dev tool hook
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV !== 'production') {
	    if (inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
	      window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit('flush');
	    }
	  }
	  resetBatcherState();
	}
	
	/**
	 * Run the watchers in a single queue.
	 *
	 * @param {Array} queue
	 */
	
	function runBatcherQueue(queue) {
	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (var i = 0; i < queue.length; i++) {
	    var watcher = queue[i];
	    var id = watcher.id;
	    has[id] = null;
	    watcher.run();
	    // in dev build, check and stop circular updates.
	    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
	      circular[id] = (circular[id] || 0) + 1;
	      if (circular[id] > config._maxUpdateCount) {
	        queue.splice(has[id], 1);
	        warn('You may have an infinite update loop for watcher ' + 'with expression: ' + watcher.expression);
	      }
	    }
	  }
	}
	
	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 *
	 * @param {Watcher} watcher
	 *   properties:
	 *   - {Number} id
	 *   - {Function} run
	 */
	
	function pushWatcher(watcher) {
	  var id = watcher.id;
	  if (has[id] == null) {
	    // if an internal watcher is pushed, but the internal
	    // queue is already depleted, we run it immediately.
	    if (internalQueueDepleted && !watcher.user) {
	      watcher.run();
	      return;
	    }
	    // push watcher into appropriate queue
	    var q = watcher.user ? userQueue : queue;
	    has[id] = q.length;
	    q.push(watcher);
	    // queue the flush
	    if (!waiting) {
	      waiting = true;
	      nextTick(flushBatcherQueue);
	    }
	  }
	}
	
	var uid$2 = 0;
	
	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 *
	 * @param {Vue} vm
	 * @param {String} expression
	 * @param {Function} cb
	 * @param {Object} options
	 *                 - {Array} filters
	 *                 - {Boolean} twoWay
	 *                 - {Boolean} deep
	 *                 - {Boolean} user
	 *                 - {Boolean} sync
	 *                 - {Boolean} lazy
	 *                 - {Function} [preProcess]
	 *                 - {Function} [postProcess]
	 * @constructor
	 */
	function Watcher(vm, expOrFn, cb, options) {
	  // mix in options
	  if (options) {
	    extend(this, options);
	  }
	  var isFn = typeof expOrFn === 'function';
	  this.vm = vm;
	  vm._watchers.push(this);
	  this.expression = isFn ? expOrFn.toString() : expOrFn;
	  this.cb = cb;
	  this.id = ++uid$2; // uid for batching
	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers
	  this.deps = Object.create(null);
	  this.newDeps = null;
	  this.prevError = null; // for async error stacks
	  // parse expression for getter/setter
	  if (isFn) {
	    this.getter = expOrFn;
	    this.setter = undefined;
	  } else {
	    var res = parseExpression(expOrFn, this.twoWay);
	    this.getter = res.get;
	    this.setter = res.set;
	  }
	  this.value = this.lazy ? undefined : this.get();
	  // state for avoiding false triggers for deep and Array
	  // watchers during vm._digest()
	  this.queued = this.shallow = false;
	}
	
	/**
	 * Add a dependency to this directive.
	 *
	 * @param {Dep} dep
	 */
	
	Watcher.prototype.addDep = function (dep) {
	  var id = dep.id;
	  if (!this.newDeps[id]) {
	    this.newDeps[id] = dep;
	    if (!this.deps[id]) {
	      this.deps[id] = dep;
	      dep.addSub(this);
	    }
	  }
	};
	
	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */
	
	Watcher.prototype.get = function () {
	  this.beforeGet();
	  var scope = this.scope || this.vm;
	  var value;
	  try {
	    value = this.getter.call(scope, scope);
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
	      warn('Error when evaluating expression "' + this.expression + '". ' + (config.debug ? '' : 'Turn on debug mode to see stack trace.'), e);
	    }
	  }
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value);
	  }
	  if (this.preProcess) {
	    value = this.preProcess(value);
	  }
	  if (this.filters) {
	    value = scope._applyFilters(value, null, this.filters, false);
	  }
	  if (this.postProcess) {
	    value = this.postProcess(value);
	  }
	  this.afterGet();
	  return value;
	};
	
	/**
	 * Set the corresponding value with the setter.
	 *
	 * @param {*} value
	 */
	
	Watcher.prototype.set = function (value) {
	  var scope = this.scope || this.vm;
	  if (this.filters) {
	    value = scope._applyFilters(value, this.value, this.filters, true);
	  }
	  try {
	    this.setter.call(scope, scope, value);
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
	      warn('Error when evaluating setter "' + this.expression + '"', e);
	    }
	  }
	  // two-way sync for v-for alias
	  var forContext = scope.$forContext;
	  if (forContext && forContext.alias === this.expression) {
	    if (forContext.filters) {
	      process.env.NODE_ENV !== 'production' && warn('It seems you are using two-way binding on ' + 'a v-for alias (' + this.expression + '), and the ' + 'v-for has filters. This will not work properly. ' + 'Either remove the filters or use an array of ' + 'objects and bind to object properties instead.');
	      return;
	    }
	    forContext._withLock(function () {
	      if (scope.$key) {
	        // original is an object
	        forContext.rawValue[scope.$key] = value;
	      } else {
	        forContext.rawValue.$set(scope.$index, value);
	      }
	    });
	  }
	};
	
	/**
	 * Prepare for dependency collection.
	 */
	
	Watcher.prototype.beforeGet = function () {
	  Dep.target = this;
	  this.newDeps = Object.create(null);
	};
	
	/**
	 * Clean up for dependency collection.
	 */
	
	Watcher.prototype.afterGet = function () {
	  Dep.target = null;
	  var ids = Object.keys(this.deps);
	  var i = ids.length;
	  while (i--) {
	    var id = ids[i];
	    if (!this.newDeps[id]) {
	      this.deps[id].removeSub(this);
	    }
	  }
	  this.deps = this.newDeps;
	};
	
	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 *
	 * @param {Boolean} shallow
	 */
	
	Watcher.prototype.update = function (shallow) {
	  if (this.lazy) {
	    this.dirty = true;
	  } else if (this.sync || !config.async) {
	    this.run();
	  } else {
	    // if queued, only overwrite shallow with non-shallow,
	    // but not the other way around.
	    this.shallow = this.queued ? shallow ? this.shallow : false : !!shallow;
	    this.queued = true;
	    // record before-push error stack in debug mode
	    /* istanbul ignore if */
	    if (process.env.NODE_ENV !== 'production' && config.debug) {
	      this.prevError = new Error('[vue] async stack trace');
	    }
	    pushWatcher(this);
	  }
	};
	
	/**
	 * Batcher job interface.
	 * Will be called by the batcher.
	 */
	
	Watcher.prototype.run = function () {
	  if (this.active) {
	    var value = this.get();
	    if (value !== this.value ||
	    // Deep watchers and Array watchers should fire even
	    // when the value is the same, because the value may
	    // have mutated; but only do so if this is a
	    // non-shallow update (caused by a vm digest).
	    (isArray(value) || this.deep) && !this.shallow) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;
	      // in debug + async mode, when a watcher callbacks
	      // throws, we also throw the saved before-push error
	      // so the full cross-tick stack trace is available.
	      var prevError = this.prevError;
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' && config.debug && prevError) {
	        this.prevError = null;
	        try {
	          this.cb.call(this.vm, value, oldValue);
	        } catch (e) {
	          nextTick(function () {
	            throw prevError;
	          }, 0);
	          throw e;
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue);
	      }
	    }
	    this.queued = this.shallow = false;
	  }
	};
	
	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */
	
	Watcher.prototype.evaluate = function () {
	  // avoid overwriting another watcher that is being
	  // collected.
	  var current = Dep.target;
	  this.value = this.get();
	  this.dirty = false;
	  Dep.target = current;
	};
	
	/**
	 * Depend on all deps collected by this watcher.
	 */
	
	Watcher.prototype.depend = function () {
	  var depIds = Object.keys(this.deps);
	  var i = depIds.length;
	  while (i--) {
	    this.deps[depIds[i]].depend();
	  }
	};
	
	/**
	 * Remove self from all dependencies' subcriber list.
	 */
	
	Watcher.prototype.teardown = function () {
	  if (this.active) {
	    // remove self from vm's watcher list
	    // we can skip this if the vm if being destroyed
	    // which can improve teardown performance.
	    if (!this.vm._isBeingDestroyed) {
	      this.vm._watchers.$remove(this);
	    }
	    var depIds = Object.keys(this.deps);
	    var i = depIds.length;
	    while (i--) {
	      this.deps[depIds[i]].removeSub(this);
	    }
	    this.active = false;
	    this.vm = this.cb = this.value = null;
	  }
	};
	
	/**
	 * Recrusively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 *
	 * @param {*} val
	 */
	
	function traverse(val) {
	  var i, keys;
	  if (isArray(val)) {
	    i = val.length;
	    while (i--) traverse(val[i]);
	  } else if (isObject(val)) {
	    keys = Object.keys(val);
	    i = keys.length;
	    while (i--) traverse(val[keys[i]]);
	  }
	}
	
	var cloak = {
	  bind: function bind() {
	    var el = this.el;
	    this.vm.$once('hook:compiled', function () {
	      el.removeAttribute('v-cloak');
	    });
	  }
	};
	
	var ref = {
	  bind: function bind() {
	    process.env.NODE_ENV !== 'production' && warn('v-ref:' + this.arg + ' must be used on a child ' + 'component. Found on <' + this.el.tagName.toLowerCase() + '>.');
	  }
	};
	
	var el = {
	
	  priority: 1500,
	
	  bind: function bind() {
	    /* istanbul ignore if */
	    if (!this.arg) {
	      return;
	    }
	    var id = this.id = camelize(this.arg);
	    var refs = (this._scope || this.vm).$els;
	    if (hasOwn(refs, id)) {
	      refs[id] = this.el;
	    } else {
	      defineReactive(refs, id, this.el);
	    }
	  },
	
	  unbind: function unbind() {
	    var refs = (this._scope || this.vm).$els;
	    if (refs[this.id] === this.el) {
	      refs[this.id] = null;
	    }
	  }
	};
	
	var prefixes = ['-webkit-', '-moz-', '-ms-'];
	var camelPrefixes = ['Webkit', 'Moz', 'ms'];
	var importantRE = /!important;?$/;
	var propCache = Object.create(null);
	
	var testEl = null;
	
	var style = {
	
	  deep: true,
	
	  update: function update(value) {
	    if (typeof value === 'string') {
	      this.el.style.cssText = value;
	    } else if (isArray(value)) {
	      this.handleObject(value.reduce(extend, {}));
	    } else {
	      this.handleObject(value || {});
	    }
	  },
	
	  handleObject: function handleObject(value) {
	    // cache object styles so that only changed props
	    // are actually updated.
	    var cache = this.cache || (this.cache = {});
	    var name, val;
	    for (name in cache) {
	      if (!(name in value)) {
	        this.handleSingle(name, null);
	        delete cache[name];
	      }
	    }
	    for (name in value) {
	      val = value[name];
	      if (val !== cache[name]) {
	        cache[name] = val;
	        this.handleSingle(name, val);
	      }
	    }
	  },
	
	  handleSingle: function handleSingle(prop, value) {
	    prop = normalize(prop);
	    if (!prop) return; // unsupported prop
	    // cast possible numbers/booleans into strings
	    if (value != null) value += '';
	    if (value) {
	      var isImportant = importantRE.test(value) ? 'important' : '';
	      if (isImportant) {
	        value = value.replace(importantRE, '').trim();
	      }
	      this.el.style.setProperty(prop, value, isImportant);
	    } else {
	      this.el.style.removeProperty(prop);
	    }
	  }
	
	};
	
	/**
	 * Normalize a CSS property name.
	 * - cache result
	 * - auto prefix
	 * - camelCase -> dash-case
	 *
	 * @param {String} prop
	 * @return {String}
	 */
	
	function normalize(prop) {
	  if (propCache[prop]) {
	    return propCache[prop];
	  }
	  var res = prefix(prop);
	  propCache[prop] = propCache[res] = res;
	  return res;
	}
	
	/**
	 * Auto detect the appropriate prefix for a CSS property.
	 * https://gist.github.com/paulirish/523692
	 *
	 * @param {String} prop
	 * @return {String}
	 */
	
	function prefix(prop) {
	  prop = hyphenate(prop);
	  var camel = camelize(prop);
	  var upper = camel.charAt(0).toUpperCase() + camel.slice(1);
	  if (!testEl) {
	    testEl = document.createElement('div');
	  }
	  if (camel in testEl.style) {
	    return prop;
	  }
	  var i = prefixes.length;
	  var prefixed;
	  while (i--) {
	    prefixed = camelPrefixes[i] + upper;
	    if (prefixed in testEl.style) {
	      return prefixes[i] + prop;
	    }
	  }
	}
	
	// xlink
	var xlinkNS = 'http://www.w3.org/1999/xlink';
	var xlinkRE = /^xlink:/;
	
	// these input element attributes should also set their
	// corresponding properties
	var inputProps = {
	  value: 1,
	  checked: 1,
	  selected: 1
	};
	
	// these attributes should set a hidden property for
	// binding v-model to object values
	var modelProps = {
	  value: '_value',
	  'true-value': '_trueValue',
	  'false-value': '_falseValue'
	};
	
	// check for attributes that prohibit interpolations
	var disallowedInterpAttrRE = /^v-|^:|^@|^(is|transition|transition-mode|debounce|track-by|stagger|enter-stagger|leave-stagger)$/;
	
	var bind = {
	
	  priority: 850,
	
	  bind: function bind() {
	    var attr = this.arg;
	    var tag = this.el.tagName;
	    // should be deep watch on object mode
	    if (!attr) {
	      this.deep = true;
	    }
	    // handle interpolation bindings
	    if (this.descriptor.interp) {
	      // only allow binding on native attributes
	      if (disallowedInterpAttrRE.test(attr) || attr === 'name' && (tag === 'PARTIAL' || tag === 'SLOT')) {
	        process.env.NODE_ENV !== 'production' && warn(attr + '="' + this.descriptor.raw + '": ' + 'attribute interpolation is not allowed in Vue.js ' + 'directives and special attributes.');
	        this.el.removeAttribute(attr);
	        this.invalid = true;
	      }
	
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production') {
	        var raw = attr + '="' + this.descriptor.raw + '": ';
	        // warn src
	        if (attr === 'src') {
	          warn(raw + 'interpolation in "src" attribute will cause ' + 'a 404 request. Use v-bind:src instead.');
	        }
	
	        // warn style
	        if (attr === 'style') {
	          warn(raw + 'interpolation in "style" attribute will cause ' + 'the attribute to be discarded in Internet Explorer. ' + 'Use v-bind:style instead.');
	        }
	      }
	    }
	  },
	
	  update: function update(value) {
	    if (this.invalid) {
	      return;
	    }
	    var attr = this.arg;
	    if (this.arg) {
	      this.handleSingle(attr, value);
	    } else {
	      this.handleObject(value || {});
	    }
	  },
	
	  // share object handler with v-bind:class
	  handleObject: style.handleObject,
	
	  handleSingle: function handleSingle(attr, value) {
	    if (inputProps[attr] && attr in this.el) {
	      this.el[attr] = attr === 'value' ? value || '' : // IE9 will set input.value to "null" for null...
	      value;
	    }
	    // set model props
	    var modelProp = modelProps[attr];
	    if (modelProp) {
	      this.el[modelProp] = value;
	      // update v-model if present
	      var model = this.el.__v_model;
	      if (model) {
	        model.listener();
	      }
	    }
	    // do not set value attribute for textarea
	    if (attr === 'value' && this.el.tagName === 'TEXTAREA') {
	      this.el.removeAttribute(attr);
	      return;
	    }
	    // update attribute
	    if (value != null && value !== false) {
	      if (xlinkRE.test(attr)) {
	        this.el.setAttributeNS(xlinkNS, attr, value);
	      } else {
	        this.el.setAttribute(attr, value);
	      }
	    } else {
	      this.el.removeAttribute(attr);
	    }
	  }
	};
	
	// keyCode aliases
	var keyCodes = {
	  esc: 27,
	  tab: 9,
	  enter: 13,
	  space: 32,
	  'delete': 46,
	  up: 38,
	  left: 37,
	  right: 39,
	  down: 40
	};
	
	function keyFilter(handler, keys) {
	  var codes = keys.map(function (key) {
	    var charCode = key.charCodeAt(0);
	    if (charCode > 47 && charCode < 58) {
	      return parseInt(key, 10);
	    }
	    if (key.length === 1) {
	      charCode = key.toUpperCase().charCodeAt(0);
	      if (charCode > 64 && charCode < 91) {
	        return charCode;
	      }
	    }
	    return keyCodes[key];
	  });
	  return function keyHandler(e) {
	    if (codes.indexOf(e.keyCode) > -1) {
	      return handler.call(this, e);
	    }
	  };
	}
	
	function stopFilter(handler) {
	  return function stopHandler(e) {
	    e.stopPropagation();
	    return handler.call(this, e);
	  };
	}
	
	function preventFilter(handler) {
	  return function preventHandler(e) {
	    e.preventDefault();
	    return handler.call(this, e);
	  };
	}
	
	var on = {
	
	  acceptStatement: true,
	  priority: 700,
	
	  bind: function bind() {
	    // deal with iframes
	    if (this.el.tagName === 'IFRAME' && this.arg !== 'load') {
	      var self = this;
	      this.iframeBind = function () {
	        on$1(self.el.contentWindow, self.arg, self.handler);
	      };
	      this.on('load', this.iframeBind);
	    }
	  },
	
	  update: function update(handler) {
	    // stub a noop for v-on with no value,
	    // e.g. @mousedown.prevent
	    if (!this.descriptor.raw) {
	      handler = function () {};
	    }
	
	    if (typeof handler !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn('v-on:' + this.arg + '="' + this.expression + '" expects a function value, ' + 'got ' + handler);
	      return;
	    }
	
	    // apply modifiers
	    if (this.modifiers.stop) {
	      handler = stopFilter(handler);
	    }
	    if (this.modifiers.prevent) {
	      handler = preventFilter(handler);
	    }
	    // key filter
	    var keys = Object.keys(this.modifiers).filter(function (key) {
	      return key !== 'stop' && key !== 'prevent';
	    });
	    if (keys.length) {
	      handler = keyFilter(handler, keys);
	    }
	
	    this.reset();
	    this.handler = handler;
	
	    if (this.iframeBind) {
	      this.iframeBind();
	    } else {
	      on$1(this.el, this.arg, this.handler);
	    }
	  },
	
	  reset: function reset() {
	    var el = this.iframeBind ? this.el.contentWindow : this.el;
	    if (this.handler) {
	      off(el, this.arg, this.handler);
	    }
	  },
	
	  unbind: function unbind() {
	    this.reset();
	  }
	};
	
	var checkbox = {
	
	  bind: function bind() {
	    var self = this;
	    var el = this.el;
	
	    this.getValue = function () {
	      return el.hasOwnProperty('_value') ? el._value : self.params.number ? toNumber(el.value) : el.value;
	    };
	
	    function getBooleanValue() {
	      var val = el.checked;
	      if (val && el.hasOwnProperty('_trueValue')) {
	        return el._trueValue;
	      }
	      if (!val && el.hasOwnProperty('_falseValue')) {
	        return el._falseValue;
	      }
	      return val;
	    }
	
	    this.listener = function () {
	      var model = self._watcher.value;
	      if (isArray(model)) {
	        var val = self.getValue();
	        if (el.checked) {
	          if (indexOf(model, val) < 0) {
	            model.push(val);
	          }
	        } else {
	          model.$remove(val);
	        }
	      } else {
	        self.set(getBooleanValue());
	      }
	    };
	
	    this.on('change', this.listener);
	    if (el.hasAttribute('checked')) {
	      this.afterBind = this.listener;
	    }
	  },
	
	  update: function update(value) {
	    var el = this.el;
	    if (isArray(value)) {
	      el.checked = indexOf(value, this.getValue()) > -1;
	    } else {
	      if (el.hasOwnProperty('_trueValue')) {
	        el.checked = looseEqual(value, el._trueValue);
	      } else {
	        el.checked = !!value;
	      }
	    }
	  }
	};
	
	var select = {
	
	  bind: function bind() {
	    var self = this;
	    var el = this.el;
	
	    // method to force update DOM using latest value.
	    this.forceUpdate = function () {
	      if (self._watcher) {
	        self.update(self._watcher.get());
	      }
	    };
	
	    // check if this is a multiple select
	    var multiple = this.multiple = el.hasAttribute('multiple');
	
	    // attach listener
	    this.listener = function () {
	      var value = getValue(el, multiple);
	      value = self.params.number ? isArray(value) ? value.map(toNumber) : toNumber(value) : value;
	      self.set(value);
	    };
	    this.on('change', this.listener);
	
	    // if has initial value, set afterBind
	    var initValue = getValue(el, multiple, true);
	    if (multiple && initValue.length || !multiple && initValue !== null) {
	      this.afterBind = this.listener;
	    }
	
	    // All major browsers except Firefox resets
	    // selectedIndex with value -1 to 0 when the element
	    // is appended to a new parent, therefore we have to
	    // force a DOM update whenever that happens...
	    this.vm.$on('hook:attached', this.forceUpdate);
	  },
	
	  update: function update(value) {
	    var el = this.el;
	    el.selectedIndex = -1;
	    var multi = this.multiple && isArray(value);
	    var options = el.options;
	    var i = options.length;
	    var op, val;
	    while (i--) {
	      op = options[i];
	      val = op.hasOwnProperty('_value') ? op._value : op.value;
	      /* eslint-disable eqeqeq */
	      op.selected = multi ? indexOf$1(value, val) > -1 : looseEqual(value, val);
	      /* eslint-enable eqeqeq */
	    }
	  },
	
	  unbind: function unbind() {
	    /* istanbul ignore next */
	    this.vm.$off('hook:attached', this.forceUpdate);
	  }
	};
	
	/**
	 * Get select value
	 *
	 * @param {SelectElement} el
	 * @param {Boolean} multi
	 * @param {Boolean} init
	 * @return {Array|*}
	 */
	
	function getValue(el, multi, init) {
	  var res = multi ? [] : null;
	  var op, val, selected;
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    op = el.options[i];
	    selected = init ? op.hasAttribute('selected') : op.selected;
	    if (selected) {
	      val = op.hasOwnProperty('_value') ? op._value : op.value;
	      if (multi) {
	        res.push(val);
	      } else {
	        return val;
	      }
	    }
	  }
	  return res;
	}
	
	/**
	 * Native Array.indexOf uses strict equal, but in this
	 * case we need to match string/numbers with custom equal.
	 *
	 * @param {Array} arr
	 * @param {*} val
	 */
	
	function indexOf$1(arr, val) {
	  var i = arr.length;
	  while (i--) {
	    if (looseEqual(arr[i], val)) {
	      return i;
	    }
	  }
	  return -1;
	}
	
	var radio = {
	
	  bind: function bind() {
	    var self = this;
	    var el = this.el;
	
	    this.getValue = function () {
	      // value overwrite via v-bind:value
	      if (el.hasOwnProperty('_value')) {
	        return el._value;
	      }
	      var val = el.value;
	      if (self.params.number) {
	        val = toNumber(val);
	      }
	      return val;
	    };
	
	    this.listener = function () {
	      self.set(self.getValue());
	    };
	    this.on('change', this.listener);
	
	    if (el.hasAttribute('checked')) {
	      this.afterBind = this.listener;
	    }
	  },
	
	  update: function update(value) {
	    this.el.checked = looseEqual(value, this.getValue());
	  }
	};
	
	var text$2 = {
	
	  bind: function bind() {
	    var self = this;
	    var el = this.el;
	    var isRange = el.type === 'range';
	    var lazy = this.params.lazy;
	    var number = this.params.number;
	    var debounce = this.params.debounce;
	
	    // handle composition events.
	    //   http://blog.evanyou.me/2014/01/03/composition-event/
	    // skip this for Android because it handles composition
	    // events quite differently. Android doesn't trigger
	    // composition events for language input methods e.g.
	    // Chinese, but instead triggers them for spelling
	    // suggestions... (see Discussion/#162)
	    var composing = false;
	    if (!isAndroid && !isRange) {
	      this.on('compositionstart', function () {
	        composing = true;
	      });
	      this.on('compositionend', function () {
	        composing = false;
	        // in IE11 the "compositionend" event fires AFTER
	        // the "input" event, so the input handler is blocked
	        // at the end... have to call it here.
	        //
	        // #1327: in lazy mode this is unecessary.
	        if (!lazy) {
	          self.listener();
	        }
	      });
	    }
	
	    // prevent messing with the input when user is typing,
	    // and force update on blur.
	    this.focused = false;
	    if (!isRange) {
	      this.on('focus', function () {
	        self.focused = true;
	      });
	      this.on('blur', function () {
	        self.focused = false;
	        self.listener();
	      });
	    }
	
	    // Now attach the main listener
	    this.listener = function () {
	      if (composing) return;
	      var val = number || isRange ? toNumber(el.value) : el.value;
	      self.set(val);
	      // force update on next tick to avoid lock & same value
	      // also only update when user is not typing
	      nextTick(function () {
	        if (self._bound && !self.focused) {
	          self.update(self._watcher.value);
	        }
	      });
	    };
	
	    // apply debounce
	    if (debounce) {
	      this.listener = _debounce(this.listener, debounce);
	    }
	
	    // Support jQuery events, since jQuery.trigger() doesn't
	    // trigger native events in some cases and some plugins
	    // rely on $.trigger()
	    //
	    // We want to make sure if a listener is attached using
	    // jQuery, it is also removed with jQuery, that's why
	    // we do the check for each directive instance and
	    // store that check result on itself. This also allows
	    // easier test coverage control by unsetting the global
	    // jQuery variable in tests.
	    this.hasjQuery = typeof jQuery === 'function';
	    if (this.hasjQuery) {
	      jQuery(el).on('change', this.listener);
	      if (!lazy) {
	        jQuery(el).on('input', this.listener);
	      }
	    } else {
	      this.on('change', this.listener);
	      if (!lazy) {
	        this.on('input', this.listener);
	      }
	    }
	
	    // IE9 doesn't fire input event on backspace/del/cut
	    if (!lazy && isIE9) {
	      this.on('cut', function () {
	        nextTick(self.listener);
	      });
	      this.on('keyup', function (e) {
	        if (e.keyCode === 46 || e.keyCode === 8) {
	          self.listener();
	        }
	      });
	    }
	
	    // set initial value if present
	    if (el.hasAttribute('value') || el.tagName === 'TEXTAREA' && el.value.trim()) {
	      this.afterBind = this.listener;
	    }
	  },
	
	  update: function update(value) {
	    this.el.value = _toString(value);
	  },
	
	  unbind: function unbind() {
	    var el = this.el;
	    if (this.hasjQuery) {
	      jQuery(el).off('change', this.listener);
	      jQuery(el).off('input', this.listener);
	    }
	  }
	};
	
	var handlers = {
	  text: text$2,
	  radio: radio,
	  select: select,
	  checkbox: checkbox
	};
	
	var model = {
	
	  priority: 800,
	  twoWay: true,
	  handlers: handlers,
	  params: ['lazy', 'number', 'debounce'],
	
	  /**
	   * Possible elements:
	   *   <select>
	   *   <textarea>
	   *   <input type="*">
	   *     - text
	   *     - checkbox
	   *     - radio
	   *     - number
	   */
	
	  bind: function bind() {
	    // friendly warning...
	    this.checkFilters();
	    if (this.hasRead && !this.hasWrite) {
	      process.env.NODE_ENV !== 'production' && warn('It seems you are using a read-only filter with ' + 'v-model. You might want to use a two-way filter ' + 'to ensure correct behavior.');
	    }
	    var el = this.el;
	    var tag = el.tagName;
	    var handler;
	    if (tag === 'INPUT') {
	      handler = handlers[el.type] || handlers.text;
	    } else if (tag === 'SELECT') {
	      handler = handlers.select;
	    } else if (tag === 'TEXTAREA') {
	      handler = handlers.text;
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('v-model does not support element type: ' + tag);
	      return;
	    }
	    el.__v_model = this;
	    handler.bind.call(this);
	    this.update = handler.update;
	    this._unbind = handler.unbind;
	  },
	
	  /**
	   * Check read/write filter stats.
	   */
	
	  checkFilters: function checkFilters() {
	    var filters = this.filters;
	    if (!filters) return;
	    var i = filters.length;
	    while (i--) {
	      var filter = resolveAsset(this.vm.$options, 'filters', filters[i].name);
	      if (typeof filter === 'function' || filter.read) {
	        this.hasRead = true;
	      }
	      if (filter.write) {
	        this.hasWrite = true;
	      }
	    }
	  },
	
	  unbind: function unbind() {
	    this.el.__v_model = null;
	    this._unbind && this._unbind();
	  }
	};
	
	var show = {
	
	  bind: function bind() {
	    // check else block
	    var next = this.el.nextElementSibling;
	    if (next && getAttr(next, 'v-else') !== null) {
	      this.elseEl = next;
	    }
	  },
	
	  update: function update(value) {
	    this.apply(this.el, value);
	    if (this.elseEl) {
	      this.apply(this.elseEl, !value);
	    }
	  },
	
	  apply: function apply(el, value) {
	    applyTransition(el, value ? 1 : -1, function () {
	      el.style.display = value ? '' : 'none';
	    }, this.vm);
	  }
	};
	
	var templateCache = new Cache(1000);
	var idSelectorCache = new Cache(1000);
	
	var map = {
	  efault: [0, '', ''],
	  legend: [1, '<fieldset>', '</fieldset>'],
	  tr: [2, '<table><tbody>', '</tbody></table>'],
	  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>']
	};
	
	map.td = map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];
	
	map.option = map.optgroup = [1, '<select multiple="multiple">', '</select>'];
	
	map.thead = map.tbody = map.colgroup = map.caption = map.tfoot = [1, '<table>', '</table>'];
	
	map.g = map.defs = map.symbol = map.use = map.image = map.text = map.circle = map.ellipse = map.line = map.path = map.polygon = map.polyline = map.rect = [1, '<svg ' + 'xmlns="http://www.w3.org/2000/svg" ' + 'xmlns:xlink="http://www.w3.org/1999/xlink" ' + 'xmlns:ev="http://www.w3.org/2001/xml-events"' + 'version="1.1">', '</svg>'];
	
	/**
	 * Check if a node is a supported template node with a
	 * DocumentFragment content.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */
	
	function isRealTemplate(node) {
	  return isTemplate(node) && node.content instanceof DocumentFragment;
	}
	
	var tagRE$1 = /<([\w:]+)/;
	var entityRE = /&\w+;|&#\d+;|&#x[\dA-F]+;/;
	
	/**
	 * Convert a string template to a DocumentFragment.
	 * Determines correct wrapping by tag types. Wrapping
	 * strategy found in jQuery & component/domify.
	 *
	 * @param {String} templateString
	 * @param {Boolean} raw
	 * @return {DocumentFragment}
	 */
	
	function stringToFragment(templateString, raw) {
	  // try a cache hit first
	  var hit = templateCache.get(templateString);
	  if (hit) {
	    return hit;
	  }
	
	  var frag = document.createDocumentFragment();
	  var tagMatch = templateString.match(tagRE$1);
	  var entityMatch = entityRE.test(templateString);
	
	  if (!tagMatch && !entityMatch) {
	    // text only, return a single text node.
	    frag.appendChild(document.createTextNode(templateString));
	  } else {
	
	    var tag = tagMatch && tagMatch[1];
	    var wrap = map[tag] || map.efault;
	    var depth = wrap[0];
	    var prefix = wrap[1];
	    var suffix = wrap[2];
	    var node = document.createElement('div');
	
	    if (!raw) {
	      templateString = templateString.trim();
	    }
	    node.innerHTML = prefix + templateString + suffix;
	    while (depth--) {
	      node = node.lastChild;
	    }
	
	    var child;
	    /* eslint-disable no-cond-assign */
	    while (child = node.firstChild) {
	      /* eslint-enable no-cond-assign */
	      frag.appendChild(child);
	    }
	  }
	
	  templateCache.put(templateString, frag);
	  return frag;
	}
	
	/**
	 * Convert a template node to a DocumentFragment.
	 *
	 * @param {Node} node
	 * @return {DocumentFragment}
	 */
	
	function nodeToFragment(node) {
	  // if its a template tag and the browser supports it,
	  // its content is already a document fragment.
	  if (isRealTemplate(node)) {
	    trimNode(node.content);
	    return node.content;
	  }
	  // script template
	  if (node.tagName === 'SCRIPT') {
	    return stringToFragment(node.textContent);
	  }
	  // normal node, clone it to avoid mutating the original
	  var clonedNode = cloneNode(node);
	  var frag = document.createDocumentFragment();
	  var child;
	  /* eslint-disable no-cond-assign */
	  while (child = clonedNode.firstChild) {
	    /* eslint-enable no-cond-assign */
	    frag.appendChild(child);
	  }
	  trimNode(frag);
	  return frag;
	}
	
	// Test for the presence of the Safari template cloning bug
	// https://bugs.webkit.org/showug.cgi?id=137755
	var hasBrokenTemplate = (function () {
	  /* istanbul ignore else */
	  if (inBrowser) {
	    var a = document.createElement('div');
	    a.innerHTML = '<template>1</template>';
	    return !a.cloneNode(true).firstChild.innerHTML;
	  } else {
	    return false;
	  }
	})();
	
	// Test for IE10/11 textarea placeholder clone bug
	var hasTextareaCloneBug = (function () {
	  /* istanbul ignore else */
	  if (inBrowser) {
	    var t = document.createElement('textarea');
	    t.placeholder = 't';
	    return t.cloneNode(true).value === 't';
	  } else {
	    return false;
	  }
	})();
	
	/**
	 * 1. Deal with Safari cloning nested <template> bug by
	 *    manually cloning all template instances.
	 * 2. Deal with IE10/11 textarea placeholder bug by setting
	 *    the correct value after cloning.
	 *
	 * @param {Element|DocumentFragment} node
	 * @return {Element|DocumentFragment}
	 */
	
	function cloneNode(node) {
	  if (!node.querySelectorAll) {
	    return node.cloneNode();
	  }
	  var res = node.cloneNode(true);
	  var i, original, cloned;
	  /* istanbul ignore if */
	  if (hasBrokenTemplate) {
	    var tempClone = res;
	    if (isRealTemplate(node)) {
	      node = node.content;
	      tempClone = res.content;
	    }
	    original = node.querySelectorAll('template');
	    if (original.length) {
	      cloned = tempClone.querySelectorAll('template');
	      i = cloned.length;
	      while (i--) {
	        cloned[i].parentNode.replaceChild(cloneNode(original[i]), cloned[i]);
	      }
	    }
	  }
	  /* istanbul ignore if */
	  if (hasTextareaCloneBug) {
	    if (node.tagName === 'TEXTAREA') {
	      res.value = node.value;
	    } else {
	      original = node.querySelectorAll('textarea');
	      if (original.length) {
	        cloned = res.querySelectorAll('textarea');
	        i = cloned.length;
	        while (i--) {
	          cloned[i].value = original[i].value;
	        }
	      }
	    }
	  }
	  return res;
	}
	
	/**
	 * Process the template option and normalizes it into a
	 * a DocumentFragment that can be used as a partial or a
	 * instance template.
	 *
	 * @param {*} template
	 *        Possible values include:
	 *        - DocumentFragment object
	 *        - Node object of type Template
	 *        - id selector: '#some-template-id'
	 *        - template string: '<div><span>{{msg}}</span></div>'
	 * @param {Boolean} shouldClone
	 * @param {Boolean} raw
	 *        inline HTML interpolation. Do not check for id
	 *        selector and keep whitespace in the string.
	 * @return {DocumentFragment|undefined}
	 */
	
	function parseTemplate(template, shouldClone, raw) {
	  var node, frag;
	
	  // if the template is already a document fragment,
	  // do nothing
	  if (template instanceof DocumentFragment) {
	    trimNode(template);
	    return shouldClone ? cloneNode(template) : template;
	  }
	
	  if (typeof template === 'string') {
	    // id selector
	    if (!raw && template.charAt(0) === '#') {
	      // id selector can be cached too
	      frag = idSelectorCache.get(template);
	      if (!frag) {
	        node = document.getElementById(template.slice(1));
	        if (node) {
	          frag = nodeToFragment(node);
	          // save selector to cache
	          idSelectorCache.put(template, frag);
	        }
	      }
	    } else {
	      // normal string template
	      frag = stringToFragment(template, raw);
	    }
	  } else if (template.nodeType) {
	    // a direct node
	    frag = nodeToFragment(template);
	  }
	
	  return frag && shouldClone ? cloneNode(frag) : frag;
	}
	
	var template = Object.freeze({
	  cloneNode: cloneNode,
	  parseTemplate: parseTemplate
	});
	
	/**
	 * Abstraction for a partially-compiled fragment.
	 * Can optionally compile content with a child scope.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Vue} [host]
	 * @param {Object} [scope]
	 */
	function Fragment(linker, vm, frag, host, scope, parentFrag) {
	  this.children = [];
	  this.childFrags = [];
	  this.vm = vm;
	  this.scope = scope;
	  this.inserted = false;
	  this.parentFrag = parentFrag;
	  if (parentFrag) {
	    parentFrag.childFrags.push(this);
	  }
	  this.unlink = linker(vm, frag, host, scope, this);
	  var single = this.single = frag.childNodes.length === 1 &&
	  // do not go single mode if the only node is an anchor
	  !frag.childNodes[0].__vue_anchor;
	  if (single) {
	    this.node = frag.childNodes[0];
	    this.before = singleBefore;
	    this.remove = singleRemove;
	  } else {
	    this.node = createAnchor('fragment-start');
	    this.end = createAnchor('fragment-end');
	    this.frag = frag;
	    prepend(this.node, frag);
	    frag.appendChild(this.end);
	    this.before = multiBefore;
	    this.remove = multiRemove;
	  }
	  this.node.__vfrag__ = this;
	}
	
	/**
	 * Call attach/detach for all components contained within
	 * this fragment. Also do so recursively for all child
	 * fragments.
	 *
	 * @param {Function} hook
	 */
	
	Fragment.prototype.callHook = function (hook) {
	  var i, l;
	  for (i = 0, l = this.children.length; i < l; i++) {
	    hook(this.children[i]);
	  }
	  for (i = 0, l = this.childFrags.length; i < l; i++) {
	    this.childFrags[i].callHook(hook);
	  }
	};
	
	/**
	 * Destroy the fragment.
	 */
	
	Fragment.prototype.destroy = function () {
	  if (this.parentFrag) {
	    this.parentFrag.childFrags.$remove(this);
	  }
	  this.unlink();
	};
	
	/**
	 * Insert fragment before target, single node version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */
	
	function singleBefore(target, withTransition) {
	  this.inserted = true;
	  var method = withTransition !== false ? beforeWithTransition : before;
	  method(this.node, target, this.vm);
	  if (inDoc(this.node)) {
	    this.callHook(attach);
	  }
	}
	
	/**
	 * Remove fragment, single node version
	 */
	
	function singleRemove() {
	  this.inserted = false;
	  var shouldCallRemove = inDoc(this.node);
	  var self = this;
	  self.callHook(destroyChild);
	  removeWithTransition(this.node, this.vm, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach);
	    }
	    self.destroy();
	  });
	}
	
	/**
	 * Insert fragment before target, multi-nodes version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */
	
	function multiBefore(target, withTransition) {
	  this.inserted = true;
	  var vm = this.vm;
	  var method = withTransition !== false ? beforeWithTransition : before;
	  mapNodeRange(this.node, this.end, function (node) {
	    method(node, target, vm);
	  });
	  if (inDoc(this.node)) {
	    this.callHook(attach);
	  }
	}
	
	/**
	 * Remove fragment, multi-nodes version
	 */
	
	function multiRemove() {
	  this.inserted = false;
	  var self = this;
	  var shouldCallRemove = inDoc(this.node);
	  self.callHook(destroyChild);
	  removeNodeRange(this.node, this.end, this.vm, this.frag, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach);
	    }
	    self.destroy();
	  });
	}
	
	/**
	 * Call attach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */
	
	function attach(child) {
	  if (!child._isAttached) {
	    child._callHook('attached');
	  }
	}
	
	/**
	 * Call destroy for all contained instances,
	 * with remove:false and defer:true.
	 * Defer is necessary because we need to
	 * keep the children to call detach hooks
	 * on them.
	 *
	 * @param {Vue} child
	 */
	
	function destroyChild(child) {
	  child.$destroy(false, true);
	}
	
	/**
	 * Call detach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */
	
	function detach(child) {
	  if (child._isAttached) {
	    child._callHook('detached');
	  }
	}
	
	var linkerCache = new Cache(5000);
	
	/**
	 * A factory that can be used to create instances of a
	 * fragment. Caches the compiled linker if possible.
	 *
	 * @param {Vue} vm
	 * @param {Element|String} el
	 */
	function FragmentFactory(vm, el) {
	  this.vm = vm;
	  var template;
	  var isString = typeof el === 'string';
	  if (isString || isTemplate(el)) {
	    template = parseTemplate(el, true);
	  } else {
	    template = document.createDocumentFragment();
	    template.appendChild(el);
	  }
	  this.template = template;
	  // linker can be cached, but only for components
	  var linker;
	  var cid = vm.constructor.cid;
	  if (cid > 0) {
	    var cacheId = cid + (isString ? el : el.outerHTML);
	    linker = linkerCache.get(cacheId);
	    if (!linker) {
	      linker = compile(template, vm.$options, true);
	      linkerCache.put(cacheId, linker);
	    }
	  } else {
	    linker = compile(template, vm.$options, true);
	  }
	  this.linker = linker;
	}
	
	/**
	 * Create a fragment instance with given host and scope.
	 *
	 * @param {Vue} host
	 * @param {Object} scope
	 * @param {Fragment} parentFrag
	 */
	
	FragmentFactory.prototype.create = function (host, scope, parentFrag) {
	  var frag = cloneNode(this.template);
	  return new Fragment(this.linker, this.vm, frag, host, scope, parentFrag);
	};
	
	var vIf = {
	
	  priority: 2000,
	
	  bind: function bind() {
	    var el = this.el;
	    if (!el.__vue__) {
	      // check else block
	      var next = el.nextElementSibling;
	      if (next && getAttr(next, 'v-else') !== null) {
	        remove(next);
	        this.elseFactory = new FragmentFactory(this.vm, next);
	      }
	      // check main block
	      this.anchor = createAnchor('v-if');
	      replace(el, this.anchor);
	      this.factory = new FragmentFactory(this.vm, el);
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('v-if="' + this.expression + '" cannot be ' + 'used on an instance root element.');
	      this.invalid = true;
	    }
	  },
	
	  update: function update(value) {
	    if (this.invalid) return;
	    if (value) {
	      if (!this.frag) {
	        this.insert();
	      }
	    } else {
	      this.remove();
	    }
	  },
	
	  insert: function insert() {
	    if (this.elseFrag) {
	      this.elseFrag.remove();
	      this.elseFrag = null;
	    }
	    this.frag = this.factory.create(this._host, this._scope, this._frag);
	    this.frag.before(this.anchor);
	  },
	
	  remove: function remove() {
	    if (this.frag) {
	      this.frag.remove();
	      this.frag = null;
	    }
	    if (this.elseFactory && !this.elseFrag) {
	      this.elseFrag = this.elseFactory.create(this._host, this._scope, this._frag);
	      this.elseFrag.before(this.anchor);
	    }
	  },
	
	  unbind: function unbind() {
	    if (this.frag) {
	      this.frag.destroy();
	    }
	  }
	};
	
	var uid$1 = 0;
	
	var vFor = {
	
	  priority: 2000,
	
	  params: ['track-by', 'stagger', 'enter-stagger', 'leave-stagger'],
	
	  bind: function bind() {
	    // support "item in items" syntax
	    var inMatch = this.expression.match(/(.*) in (.*)/);
	    if (inMatch) {
	      var itMatch = inMatch[1].match(/\((.*),(.*)\)/);
	      if (itMatch) {
	        this.iterator = itMatch[1].trim();
	        this.alias = itMatch[2].trim();
	      } else {
	        this.alias = inMatch[1].trim();
	      }
	      this.expression = inMatch[2];
	    }
	
	    if (!this.alias) {
	      process.env.NODE_ENV !== 'production' && warn('Alias is required in v-for.');
	      return;
	    }
	
	    // uid as a cache identifier
	    this.id = '__v-for__' + ++uid$1;
	
	    // check if this is an option list,
	    // so that we know if we need to update the <select>'s
	    // v-model when the option list has changed.
	    // because v-model has a lower priority than v-for,
	    // the v-model is not bound here yet, so we have to
	    // retrive it in the actual updateModel() function.
	    var tag = this.el.tagName;
	    this.isOption = (tag === 'OPTION' || tag === 'OPTGROUP') && this.el.parentNode.tagName === 'SELECT';
	
	    // setup anchor nodes
	    this.start = createAnchor('v-for-start');
	    this.end = createAnchor('v-for-end');
	    replace(this.el, this.end);
	    before(this.start, this.end);
	
	    // cache
	    this.cache = Object.create(null);
	
	    // fragment factory
	    this.factory = new FragmentFactory(this.vm, this.el);
	  },
	
	  update: function update(data) {
	    this.diff(data);
	    this.updateRef();
	    this.updateModel();
	  },
	
	  /**
	   * Diff, based on new data and old data, determine the
	   * minimum amount of DOM manipulations needed to make the
	   * DOM reflect the new data Array.
	   *
	   * The algorithm diffs the new data Array by storing a
	   * hidden reference to an owner vm instance on previously
	   * seen data. This allows us to achieve O(n) which is
	   * better than a levenshtein distance based algorithm,
	   * which is O(m * n).
	   *
	   * @param {Array} data
	   */
	
	  diff: function diff(data) {
	    // check if the Array was converted from an Object
	    var item = data[0];
	    var convertedFromObject = this.fromObject = isObject(item) && hasOwn(item, '$key') && hasOwn(item, '$value');
	
	    var trackByKey = this.params.trackBy;
	    var oldFrags = this.frags;
	    var frags = this.frags = new Array(data.length);
	    var alias = this.alias;
	    var iterator = this.iterator;
	    var start = this.start;
	    var end = this.end;
	    var inDocument = inDoc(start);
	    var init = !oldFrags;
	    var i, l, frag, key, value, primitive;
	
	    // First pass, go through the new Array and fill up
	    // the new frags array. If a piece of data has a cached
	    // instance for it, we reuse it. Otherwise build a new
	    // instance.
	    for (i = 0, l = data.length; i < l; i++) {
	      item = data[i];
	      key = convertedFromObject ? item.$key : null;
	      value = convertedFromObject ? item.$value : item;
	      primitive = !isObject(value);
	      frag = !init && this.getCachedFrag(value, i, key);
	      if (frag) {
	        // reusable fragment
	        frag.reused = true;
	        // update $index
	        frag.scope.$index = i;
	        // update $key
	        if (key) {
	          frag.scope.$key = key;
	        }
	        // update iterator
	        if (iterator) {
	          frag.scope[iterator] = key !== null ? key : i;
	        }
	        // update data for track-by, object repeat &
	        // primitive values.
	        if (trackByKey || convertedFromObject || primitive) {
	          frag.scope[alias] = value;
	        }
	      } else {
	        // new isntance
	        frag = this.create(value, alias, i, key);
	        frag.fresh = !init;
	      }
	      frags[i] = frag;
	      if (init) {
	        frag.before(end);
	      }
	    }
	
	    // we're done for the initial render.
	    if (init) {
	      return;
	    }
	
	    // Second pass, go through the old fragments and
	    // destroy those who are not reused (and remove them
	    // from cache)
	    var removalIndex = 0;
	    var totalRemoved = oldFrags.length - frags.length;
	    for (i = 0, l = oldFrags.length; i < l; i++) {
	      frag = oldFrags[i];
	      if (!frag.reused) {
	        this.deleteCachedFrag(frag);
	        this.remove(frag, removalIndex++, totalRemoved, inDocument);
	      }
	    }
	
	    // Final pass, move/insert new fragments into the
	    // right place.
	    var targetPrev, prevEl, currentPrev;
	    var insertionIndex = 0;
	    for (i = 0, l = frags.length; i < l; i++) {
	      frag = frags[i];
	      // this is the frag that we should be after
	      targetPrev = frags[i - 1];
	      prevEl = targetPrev ? targetPrev.staggerCb ? targetPrev.staggerAnchor : targetPrev.end || targetPrev.node : start;
	      if (frag.reused && !frag.staggerCb) {
	        currentPrev = findPrevFrag(frag, start, this.id);
	        if (currentPrev !== targetPrev && (!currentPrev ||
	        // optimization for moving a single item.
	        // thanks to suggestions by @livoras in #1807
	        findPrevFrag(currentPrev, start, this.id) !== targetPrev)) {
	          this.move(frag, prevEl);
	        }
	      } else {
	        // new instance, or still in stagger.
	        // insert with updated stagger index.
	        this.insert(frag, insertionIndex++, prevEl, inDocument);
	      }
	      frag.reused = frag.fresh = false;
	    }
	  },
	
	  /**
	   * Create a new fragment instance.
	   *
	   * @param {*} value
	   * @param {String} alias
	   * @param {Number} index
	   * @param {String} [key]
	   * @return {Fragment}
	   */
	
	  create: function create(value, alias, index, key) {
	    var host = this._host;
	    // create iteration scope
	    var parentScope = this._scope || this.vm;
	    var scope = Object.create(parentScope);
	    // ref holder for the scope
	    scope.$refs = Object.create(parentScope.$refs);
	    scope.$els = Object.create(parentScope.$els);
	    // make sure point $parent to parent scope
	    scope.$parent = parentScope;
	    // for two-way binding on alias
	    scope.$forContext = this;
	    // define scope properties
	    defineReactive(scope, alias, value);
	    defineReactive(scope, '$index', index);
	    if (key) {
	      defineReactive(scope, '$key', key);
	    } else if (scope.$key) {
	      // avoid accidental fallback
	      def(scope, '$key', null);
	    }
	    if (this.iterator) {
	      defineReactive(scope, this.iterator, key !== null ? key : index);
	    }
	    var frag = this.factory.create(host, scope, this._frag);
	    frag.forId = this.id;
	    this.cacheFrag(value, frag, index, key);
	    return frag;
	  },
	
	  /**
	   * Update the v-ref on owner vm.
	   */
	
	  updateRef: function updateRef() {
	    var ref = this.descriptor.ref;
	    if (!ref) return;
	    var hash = (this._scope || this.vm).$refs;
	    var refs;
	    if (!this.fromObject) {
	      refs = this.frags.map(findVmFromFrag);
	    } else {
	      refs = {};
	      this.frags.forEach(function (frag) {
	        refs[frag.scope.$key] = findVmFromFrag(frag);
	      });
	    }
	    hash[ref] = refs;
	  },
	
	  /**
	   * For option lists, update the containing v-model on
	   * parent <select>.
	   */
	
	  updateModel: function updateModel() {
	    if (this.isOption) {
	      var parent = this.start.parentNode;
	      var model = parent && parent.__v_model;
	      if (model) {
	        model.forceUpdate();
	      }
	    }
	  },
	
	  /**
	   * Insert a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Node} prevEl
	   * @param {Boolean} inDocument
	   */
	
	  insert: function insert(frag, index, prevEl, inDocument) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel();
	      frag.staggerCb = null;
	    }
	    var staggerAmount = this.getStagger(frag, index, null, 'enter');
	    if (inDocument && staggerAmount) {
	      // create an anchor and insert it synchronously,
	      // so that we can resolve the correct order without
	      // worrying about some elements not inserted yet
	      var anchor = frag.staggerAnchor;
	      if (!anchor) {
	        anchor = frag.staggerAnchor = createAnchor('stagger-anchor');
	        anchor.__vfrag__ = frag;
	      }
	      after(anchor, prevEl);
	      var op = frag.staggerCb = cancellable(function () {
	        frag.staggerCb = null;
	        frag.before(anchor);
	        remove(anchor);
	      });
	      setTimeout(op, staggerAmount);
	    } else {
	      frag.before(prevEl.nextSibling);
	    }
	  },
	
	  /**
	   * Remove a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {Boolean} inDocument
	   */
	
	  remove: function remove(frag, index, total, inDocument) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel();
	      frag.staggerCb = null;
	      // it's not possible for the same frag to be removed
	      // twice, so if we have a pending stagger callback,
	      // it means this frag is queued for enter but removed
	      // before its transition started. Since it is already
	      // destroyed, we can just leave it in detached state.
	      return;
	    }
	    var staggerAmount = this.getStagger(frag, index, total, 'leave');
	    if (inDocument && staggerAmount) {
	      var op = frag.staggerCb = cancellable(function () {
	        frag.staggerCb = null;
	        frag.remove();
	      });
	      setTimeout(op, staggerAmount);
	    } else {
	      frag.remove();
	    }
	  },
	
	  /**
	   * Move a fragment to a new position.
	   * Force no transition.
	   *
	   * @param {Fragment} frag
	   * @param {Node} prevEl
	   */
	
	  move: function move(frag, prevEl) {
	    frag.before(prevEl.nextSibling, false);
	  },
	
	  /**
	   * Cache a fragment using track-by or the object key.
	   *
	   * @param {*} value
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {String} [key]
	   */
	
	  cacheFrag: function cacheFrag(value, frag, index, key) {
	    var trackByKey = this.params.trackBy;
	    var cache = this.cache;
	    var primitive = !isObject(value);
	    var id;
	    if (key || trackByKey || primitive) {
	      id = trackByKey ? trackByKey === '$index' ? index : value[trackByKey] : key || value;
	      if (!cache[id]) {
	        cache[id] = frag;
	      } else if (trackByKey !== '$index') {
	        process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	      }
	    } else {
	      id = this.id;
	      if (hasOwn(value, id)) {
	        if (value[id] === null) {
	          value[id] = frag;
	        } else {
	          process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	        }
	      } else {
	        def(value, id, frag);
	      }
	    }
	    frag.raw = value;
	  },
	
	  /**
	   * Get a cached fragment from the value/index/key
	   *
	   * @param {*} value
	   * @param {Number} index
	   * @param {String} key
	   * @return {Fragment}
	   */
	
	  getCachedFrag: function getCachedFrag(value, index, key) {
	    var trackByKey = this.params.trackBy;
	    var primitive = !isObject(value);
	    var frag;
	    if (key || trackByKey || primitive) {
	      var id = trackByKey ? trackByKey === '$index' ? index : value[trackByKey] : key || value;
	      frag = this.cache[id];
	    } else {
	      frag = value[this.id];
	    }
	    if (frag && (frag.reused || frag.fresh)) {
	      process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	    }
	    return frag;
	  },
	
	  /**
	   * Delete a fragment from cache.
	   *
	   * @param {Fragment} frag
	   */
	
	  deleteCachedFrag: function deleteCachedFrag(frag) {
	    var value = frag.raw;
	    var trackByKey = this.params.trackBy;
	    var scope = frag.scope;
	    var index = scope.$index;
	    // fix #948: avoid accidentally fall through to
	    // a parent repeater which happens to have $key.
	    var key = hasOwn(scope, '$key') && scope.$key;
	    var primitive = !isObject(value);
	    if (trackByKey || key || primitive) {
	      var id = trackByKey ? trackByKey === '$index' ? index : value[trackByKey] : key || value;
	      this.cache[id] = null;
	    } else {
	      value[this.id] = null;
	      frag.raw = null;
	    }
	  },
	
	  /**
	   * Get the stagger amount for an insertion/removal.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {String} type
	   */
	
	  getStagger: function getStagger(frag, index, total, type) {
	    type = type + 'Stagger';
	    var trans = frag.node.__v_trans;
	    var hooks = trans && trans.hooks;
	    var hook = hooks && (hooks[type] || hooks.stagger);
	    return hook ? hook.call(frag, index, total) : index * parseInt(this.params[type] || this.params.stagger, 10);
	  },
	
	  /**
	   * Pre-process the value before piping it through the
	   * filters. This is passed to and called by the watcher.
	   */
	
	  _preProcess: function _preProcess(value) {
	    // regardless of type, store the un-filtered raw value.
	    this.rawValue = value;
	    return value;
	  },
	
	  /**
	   * Post-process the value after it has been piped through
	   * the filters. This is passed to and called by the watcher.
	   *
	   * It is necessary for this to be called during the
	   * wathcer's dependency collection phase because we want
	   * the v-for to update when the source Object is mutated.
	   */
	
	  _postProcess: function _postProcess(value) {
	    if (isArray(value)) {
	      return value;
	    } else if (isPlainObject(value)) {
	      // convert plain object to array.
	      var keys = Object.keys(value);
	      var i = keys.length;
	      var res = new Array(i);
	      var key;
	      while (i--) {
	        key = keys[i];
	        res[i] = {
	          $key: key,
	          $value: value[key]
	        };
	      }
	      return res;
	    } else {
	      if (typeof value === 'number') {
	        value = range(value);
	      }
	      return value || [];
	    }
	  },
	
	  unbind: function unbind() {
	    if (this.descriptor.ref) {
	      (this._scope || this.vm).$refs[this.descriptor.ref] = null;
	    }
	    if (this.frags) {
	      var i = this.frags.length;
	      var frag;
	      while (i--) {
	        frag = this.frags[i];
	        this.deleteCachedFrag(frag);
	        frag.destroy();
	      }
	    }
	  }
	};
	
	/**
	 * Helper to find the previous element that is a fragment
	 * anchor. This is necessary because a destroyed frag's
	 * element could still be lingering in the DOM before its
	 * leaving transition finishes, but its inserted flag
	 * should have been set to false so we can skip them.
	 *
	 * If this is a block repeat, we want to make sure we only
	 * return frag that is bound to this v-for. (see #929)
	 *
	 * @param {Fragment} frag
	 * @param {Comment|Text} anchor
	 * @param {String} id
	 * @return {Fragment}
	 */
	
	function findPrevFrag(frag, anchor, id) {
	  var el = frag.node.previousSibling;
	  /* istanbul ignore if */
	  if (!el) return;
	  frag = el.__vfrag__;
	  while ((!frag || frag.forId !== id || !frag.inserted) && el !== anchor) {
	    el = el.previousSibling;
	    /* istanbul ignore if */
	    if (!el) return;
	    frag = el.__vfrag__;
	  }
	  return frag;
	}
	
	/**
	 * Find a vm from a fragment.
	 *
	 * @param {Fragment} frag
	 * @return {Vue|undefined}
	 */
	
	function findVmFromFrag(frag) {
	  var node = frag.node;
	  // handle multi-node frag
	  if (frag.end) {
	    while (!node.__vue__ && node !== frag.end && node.nextSibling) {
	      node = node.nextSibling;
	    }
	  }
	  return node.__vue__;
	}
	
	/**
	 * Create a range array from given number.
	 *
	 * @param {Number} n
	 * @return {Array}
	 */
	
	function range(n) {
	  var i = -1;
	  var ret = new Array(n);
	  while (++i < n) {
	    ret[i] = i;
	  }
	  return ret;
	}
	
	if (process.env.NODE_ENV !== 'production') {
	  vFor.warnDuplicate = function (value) {
	    warn('Duplicate value found in v-for="' + this.descriptor.raw + '": ' + JSON.stringify(value) + '. Use track-by="$index" if ' + 'you are expecting duplicate values.');
	  };
	}
	
	var html = {
	
	  bind: function bind() {
	    // a comment node means this is a binding for
	    // {{{ inline unescaped html }}}
	    if (this.el.nodeType === 8) {
	      // hold nodes
	      this.nodes = [];
	      // replace the placeholder with proper anchor
	      this.anchor = createAnchor('v-html');
	      replace(this.el, this.anchor);
	    }
	  },
	
	  update: function update(value) {
	    value = _toString(value);
	    if (this.nodes) {
	      this.swap(value);
	    } else {
	      this.el.innerHTML = value;
	    }
	  },
	
	  swap: function swap(value) {
	    // remove old nodes
	    var i = this.nodes.length;
	    while (i--) {
	      remove(this.nodes[i]);
	    }
	    // convert new value to a fragment
	    // do not attempt to retrieve from id selector
	    var frag = parseTemplate(value, true, true);
	    // save a reference to these nodes so we can remove later
	    this.nodes = toArray(frag.childNodes);
	    before(frag, this.anchor);
	  }
	};
	
	var text = {
	
	  bind: function bind() {
	    this.attr = this.el.nodeType === 3 ? 'data' : 'textContent';
	  },
	
	  update: function update(value) {
	    this.el[this.attr] = _toString(value);
	  }
	};
	
	// must export plain object
	var publicDirectives = {
	  text: text,
	  html: html,
	  'for': vFor,
	  'if': vIf,
	  show: show,
	  model: model,
	  on: on,
	  bind: bind,
	  el: el,
	  ref: ref,
	  cloak: cloak
	};
	
	var queue$1 = [];
	var queued = false;
	
	/**
	 * Push a job into the queue.
	 *
	 * @param {Function} job
	 */
	
	function pushJob(job) {
	  queue$1.push(job);
	  if (!queued) {
	    queued = true;
	    nextTick(flush);
	  }
	}
	
	/**
	 * Flush the queue, and do one forced reflow before
	 * triggering transitions.
	 */
	
	function flush() {
	  // Force layout
	  var f = document.documentElement.offsetHeight;
	  for (var i = 0; i < queue$1.length; i++) {
	    queue$1[i]();
	  }
	  queue$1 = [];
	  queued = false;
	  // dummy return, so js linters don't complain about
	  // unused variable f
	  return f;
	}
	
	var TYPE_TRANSITION = 1;
	var TYPE_ANIMATION = 2;
	var transDurationProp = transitionProp + 'Duration';
	var animDurationProp = animationProp + 'Duration';
	
	/**
	 * A Transition object that encapsulates the state and logic
	 * of the transition.
	 *
	 * @param {Element} el
	 * @param {String} id
	 * @param {Object} hooks
	 * @param {Vue} vm
	 */
	function Transition(el, id, hooks, vm) {
	  this.id = id;
	  this.el = el;
	  this.enterClass = id + '-enter';
	  this.leaveClass = id + '-leave';
	  this.hooks = hooks;
	  this.vm = vm;
	  // async state
	  this.pendingCssEvent = this.pendingCssCb = this.cancel = this.pendingJsCb = this.op = this.cb = null;
	  this.justEntered = false;
	  this.entered = this.left = false;
	  this.typeCache = {};
	  // bind
	  var self = this;['enterNextTick', 'enterDone', 'leaveNextTick', 'leaveDone'].forEach(function (m) {
	    self[m] = bind$1(self[m], self);
	  });
	}
	
	var p$1 = Transition.prototype;
	
	/**
	 * Start an entering transition.
	 *
	 * 1. enter transition triggered
	 * 2. call beforeEnter hook
	 * 3. add enter class
	 * 4. insert/show element
	 * 5. call enter hook (with possible explicit js callback)
	 * 6. reflow
	 * 7. based on transition type:
	 *    - transition:
	 *        remove class now, wait for transitionend,
	 *        then done if there's no explicit js callback.
	 *    - animation:
	 *        wait for animationend, remove class,
	 *        then done if there's no explicit js callback.
	 *    - no css transition:
	 *        done now if there's no explicit js callback.
	 * 8. wait for either done or js callback, then call
	 *    afterEnter hook.
	 *
	 * @param {Function} op - insert/show the element
	 * @param {Function} [cb]
	 */
	
	p$1.enter = function (op, cb) {
	  this.cancelPending();
	  this.callHook('beforeEnter');
	  this.cb = cb;
	  addClass(this.el, this.enterClass);
	  op();
	  this.entered = false;
	  this.callHookWithCb('enter');
	  if (this.entered) {
	    return; // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.enterCancelled;
	  pushJob(this.enterNextTick);
	};
	
	/**
	 * The "nextTick" phase of an entering transition, which is
	 * to be pushed into a queue and executed after a reflow so
	 * that removing the class can trigger a CSS transition.
	 */
	
	p$1.enterNextTick = function () {
	
	  // Important hack:
	  // in Chrome, if a just-entered element is applied the
	  // leave class while its interpolated property still has
	  // a very small value (within one frame), Chrome will
	  // skip the leave transition entirely and not firing the
	  // transtionend event. Therefore we need to protected
	  // against such cases using a one-frame timeout.
	  this.justEntered = true;
	  var self = this;
	  setTimeout(function () {
	    self.justEntered = false;
	  }, 17);
	
	  var enterDone = this.enterDone;
	  var type = this.getCssTransitionType(this.enterClass);
	  if (!this.pendingJsCb) {
	    if (type === TYPE_TRANSITION) {
	      // trigger transition by removing enter class now
	      removeClass(this.el, this.enterClass);
	      this.setupCssCb(transitionEndEvent, enterDone);
	    } else if (type === TYPE_ANIMATION) {
	      this.setupCssCb(animationEndEvent, enterDone);
	    } else {
	      enterDone();
	    }
	  } else if (type === TYPE_TRANSITION) {
	    removeClass(this.el, this.enterClass);
	  }
	};
	
	/**
	 * The "cleanup" phase of an entering transition.
	 */
	
	p$1.enterDone = function () {
	  this.entered = true;
	  this.cancel = this.pendingJsCb = null;
	  removeClass(this.el, this.enterClass);
	  this.callHook('afterEnter');
	  if (this.cb) this.cb();
	};
	
	/**
	 * Start a leaving transition.
	 *
	 * 1. leave transition triggered.
	 * 2. call beforeLeave hook
	 * 3. add leave class (trigger css transition)
	 * 4. call leave hook (with possible explicit js callback)
	 * 5. reflow if no explicit js callback is provided
	 * 6. based on transition type:
	 *    - transition or animation:
	 *        wait for end event, remove class, then done if
	 *        there's no explicit js callback.
	 *    - no css transition:
	 *        done if there's no explicit js callback.
	 * 7. wait for either done or js callback, then call
	 *    afterLeave hook.
	 *
	 * @param {Function} op - remove/hide the element
	 * @param {Function} [cb]
	 */
	
	p$1.leave = function (op, cb) {
	  this.cancelPending();
	  this.callHook('beforeLeave');
	  this.op = op;
	  this.cb = cb;
	  addClass(this.el, this.leaveClass);
	  this.left = false;
	  this.callHookWithCb('leave');
	  if (this.left) {
	    return; // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.leaveCancelled;
	  // only need to handle leaveDone if
	  // 1. the transition is already done (synchronously called
	  //    by the user, which causes this.op set to null)
	  // 2. there's no explicit js callback
	  if (this.op && !this.pendingJsCb) {
	    // if a CSS transition leaves immediately after enter,
	    // the transitionend event never fires. therefore we
	    // detect such cases and end the leave immediately.
	    if (this.justEntered) {
	      this.leaveDone();
	    } else {
	      pushJob(this.leaveNextTick);
	    }
	  }
	};
	
	/**
	 * The "nextTick" phase of a leaving transition.
	 */
	
	p$1.leaveNextTick = function () {
	  var type = this.getCssTransitionType(this.leaveClass);
	  if (type) {
	    var event = type === TYPE_TRANSITION ? transitionEndEvent : animationEndEvent;
	    this.setupCssCb(event, this.leaveDone);
	  } else {
	    this.leaveDone();
	  }
	};
	
	/**
	 * The "cleanup" phase of a leaving transition.
	 */
	
	p$1.leaveDone = function () {
	  this.left = true;
	  this.cancel = this.pendingJsCb = null;
	  this.op();
	  removeClass(this.el, this.leaveClass);
	  this.callHook('afterLeave');
	  if (this.cb) this.cb();
	  this.op = null;
	};
	
	/**
	 * Cancel any pending callbacks from a previously running
	 * but not finished transition.
	 */
	
	p$1.cancelPending = function () {
	  this.op = this.cb = null;
	  var hasPending = false;
	  if (this.pendingCssCb) {
	    hasPending = true;
	    off(this.el, this.pendingCssEvent, this.pendingCssCb);
	    this.pendingCssEvent = this.pendingCssCb = null;
	  }
	  if (this.pendingJsCb) {
	    hasPending = true;
	    this.pendingJsCb.cancel();
	    this.pendingJsCb = null;
	  }
	  if (hasPending) {
	    removeClass(this.el, this.enterClass);
	    removeClass(this.el, this.leaveClass);
	  }
	  if (this.cancel) {
	    this.cancel.call(this.vm, this.el);
	    this.cancel = null;
	  }
	};
	
	/**
	 * Call a user-provided synchronous hook function.
	 *
	 * @param {String} type
	 */
	
	p$1.callHook = function (type) {
	  if (this.hooks && this.hooks[type]) {
	    this.hooks[type].call(this.vm, this.el);
	  }
	};
	
	/**
	 * Call a user-provided, potentially-async hook function.
	 * We check for the length of arguments to see if the hook
	 * expects a `done` callback. If true, the transition's end
	 * will be determined by when the user calls that callback;
	 * otherwise, the end is determined by the CSS transition or
	 * animation.
	 *
	 * @param {String} type
	 */
	
	p$1.callHookWithCb = function (type) {
	  var hook = this.hooks && this.hooks[type];
	  if (hook) {
	    if (hook.length > 1) {
	      this.pendingJsCb = cancellable(this[type + 'Done']);
	    }
	    hook.call(this.vm, this.el, this.pendingJsCb);
	  }
	};
	
	/**
	 * Get an element's transition type based on the
	 * calculated styles.
	 *
	 * @param {String} className
	 * @return {Number}
	 */
	
	p$1.getCssTransitionType = function (className) {
	  /* istanbul ignore if */
	  if (!transitionEndEvent ||
	  // skip CSS transitions if page is not visible -
	  // this solves the issue of transitionend events not
	  // firing until the page is visible again.
	  // pageVisibility API is supported in IE10+, same as
	  // CSS transitions.
	  document.hidden ||
	  // explicit js-only transition
	  this.hooks && this.hooks.css === false ||
	  // element is hidden
	  isHidden(this.el)) {
	    return;
	  }
	  var type = this.typeCache[className];
	  if (type) return type;
	  var inlineStyles = this.el.style;
	  var computedStyles = window.getComputedStyle(this.el);
	  var transDuration = inlineStyles[transDurationProp] || computedStyles[transDurationProp];
	  if (transDuration && transDuration !== '0s') {
	    type = TYPE_TRANSITION;
	  } else {
	    var animDuration = inlineStyles[animDurationProp] || computedStyles[animDurationProp];
	    if (animDuration && animDuration !== '0s') {
	      type = TYPE_ANIMATION;
	    }
	  }
	  if (type) {
	    this.typeCache[className] = type;
	  }
	  return type;
	};
	
	/**
	 * Setup a CSS transitionend/animationend callback.
	 *
	 * @param {String} event
	 * @param {Function} cb
	 */
	
	p$1.setupCssCb = function (event, cb) {
	  this.pendingCssEvent = event;
	  var self = this;
	  var el = this.el;
	  var onEnd = this.pendingCssCb = function (e) {
	    if (e.target === el) {
	      off(el, event, onEnd);
	      self.pendingCssEvent = self.pendingCssCb = null;
	      if (!self.pendingJsCb && cb) {
	        cb();
	      }
	    }
	  };
	  on$1(el, event, onEnd);
	};
	
	/**
	 * Check if an element is hidden - in that case we can just
	 * skip the transition alltogether.
	 *
	 * @param {Element} el
	 * @return {Boolean}
	 */
	
	function isHidden(el) {
	  return !(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
	}
	
	var transition = {
	
	  priority: 1100,
	
	  update: function update(id, oldId) {
	    var el = this.el;
	    // resolve on owner vm
	    var hooks = resolveAsset(this.vm.$options, 'transitions', id);
	    id = id || 'v';
	    // apply on closest vm
	    el.__v_trans = new Transition(el, id, hooks, this.el.__vue__ || this.vm);
	    if (oldId) {
	      removeClass(el, oldId + '-transition');
	    }
	    addClass(el, id + '-transition');
	  }
	};
	
	var bindingModes = config._propBindingModes;
	
	var propDef = {
	
	  bind: function bind() {
	
	    var child = this.vm;
	    var parent = child._context;
	    // passed in from compiler directly
	    var prop = this.descriptor.prop;
	    var childKey = prop.path;
	    var parentKey = prop.parentPath;
	    var twoWay = prop.mode === bindingModes.TWO_WAY;
	
	    var parentWatcher = this.parentWatcher = new Watcher(parent, parentKey, function (val) {
	      if (assertProp(prop, val)) {
	        child[childKey] = val;
	      }
	    }, {
	      twoWay: twoWay,
	      filters: prop.filters,
	      // important: props need to be observed on the
	      // v-for scope if present
	      scope: this._scope
	    });
	
	    // set the child initial value.
	    initProp(child, prop, parentWatcher.value);
	
	    // setup two-way binding
	    if (twoWay) {
	      // important: defer the child watcher creation until
	      // the created hook (after data observation)
	      var self = this;
	      child.$once('hook:created', function () {
	        self.childWatcher = new Watcher(child, childKey, function (val) {
	          parentWatcher.set(val);
	        }, {
	          // ensure sync upward before parent sync down.
	          // this is necessary in cases e.g. the child
	          // mutates a prop array, then replaces it. (#1683)
	          sync: true
	        });
	      });
	    }
	  },
	
	  unbind: function unbind() {
	    this.parentWatcher.teardown();
	    if (this.childWatcher) {
	      this.childWatcher.teardown();
	    }
	  }
	};
	
	var component = {
	
	  priority: 1500,
	
	  params: ['keep-alive', 'transition-mode', 'inline-template'],
	
	  /**
	   * Setup. Two possible usages:
	   *
	   * - static:
	   *   <comp> or <div v-component="comp">
	   *
	   * - dynamic:
	   *   <component :is="view">
	   */
	
	  bind: function bind() {
	    if (!this.el.__vue__) {
	      // keep-alive cache
	      this.keepAlive = this.params.keepAlive;
	      if (this.keepAlive) {
	        this.cache = {};
	      }
	      // check inline-template
	      if (this.params.inlineTemplate) {
	        // extract inline template as a DocumentFragment
	        this.inlineTemplate = extractContent(this.el, true);
	      }
	      // component resolution related state
	      this.pendingComponentCb = this.Component = null;
	      // transition related state
	      this.pendingRemovals = 0;
	      this.pendingRemovalCb = null;
	      // create a ref anchor
	      this.anchor = createAnchor('v-component');
	      replace(this.el, this.anchor);
	      // remove is attribute.
	      // this is removed during compilation, but because compilation is
	      // cached, when the component is used elsewhere this attribute
	      // will remain at link time.
	      this.el.removeAttribute('is');
	      // remove ref, same as above
	      if (this.descriptor.ref) {
	        this.el.removeAttribute('v-ref:' + hyphenate(this.descriptor.ref));
	      }
	      // if static, build right now.
	      if (this.literal) {
	        this.setComponent(this.expression);
	      }
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('cannot mount component "' + this.expression + '" ' + 'on already mounted element: ' + this.el);
	    }
	  },
	
	  /**
	   * Public update, called by the watcher in the dynamic
	   * literal scenario, e.g. <component :is="view">
	   */
	
	  update: function update(value) {
	    if (!this.literal) {
	      this.setComponent(value);
	    }
	  },
	
	  /**
	   * Switch dynamic components. May resolve the component
	   * asynchronously, and perform transition based on
	   * specified transition mode. Accepts a few additional
	   * arguments specifically for vue-router.
	   *
	   * The callback is called when the full transition is
	   * finished.
	   *
	   * @param {String} value
	   * @param {Function} [cb]
	   */
	
	  setComponent: function setComponent(value, cb) {
	    this.invalidatePending();
	    if (!value) {
	      // just remove current
	      this.unbuild(true);
	      this.remove(this.childVM, cb);
	      this.childVM = null;
	    } else {
	      var self = this;
	      this.resolveComponent(value, function () {
	        self.mountComponent(cb);
	      });
	    }
	  },
	
	  /**
	   * Resolve the component constructor to use when creating
	   * the child vm.
	   */
	
	  resolveComponent: function resolveComponent(id, cb) {
	    var self = this;
	    this.pendingComponentCb = cancellable(function (Component) {
	      self.ComponentName = Component.options.name || id;
	      self.Component = Component;
	      cb();
	    });
	    this.vm._resolveComponent(id, this.pendingComponentCb);
	  },
	
	  /**
	   * Create a new instance using the current constructor and
	   * replace the existing instance. This method doesn't care
	   * whether the new component and the old one are actually
	   * the same.
	   *
	   * @param {Function} [cb]
	   */
	
	  mountComponent: function mountComponent(cb) {
	    // actual mount
	    this.unbuild(true);
	    var self = this;
	    var activateHook = this.Component.options.activate;
	    var cached = this.getCached();
	    var newComponent = this.build();
	    if (activateHook && !cached) {
	      this.waitingFor = newComponent;
	      activateHook.call(newComponent, function () {
	        if (self.waitingFor !== newComponent) {
	          return;
	        }
	        self.waitingFor = null;
	        self.transition(newComponent, cb);
	      });
	    } else {
	      // update ref for kept-alive component
	      if (cached) {
	        newComponent._updateRef();
	      }
	      this.transition(newComponent, cb);
	    }
	  },
	
	  /**
	   * When the component changes or unbinds before an async
	   * constructor is resolved, we need to invalidate its
	   * pending callback.
	   */
	
	  invalidatePending: function invalidatePending() {
	    if (this.pendingComponentCb) {
	      this.pendingComponentCb.cancel();
	      this.pendingComponentCb = null;
	    }
	  },
	
	  /**
	   * Instantiate/insert a new child vm.
	   * If keep alive and has cached instance, insert that
	   * instance; otherwise build a new one and cache it.
	   *
	   * @param {Object} [extraOptions]
	   * @return {Vue} - the created instance
	   */
	
	  build: function build(extraOptions) {
	    var cached = this.getCached();
	    if (cached) {
	      return cached;
	    }
	    if (this.Component) {
	      // default options
	      var options = {
	        name: this.ComponentName,
	        el: cloneNode(this.el),
	        template: this.inlineTemplate,
	        // make sure to add the child with correct parent
	        // if this is a transcluded component, its parent
	        // should be the transclusion host.
	        parent: this._host || this.vm,
	        // if no inline-template, then the compiled
	        // linker can be cached for better performance.
	        _linkerCachable: !this.inlineTemplate,
	        _ref: this.descriptor.ref,
	        _asComponent: true,
	        _isRouterView: this._isRouterView,
	        // if this is a transcluded component, context
	        // will be the common parent vm of this instance
	        // and its host.
	        _context: this.vm,
	        // if this is inside an inline v-for, the scope
	        // will be the intermediate scope created for this
	        // repeat fragment. this is used for linking props
	        // and container directives.
	        _scope: this._scope,
	        // pass in the owner fragment of this component.
	        // this is necessary so that the fragment can keep
	        // track of its contained components in order to
	        // call attach/detach hooks for them.
	        _frag: this._frag
	      };
	      // extra options
	      // in 1.0.0 this is used by vue-router only
	      /* istanbul ignore if */
	      if (extraOptions) {
	        extend(options, extraOptions);
	      }
	      var child = new this.Component(options);
	      if (this.keepAlive) {
	        this.cache[this.Component.cid] = child;
	      }
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' && this.el.hasAttribute('transition') && child._isFragment) {
	        warn('Transitions will not work on a fragment instance. ' + 'Template: ' + child.$options.template);
	      }
	      return child;
	    }
	  },
	
	  /**
	   * Try to get a cached instance of the current component.
	   *
	   * @return {Vue|undefined}
	   */
	
	  getCached: function getCached() {
	    return this.keepAlive && this.cache[this.Component.cid];
	  },
	
	  /**
	   * Teardown the current child, but defers cleanup so
	   * that we can separate the destroy and removal steps.
	   *
	   * @param {Boolean} defer
	   */
	
	  unbuild: function unbuild(defer) {
	    if (this.waitingFor) {
	      this.waitingFor.$destroy();
	      this.waitingFor = null;
	    }
	    var child = this.childVM;
	    if (!child || this.keepAlive) {
	      if (child) {
	        // remove ref
	        child._updateRef(true);
	      }
	      return;
	    }
	    // the sole purpose of `deferCleanup` is so that we can
	    // "deactivate" the vm right now and perform DOM removal
	    // later.
	    child.$destroy(false, defer);
	  },
	
	  /**
	   * Remove current destroyed child and manually do
	   * the cleanup after removal.
	   *
	   * @param {Function} cb
	   */
	
	  remove: function remove(child, cb) {
	    var keepAlive = this.keepAlive;
	    if (child) {
	      // we may have a component switch when a previous
	      // component is still being transitioned out.
	      // we want to trigger only one lastest insertion cb
	      // when the existing transition finishes. (#1119)
	      this.pendingRemovals++;
	      this.pendingRemovalCb = cb;
	      var self = this;
	      child.$remove(function () {
	        self.pendingRemovals--;
	        if (!keepAlive) child._cleanup();
	        if (!self.pendingRemovals && self.pendingRemovalCb) {
	          self.pendingRemovalCb();
	          self.pendingRemovalCb = null;
	        }
	      });
	    } else if (cb) {
	      cb();
	    }
	  },
	
	  /**
	   * Actually swap the components, depending on the
	   * transition mode. Defaults to simultaneous.
	   *
	   * @param {Vue} target
	   * @param {Function} [cb]
	   */
	
	  transition: function transition(target, cb) {
	    var self = this;
	    var current = this.childVM;
	    // for devtool inspection
	    if (process.env.NODE_ENV !== 'production') {
	      if (current) current._inactive = true;
	      target._inactive = false;
	    }
	    this.childVM = target;
	    switch (self.params.transitionMode) {
	      case 'in-out':
	        target.$before(self.anchor, function () {
	          self.remove(current, cb);
	        });
	        break;
	      case 'out-in':
	        self.remove(current, function () {
	          target.$before(self.anchor, cb);
	        });
	        break;
	      default:
	        self.remove(current);
	        target.$before(self.anchor, cb);
	    }
	  },
	
	  /**
	   * Unbind.
	   */
	
	  unbind: function unbind() {
	    this.invalidatePending();
	    // Do not defer cleanup when unbinding
	    this.unbuild();
	    // destroy all keep-alive cached instances
	    if (this.cache) {
	      for (var key in this.cache) {
	        this.cache[key].$destroy();
	      }
	      this.cache = null;
	    }
	  }
	};
	
	var vClass = {
	
	  deep: true,
	
	  update: function update(value) {
	    if (value && typeof value === 'string') {
	      this.handleObject(stringToObject(value));
	    } else if (isPlainObject(value)) {
	      this.handleObject(value);
	    } else if (isArray(value)) {
	      this.handleArray(value);
	    } else {
	      this.cleanup();
	    }
	  },
	
	  handleObject: function handleObject(value) {
	    this.cleanup(value);
	    var keys = this.prevKeys = Object.keys(value);
	    for (var i = 0, l = keys.length; i < l; i++) {
	      var key = keys[i];
	      if (value[key]) {
	        addClass(this.el, key);
	      } else {
	        removeClass(this.el, key);
	      }
	    }
	  },
	
	  handleArray: function handleArray(value) {
	    this.cleanup(value);
	    for (var i = 0, l = value.length; i < l; i++) {
	      if (value[i]) {
	        addClass(this.el, value[i]);
	      }
	    }
	    this.prevKeys = value.slice();
	  },
	
	  cleanup: function cleanup(value) {
	    if (this.prevKeys) {
	      var i = this.prevKeys.length;
	      while (i--) {
	        var key = this.prevKeys[i];
	        if (key && (!value || !contains$1(value, key))) {
	          removeClass(this.el, key);
	        }
	      }
	    }
	  }
	};
	
	function stringToObject(value) {
	  var res = {};
	  var keys = value.trim().split(/\s+/);
	  var i = keys.length;
	  while (i--) {
	    res[keys[i]] = true;
	  }
	  return res;
	}
	
	function contains$1(value, key) {
	  return isArray(value) ? value.indexOf(key) > -1 : hasOwn(value, key);
	}
	
	var internalDirectives = {
	  style: style,
	  'class': vClass,
	  component: component,
	  prop: propDef,
	  transition: transition
	};
	
	var propBindingModes = config._propBindingModes;
	var empty = {};
	
	// regexes
	var identRE$1 = /^[$_a-zA-Z]+[\w$]*$/;
	var settablePathRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\[[^\[\]]+\])*$/;
	
	/**
	 * Compile props on a root element and return
	 * a props link function.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Array} propOptions
	 * @return {Function} propsLinkFn
	 */
	
	function compileProps(el, propOptions) {
	  var props = [];
	  var names = Object.keys(propOptions);
	  var i = names.length;
	  var options, name, attr, value, path, parsed, prop;
	  while (i--) {
	    name = names[i];
	    options = propOptions[name] || empty;
	
	    if (process.env.NODE_ENV !== 'production' && name === '$data') {
	      warn('Do not use $data as prop.');
	      continue;
	    }
	
	    // props could contain dashes, which will be
	    // interpreted as minus calculations by the parser
	    // so we need to camelize the path here
	    path = camelize(name);
	    if (!identRE$1.test(path)) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid prop key: "' + name + '". Prop keys ' + 'must be valid identifiers.');
	      continue;
	    }
	
	    prop = {
	      name: name,
	      path: path,
	      options: options,
	      mode: propBindingModes.ONE_WAY,
	      raw: null
	    };
	
	    attr = hyphenate(name);
	    // first check dynamic version
	    if ((value = getBindAttr(el, attr)) === null) {
	      if ((value = getBindAttr(el, attr + '.sync')) !== null) {
	        prop.mode = propBindingModes.TWO_WAY;
	      } else if ((value = getBindAttr(el, attr + '.once')) !== null) {
	        prop.mode = propBindingModes.ONE_TIME;
	      }
	    }
	    if (value !== null) {
	      // has dynamic binding!
	      prop.raw = value;
	      parsed = parseDirective(value);
	      value = parsed.expression;
	      prop.filters = parsed.filters;
	      // check binding type
	      if (isLiteral(value)) {
	        // for expressions containing literal numbers and
	        // booleans, there's no need to setup a prop binding,
	        // so we can optimize them as a one-time set.
	        prop.optimizedLiteral = true;
	      } else {
	        prop.dynamic = true;
	        // check non-settable path for two-way bindings
	        if (process.env.NODE_ENV !== 'production' && prop.mode === propBindingModes.TWO_WAY && !settablePathRE.test(value)) {
	          prop.mode = propBindingModes.ONE_WAY;
	          warn('Cannot bind two-way prop with non-settable ' + 'parent path: ' + value);
	        }
	      }
	      prop.parentPath = value;
	
	      // warn required two-way
	      if (process.env.NODE_ENV !== 'production' && options.twoWay && prop.mode !== propBindingModes.TWO_WAY) {
	        warn('Prop "' + name + '" expects a two-way binding type.');
	      }
	    } else if ((value = getAttr(el, attr)) !== null) {
	      // has literal binding!
	      prop.raw = value;
	    } else if (options.required) {
	      // warn missing required
	      process.env.NODE_ENV !== 'production' && warn('Missing required prop: ' + name);
	    }
	    // push prop
	    props.push(prop);
	  }
	  return makePropsLinkFn(props);
	}
	
	/**
	 * Build a function that applies props to a vm.
	 *
	 * @param {Array} props
	 * @return {Function} propsLinkFn
	 */
	
	function makePropsLinkFn(props) {
	  return function propsLinkFn(vm, scope) {
	    // store resolved props info
	    vm._props = {};
	    var i = props.length;
	    var prop, path, options, value, raw;
	    while (i--) {
	      prop = props[i];
	      raw = prop.raw;
	      path = prop.path;
	      options = prop.options;
	      vm._props[path] = prop;
	      if (raw === null) {
	        // initialize absent prop
	        initProp(vm, prop, getDefault(vm, options));
	      } else if (prop.dynamic) {
	        // dynamic prop
	        if (vm._context) {
	          if (prop.mode === propBindingModes.ONE_TIME) {
	            // one time binding
	            value = (scope || vm._context).$get(prop.parentPath);
	            initProp(vm, prop, value);
	          } else {
	            // dynamic binding
	            vm._bindDir({
	              name: 'prop',
	              def: propDef,
	              prop: prop
	            }, null, null, scope); // el, host, scope
	          }
	        } else {
	            process.env.NODE_ENV !== 'production' && warn('Cannot bind dynamic prop on a root instance' + ' with no parent: ' + prop.name + '="' + raw + '"');
	          }
	      } else if (prop.optimizedLiteral) {
	        // optimized literal, cast it and just set once
	        var stripped = stripQuotes(raw);
	        value = stripped === raw ? toBoolean(toNumber(raw)) : stripped;
	        initProp(vm, prop, value);
	      } else {
	        // string literal, but we need to cater for
	        // Boolean props with no value
	        value = options.type === Boolean && raw === '' ? true : raw;
	        initProp(vm, prop, value);
	      }
	    }
	  };
	}
	
	/**
	 * Get the default value of a prop.
	 *
	 * @param {Vue} vm
	 * @param {Object} options
	 * @return {*}
	 */
	
	function getDefault(vm, options) {
	  // no default, return undefined
	  if (!hasOwn(options, 'default')) {
	    // absent boolean value defaults to false
	    return options.type === Boolean ? false : undefined;
	  }
	  var def = options['default'];
	  // warn against non-factory defaults for Object & Array
	  if (isObject(def)) {
	    process.env.NODE_ENV !== 'production' && warn('Object/Array as default prop values will be shared ' + 'across multiple instances. Use a factory function ' + 'to return the default value instead.');
	  }
	  // call factory function for non-Function types
	  return typeof def === 'function' && options.type !== Function ? def.call(vm) : def;
	}
	
	// special binding prefixes
	var bindRE = /^v-bind:|^:/;
	var onRE = /^v-on:|^@/;
	var argRE = /:(.*)$/;
	var modifierRE = /\.[^\.]+/g;
	var transitionRE = /^(v-bind:|:)?transition$/;
	
	// terminal directives
	var terminalDirectives = ['for', 'if'];
	
	// default directive priority
	var DEFAULT_PRIORITY = 1000;
	
	/**
	 * Compile a template and return a reusable composite link
	 * function, which recursively contains more link functions
	 * inside. This top level compile function would normally
	 * be called on instance root nodes, but can also be used
	 * for partial compilation if the partial argument is true.
	 *
	 * The returned composite link function, when called, will
	 * return an unlink function that tearsdown all directives
	 * created during the linking phase.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Object} options
	 * @param {Boolean} partial
	 * @return {Function}
	 */
	
	function compile(el, options, partial) {
	  // link function for the node itself.
	  var nodeLinkFn = partial || !options._asComponent ? compileNode(el, options) : null;
	  // link function for the childNodes
	  var childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && el.tagName !== 'SCRIPT' && el.hasChildNodes() ? compileNodeList(el.childNodes, options) : null;
	
	  /**
	   * A composite linker function to be called on a already
	   * compiled piece of DOM, which instantiates all directive
	   * instances.
	   *
	   * @param {Vue} vm
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host] - host vm of transcluded content
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - link context fragment
	   * @return {Function|undefined}
	   */
	
	  return function compositeLinkFn(vm, el, host, scope, frag) {
	    // cache childNodes before linking parent, fix #657
	    var childNodes = toArray(el.childNodes);
	    // link
	    var dirs = linkAndCapture(function compositeLinkCapturer() {
	      if (nodeLinkFn) nodeLinkFn(vm, el, host, scope, frag);
	      if (childLinkFn) childLinkFn(vm, childNodes, host, scope, frag);
	    }, vm);
	    return makeUnlinkFn(vm, dirs);
	  };
	}
	
	/**
	 * Apply a linker to a vm/element pair and capture the
	 * directives created during the process.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 */
	
	function linkAndCapture(linker, vm) {
	  var originalDirCount = vm._directives.length;
	  linker();
	  var dirs = vm._directives.slice(originalDirCount);
	  dirs.sort(directiveComparator);
	  for (var i = 0, l = dirs.length; i < l; i++) {
	    dirs[i]._bind();
	  }
	  return dirs;
	}
	
	/**
	 * Directive priority sort comparator
	 *
	 * @param {Object} a
	 * @param {Object} b
	 */
	
	function directiveComparator(a, b) {
	  a = a.descriptor.def.priority || DEFAULT_PRIORITY;
	  b = b.descriptor.def.priority || DEFAULT_PRIORITY;
	  return a > b ? -1 : a === b ? 0 : 1;
	}
	
	/**
	 * Linker functions return an unlink function that
	 * tearsdown all directives instances generated during
	 * the process.
	 *
	 * We create unlink functions with only the necessary
	 * information to avoid retaining additional closures.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Vue} [context]
	 * @param {Array} [contextDirs]
	 * @return {Function}
	 */
	
	function makeUnlinkFn(vm, dirs, context, contextDirs) {
	  return function unlink(destroying) {
	    teardownDirs(vm, dirs, destroying);
	    if (context && contextDirs) {
	      teardownDirs(context, contextDirs);
	    }
	  };
	}
	
	/**
	 * Teardown partial linked directives.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Boolean} destroying
	 */
	
	function teardownDirs(vm, dirs, destroying) {
	  var i = dirs.length;
	  while (i--) {
	    dirs[i]._teardown();
	    if (!destroying) {
	      vm._directives.$remove(dirs[i]);
	    }
	  }
	}
	
	/**
	 * Compile link props on an instance.
	 *
	 * @param {Vue} vm
	 * @param {Element} el
	 * @param {Object} props
	 * @param {Object} [scope]
	 * @return {Function}
	 */
	
	function compileAndLinkProps(vm, el, props, scope) {
	  var propsLinkFn = compileProps(el, props);
	  var propDirs = linkAndCapture(function () {
	    propsLinkFn(vm, scope);
	  }, vm);
	  return makeUnlinkFn(vm, propDirs);
	}
	
	/**
	 * Compile the root element of an instance.
	 *
	 * 1. attrs on context container (context scope)
	 * 2. attrs on the component template root node, if
	 *    replace:true (child scope)
	 *
	 * If this is a fragment instance, we only need to compile 1.
	 *
	 * @param {Vue} vm
	 * @param {Element} el
	 * @param {Object} options
	 * @param {Object} contextOptions
	 * @return {Function}
	 */
	
	function compileRoot(el, options, contextOptions) {
	  var containerAttrs = options._containerAttrs;
	  var replacerAttrs = options._replacerAttrs;
	  var contextLinkFn, replacerLinkFn;
	
	  // only need to compile other attributes for
	  // non-fragment instances
	  if (el.nodeType !== 11) {
	    // for components, container and replacer need to be
	    // compiled separately and linked in different scopes.
	    if (options._asComponent) {
	      // 2. container attributes
	      if (containerAttrs && contextOptions) {
	        contextLinkFn = compileDirectives(containerAttrs, contextOptions);
	      }
	      if (replacerAttrs) {
	        // 3. replacer attributes
	        replacerLinkFn = compileDirectives(replacerAttrs, options);
	      }
	    } else {
	      // non-component, just compile as a normal element.
	      replacerLinkFn = compileDirectives(el.attributes, options);
	    }
	  } else if (process.env.NODE_ENV !== 'production' && containerAttrs) {
	    // warn container directives for fragment instances
	    var names = containerAttrs.filter(function (attr) {
	      // allow vue-loader/vueify scoped css attributes
	      return attr.name.indexOf('_v-') < 0 &&
	      // allow event listeners
	      !onRE.test(attr.name) &&
	      // allow slots
	      attr.name !== 'slot';
	    }).map(function (attr) {
	      return '"' + attr.name + '"';
	    });
	    if (names.length) {
	      var plural = names.length > 1;
	      warn('Attribute' + (plural ? 's ' : ' ') + names.join(', ') + (plural ? ' are' : ' is') + ' ignored on component ' + '<' + options.el.tagName.toLowerCase() + '> because ' + 'the component is a fragment instance: ' + 'http://vuejs.org/guide/components.html#Fragment_Instance');
	    }
	  }
	
	  return function rootLinkFn(vm, el, scope) {
	    // link context scope dirs
	    var context = vm._context;
	    var contextDirs;
	    if (context && contextLinkFn) {
	      contextDirs = linkAndCapture(function () {
	        contextLinkFn(context, el, null, scope);
	      }, context);
	    }
	
	    // link self
	    var selfDirs = linkAndCapture(function () {
	      if (replacerLinkFn) replacerLinkFn(vm, el);
	    }, vm);
	
	    // return the unlink function that tearsdown context
	    // container directives.
	    return makeUnlinkFn(vm, selfDirs, context, contextDirs);
	  };
	}
	
	/**
	 * Compile a node and return a nodeLinkFn based on the
	 * node type.
	 *
	 * @param {Node} node
	 * @param {Object} options
	 * @return {Function|null}
	 */
	
	function compileNode(node, options) {
	  var type = node.nodeType;
	  if (type === 1 && node.tagName !== 'SCRIPT') {
	    return compileElement(node, options);
	  } else if (type === 3 && node.data.trim()) {
	    return compileTextNode(node, options);
	  } else {
	    return null;
	  }
	}
	
	/**
	 * Compile an element and return a nodeLinkFn.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|null}
	 */
	
	function compileElement(el, options) {
	  // preprocess textareas.
	  // textarea treats its text content as the initial value.
	  // just bind it as an attr directive for value.
	  if (el.tagName === 'TEXTAREA') {
	    var tokens = parseText(el.value);
	    if (tokens) {
	      el.setAttribute(':value', tokensToExp(tokens));
	      el.value = '';
	    }
	  }
	  var linkFn;
	  var hasAttrs = el.hasAttributes();
	  // check terminal directives (for & if)
	  if (hasAttrs) {
	    linkFn = checkTerminalDirectives(el, options);
	  }
	  // check element directives
	  if (!linkFn) {
	    linkFn = checkElementDirectives(el, options);
	  }
	  // check component
	  if (!linkFn) {
	    linkFn = checkComponent(el, options);
	  }
	  // normal directives
	  if (!linkFn && hasAttrs) {
	    linkFn = compileDirectives(el.attributes, options);
	  }
	  return linkFn;
	}
	
	/**
	 * Compile a textNode and return a nodeLinkFn.
	 *
	 * @param {TextNode} node
	 * @param {Object} options
	 * @return {Function|null} textNodeLinkFn
	 */
	
	function compileTextNode(node, options) {
	  // skip marked text nodes
	  if (node._skip) {
	    return removeText;
	  }
	
	  var tokens = parseText(node.wholeText);
	  if (!tokens) {
	    return null;
	  }
	
	  // mark adjacent text nodes as skipped,
	  // because we are using node.wholeText to compile
	  // all adjacent text nodes together. This fixes
	  // issues in IE where sometimes it splits up a single
	  // text node into multiple ones.
	  var next = node.nextSibling;
	  while (next && next.nodeType === 3) {
	    next._skip = true;
	    next = next.nextSibling;
	  }
	
	  var frag = document.createDocumentFragment();
	  var el, token;
	  for (var i = 0, l = tokens.length; i < l; i++) {
	    token = tokens[i];
	    el = token.tag ? processTextToken(token, options) : document.createTextNode(token.value);
	    frag.appendChild(el);
	  }
	  return makeTextNodeLinkFn(tokens, frag, options);
	}
	
	/**
	 * Linker for an skipped text node.
	 *
	 * @param {Vue} vm
	 * @param {Text} node
	 */
	
	function removeText(vm, node) {
	  remove(node);
	}
	
	/**
	 * Process a single text token.
	 *
	 * @param {Object} token
	 * @param {Object} options
	 * @return {Node}
	 */
	
	function processTextToken(token, options) {
	  var el;
	  if (token.oneTime) {
	    el = document.createTextNode(token.value);
	  } else {
	    if (token.html) {
	      el = document.createComment('v-html');
	      setTokenType('html');
	    } else {
	      // IE will clean up empty textNodes during
	      // frag.cloneNode(true), so we have to give it
	      // something here...
	      el = document.createTextNode(' ');
	      setTokenType('text');
	    }
	  }
	  function setTokenType(type) {
	    if (token.descriptor) return;
	    var parsed = parseDirective(token.value);
	    token.descriptor = {
	      name: type,
	      def: publicDirectives[type],
	      expression: parsed.expression,
	      filters: parsed.filters
	    };
	  }
	  return el;
	}
	
	/**
	 * Build a function that processes a textNode.
	 *
	 * @param {Array<Object>} tokens
	 * @param {DocumentFragment} frag
	 */
	
	function makeTextNodeLinkFn(tokens, frag) {
	  return function textNodeLinkFn(vm, el, host, scope) {
	    var fragClone = frag.cloneNode(true);
	    var childNodes = toArray(fragClone.childNodes);
	    var token, value, node;
	    for (var i = 0, l = tokens.length; i < l; i++) {
	      token = tokens[i];
	      value = token.value;
	      if (token.tag) {
	        node = childNodes[i];
	        if (token.oneTime) {
	          value = (scope || vm).$eval(value);
	          if (token.html) {
	            replace(node, parseTemplate(value, true));
	          } else {
	            node.data = value;
	          }
	        } else {
	          vm._bindDir(token.descriptor, node, host, scope);
	        }
	      }
	    }
	    replace(el, fragClone);
	  };
	}
	
	/**
	 * Compile a node list and return a childLinkFn.
	 *
	 * @param {NodeList} nodeList
	 * @param {Object} options
	 * @return {Function|undefined}
	 */
	
	function compileNodeList(nodeList, options) {
	  var linkFns = [];
	  var nodeLinkFn, childLinkFn, node;
	  for (var i = 0, l = nodeList.length; i < l; i++) {
	    node = nodeList[i];
	    nodeLinkFn = compileNode(node, options);
	    childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && node.tagName !== 'SCRIPT' && node.hasChildNodes() ? compileNodeList(node.childNodes, options) : null;
	    linkFns.push(nodeLinkFn, childLinkFn);
	  }
	  return linkFns.length ? makeChildLinkFn(linkFns) : null;
	}
	
	/**
	 * Make a child link function for a node's childNodes.
	 *
	 * @param {Array<Function>} linkFns
	 * @return {Function} childLinkFn
	 */
	
	function makeChildLinkFn(linkFns) {
	  return function childLinkFn(vm, nodes, host, scope, frag) {
	    var node, nodeLinkFn, childrenLinkFn;
	    for (var i = 0, n = 0, l = linkFns.length; i < l; n++) {
	      node = nodes[n];
	      nodeLinkFn = linkFns[i++];
	      childrenLinkFn = linkFns[i++];
	      // cache childNodes before linking parent, fix #657
	      var childNodes = toArray(node.childNodes);
	      if (nodeLinkFn) {
	        nodeLinkFn(vm, node, host, scope, frag);
	      }
	      if (childrenLinkFn) {
	        childrenLinkFn(vm, childNodes, host, scope, frag);
	      }
	    }
	  };
	}
	
	/**
	 * Check for element directives (custom elements that should
	 * be resovled as terminal directives).
	 *
	 * @param {Element} el
	 * @param {Object} options
	 */
	
	function checkElementDirectives(el, options) {
	  var tag = el.tagName.toLowerCase();
	  if (commonTagRE.test(tag)) return;
	  // special case: give named slot a higher priority
	  // than unnamed slots
	  if (tag === 'slot' && hasBindAttr(el, 'name')) {
	    tag = '_namedSlot';
	  }
	  var def = resolveAsset(options, 'elementDirectives', tag);
	  if (def) {
	    return makeTerminalNodeLinkFn(el, tag, '', options, def);
	  }
	}
	
	/**
	 * Check if an element is a component. If yes, return
	 * a component link function.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|undefined}
	 */
	
	function checkComponent(el, options) {
	  var component = checkComponentAttr(el, options);
	  if (component) {
	    var ref = findRef(el);
	    var descriptor = {
	      name: 'component',
	      ref: ref,
	      expression: component.id,
	      def: internalDirectives.component,
	      modifiers: {
	        literal: !component.dynamic
	      }
	    };
	    var componentLinkFn = function componentLinkFn(vm, el, host, scope, frag) {
	      if (ref) {
	        defineReactive((scope || vm).$refs, ref, null);
	      }
	      vm._bindDir(descriptor, el, host, scope, frag);
	    };
	    componentLinkFn.terminal = true;
	    return componentLinkFn;
	  }
	}
	
	/**
	 * Check an element for terminal directives in fixed order.
	 * If it finds one, return a terminal link function.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function} terminalLinkFn
	 */
	
	function checkTerminalDirectives(el, options) {
	  // skip v-pre
	  if (getAttr(el, 'v-pre') !== null) {
	    return skip;
	  }
	  // skip v-else block, but only if following v-if
	  if (el.hasAttribute('v-else')) {
	    var prev = el.previousElementSibling;
	    if (prev && prev.hasAttribute('v-if')) {
	      return skip;
	    }
	  }
	  var value, dirName;
	  for (var i = 0, l = terminalDirectives.length; i < l; i++) {
	    dirName = terminalDirectives[i];
	    /* eslint-disable no-cond-assign */
	    if (value = el.getAttribute('v-' + dirName)) {
	      return makeTerminalNodeLinkFn(el, dirName, value, options);
	    }
	    /* eslint-enable no-cond-assign */
	  }
	}
	
	function skip() {}
	skip.terminal = true;
	
	/**
	 * Build a node link function for a terminal directive.
	 * A terminal link function terminates the current
	 * compilation recursion and handles compilation of the
	 * subtree in the directive.
	 *
	 * @param {Element} el
	 * @param {String} dirName
	 * @param {String} value
	 * @param {Object} options
	 * @param {Object} [def]
	 * @return {Function} terminalLinkFn
	 */
	
	function makeTerminalNodeLinkFn(el, dirName, value, options, def) {
	  var parsed = parseDirective(value);
	  var descriptor = {
	    name: dirName,
	    expression: parsed.expression,
	    filters: parsed.filters,
	    raw: value,
	    // either an element directive, or if/for
	    def: def || publicDirectives[dirName]
	  };
	  // check ref for v-for and router-view
	  if (dirName === 'for' || dirName === 'router-view') {
	    descriptor.ref = findRef(el);
	  }
	  var fn = function terminalNodeLinkFn(vm, el, host, scope, frag) {
	    if (descriptor.ref) {
	      defineReactive((scope || vm).$refs, descriptor.ref, null);
	    }
	    vm._bindDir(descriptor, el, host, scope, frag);
	  };
	  fn.terminal = true;
	  return fn;
	}
	
	/**
	 * Compile the directives on an element and return a linker.
	 *
	 * @param {Array|NamedNodeMap} attrs
	 * @param {Object} options
	 * @return {Function}
	 */
	
	function compileDirectives(attrs, options) {
	  var i = attrs.length;
	  var dirs = [];
	  var attr, name, value, rawName, rawValue, dirName, arg, modifiers, dirDef, tokens;
	  while (i--) {
	    attr = attrs[i];
	    name = rawName = attr.name;
	    value = rawValue = attr.value;
	    tokens = parseText(value);
	    // reset arg
	    arg = null;
	    // check modifiers
	    modifiers = parseModifiers(name);
	    name = name.replace(modifierRE, '');
	
	    // attribute interpolations
	    if (tokens) {
	      value = tokensToExp(tokens);
	      if (name === 'class') {
	        pushDir('class', internalDirectives['class'], true);
	      } else {
	        arg = name;
	        pushDir('bind', publicDirectives.bind, true);
	      }
	      // warn against mixing mustaches with v-bind
	      if (process.env.NODE_ENV !== 'production') {
	        if (name === 'class' && Array.prototype.some.call(attrs, function (attr) {
	          return attr.name === ':class' || attr.name === 'v-bind:class';
	        })) {
	          warn('class="' + rawValue + '": Do not mix mustache interpolation ' + 'and v-bind for "class" on the same element. Use one or the other.');
	        }
	      }
	    } else
	
	      // special attribute: transition
	      if (transitionRE.test(name)) {
	        modifiers.literal = !bindRE.test(name);
	        pushDir('transition', internalDirectives.transition);
	      } else
	
	        // event handlers
	        if (onRE.test(name)) {
	          arg = name.replace(onRE, '');
	          pushDir('on', publicDirectives.on);
	        } else
	
	          // attribute bindings
	          if (bindRE.test(name)) {
	            dirName = name.replace(bindRE, '');
	            if (dirName === 'style' || dirName === 'class') {
	              pushDir(dirName, internalDirectives[dirName]);
	            } else {
	              arg = dirName;
	              pushDir('bind', publicDirectives.bind);
	            }
	          } else
	
	            // normal directives
	            if (name.indexOf('v-') === 0) {
	              // check arg
	              arg = (arg = name.match(argRE)) && arg[1];
	              if (arg) {
	                name = name.replace(argRE, '');
	              }
	              // extract directive name
	              dirName = name.slice(2);
	
	              // skip v-else (when used with v-show)
	              if (dirName === 'else') {
	                continue;
	              }
	
	              dirDef = resolveAsset(options, 'directives', dirName);
	
	              if (process.env.NODE_ENV !== 'production') {
	                assertAsset(dirDef, 'directive', dirName);
	              }
	
	              if (dirDef) {
	                pushDir(dirName, dirDef);
	              }
	            }
	  }
	
	  /**
	   * Push a directive.
	   *
	   * @param {String} dirName
	   * @param {Object|Function} def
	   * @param {Boolean} [interp]
	   */
	
	  function pushDir(dirName, def, interp) {
	    var parsed = parseDirective(value);
	    dirs.push({
	      name: dirName,
	      attr: rawName,
	      raw: rawValue,
	      def: def,
	      arg: arg,
	      modifiers: modifiers,
	      expression: parsed.expression,
	      filters: parsed.filters,
	      interp: interp
	    });
	  }
	
	  if (dirs.length) {
	    return makeNodeLinkFn(dirs);
	  }
	}
	
	/**
	 * Parse modifiers from directive attribute name.
	 *
	 * @param {String} name
	 * @return {Object}
	 */
	
	function parseModifiers(name) {
	  var res = Object.create(null);
	  var match = name.match(modifierRE);
	  if (match) {
	    var i = match.length;
	    while (i--) {
	      res[match[i].slice(1)] = true;
	    }
	  }
	  return res;
	}
	
	/**
	 * Build a link function for all directives on a single node.
	 *
	 * @param {Array} directives
	 * @return {Function} directivesLinkFn
	 */
	
	function makeNodeLinkFn(directives) {
	  return function nodeLinkFn(vm, el, host, scope, frag) {
	    // reverse apply because it's sorted low to high
	    var i = directives.length;
	    while (i--) {
	      vm._bindDir(directives[i], el, host, scope, frag);
	    }
	  };
	}
	
	var specialCharRE = /[^\w\-:\.]/;
	
	/**
	 * Process an element or a DocumentFragment based on a
	 * instance option object. This allows us to transclude
	 * a template node/fragment before the instance is created,
	 * so the processed fragment can then be cloned and reused
	 * in v-for.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */
	
	function transclude(el, options) {
	  // extract container attributes to pass them down
	  // to compiler, because they need to be compiled in
	  // parent scope. we are mutating the options object here
	  // assuming the same object will be used for compile
	  // right after this.
	  if (options) {
	    options._containerAttrs = extractAttrs(el);
	  }
	  // for template tags, what we want is its content as
	  // a documentFragment (for fragment instances)
	  if (isTemplate(el)) {
	    el = parseTemplate(el);
	  }
	  if (options) {
	    if (options._asComponent && !options.template) {
	      options.template = '<slot></slot>';
	    }
	    if (options.template) {
	      options._content = extractContent(el);
	      el = transcludeTemplate(el, options);
	    }
	  }
	  if (el instanceof DocumentFragment) {
	    // anchors for fragment instance
	    // passing in `persist: true` to avoid them being
	    // discarded by IE during template cloning
	    prepend(createAnchor('v-start', true), el);
	    el.appendChild(createAnchor('v-end', true));
	  }
	  return el;
	}
	
	/**
	 * Process the template option.
	 * If the replace option is true this will swap the $el.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */
	
	function transcludeTemplate(el, options) {
	  var template = options.template;
	  var frag = parseTemplate(template, true);
	  if (frag) {
	    var replacer = frag.firstChild;
	    var tag = replacer.tagName && replacer.tagName.toLowerCase();
	    if (options.replace) {
	      /* istanbul ignore if */
	      if (el === document.body) {
	        process.env.NODE_ENV !== 'production' && warn('You are mounting an instance with a template to ' + '<body>. This will replace <body> entirely. You ' + 'should probably use `replace: false` here.');
	      }
	      // there are many cases where the instance must
	      // become a fragment instance: basically anything that
	      // can create more than 1 root nodes.
	      if (
	      // multi-children template
	      frag.childNodes.length > 1 ||
	      // non-element template
	      replacer.nodeType !== 1 ||
	      // single nested component
	      tag === 'component' || resolveAsset(options, 'components', tag) || hasBindAttr(replacer, 'is') ||
	      // element directive
	      resolveAsset(options, 'elementDirectives', tag) ||
	      // for block
	      replacer.hasAttribute('v-for') ||
	      // if block
	      replacer.hasAttribute('v-if')) {
	        return frag;
	      } else {
	        options._replacerAttrs = extractAttrs(replacer);
	        mergeAttrs(el, replacer);
	        return replacer;
	      }
	    } else {
	      el.appendChild(frag);
	      return el;
	    }
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid template option: ' + template);
	  }
	}
	
	/**
	 * Helper to extract a component container's attributes
	 * into a plain object array.
	 *
	 * @param {Element} el
	 * @return {Array}
	 */
	
	function extractAttrs(el) {
	  if (el.nodeType === 1 && el.hasAttributes()) {
	    return toArray(el.attributes);
	  }
	}
	
	/**
	 * Merge the attributes of two elements, and make sure
	 * the class names are merged properly.
	 *
	 * @param {Element} from
	 * @param {Element} to
	 */
	
	function mergeAttrs(from, to) {
	  var attrs = from.attributes;
	  var i = attrs.length;
	  var name, value;
	  while (i--) {
	    name = attrs[i].name;
	    value = attrs[i].value;
	    if (!to.hasAttribute(name) && !specialCharRE.test(name)) {
	      to.setAttribute(name, value);
	    } else if (name === 'class') {
	      value.split(/\s+/).forEach(function (cls) {
	        addClass(to, cls);
	      });
	    }
	  }
	}
	
	var compiler = Object.freeze({
		compile: compile,
		compileAndLinkProps: compileAndLinkProps,
		compileRoot: compileRoot,
		transclude: transclude
	});
	
	function stateMixin (Vue) {
	
	  /**
	   * Accessor for `$data` property, since setting $data
	   * requires observing the new object and updating
	   * proxied properties.
	   */
	
	  Object.defineProperty(Vue.prototype, '$data', {
	    get: function get() {
	      return this._data;
	    },
	    set: function set(newData) {
	      if (newData !== this._data) {
	        this._setData(newData);
	      }
	    }
	  });
	
	  /**
	   * Setup the scope of an instance, which contains:
	   * - observed data
	   * - computed properties
	   * - user methods
	   * - meta properties
	   */
	
	  Vue.prototype._initState = function () {
	    this._initProps();
	    this._initMeta();
	    this._initMethods();
	    this._initData();
	    this._initComputed();
	  };
	
	  /**
	   * Initialize props.
	   */
	
	  Vue.prototype._initProps = function () {
	    var options = this.$options;
	    var el = options.el;
	    var props = options.props;
	    if (props && !el) {
	      process.env.NODE_ENV !== 'production' && warn('Props will not be compiled if no `el` option is ' + 'provided at instantiation.');
	    }
	    // make sure to convert string selectors into element now
	    el = options.el = query(el);
	    this._propsUnlinkFn = el && el.nodeType === 1 && props
	    // props must be linked in proper scope if inside v-for
	    ? compileAndLinkProps(this, el, props, this._scope) : null;
	  };
	
	  /**
	   * Initialize the data.
	   */
	
	  Vue.prototype._initData = function () {
	    var propsData = this._data;
	    var optionsDataFn = this.$options.data;
	    var optionsData = optionsDataFn && optionsDataFn();
	    if (optionsData) {
	      this._data = optionsData;
	      for (var prop in propsData) {
	        if (process.env.NODE_ENV !== 'production' && hasOwn(optionsData, prop)) {
	          warn('Data field "' + prop + '" is already defined ' + 'as a prop. Use prop default value instead.');
	        }
	        if (this._props[prop].raw !== null || !hasOwn(optionsData, prop)) {
	          set(optionsData, prop, propsData[prop]);
	        }
	      }
	    }
	    var data = this._data;
	    // proxy data on instance
	    var keys = Object.keys(data);
	    var i, key;
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      this._proxy(key);
	    }
	    // observe data
	    observe(data, this);
	  };
	
	  /**
	   * Swap the instance's $data. Called in $data's setter.
	   *
	   * @param {Object} newData
	   */
	
	  Vue.prototype._setData = function (newData) {
	    newData = newData || {};
	    var oldData = this._data;
	    this._data = newData;
	    var keys, key, i;
	    // unproxy keys not present in new data
	    keys = Object.keys(oldData);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (!(key in newData)) {
	        this._unproxy(key);
	      }
	    }
	    // proxy keys not already proxied,
	    // and trigger change for changed values
	    keys = Object.keys(newData);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (!hasOwn(this, key)) {
	        // new property
	        this._proxy(key);
	      }
	    }
	    oldData.__ob__.removeVm(this);
	    observe(newData, this);
	    this._digest();
	  };
	
	  /**
	   * Proxy a property, so that
	   * vm.prop === vm._data.prop
	   *
	   * @param {String} key
	   */
	
	  Vue.prototype._proxy = function (key) {
	    if (!isReserved(key)) {
	      // need to store ref to self here
	      // because these getter/setters might
	      // be called by child scopes via
	      // prototype inheritance.
	      var self = this;
	      Object.defineProperty(self, key, {
	        configurable: true,
	        enumerable: true,
	        get: function proxyGetter() {
	          return self._data[key];
	        },
	        set: function proxySetter(val) {
	          self._data[key] = val;
	        }
	      });
	    }
	  };
	
	  /**
	   * Unproxy a property.
	   *
	   * @param {String} key
	   */
	
	  Vue.prototype._unproxy = function (key) {
	    if (!isReserved(key)) {
	      delete this[key];
	    }
	  };
	
	  /**
	   * Force update on every watcher in scope.
	   */
	
	  Vue.prototype._digest = function () {
	    for (var i = 0, l = this._watchers.length; i < l; i++) {
	      this._watchers[i].update(true); // shallow updates
	    }
	  };
	
	  /**
	   * Setup computed properties. They are essentially
	   * special getter/setters
	   */
	
	  function noop() {}
	  Vue.prototype._initComputed = function () {
	    var computed = this.$options.computed;
	    if (computed) {
	      for (var key in computed) {
	        var userDef = computed[key];
	        var def = {
	          enumerable: true,
	          configurable: true
	        };
	        if (typeof userDef === 'function') {
	          def.get = makeComputedGetter(userDef, this);
	          def.set = noop;
	        } else {
	          def.get = userDef.get ? userDef.cache !== false ? makeComputedGetter(userDef.get, this) : bind$1(userDef.get, this) : noop;
	          def.set = userDef.set ? bind$1(userDef.set, this) : noop;
	        }
	        Object.defineProperty(this, key, def);
	      }
	    }
	  };
	
	  function makeComputedGetter(getter, owner) {
	    var watcher = new Watcher(owner, getter, null, {
	      lazy: true
	    });
	    return function computedGetter() {
	      if (watcher.dirty) {
	        watcher.evaluate();
	      }
	      if (Dep.target) {
	        watcher.depend();
	      }
	      return watcher.value;
	    };
	  }
	
	  /**
	   * Setup instance methods. Methods must be bound to the
	   * instance since they might be passed down as a prop to
	   * child components.
	   */
	
	  Vue.prototype._initMethods = function () {
	    var methods = this.$options.methods;
	    if (methods) {
	      for (var key in methods) {
	        this[key] = bind$1(methods[key], this);
	      }
	    }
	  };
	
	  /**
	   * Initialize meta information like $index, $key & $value.
	   */
	
	  Vue.prototype._initMeta = function () {
	    var metas = this.$options._meta;
	    if (metas) {
	      for (var key in metas) {
	        defineReactive(this, key, metas[key]);
	      }
	    }
	  };
	}
	
	var eventRE = /^v-on:|^@/;
	
	function eventsMixin (Vue) {
	
	  /**
	   * Setup the instance's option events & watchers.
	   * If the value is a string, we pull it from the
	   * instance's methods by name.
	   */
	
	  Vue.prototype._initEvents = function () {
	    var options = this.$options;
	    if (options._asComponent) {
	      registerComponentEvents(this, options.el);
	    }
	    registerCallbacks(this, '$on', options.events);
	    registerCallbacks(this, '$watch', options.watch);
	  };
	
	  /**
	   * Register v-on events on a child component
	   *
	   * @param {Vue} vm
	   * @param {Element} el
	   */
	
	  function registerComponentEvents(vm, el) {
	    var attrs = el.attributes;
	    var name, handler;
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      name = attrs[i].name;
	      if (eventRE.test(name)) {
	        name = name.replace(eventRE, '');
	        handler = (vm._scope || vm._context).$eval(attrs[i].value, true);
	        vm.$on(name.replace(eventRE), handler);
	      }
	    }
	  }
	
	  /**
	   * Register callbacks for option events and watchers.
	   *
	   * @param {Vue} vm
	   * @param {String} action
	   * @param {Object} hash
	   */
	
	  function registerCallbacks(vm, action, hash) {
	    if (!hash) return;
	    var handlers, key, i, j;
	    for (key in hash) {
	      handlers = hash[key];
	      if (isArray(handlers)) {
	        for (i = 0, j = handlers.length; i < j; i++) {
	          register(vm, action, key, handlers[i]);
	        }
	      } else {
	        register(vm, action, key, handlers);
	      }
	    }
	  }
	
	  /**
	   * Helper to register an event/watch callback.
	   *
	   * @param {Vue} vm
	   * @param {String} action
	   * @param {String} key
	   * @param {Function|String|Object} handler
	   * @param {Object} [options]
	   */
	
	  function register(vm, action, key, handler, options) {
	    var type = typeof handler;
	    if (type === 'function') {
	      vm[action](key, handler, options);
	    } else if (type === 'string') {
	      var methods = vm.$options.methods;
	      var method = methods && methods[handler];
	      if (method) {
	        vm[action](key, method, options);
	      } else {
	        process.env.NODE_ENV !== 'production' && warn('Unknown method: "' + handler + '" when ' + 'registering callback for ' + action + ': "' + key + '".');
	      }
	    } else if (handler && type === 'object') {
	      register(vm, action, key, handler.handler, handler);
	    }
	  }
	
	  /**
	   * Setup recursive attached/detached calls
	   */
	
	  Vue.prototype._initDOMHooks = function () {
	    this.$on('hook:attached', onAttached);
	    this.$on('hook:detached', onDetached);
	  };
	
	  /**
	   * Callback to recursively call attached hook on children
	   */
	
	  function onAttached() {
	    if (!this._isAttached) {
	      this._isAttached = true;
	      this.$children.forEach(callAttach);
	    }
	  }
	
	  /**
	   * Iterator to call attached hook
	   *
	   * @param {Vue} child
	   */
	
	  function callAttach(child) {
	    if (!child._isAttached && inDoc(child.$el)) {
	      child._callHook('attached');
	    }
	  }
	
	  /**
	   * Callback to recursively call detached hook on children
	   */
	
	  function onDetached() {
	    if (this._isAttached) {
	      this._isAttached = false;
	      this.$children.forEach(callDetach);
	    }
	  }
	
	  /**
	   * Iterator to call detached hook
	   *
	   * @param {Vue} child
	   */
	
	  function callDetach(child) {
	    if (child._isAttached && !inDoc(child.$el)) {
	      child._callHook('detached');
	    }
	  }
	
	  /**
	   * Trigger all handlers for a hook
	   *
	   * @param {String} hook
	   */
	
	  Vue.prototype._callHook = function (hook) {
	    var handlers = this.$options[hook];
	    if (handlers) {
	      for (var i = 0, j = handlers.length; i < j; i++) {
	        handlers[i].call(this);
	      }
	    }
	    this.$emit('hook:' + hook);
	  };
	}
	
	function noop() {}
	
	/**
	 * A directive links a DOM element with a piece of data,
	 * which is the result of evaluating an expression.
	 * It registers a watcher with the expression and calls
	 * the DOM update function when a change is triggered.
	 *
	 * @param {String} name
	 * @param {Node} el
	 * @param {Vue} vm
	 * @param {Object} descriptor
	 *                 - {String} name
	 *                 - {Object} def
	 *                 - {String} expression
	 *                 - {Array<Object>} [filters]
	 *                 - {Boolean} literal
	 *                 - {String} attr
	 *                 - {String} raw
	 * @param {Object} def - directive definition object
	 * @param {Vue} [host] - transclusion host component
	 * @param {Object} [scope] - v-for scope
	 * @param {Fragment} [frag] - owner fragment
	 * @constructor
	 */
	function Directive(descriptor, vm, el, host, scope, frag) {
	  this.vm = vm;
	  this.el = el;
	  // copy descriptor properties
	  this.descriptor = descriptor;
	  this.name = descriptor.name;
	  this.expression = descriptor.expression;
	  this.arg = descriptor.arg;
	  this.modifiers = descriptor.modifiers;
	  this.filters = descriptor.filters;
	  this.literal = this.modifiers && this.modifiers.literal;
	  // private
	  this._locked = false;
	  this._bound = false;
	  this._listeners = null;
	  // link context
	  this._host = host;
	  this._scope = scope;
	  this._frag = frag;
	  // store directives on node in dev mode
	  if (process.env.NODE_ENV !== 'production' && this.el) {
	    this.el._vue_directives = this.el._vue_directives || [];
	    this.el._vue_directives.push(this);
	  }
	}
	
	/**
	 * Initialize the directive, mixin definition properties,
	 * setup the watcher, call definition bind() and update()
	 * if present.
	 *
	 * @param {Object} def
	 */
	
	Directive.prototype._bind = function () {
	  var name = this.name;
	  var descriptor = this.descriptor;
	
	  // remove attribute
	  if ((name !== 'cloak' || this.vm._isCompiled) && this.el && this.el.removeAttribute) {
	    var attr = descriptor.attr || 'v-' + name;
	    if (attr !== 'class') {
	      this.el.removeAttribute(attr);
	    } else {
	      // for class interpolations, only remove the parts that
	      // need to be interpolated.
	      this.el.className = removeTags(this.el.className).trim().replace(/\s+/g, ' ');
	    }
	  }
	
	  // copy def properties
	  var def = descriptor.def;
	  if (typeof def === 'function') {
	    this.update = def;
	  } else {
	    extend(this, def);
	  }
	
	  // setup directive params
	  this._setupParams();
	
	  // initial bind
	  if (this.bind) {
	    this.bind();
	  }
	
	  if (this.literal) {
	    this.update && this.update(descriptor.raw);
	  } else if ((this.expression || this.modifiers) && (this.update || this.twoWay) && !this._checkStatement()) {
	    // wrapped updater for context
	    var dir = this;
	    if (this.update) {
	      this._update = function (val, oldVal) {
	        if (!dir._locked) {
	          dir.update(val, oldVal);
	        }
	      };
	    } else {
	      this._update = noop;
	    }
	    var preProcess = this._preProcess ? bind$1(this._preProcess, this) : null;
	    var postProcess = this._postProcess ? bind$1(this._postProcess, this) : null;
	    var watcher = this._watcher = new Watcher(this.vm, this.expression, this._update, // callback
	    {
	      filters: this.filters,
	      twoWay: this.twoWay,
	      deep: this.deep,
	      preProcess: preProcess,
	      postProcess: postProcess,
	      scope: this._scope
	    });
	    // v-model with inital inline value need to sync back to
	    // model instead of update to DOM on init. They would
	    // set the afterBind hook to indicate that.
	    if (this.afterBind) {
	      this.afterBind();
	    } else if (this.update) {
	      this.update(watcher.value);
	    }
	  }
	  this._bound = true;
	};
	
	/**
	 * Setup all param attributes, e.g. track-by,
	 * transition-mode, etc...
	 */
	
	Directive.prototype._setupParams = function () {
	  if (!this.params) {
	    return;
	  }
	  var params = this.params;
	  // swap the params array with a fresh object.
	  this.params = Object.create(null);
	  var i = params.length;
	  var key, val, mappedKey;
	  while (i--) {
	    key = params[i];
	    mappedKey = camelize(key);
	    val = getBindAttr(this.el, key);
	    if (val != null) {
	      // dynamic
	      this._setupParamWatcher(mappedKey, val);
	    } else {
	      // static
	      val = getAttr(this.el, key);
	      if (val != null) {
	        this.params[mappedKey] = val === '' ? true : val;
	      }
	    }
	  }
	};
	
	/**
	 * Setup a watcher for a dynamic param.
	 *
	 * @param {String} key
	 * @param {String} expression
	 */
	
	Directive.prototype._setupParamWatcher = function (key, expression) {
	  var self = this;
	  var called = false;
	  var unwatch = (this._scope || this.vm).$watch(expression, function (val, oldVal) {
	    self.params[key] = val;
	    // since we are in immediate mode,
	    // only call the param change callbacks if this is not the first update.
	    if (called) {
	      var cb = self.paramWatchers && self.paramWatchers[key];
	      if (cb) {
	        cb.call(self, val, oldVal);
	      }
	    } else {
	      called = true;
	    }
	  }, {
	    immediate: true
	  });(this._paramUnwatchFns || (this._paramUnwatchFns = [])).push(unwatch);
	};
	
	/**
	 * Check if the directive is a function caller
	 * and if the expression is a callable one. If both true,
	 * we wrap up the expression and use it as the event
	 * handler.
	 *
	 * e.g. on-click="a++"
	 *
	 * @return {Boolean}
	 */
	
	Directive.prototype._checkStatement = function () {
	  var expression = this.expression;
	  if (expression && this.acceptStatement && !isSimplePath(expression)) {
	    var fn = parseExpression(expression).get;
	    var scope = this._scope || this.vm;
	    var handler = function handler(e) {
	      scope.$event = e;
	      fn.call(scope, scope);
	      scope.$event = null;
	    };
	    if (this.filters) {
	      handler = scope._applyFilters(handler, null, this.filters);
	    }
	    this.update(handler);
	    return true;
	  }
	};
	
	/**
	 * Set the corresponding value with the setter.
	 * This should only be used in two-way directives
	 * e.g. v-model.
	 *
	 * @param {*} value
	 * @public
	 */
	
	Directive.prototype.set = function (value) {
	  /* istanbul ignore else */
	  if (this.twoWay) {
	    this._withLock(function () {
	      this._watcher.set(value);
	    });
	  } else if (process.env.NODE_ENV !== 'production') {
	    warn('Directive.set() can only be used inside twoWay' + 'directives.');
	  }
	};
	
	/**
	 * Execute a function while preventing that function from
	 * triggering updates on this directive instance.
	 *
	 * @param {Function} fn
	 */
	
	Directive.prototype._withLock = function (fn) {
	  var self = this;
	  self._locked = true;
	  fn.call(self);
	  nextTick(function () {
	    self._locked = false;
	  });
	};
	
	/**
	 * Convenience method that attaches a DOM event listener
	 * to the directive element and autometically tears it down
	 * during unbind.
	 *
	 * @param {String} event
	 * @param {Function} handler
	 */
	
	Directive.prototype.on = function (event, handler) {
	  on$1(this.el, event, handler);(this._listeners || (this._listeners = [])).push([event, handler]);
	};
	
	/**
	 * Teardown the watcher and call unbind.
	 */
	
	Directive.prototype._teardown = function () {
	  if (this._bound) {
	    this._bound = false;
	    if (this.unbind) {
	      this.unbind();
	    }
	    if (this._watcher) {
	      this._watcher.teardown();
	    }
	    var listeners = this._listeners;
	    var i;
	    if (listeners) {
	      i = listeners.length;
	      while (i--) {
	        off(this.el, listeners[i][0], listeners[i][1]);
	      }
	    }
	    var unwatchFns = this._paramUnwatchFns;
	    if (unwatchFns) {
	      i = unwatchFns.length;
	      while (i--) {
	        unwatchFns[i]();
	      }
	    }
	    if (process.env.NODE_ENV !== 'production' && this.el) {
	      this.el._vue_directives.$remove(this);
	    }
	    this.vm = this.el = this._watcher = this._listeners = null;
	  }
	};
	
	function lifecycleMixin (Vue) {
	
	  /**
	   * Update v-ref for component.
	   *
	   * @param {Boolean} remove
	   */
	
	  Vue.prototype._updateRef = function (remove) {
	    var ref = this.$options._ref;
	    if (ref) {
	      var refs = (this._scope || this._context).$refs;
	      if (remove) {
	        if (refs[ref] === this) {
	          refs[ref] = null;
	        }
	      } else {
	        refs[ref] = this;
	      }
	    }
	  };
	
	  /**
	   * Transclude, compile and link element.
	   *
	   * If a pre-compiled linker is available, that means the
	   * passed in element will be pre-transcluded and compiled
	   * as well - all we need to do is to call the linker.
	   *
	   * Otherwise we need to call transclude/compile/link here.
	   *
	   * @param {Element} el
	   * @return {Element}
	   */
	
	  Vue.prototype._compile = function (el) {
	    var options = this.$options;
	
	    // transclude and init element
	    // transclude can potentially replace original
	    // so we need to keep reference; this step also injects
	    // the template and caches the original attributes
	    // on the container node and replacer node.
	    var original = el;
	    el = transclude(el, options);
	    this._initElement(el);
	
	    // root is always compiled per-instance, because
	    // container attrs and props can be different every time.
	    var contextOptions = this._context && this._context.$options;
	    var rootLinker = compileRoot(el, options, contextOptions);
	
	    // compile and link the rest
	    var contentLinkFn;
	    var ctor = this.constructor;
	    // component compilation can be cached
	    // as long as it's not using inline-template
	    if (options._linkerCachable) {
	      contentLinkFn = ctor.linker;
	      if (!contentLinkFn) {
	        contentLinkFn = ctor.linker = compile(el, options);
	      }
	    }
	
	    // link phase
	    // make sure to link root with prop scope!
	    var rootUnlinkFn = rootLinker(this, el, this._scope);
	    var contentUnlinkFn = contentLinkFn ? contentLinkFn(this, el) : compile(el, options)(this, el);
	
	    // register composite unlink function
	    // to be called during instance destruction
	    this._unlinkFn = function () {
	      rootUnlinkFn();
	      // passing destroying: true to avoid searching and
	      // splicing the directives
	      contentUnlinkFn(true);
	    };
	
	    // finally replace original
	    if (options.replace) {
	      replace(original, el);
	    }
	
	    this._isCompiled = true;
	    this._callHook('compiled');
	    return el;
	  };
	
	  /**
	   * Initialize instance element. Called in the public
	   * $mount() method.
	   *
	   * @param {Element} el
	   */
	
	  Vue.prototype._initElement = function (el) {
	    if (el instanceof DocumentFragment) {
	      this._isFragment = true;
	      this.$el = this._fragmentStart = el.firstChild;
	      this._fragmentEnd = el.lastChild;
	      // set persisted text anchors to empty
	      if (this._fragmentStart.nodeType === 3) {
	        this._fragmentStart.data = this._fragmentEnd.data = '';
	      }
	      this._fragment = el;
	    } else {
	      this.$el = el;
	    }
	    this.$el.__vue__ = this;
	    this._callHook('beforeCompile');
	  };
	
	  /**
	   * Create and bind a directive to an element.
	   *
	   * @param {String} name - directive name
	   * @param {Node} node   - target node
	   * @param {Object} desc - parsed directive descriptor
	   * @param {Object} def  - directive definition object
	   * @param {Vue} [host] - transclusion host component
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - owner fragment
	   */
	
	  Vue.prototype._bindDir = function (descriptor, node, host, scope, frag) {
	    this._directives.push(new Directive(descriptor, this, node, host, scope, frag));
	  };
	
	  /**
	   * Teardown an instance, unobserves the data, unbind all the
	   * directives, turn off all the event listeners, etc.
	   *
	   * @param {Boolean} remove - whether to remove the DOM node.
	   * @param {Boolean} deferCleanup - if true, defer cleanup to
	   *                                 be called later
	   */
	
	  Vue.prototype._destroy = function (remove, deferCleanup) {
	    if (this._isBeingDestroyed) {
	      if (!deferCleanup) {
	        this._cleanup();
	      }
	      return;
	    }
	
	    var destroyReady;
	    var pendingRemoval;
	
	    var self = this;
	    // Cleanup should be called either synchronously or asynchronoysly as
	    // callback of this.$remove(), or if remove and deferCleanup are false.
	    // In any case it should be called after all other removing, unbinding and
	    // turning of is done
	    var cleanupIfPossible = function cleanupIfPossible() {
	      if (destroyReady && !pendingRemoval && !deferCleanup) {
	        self._cleanup();
	      }
	    };
	
	    // remove DOM element
	    if (remove && this.$el) {
	      pendingRemoval = true;
	      this.$remove(function () {
	        pendingRemoval = false;
	        cleanupIfPossible();
	      });
	    }
	
	    this._callHook('beforeDestroy');
	    this._isBeingDestroyed = true;
	    var i;
	    // remove self from parent. only necessary
	    // if parent is not being destroyed as well.
	    var parent = this.$parent;
	    if (parent && !parent._isBeingDestroyed) {
	      parent.$children.$remove(this);
	      // unregister ref (remove: true)
	      this._updateRef(true);
	    }
	    // destroy all children.
	    i = this.$children.length;
	    while (i--) {
	      this.$children[i].$destroy();
	    }
	    // teardown props
	    if (this._propsUnlinkFn) {
	      this._propsUnlinkFn();
	    }
	    // teardown all directives. this also tearsdown all
	    // directive-owned watchers.
	    if (this._unlinkFn) {
	      this._unlinkFn();
	    }
	    i = this._watchers.length;
	    while (i--) {
	      this._watchers[i].teardown();
	    }
	    // remove reference to self on $el
	    if (this.$el) {
	      this.$el.__vue__ = null;
	    }
	
	    destroyReady = true;
	    cleanupIfPossible();
	  };
	
	  /**
	   * Clean up to ensure garbage collection.
	   * This is called after the leave transition if there
	   * is any.
	   */
	
	  Vue.prototype._cleanup = function () {
	    if (this._isDestroyed) {
	      return;
	    }
	    // remove self from owner fragment
	    // do it in cleanup so that we can call $destroy with
	    // defer right when a fragment is about to be removed.
	    if (this._frag) {
	      this._frag.children.$remove(this);
	    }
	    // remove reference from data ob
	    // frozen object may not have observer.
	    if (this._data.__ob__) {
	      this._data.__ob__.removeVm(this);
	    }
	    // Clean up references to private properties and other
	    // instances. preserve reference to _data so that proxy
	    // accessors still work. The only potential side effect
	    // here is that mutating the instance after it's destroyed
	    // may affect the state of other components that are still
	    // observing the same object, but that seems to be a
	    // reasonable responsibility for the user rather than
	    // always throwing an error on them.
	    this.$el = this.$parent = this.$root = this.$children = this._watchers = this._context = this._scope = this._directives = null;
	    // call the last hook...
	    this._isDestroyed = true;
	    this._callHook('destroyed');
	    // turn off all instance listeners.
	    this.$off();
	  };
	}
	
	function miscMixin (Vue) {
	
	  /**
	   * Apply a list of filter (descriptors) to a value.
	   * Using plain for loops here because this will be called in
	   * the getter of any watcher with filters so it is very
	   * performance sensitive.
	   *
	   * @param {*} value
	   * @param {*} [oldValue]
	   * @param {Array} filters
	   * @param {Boolean} write
	   * @return {*}
	   */
	
	  Vue.prototype._applyFilters = function (value, oldValue, filters, write) {
	    var filter, fn, args, arg, offset, i, l, j, k;
	    for (i = 0, l = filters.length; i < l; i++) {
	      filter = filters[i];
	      fn = resolveAsset(this.$options, 'filters', filter.name);
	      if (process.env.NODE_ENV !== 'production') {
	        assertAsset(fn, 'filter', filter.name);
	      }
	      if (!fn) continue;
	      fn = write ? fn.write : fn.read || fn;
	      if (typeof fn !== 'function') continue;
	      args = write ? [value, oldValue] : [value];
	      offset = write ? 2 : 1;
	      if (filter.args) {
	        for (j = 0, k = filter.args.length; j < k; j++) {
	          arg = filter.args[j];
	          args[j + offset] = arg.dynamic ? this.$get(arg.value) : arg.value;
	        }
	      }
	      value = fn.apply(this, args);
	    }
	    return value;
	  };
	
	  /**
	   * Resolve a component, depending on whether the component
	   * is defined normally or using an async factory function.
	   * Resolves synchronously if already resolved, otherwise
	   * resolves asynchronously and caches the resolved
	   * constructor on the factory.
	   *
	   * @param {String} id
	   * @param {Function} cb
	   */
	
	  Vue.prototype._resolveComponent = function (id, cb) {
	    var factory = resolveAsset(this.$options, 'components', id);
	    if (process.env.NODE_ENV !== 'production') {
	      assertAsset(factory, 'component', id);
	    }
	    if (!factory) {
	      return;
	    }
	    // async component factory
	    if (!factory.options) {
	      if (factory.resolved) {
	        // cached
	        cb(factory.resolved);
	      } else if (factory.requested) {
	        // pool callbacks
	        factory.pendingCallbacks.push(cb);
	      } else {
	        factory.requested = true;
	        var cbs = factory.pendingCallbacks = [cb];
	        factory(function resolve(res) {
	          if (isPlainObject(res)) {
	            res = Vue.extend(res);
	          }
	          // cache resolved
	          factory.resolved = res;
	          // invoke callbacks
	          for (var i = 0, l = cbs.length; i < l; i++) {
	            cbs[i](res);
	          }
	        }, function reject(reason) {
	          process.env.NODE_ENV !== 'production' && warn('Failed to resolve async component: ' + id + '. ' + (reason ? '\nReason: ' + reason : ''));
	        });
	      }
	    } else {
	      // normal component
	      cb(factory);
	    }
	  };
	}
	
	function globalAPI (Vue) {
	
	  /**
	   * Expose useful internals
	   */
	
	  Vue.util = util;
	  Vue.config = config;
	  Vue.set = set;
	  Vue['delete'] = del;
	  Vue.nextTick = nextTick;
	
	  /**
	   * The following are exposed for advanced usage / plugins
	   */
	
	  Vue.compiler = compiler;
	  Vue.FragmentFactory = FragmentFactory;
	  Vue.internalDirectives = internalDirectives;
	  Vue.parsers = {
	    path: path,
	    text: text$1,
	    template: template,
	    directive: directive,
	    expression: expression
	  };
	
	  /**
	   * Each instance constructor, including Vue, has a unique
	   * cid. This enables us to create wrapped "child
	   * constructors" for prototypal inheritance and cache them.
	   */
	
	  Vue.cid = 0;
	  var cid = 1;
	
	  /**
	   * Class inheritance
	   *
	   * @param {Object} extendOptions
	   */
	
	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {};
	    var Super = this;
	    var isFirstExtend = Super.cid === 0;
	    if (isFirstExtend && extendOptions._Ctor) {
	      return extendOptions._Ctor;
	    }
	    var name = extendOptions.name || Super.options.name;
	    if (process.env.NODE_ENV !== 'production') {
	      if (!/^[a-zA-Z][\w-]+$/.test(name)) {
	        warn('Invalid component name: ' + name);
	        name = null;
	      }
	    }
	    var Sub = createClass(name || 'VueComponent');
	    Sub.prototype = Object.create(Super.prototype);
	    Sub.prototype.constructor = Sub;
	    Sub.cid = cid++;
	    Sub.options = mergeOptions(Super.options, extendOptions);
	    Sub['super'] = Super;
	    // allow further extension
	    Sub.extend = Super.extend;
	    // create asset registers, so extended classes
	    // can have their private assets too.
	    config._assetTypes.forEach(function (type) {
	      Sub[type] = Super[type];
	    });
	    // enable recursive self-lookup
	    if (name) {
	      Sub.options.components[name] = Sub;
	    }
	    // cache constructor
	    if (isFirstExtend) {
	      extendOptions._Ctor = Sub;
	    }
	    return Sub;
	  };
	
	  /**
	   * A function that returns a sub-class constructor with the
	   * given name. This gives us much nicer output when
	   * logging instances in the console.
	   *
	   * @param {String} name
	   * @return {Function}
	   */
	
	  function createClass(name) {
	    return new Function('return function ' + classify(name) + ' (options) { this._init(options) }')();
	  }
	
	  /**
	   * Plugin system
	   *
	   * @param {Object} plugin
	   */
	
	  Vue.use = function (plugin) {
	    /* istanbul ignore if */
	    if (plugin.installed) {
	      return;
	    }
	    // additional parameters
	    var args = toArray(arguments, 1);
	    args.unshift(this);
	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args);
	    } else {
	      plugin.apply(null, args);
	    }
	    plugin.installed = true;
	    return this;
	  };
	
	  /**
	   * Apply a global mixin by merging it into the default
	   * options.
	   */
	
	  Vue.mixin = function (mixin) {
	    Vue.options = mergeOptions(Vue.options, mixin);
	  };
	
	  /**
	   * Create asset registration methods with the following
	   * signature:
	   *
	   * @param {String} id
	   * @param {*} definition
	   */
	
	  config._assetTypes.forEach(function (type) {
	    Vue[type] = function (id, definition) {
	      if (!definition) {
	        return this.options[type + 's'][id];
	      } else {
	        /* istanbul ignore if */
	        if (process.env.NODE_ENV !== 'production') {
	          if (type === 'component' && commonTagRE.test(id)) {
	            warn('Do not use built-in HTML elements as component ' + 'id: ' + id);
	          }
	        }
	        if (type === 'component' && isPlainObject(definition)) {
	          definition.name = id;
	          definition = Vue.extend(definition);
	        }
	        this.options[type + 's'][id] = definition;
	        return definition;
	      }
	    };
	  });
	}
	
	var filterRE = /[^|]\|[^|]/;
	
	function dataAPI (Vue) {
	
	  /**
	   * Get the value from an expression on this vm.
	   *
	   * @param {String} exp
	   * @param {Boolean} [asStatement]
	   * @return {*}
	   */
	
	  Vue.prototype.$get = function (exp, asStatement) {
	    var res = parseExpression(exp);
	    if (res) {
	      if (asStatement && !isSimplePath(exp)) {
	        var self = this;
	        return function statementHandler() {
	          self.$arguments = toArray(arguments);
	          res.get.call(self, self);
	          self.$arguments = null;
	        };
	      } else {
	        try {
	          return res.get.call(this, this);
	        } catch (e) {}
	      }
	    }
	  };
	
	  /**
	   * Set the value from an expression on this vm.
	   * The expression must be a valid left-hand
	   * expression in an assignment.
	   *
	   * @param {String} exp
	   * @param {*} val
	   */
	
	  Vue.prototype.$set = function (exp, val) {
	    var res = parseExpression(exp, true);
	    if (res && res.set) {
	      res.set.call(this, this, val);
	    }
	  };
	
	  /**
	   * Delete a property on the VM
	   *
	   * @param {String} key
	   */
	
	  Vue.prototype.$delete = function (key) {
	    del(this._data, key);
	  };
	
	  /**
	   * Watch an expression, trigger callback when its
	   * value changes.
	   *
	   * @param {String|Function} expOrFn
	   * @param {Function} cb
	   * @param {Object} [options]
	   *                 - {Boolean} deep
	   *                 - {Boolean} immediate
	   * @return {Function} - unwatchFn
	   */
	
	  Vue.prototype.$watch = function (expOrFn, cb, options) {
	    var vm = this;
	    var parsed;
	    if (typeof expOrFn === 'string') {
	      parsed = parseDirective(expOrFn);
	      expOrFn = parsed.expression;
	    }
	    var watcher = new Watcher(vm, expOrFn, cb, {
	      deep: options && options.deep,
	      sync: options && options.sync,
	      filters: parsed && parsed.filters
	    });
	    if (options && options.immediate) {
	      cb.call(vm, watcher.value);
	    }
	    return function unwatchFn() {
	      watcher.teardown();
	    };
	  };
	
	  /**
	   * Evaluate a text directive, including filters.
	   *
	   * @param {String} text
	   * @param {Boolean} [asStatement]
	   * @return {String}
	   */
	
	  Vue.prototype.$eval = function (text, asStatement) {
	    // check for filters.
	    if (filterRE.test(text)) {
	      var dir = parseDirective(text);
	      // the filter regex check might give false positive
	      // for pipes inside strings, so it's possible that
	      // we don't get any filters here
	      var val = this.$get(dir.expression, asStatement);
	      return dir.filters ? this._applyFilters(val, null, dir.filters) : val;
	    } else {
	      // no filter
	      return this.$get(text, asStatement);
	    }
	  };
	
	  /**
	   * Interpolate a piece of template text.
	   *
	   * @param {String} text
	   * @return {String}
	   */
	
	  Vue.prototype.$interpolate = function (text) {
	    var tokens = parseText(text);
	    var vm = this;
	    if (tokens) {
	      if (tokens.length === 1) {
	        return vm.$eval(tokens[0].value) + '';
	      } else {
	        return tokens.map(function (token) {
	          return token.tag ? vm.$eval(token.value) : token.value;
	        }).join('');
	      }
	    } else {
	      return text;
	    }
	  };
	
	  /**
	   * Log instance data as a plain JS object
	   * so that it is easier to inspect in console.
	   * This method assumes console is available.
	   *
	   * @param {String} [path]
	   */
	
	  Vue.prototype.$log = function (path) {
	    var data = path ? getPath(this._data, path) : this._data;
	    if (data) {
	      data = clean(data);
	    }
	    // include computed fields
	    if (!path) {
	      for (var key in this.$options.computed) {
	        data[key] = clean(this[key]);
	      }
	    }
	    console.log(data);
	  };
	
	  /**
	   * "clean" a getter/setter converted object into a plain
	   * object copy.
	   *
	   * @param {Object} - obj
	   * @return {Object}
	   */
	
	  function clean(obj) {
	    return JSON.parse(JSON.stringify(obj));
	  }
	}
	
	function domAPI (Vue) {
	
	  /**
	   * Convenience on-instance nextTick. The callback is
	   * auto-bound to the instance, and this avoids component
	   * modules having to rely on the global Vue.
	   *
	   * @param {Function} fn
	   */
	
	  Vue.prototype.$nextTick = function (fn) {
	    nextTick(fn, this);
	  };
	
	  /**
	   * Append instance to target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */
	
	  Vue.prototype.$appendTo = function (target, cb, withTransition) {
	    return insert(this, target, cb, withTransition, append, appendWithTransition);
	  };
	
	  /**
	   * Prepend instance to target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */
	
	  Vue.prototype.$prependTo = function (target, cb, withTransition) {
	    target = query(target);
	    if (target.hasChildNodes()) {
	      this.$before(target.firstChild, cb, withTransition);
	    } else {
	      this.$appendTo(target, cb, withTransition);
	    }
	    return this;
	  };
	
	  /**
	   * Insert instance before target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */
	
	  Vue.prototype.$before = function (target, cb, withTransition) {
	    return insert(this, target, cb, withTransition, beforeWithCb, beforeWithTransition);
	  };
	
	  /**
	   * Insert instance after target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */
	
	  Vue.prototype.$after = function (target, cb, withTransition) {
	    target = query(target);
	    if (target.nextSibling) {
	      this.$before(target.nextSibling, cb, withTransition);
	    } else {
	      this.$appendTo(target.parentNode, cb, withTransition);
	    }
	    return this;
	  };
	
	  /**
	   * Remove instance from DOM
	   *
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */
	
	  Vue.prototype.$remove = function (cb, withTransition) {
	    if (!this.$el.parentNode) {
	      return cb && cb();
	    }
	    var inDocument = this._isAttached && inDoc(this.$el);
	    // if we are not in document, no need to check
	    // for transitions
	    if (!inDocument) withTransition = false;
	    var self = this;
	    var realCb = function realCb() {
	      if (inDocument) self._callHook('detached');
	      if (cb) cb();
	    };
	    if (this._isFragment) {
	      removeNodeRange(this._fragmentStart, this._fragmentEnd, this, this._fragment, realCb);
	    } else {
	      var op = withTransition === false ? removeWithCb : removeWithTransition;
	      op(this.$el, this, realCb);
	    }
	    return this;
	  };
	
	  /**
	   * Shared DOM insertion function.
	   *
	   * @param {Vue} vm
	   * @param {Element} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition]
	   * @param {Function} op1 - op for non-transition insert
	   * @param {Function} op2 - op for transition insert
	   * @return vm
	   */
	
	  function insert(vm, target, cb, withTransition, op1, op2) {
	    target = query(target);
	    var targetIsDetached = !inDoc(target);
	    var op = withTransition === false || targetIsDetached ? op1 : op2;
	    var shouldCallHook = !targetIsDetached && !vm._isAttached && !inDoc(vm.$el);
	    if (vm._isFragment) {
	      mapNodeRange(vm._fragmentStart, vm._fragmentEnd, function (node) {
	        op(node, target, vm);
	      });
	      cb && cb();
	    } else {
	      op(vm.$el, target, vm, cb);
	    }
	    if (shouldCallHook) {
	      vm._callHook('attached');
	    }
	    return vm;
	  }
	
	  /**
	   * Check for selectors
	   *
	   * @param {String|Element} el
	   */
	
	  function query(el) {
	    return typeof el === 'string' ? document.querySelector(el) : el;
	  }
	
	  /**
	   * Append operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Node} target
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */
	
	  function append(el, target, vm, cb) {
	    target.appendChild(el);
	    if (cb) cb();
	  }
	
	  /**
	   * InsertBefore operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Node} target
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */
	
	  function beforeWithCb(el, target, vm, cb) {
	    before(el, target);
	    if (cb) cb();
	  }
	
	  /**
	   * Remove operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */
	
	  function removeWithCb(el, vm, cb) {
	    remove(el);
	    if (cb) cb();
	  }
	}
	
	function eventsAPI (Vue) {
	
	  /**
	   * Listen on the given `event` with `fn`.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */
	
	  Vue.prototype.$on = function (event, fn) {
	    (this._events[event] || (this._events[event] = [])).push(fn);
	    modifyListenerCount(this, event, 1);
	    return this;
	  };
	
	  /**
	   * Adds an `event` listener that will be invoked a single
	   * time then automatically removed.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */
	
	  Vue.prototype.$once = function (event, fn) {
	    var self = this;
	    function on() {
	      self.$off(event, on);
	      fn.apply(this, arguments);
	    }
	    on.fn = fn;
	    this.$on(event, on);
	    return this;
	  };
	
	  /**
	   * Remove the given callback for `event` or all
	   * registered callbacks.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */
	
	  Vue.prototype.$off = function (event, fn) {
	    var cbs;
	    // all
	    if (!arguments.length) {
	      if (this.$parent) {
	        for (event in this._events) {
	          cbs = this._events[event];
	          if (cbs) {
	            modifyListenerCount(this, event, -cbs.length);
	          }
	        }
	      }
	      this._events = {};
	      return this;
	    }
	    // specific event
	    cbs = this._events[event];
	    if (!cbs) {
	      return this;
	    }
	    if (arguments.length === 1) {
	      modifyListenerCount(this, event, -cbs.length);
	      this._events[event] = null;
	      return this;
	    }
	    // specific handler
	    var cb;
	    var i = cbs.length;
	    while (i--) {
	      cb = cbs[i];
	      if (cb === fn || cb.fn === fn) {
	        modifyListenerCount(this, event, -1);
	        cbs.splice(i, 1);
	        break;
	      }
	    }
	    return this;
	  };
	
	  /**
	   * Trigger an event on self.
	   *
	   * @param {String} event
	   * @return {Boolean} shouldPropagate
	   */
	
	  Vue.prototype.$emit = function (event) {
	    var cbs = this._events[event];
	    var shouldPropagate = !cbs;
	    if (cbs) {
	      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	      var args = toArray(arguments, 1);
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        var res = cbs[i].apply(this, args);
	        if (res === true) {
	          shouldPropagate = true;
	        }
	      }
	    }
	    return shouldPropagate;
	  };
	
	  /**
	   * Recursively broadcast an event to all children instances.
	   *
	   * @param {String} event
	   * @param {...*} additional arguments
	   */
	
	  Vue.prototype.$broadcast = function (event) {
	    // if no child has registered for this event,
	    // then there's no need to broadcast.
	    if (!this._eventsCount[event]) return;
	    var children = this.$children;
	    for (var i = 0, l = children.length; i < l; i++) {
	      var child = children[i];
	      var shouldPropagate = child.$emit.apply(child, arguments);
	      if (shouldPropagate) {
	        child.$broadcast.apply(child, arguments);
	      }
	    }
	    return this;
	  };
	
	  /**
	   * Recursively propagate an event up the parent chain.
	   *
	   * @param {String} event
	   * @param {...*} additional arguments
	   */
	
	  Vue.prototype.$dispatch = function () {
	    this.$emit.apply(this, arguments);
	    var parent = this.$parent;
	    while (parent) {
	      var shouldPropagate = parent.$emit.apply(parent, arguments);
	      parent = shouldPropagate ? parent.$parent : null;
	    }
	    return this;
	  };
	
	  /**
	   * Modify the listener counts on all parents.
	   * This bookkeeping allows $broadcast to return early when
	   * no child has listened to a certain event.
	   *
	   * @param {Vue} vm
	   * @param {String} event
	   * @param {Number} count
	   */
	
	  var hookRE = /^hook:/;
	  function modifyListenerCount(vm, event, count) {
	    var parent = vm.$parent;
	    // hooks do not get broadcasted so no need
	    // to do bookkeeping for them
	    if (!parent || !count || hookRE.test(event)) return;
	    while (parent) {
	      parent._eventsCount[event] = (parent._eventsCount[event] || 0) + count;
	      parent = parent.$parent;
	    }
	  }
	}
	
	function lifecycleAPI (Vue) {
	
	  /**
	   * Set instance target element and kick off the compilation
	   * process. The passed in `el` can be a selector string, an
	   * existing Element, or a DocumentFragment (for block
	   * instances).
	   *
	   * @param {Element|DocumentFragment|string} el
	   * @public
	   */
	
	  Vue.prototype.$mount = function (el) {
	    if (this._isCompiled) {
	      process.env.NODE_ENV !== 'production' && warn('$mount() should be called only once.');
	      return;
	    }
	    el = query(el);
	    if (!el) {
	      el = document.createElement('div');
	    }
	    this._compile(el);
	    this._initDOMHooks();
	    if (inDoc(this.$el)) {
	      this._callHook('attached');
	      ready.call(this);
	    } else {
	      this.$once('hook:attached', ready);
	    }
	    return this;
	  };
	
	  /**
	   * Mark an instance as ready.
	   */
	
	  function ready() {
	    this._isAttached = true;
	    this._isReady = true;
	    this._callHook('ready');
	  }
	
	  /**
	   * Teardown the instance, simply delegate to the internal
	   * _destroy.
	   */
	
	  Vue.prototype.$destroy = function (remove, deferCleanup) {
	    this._destroy(remove, deferCleanup);
	  };
	
	  /**
	   * Partially compile a piece of DOM and return a
	   * decompile function.
	   *
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host]
	   * @return {Function}
	   */
	
	  Vue.prototype.$compile = function (el, host, scope, frag) {
	    return compile(el, this.$options, true)(this, el, host, scope, frag);
	  };
	}
	
	/**
	 * The exposed Vue constructor.
	 *
	 * API conventions:
	 * - public API methods/properties are prefixed with `$`
	 * - internal methods/properties are prefixed with `_`
	 * - non-prefixed properties are assumed to be proxied user
	 *   data.
	 *
	 * @constructor
	 * @param {Object} [options]
	 * @public
	 */
	
	function Vue(options) {
	  this._init(options);
	}
	
	// install internals
	initMixin(Vue);
	stateMixin(Vue);
	eventsMixin(Vue);
	lifecycleMixin(Vue);
	miscMixin(Vue);
	
	// install APIs
	globalAPI(Vue);
	dataAPI(Vue);
	domAPI(Vue);
	eventsAPI(Vue);
	lifecycleAPI(Vue);
	
	var convertArray = vFor._postProcess;
	
	/**
	 * Limit filter for arrays
	 *
	 * @param {Number} n
	 * @param {Number} offset (Decimal expected)
	 */
	
	function limitBy(arr, n, offset) {
	  offset = offset ? parseInt(offset, 10) : 0;
	  return typeof n === 'number' ? arr.slice(offset, offset + n) : arr;
	}
	
	/**
	 * Filter filter for arrays
	 *
	 * @param {String} search
	 * @param {String} [delimiter]
	 * @param {String} ...dataKeys
	 */
	
	function filterBy(arr, search, delimiter) {
	  arr = convertArray(arr);
	  if (search == null) {
	    return arr;
	  }
	  if (typeof search === 'function') {
	    return arr.filter(search);
	  }
	  // cast to lowercase string
	  search = ('' + search).toLowerCase();
	  // allow optional `in` delimiter
	  // because why not
	  var n = delimiter === 'in' ? 3 : 2;
	  // extract and flatten keys
	  var keys = toArray(arguments, n).reduce(function (prev, cur) {
	    return prev.concat(cur);
	  }, []);
	  var res = [];
	  var item, key, val, j;
	  for (var i = 0, l = arr.length; i < l; i++) {
	    item = arr[i];
	    val = item && item.$value || item;
	    j = keys.length;
	    if (j) {
	      while (j--) {
	        key = keys[j];
	        if (key === '$key' && contains(item.$key, search) || contains(getPath(val, key), search)) {
	          res.push(item);
	          break;
	        }
	      }
	    } else if (contains(item, search)) {
	      res.push(item);
	    }
	  }
	  return res;
	}
	
	/**
	 * Filter filter for arrays
	 *
	 * @param {String} sortKey
	 * @param {String} reverse
	 */
	
	function orderBy(arr, sortKey, reverse) {
	  arr = convertArray(arr);
	  if (!sortKey) {
	    return arr;
	  }
	  var order = reverse && reverse < 0 ? -1 : 1;
	  // sort on a copy to avoid mutating original array
	  return arr.slice().sort(function (a, b) {
	    if (sortKey !== '$key') {
	      if (isObject(a) && '$value' in a) a = a.$value;
	      if (isObject(b) && '$value' in b) b = b.$value;
	    }
	    a = isObject(a) ? getPath(a, sortKey) : a;
	    b = isObject(b) ? getPath(b, sortKey) : b;
	    return a === b ? 0 : a > b ? order : -order;
	  });
	}
	
	/**
	 * String contain helper
	 *
	 * @param {*} val
	 * @param {String} search
	 */
	
	function contains(val, search) {
	  var i;
	  if (isPlainObject(val)) {
	    var keys = Object.keys(val);
	    i = keys.length;
	    while (i--) {
	      if (contains(val[keys[i]], search)) {
	        return true;
	      }
	    }
	  } else if (isArray(val)) {
	    i = val.length;
	    while (i--) {
	      if (contains(val[i], search)) {
	        return true;
	      }
	    }
	  } else if (val != null) {
	    return val.toString().toLowerCase().indexOf(search) > -1;
	  }
	}
	
	var digitsRE = /(\d{3})(?=\d)/g;
	
	// asset collections must be a plain object.
	var filters = {
	
	  orderBy: orderBy,
	  filterBy: filterBy,
	  limitBy: limitBy,
	
	  /**
	   * Stringify value.
	   *
	   * @param {Number} indent
	   */
	
	  json: {
	    read: function read(value, indent) {
	      return typeof value === 'string' ? value : JSON.stringify(value, null, Number(indent) || 2);
	    },
	    write: function write(value) {
	      try {
	        return JSON.parse(value);
	      } catch (e) {
	        return value;
	      }
	    }
	  },
	
	  /**
	   * 'abc' => 'Abc'
	   */
	
	  capitalize: function capitalize(value) {
	    if (!value && value !== 0) return '';
	    value = value.toString();
	    return value.charAt(0).toUpperCase() + value.slice(1);
	  },
	
	  /**
	   * 'abc' => 'ABC'
	   */
	
	  uppercase: function uppercase(value) {
	    return value || value === 0 ? value.toString().toUpperCase() : '';
	  },
	
	  /**
	   * 'AbC' => 'abc'
	   */
	
	  lowercase: function lowercase(value) {
	    return value || value === 0 ? value.toString().toLowerCase() : '';
	  },
	
	  /**
	   * 12345 => $12,345.00
	   *
	   * @param {String} sign
	   */
	
	  currency: function currency(value, _currency) {
	    value = parseFloat(value);
	    if (!isFinite(value) || !value && value !== 0) return '';
	    _currency = _currency != null ? _currency : '$';
	    var stringified = Math.abs(value).toFixed(2);
	    var _int = stringified.slice(0, -3);
	    var i = _int.length % 3;
	    var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
	    var _float = stringified.slice(-3);
	    var sign = value < 0 ? '-' : '';
	    return _currency + sign + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
	  },
	
	  /**
	   * 'item' => 'items'
	   *
	   * @params
	   *  an array of strings corresponding to
	   *  the single, double, triple ... forms of the word to
	   *  be pluralized. When the number to be pluralized
	   *  exceeds the length of the args, it will use the last
	   *  entry in the array.
	   *
	   *  e.g. ['single', 'double', 'triple', 'multiple']
	   */
	
	  pluralize: function pluralize(value) {
	    var args = toArray(arguments, 1);
	    return args.length > 1 ? args[value % 10 - 1] || args[args.length - 1] : args[0] + (value === 1 ? '' : 's');
	  },
	
	  /**
	   * Debounce a handler function.
	   *
	   * @param {Function} handler
	   * @param {Number} delay = 300
	   * @return {Function}
	   */
	
	  debounce: function debounce(handler, delay) {
	    if (!handler) return;
	    if (!delay) {
	      delay = 300;
	    }
	    return _debounce(handler, delay);
	  }
	};
	
	var partial = {
	
	  priority: 1750,
	
	  params: ['name'],
	
	  // watch changes to name for dynamic partials
	  paramWatchers: {
	    name: function name(value) {
	      vIf.remove.call(this);
	      if (value) {
	        this.insert(value);
	      }
	    }
	  },
	
	  bind: function bind() {
	    this.anchor = createAnchor('v-partial');
	    replace(this.el, this.anchor);
	    this.insert(this.params.name);
	  },
	
	  insert: function insert(id) {
	    var partial = resolveAsset(this.vm.$options, 'partials', id);
	    if (process.env.NODE_ENV !== 'production') {
	      assertAsset(partial, 'partial', id);
	    }
	    if (partial) {
	      this.factory = new FragmentFactory(this.vm, partial);
	      vIf.insert.call(this);
	    }
	  },
	
	  unbind: function unbind() {
	    if (this.frag) {
	      this.frag.destroy();
	    }
	  }
	};
	
	// This is the elementDirective that handles <content>
	// transclusions. It relies on the raw content of an
	// instance being stored as `$options._content` during
	// the transclude phase.
	
	// We are exporting two versions, one for named and one
	// for unnamed, because the unnamed slots must be compiled
	// AFTER all named slots have selected their content. So
	// we need to give them different priorities in the compilation
	// process. (See #1965)
	
	var slot = {
	
	  priority: 1750,
	
	  bind: function bind() {
	    var host = this.vm;
	    var raw = host.$options._content;
	    if (!raw) {
	      this.fallback();
	      return;
	    }
	    var context = host._context;
	    var slotName = this.params && this.params.name;
	    if (!slotName) {
	      // Default slot
	      this.tryCompile(extractFragment(raw.childNodes, raw, true), context, host);
	    } else {
	      // Named slot
	      var selector = '[slot="' + slotName + '"]';
	      var nodes = raw.querySelectorAll(selector);
	      if (nodes.length) {
	        this.tryCompile(extractFragment(nodes, raw), context, host);
	      } else {
	        this.fallback();
	      }
	    }
	  },
	
	  tryCompile: function tryCompile(content, context, host) {
	    if (content.hasChildNodes()) {
	      this.compile(content, context, host);
	    } else {
	      this.fallback();
	    }
	  },
	
	  compile: function compile(content, context, host) {
	    if (content && context) {
	      var scope = host ? host._scope : this._scope;
	      this.unlink = context.$compile(content, host, scope, this._frag);
	    }
	    if (content) {
	      replace(this.el, content);
	    } else {
	      remove(this.el);
	    }
	  },
	
	  fallback: function fallback() {
	    this.compile(extractContent(this.el, true), this.vm);
	  },
	
	  unbind: function unbind() {
	    if (this.unlink) {
	      this.unlink();
	    }
	  }
	};
	
	var namedSlot = extend(extend({}, slot), {
	  priority: slot.priority + 1,
	  params: ['name']
	});
	
	/**
	 * Extract qualified content nodes from a node list.
	 *
	 * @param {NodeList} nodes
	 * @param {Element} parent
	 * @param {Boolean} main
	 * @return {DocumentFragment}
	 */
	
	function extractFragment(nodes, parent, main) {
	  var frag = document.createDocumentFragment();
	  for (var i = 0, l = nodes.length; i < l; i++) {
	    var node = nodes[i];
	    // if this is the main outlet, we want to skip all
	    // previously selected nodes;
	    // otherwise, we want to mark the node as selected.
	    // clone the node so the original raw content remains
	    // intact. this ensures proper re-compilation in cases
	    // where the outlet is inside a conditional block
	    if (main && !node.__v_selected) {
	      append(node);
	    } else if (!main && node.parentNode === parent) {
	      node.__v_selected = true;
	      append(node);
	    }
	  }
	  return frag;
	
	  function append(node) {
	    if (isTemplate(node) && !node.hasAttribute('v-if') && !node.hasAttribute('v-for')) {
	      node = parseTemplate(node);
	    }
	    node = cloneNode(node);
	    frag.appendChild(node);
	  }
	}
	
	var elementDirectives = {
	  slot: slot,
	  _namedSlot: namedSlot, // same as slot but with higher priority
	  partial: partial
	};
	
	Vue.version = '1.0.11';
	
	/**
	 * Vue and every constructor that extends Vue has an
	 * associated options object, which can be accessed during
	 * compilation steps as `this.constructor.options`.
	 *
	 * These can be seen as the default options of every
	 * Vue instance.
	 */
	
	Vue.options = {
	  directives: publicDirectives,
	  elementDirectives: elementDirectives,
	  filters: filters,
	  transitions: {},
	  components: {},
	  partials: {},
	  replace: true
	};
	
	// devtools global hook
	/* istanbul ignore if */
	if (process.env.NODE_ENV !== 'production' && inBrowser) {
	  if (window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
	    window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit('init', Vue);
	  } else if (/Chrome\/\d+/.test(navigator.userAgent)) {
	    console.log('Download the Vue Devtools for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
	  }
	}
	
	module.exports = Vue;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ },
/* 5 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	var babelHelpers = {};
	
	babelHelpers.classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};
	function Target(path, matcher, delegate) {
	  this.path = path;
	  this.matcher = matcher;
	  this.delegate = delegate;
	}
	
	Target.prototype = {
	  to: function to(target, callback) {
	    var delegate = this.delegate;
	
	    if (delegate && delegate.willAddRoute) {
	      target = delegate.willAddRoute(this.matcher.target, target);
	    }
	
	    this.matcher.add(this.path, target);
	
	    if (callback) {
	      if (callback.length === 0) {
	        throw new Error("You must have an argument in the function passed to `to`");
	      }
	      this.matcher.addChild(this.path, target, callback, this.delegate);
	    }
	    return this;
	  }
	};
	
	function Matcher(target) {
	  this.routes = {};
	  this.children = {};
	  this.target = target;
	}
	
	Matcher.prototype = {
	  add: function add(path, handler) {
	    this.routes[path] = handler;
	  },
	
	  addChild: function addChild(path, target, callback, delegate) {
	    var matcher = new Matcher(target);
	    this.children[path] = matcher;
	
	    var match = generateMatch(path, matcher, delegate);
	
	    if (delegate && delegate.contextEntered) {
	      delegate.contextEntered(target, match);
	    }
	
	    callback(match);
	  }
	};
	
	function generateMatch(startingPath, matcher, delegate) {
	  return function (path, nestedCallback) {
	    var fullPath = startingPath + path;
	
	    if (nestedCallback) {
	      nestedCallback(generateMatch(fullPath, matcher, delegate));
	    } else {
	      return new Target(startingPath + path, matcher, delegate);
	    }
	  };
	}
	
	function addRoute(routeArray, path, handler) {
	  var len = 0;
	  for (var i = 0, l = routeArray.length; i < l; i++) {
	    len += routeArray[i].path.length;
	  }
	
	  path = path.substr(len);
	  var route = { path: path, handler: handler };
	  routeArray.push(route);
	}
	
	function eachRoute(baseRoute, matcher, callback, binding) {
	  var routes = matcher.routes;
	
	  for (var path in routes) {
	    if (routes.hasOwnProperty(path)) {
	      var routeArray = baseRoute.slice();
	      addRoute(routeArray, path, routes[path]);
	
	      if (matcher.children[path]) {
	        eachRoute(routeArray, matcher.children[path], callback, binding);
	      } else {
	        callback.call(binding, routeArray);
	      }
	    }
	  }
	}
	
	function map (callback, addRouteCallback) {
	  var matcher = new Matcher();
	
	  callback(generateMatch("", matcher, this.delegate));
	
	  eachRoute([], matcher, function (route) {
	    if (addRouteCallback) {
	      addRouteCallback(this, route);
	    } else {
	      this.add(route);
	    }
	  }, this);
	}
	
	var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];
	
	var escapeRegex = new RegExp('(\\' + specials.join('|\\') + ')', 'g');
	
	function isArray(test) {
	  return Object.prototype.toString.call(test) === "[object Array]";
	}
	
	// A Segment represents a segment in the original route description.
	// Each Segment type provides an `eachChar` and `regex` method.
	//
	// The `eachChar` method invokes the callback with one or more character
	// specifications. A character specification consumes one or more input
	// characters.
	//
	// The `regex` method returns a regex fragment for the segment. If the
	// segment is a dynamic of star segment, the regex fragment also includes
	// a capture.
	//
	// A character specification contains:
	//
	// * `validChars`: a String with a list of all valid characters, or
	// * `invalidChars`: a String with a list of all invalid characters
	// * `repeat`: true if the character specification can repeat
	
	function StaticSegment(string) {
	  this.string = string;
	}
	StaticSegment.prototype = {
	  eachChar: function eachChar(callback) {
	    var string = this.string,
	        ch;
	
	    for (var i = 0, l = string.length; i < l; i++) {
	      ch = string.charAt(i);
	      callback({ validChars: ch });
	    }
	  },
	
	  regex: function regex() {
	    return this.string.replace(escapeRegex, '\\$1');
	  },
	
	  generate: function generate() {
	    return this.string;
	  }
	};
	
	function DynamicSegment(name) {
	  this.name = name;
	}
	DynamicSegment.prototype = {
	  eachChar: function eachChar(callback) {
	    callback({ invalidChars: "/", repeat: true });
	  },
	
	  regex: function regex() {
	    return "([^/]+)";
	  },
	
	  generate: function generate(params) {
	    return params[this.name];
	  }
	};
	
	function StarSegment(name) {
	  this.name = name;
	}
	StarSegment.prototype = {
	  eachChar: function eachChar(callback) {
	    callback({ invalidChars: "", repeat: true });
	  },
	
	  regex: function regex() {
	    return "(.+)";
	  },
	
	  generate: function generate(params) {
	    return params[this.name];
	  }
	};
	
	function EpsilonSegment() {}
	EpsilonSegment.prototype = {
	  eachChar: function eachChar() {},
	  regex: function regex() {
	    return "";
	  },
	  generate: function generate() {
	    return "";
	  }
	};
	
	function parse(route, names, specificity) {
	  // normalize route as not starting with a "/". Recognition will
	  // also normalize.
	  if (route.charAt(0) === "/") {
	    route = route.substr(1);
	  }
	
	  var segments = route.split("/"),
	      results = [];
	
	  // A routes has specificity determined by the order that its different segments
	  // appear in. This system mirrors how the magnitude of numbers written as strings
	  // works.
	  // Consider a number written as: "abc". An example would be "200". Any other number written
	  // "xyz" will be smaller than "abc" so long as `a > z`. For instance, "199" is smaller
	  // then "200", even though "y" and "z" (which are both 9) are larger than "0" (the value
	  // of (`b` and `c`). This is because the leading symbol, "2", is larger than the other
	  // leading symbol, "1".
	  // The rule is that symbols to the left carry more weight than symbols to the right
	  // when a number is written out as a string. In the above strings, the leading digit
	  // represents how many 100's are in the number, and it carries more weight than the middle
	  // number which represents how many 10's are in the number.
	  // This system of number magnitude works well for route specificity, too. A route written as
	  // `a/b/c` will be more specific than `x/y/z` as long as `a` is more specific than
	  // `x`, irrespective of the other parts.
	  // Because of this similarity, we assign each type of segment a number value written as a
	  // string. We can find the specificity of compound routes by concatenating these strings
	  // together, from left to right. After we have looped through all of the segments,
	  // we convert the string to a number.
	  specificity.val = '';
	
	  for (var i = 0, l = segments.length; i < l; i++) {
	    var segment = segments[i],
	        match;
	
	    if (match = segment.match(/^:([^\/]+)$/)) {
	      results.push(new DynamicSegment(match[1]));
	      names.push(match[1]);
	      specificity.val += '3';
	    } else if (match = segment.match(/^\*([^\/]+)$/)) {
	      results.push(new StarSegment(match[1]));
	      specificity.val += '2';
	      names.push(match[1]);
	    } else if (segment === "") {
	      results.push(new EpsilonSegment());
	      specificity.val += '1';
	    } else {
	      results.push(new StaticSegment(segment));
	      specificity.val += '4';
	    }
	  }
	
	  specificity.val = +specificity.val;
	
	  return results;
	}
	
	// A State has a character specification and (`charSpec`) and a list of possible
	// subsequent states (`nextStates`).
	//
	// If a State is an accepting state, it will also have several additional
	// properties:
	//
	// * `regex`: A regular expression that is used to extract parameters from paths
	//   that reached this accepting state.
	// * `handlers`: Information on how to convert the list of captures into calls
	//   to registered handlers with the specified parameters
	// * `types`: How many static, dynamic or star segments in this route. Used to
	//   decide which route to use if multiple registered routes match a path.
	//
	// Currently, State is implemented naively by looping over `nextStates` and
	// comparing a character specification against a character. A more efficient
	// implementation would use a hash of keys pointing at one or more next states.
	
	function State(charSpec) {
	  this.charSpec = charSpec;
	  this.nextStates = [];
	}
	
	State.prototype = {
	  get: function get(charSpec) {
	    var nextStates = this.nextStates;
	
	    for (var i = 0, l = nextStates.length; i < l; i++) {
	      var child = nextStates[i];
	
	      var isEqual = child.charSpec.validChars === charSpec.validChars;
	      isEqual = isEqual && child.charSpec.invalidChars === charSpec.invalidChars;
	
	      if (isEqual) {
	        return child;
	      }
	    }
	  },
	
	  put: function put(charSpec) {
	    var state;
	
	    // If the character specification already exists in a child of the current
	    // state, just return that state.
	    if (state = this.get(charSpec)) {
	      return state;
	    }
	
	    // Make a new state for the character spec
	    state = new State(charSpec);
	
	    // Insert the new state as a child of the current state
	    this.nextStates.push(state);
	
	    // If this character specification repeats, insert the new state as a child
	    // of itself. Note that this will not trigger an infinite loop because each
	    // transition during recognition consumes a character.
	    if (charSpec.repeat) {
	      state.nextStates.push(state);
	    }
	
	    // Return the new state
	    return state;
	  },
	
	  // Find a list of child states matching the next character
	  match: function match(ch) {
	    // DEBUG "Processing `" + ch + "`:"
	    var nextStates = this.nextStates,
	        child,
	        charSpec,
	        chars;
	
	    // DEBUG "  " + debugState(this)
	    var returned = [];
	
	    for (var i = 0, l = nextStates.length; i < l; i++) {
	      child = nextStates[i];
	
	      charSpec = child.charSpec;
	
	      if (typeof (chars = charSpec.validChars) !== 'undefined') {
	        if (chars.indexOf(ch) !== -1) {
	          returned.push(child);
	        }
	      } else if (typeof (chars = charSpec.invalidChars) !== 'undefined') {
	        if (chars.indexOf(ch) === -1) {
	          returned.push(child);
	        }
	      }
	    }
	
	    return returned;
	  }
	
	  /** IF DEBUG
	  , debug: function() {
	    var charSpec = this.charSpec,
	        debug = "[",
	        chars = charSpec.validChars || charSpec.invalidChars;
	     if (charSpec.invalidChars) { debug += "^"; }
	    debug += chars;
	    debug += "]";
	     if (charSpec.repeat) { debug += "+"; }
	     return debug;
	  }
	  END IF **/
	};
	
	/** IF DEBUG
	function debug(log) {
	  console.log(log);
	}
	
	function debugState(state) {
	  return state.nextStates.map(function(n) {
	    if (n.nextStates.length === 0) { return "( " + n.debug() + " [accepting] )"; }
	    return "( " + n.debug() + " <then> " + n.nextStates.map(function(s) { return s.debug() }).join(" or ") + " )";
	  }).join(", ")
	}
	END IF **/
	
	// Sort the routes by specificity
	function sortSolutions(states) {
	  return states.sort(function (a, b) {
	    return b.specificity.val - a.specificity.val;
	  });
	}
	
	function recognizeChar(states, ch) {
	  var nextStates = [];
	
	  for (var i = 0, l = states.length; i < l; i++) {
	    var state = states[i];
	
	    nextStates = nextStates.concat(state.match(ch));
	  }
	
	  return nextStates;
	}
	
	var oCreate = Object.create || function (proto) {
	  function F() {}
	  F.prototype = proto;
	  return new F();
	};
	
	function RecognizeResults(queryParams) {
	  this.queryParams = queryParams || {};
	}
	RecognizeResults.prototype = oCreate({
	  splice: Array.prototype.splice,
	  slice: Array.prototype.slice,
	  push: Array.prototype.push,
	  length: 0,
	  queryParams: null
	});
	
	function findHandler(state, path, queryParams) {
	  var handlers = state.handlers,
	      regex = state.regex;
	  var captures = path.match(regex),
	      currentCapture = 1;
	  var result = new RecognizeResults(queryParams);
	
	  for (var i = 0, l = handlers.length; i < l; i++) {
	    var handler = handlers[i],
	        names = handler.names,
	        params = {};
	
	    for (var j = 0, m = names.length; j < m; j++) {
	      params[names[j]] = captures[currentCapture++];
	    }
	
	    result.push({ handler: handler.handler, params: params, isDynamic: !!names.length });
	  }
	
	  return result;
	}
	
	function addSegment(currentState, segment) {
	  segment.eachChar(function (ch) {
	    var state;
	
	    currentState = currentState.put(ch);
	  });
	
	  return currentState;
	}
	
	function decodeQueryParamPart(part) {
	  // http://www.w3.org/TR/html401/interact/forms.html#h-17.13.4.1
	  part = part.replace(/\+/gm, '%20');
	  return decodeURIComponent(part);
	}
	
	// The main interface
	
	var RouteRecognizer = function RouteRecognizer() {
	  this.rootState = new State();
	  this.names = {};
	};
	
	RouteRecognizer.prototype = {
	  add: function add(routes, options) {
	    var currentState = this.rootState,
	        regex = "^",
	        specificity = {},
	        handlers = [],
	        allSegments = [],
	        name;
	
	    var isEmpty = true;
	
	    for (var i = 0, l = routes.length; i < l; i++) {
	      var route = routes[i],
	          names = [];
	
	      var segments = parse(route.path, names, specificity);
	
	      allSegments = allSegments.concat(segments);
	
	      for (var j = 0, m = segments.length; j < m; j++) {
	        var segment = segments[j];
	
	        if (segment instanceof EpsilonSegment) {
	          continue;
	        }
	
	        isEmpty = false;
	
	        // Add a "/" for the new segment
	        currentState = currentState.put({ validChars: "/" });
	        regex += "/";
	
	        // Add a representation of the segment to the NFA and regex
	        currentState = addSegment(currentState, segment);
	        regex += segment.regex();
	      }
	
	      var handler = { handler: route.handler, names: names };
	      handlers.push(handler);
	    }
	
	    if (isEmpty) {
	      currentState = currentState.put({ validChars: "/" });
	      regex += "/";
	    }
	
	    currentState.handlers = handlers;
	    currentState.regex = new RegExp(regex + "$");
	    currentState.specificity = specificity;
	
	    if (name = options && options.as) {
	      this.names[name] = {
	        segments: allSegments,
	        handlers: handlers
	      };
	    }
	  },
	
	  handlersFor: function handlersFor(name) {
	    var route = this.names[name],
	        result = [];
	    if (!route) {
	      throw new Error("There is no route named " + name);
	    }
	
	    for (var i = 0, l = route.handlers.length; i < l; i++) {
	      result.push(route.handlers[i]);
	    }
	
	    return result;
	  },
	
	  hasRoute: function hasRoute(name) {
	    return !!this.names[name];
	  },
	
	  generate: function generate(name, params) {
	    var route = this.names[name],
	        output = "";
	    if (!route) {
	      throw new Error("There is no route named " + name);
	    }
	
	    var segments = route.segments;
	
	    for (var i = 0, l = segments.length; i < l; i++) {
	      var segment = segments[i];
	
	      if (segment instanceof EpsilonSegment) {
	        continue;
	      }
	
	      output += "/";
	      output += segment.generate(params);
	    }
	
	    if (output.charAt(0) !== '/') {
	      output = '/' + output;
	    }
	
	    if (params && params.queryParams) {
	      output += this.generateQueryString(params.queryParams);
	    }
	
	    return output;
	  },
	
	  generateQueryString: function generateQueryString(params) {
	    var pairs = [];
	    var keys = [];
	    for (var key in params) {
	      if (params.hasOwnProperty(key)) {
	        keys.push(key);
	      }
	    }
	    keys.sort();
	    for (var i = 0, len = keys.length; i < len; i++) {
	      key = keys[i];
	      var value = params[key];
	      if (value == null) {
	        continue;
	      }
	      var pair = encodeURIComponent(key);
	      if (isArray(value)) {
	        for (var j = 0, l = value.length; j < l; j++) {
	          var arrayPair = key + '[]' + '=' + encodeURIComponent(value[j]);
	          pairs.push(arrayPair);
	        }
	      } else {
	        pair += "=" + encodeURIComponent(value);
	        pairs.push(pair);
	      }
	    }
	
	    if (pairs.length === 0) {
	      return '';
	    }
	
	    return "?" + pairs.join("&");
	  },
	
	  parseQueryString: function parseQueryString(queryString) {
	    var pairs = queryString.split("&"),
	        queryParams = {};
	    for (var i = 0; i < pairs.length; i++) {
	      var pair = pairs[i].split('='),
	          key = decodeQueryParamPart(pair[0]),
	          keyLength = key.length,
	          isArray = false,
	          value;
	      if (pair.length === 1) {
	        value = 'true';
	      } else {
	        //Handle arrays
	        if (keyLength > 2 && key.slice(keyLength - 2) === '[]') {
	          isArray = true;
	          key = key.slice(0, keyLength - 2);
	          if (!queryParams[key]) {
	            queryParams[key] = [];
	          }
	        }
	        value = pair[1] ? decodeQueryParamPart(pair[1]) : '';
	      }
	      if (isArray) {
	        queryParams[key].push(value);
	      } else {
	        queryParams[key] = value;
	      }
	    }
	    return queryParams;
	  },
	
	  recognize: function recognize(path) {
	    var states = [this.rootState],
	        pathLen,
	        i,
	        l,
	        queryStart,
	        queryParams = {},
	        isSlashDropped = false;
	
	    queryStart = path.indexOf('?');
	    if (queryStart !== -1) {
	      var queryString = path.substr(queryStart + 1, path.length);
	      path = path.substr(0, queryStart);
	      queryParams = this.parseQueryString(queryString);
	    }
	
	    path = decodeURI(path);
	
	    // DEBUG GROUP path
	
	    if (path.charAt(0) !== "/") {
	      path = "/" + path;
	    }
	
	    pathLen = path.length;
	    if (pathLen > 1 && path.charAt(pathLen - 1) === "/") {
	      path = path.substr(0, pathLen - 1);
	      isSlashDropped = true;
	    }
	
	    for (i = 0, l = path.length; i < l; i++) {
	      states = recognizeChar(states, path.charAt(i));
	      if (!states.length) {
	        break;
	      }
	    }
	
	    // END DEBUG GROUP
	
	    var solutions = [];
	    for (i = 0, l = states.length; i < l; i++) {
	      if (states[i].handlers) {
	        solutions.push(states[i]);
	      }
	    }
	
	    states = sortSolutions(solutions);
	
	    var state = solutions[0];
	
	    if (state && state.handlers) {
	      // if a trailing slash was dropped and a star segment is the last segment
	      // specified, put the trailing slash back
	      if (isSlashDropped && state.regex.source.slice(-5) === "(.+)$") {
	        path = path + "/";
	      }
	      return findHandler(state, path, queryParams);
	    }
	  }
	};
	
	RouteRecognizer.prototype.map = map;
	
	RouteRecognizer.VERSION = '0.1.9';
	
	var genQuery = RouteRecognizer.prototype.generateQueryString;
	
	// export default for holding the Vue reference
	var exports$1 = {};
	/**
	 * Warn stuff.
	 *
	 * @param {String} msg
	 */
	
	function warn(msg) {
	  /* istanbul ignore next */
	  if (window.console) {
	    console.warn('[vue-router] ' + msg);
	    /* istanbul ignore if */
	    if (!exports$1.Vue || exports$1.Vue.config.debug) {
	      console.warn(new Error('warning stack trace:').stack);
	    }
	  }
	}
	
	/**
	 * Resolve a relative path.
	 *
	 * @param {String} base
	 * @param {String} relative
	 * @param {Boolean} append
	 * @return {String}
	 */
	
	function resolvePath(base, relative, append) {
	  var query = base.match(/(\?.*)$/);
	  if (query) {
	    query = query[1];
	    base = base.slice(0, -query.length);
	  }
	  // a query!
	  if (relative.charAt(0) === '?') {
	    return base + relative;
	  }
	  var stack = base.split('/');
	  // remove trailing segment if:
	  // - not appending
	  // - appending to trailing slash (last segment is empty)
	  if (!append || !stack[stack.length - 1]) {
	    stack.pop();
	  }
	  // resolve relative path
	  var segments = relative.replace(/^\//, '').split('/');
	  for (var i = 0; i < segments.length; i++) {
	    var segment = segments[i];
	    if (segment === '.') {
	      continue;
	    } else if (segment === '..') {
	      stack.pop();
	    } else {
	      stack.push(segment);
	    }
	  }
	  // ensure leading slash
	  if (stack[0] !== '') {
	    stack.unshift('');
	  }
	  return stack.join('/');
	}
	
	/**
	 * Forgiving check for a promise
	 *
	 * @param {Object} p
	 * @return {Boolean}
	 */
	
	function isPromise(p) {
	  return p && typeof p.then === 'function';
	}
	
	/**
	 * Retrive a route config field from a component instance
	 * OR a component contructor.
	 *
	 * @param {Function|Vue} component
	 * @param {String} name
	 * @return {*}
	 */
	
	function getRouteConfig(component, name) {
	  var options = component && (component.$options || component.options);
	  return options && options.route && options.route[name];
	}
	
	/**
	 * Resolve an async component factory. Have to do a dirty
	 * mock here because of Vue core's internal API depends on
	 * an ID check.
	 *
	 * @param {Object} handler
	 * @param {Function} cb
	 */
	
	var resolver = undefined;
	
	function resolveAsyncComponent(handler, cb) {
	  if (!resolver) {
	    resolver = {
	      resolve: exports$1.Vue.prototype._resolveComponent,
	      $options: {
	        components: {
	          _: handler.component
	        }
	      }
	    };
	  } else {
	    resolver.$options.components._ = handler.component;
	  }
	  resolver.resolve('_', function (Component) {
	    handler.component = Component;
	    cb(Component);
	  });
	}
	
	/**
	 * Map the dynamic segments in a path to params.
	 *
	 * @param {String} path
	 * @param {Object} params
	 * @param {Object} query
	 */
	
	function mapParams(path, params, query) {
	  if (params === undefined) params = {};
	
	  path = path.replace(/:([^\/]+)/g, function (_, key) {
	    var val = params[key];
	    if (!val) {
	      warn('param "' + key + '" not found when generating ' + 'path for "' + path + '" with params ' + JSON.stringify(params));
	    }
	    return val || '';
	  });
	  if (query) {
	    path += genQuery(query);
	  }
	  return path;
	}
	
	var hashRE = /#.*$/;
	
	var HTML5History = (function () {
	  function HTML5History(_ref) {
	    var root = _ref.root;
	    var onChange = _ref.onChange;
	    babelHelpers.classCallCheck(this, HTML5History);
	
	    if (root) {
	      // make sure there's the starting slash
	      if (root.charAt(0) !== '/') {
	        root = '/' + root;
	      }
	      // remove trailing slash
	      this.root = root.replace(/\/$/, '');
	      this.rootRE = new RegExp('^\\' + this.root);
	    } else {
	      this.root = null;
	    }
	    this.onChange = onChange;
	    // check base tag
	    var baseEl = document.querySelector('base');
	    this.base = baseEl && baseEl.getAttribute('href');
	  }
	
	  HTML5History.prototype.start = function start() {
	    var _this = this;
	
	    this.listener = function (e) {
	      var url = decodeURI(location.pathname + location.search);
	      if (_this.root) {
	        url = url.replace(_this.rootRE, '');
	      }
	      _this.onChange(url, e && e.state, location.hash);
	    };
	    window.addEventListener('popstate', this.listener);
	    this.listener();
	  };
	
	  HTML5History.prototype.stop = function stop() {
	    window.removeEventListener('popstate', this.listener);
	  };
	
	  HTML5History.prototype.go = function go(path, replace, append) {
	    var url = this.formatPath(path, append);
	    if (replace) {
	      history.replaceState({}, '', url);
	    } else {
	      // record scroll position by replacing current state
	      history.replaceState({
	        pos: {
	          x: window.pageXOffset,
	          y: window.pageYOffset
	        }
	      }, '');
	      // then push new state
	      history.pushState({}, '', url);
	    }
	    var hashMatch = path.match(hashRE);
	    var hash = hashMatch && hashMatch[0];
	    path = url
	    // strip hash so it doesn't mess up params
	    .replace(hashRE, '')
	    // remove root before matching
	    .replace(this.rootRE, '');
	    this.onChange(path, null, hash);
	  };
	
	  HTML5History.prototype.formatPath = function formatPath(path, append) {
	    return path.charAt(0) === '/'
	    // absolute path
	    ? this.root ? this.root + '/' + path.replace(/^\//, '') : path : resolvePath(this.base || location.pathname, path, append);
	  };
	
	  return HTML5History;
	})();
	
	var HashHistory = (function () {
	  function HashHistory(_ref) {
	    var hashbang = _ref.hashbang;
	    var onChange = _ref.onChange;
	    babelHelpers.classCallCheck(this, HashHistory);
	
	    this.hashbang = hashbang;
	    this.onChange = onChange;
	  }
	
	  HashHistory.prototype.start = function start() {
	    var self = this;
	    this.listener = function () {
	      var path = location.hash;
	      var raw = path.replace(/^#!?/, '');
	      // always
	      if (raw.charAt(0) !== '/') {
	        raw = '/' + raw;
	      }
	      var formattedPath = self.formatPath(raw);
	      if (formattedPath !== path) {
	        location.replace(formattedPath);
	        return;
	      }
	      // determine query
	      // note it's possible to have queries in both the actual URL
	      // and the hash fragment itself.
	      var query = location.search && path.indexOf('?') > -1 ? '&' + location.search.slice(1) : location.search;
	      self.onChange(decodeURI(path.replace(/^#!?/, '') + query));
	    };
	    window.addEventListener('hashchange', this.listener);
	    this.listener();
	  };
	
	  HashHistory.prototype.stop = function stop() {
	    window.removeEventListener('hashchange', this.listener);
	  };
	
	  HashHistory.prototype.go = function go(path, replace, append) {
	    path = this.formatPath(path, append);
	    if (replace) {
	      location.replace(path);
	    } else {
	      location.hash = path;
	    }
	  };
	
	  HashHistory.prototype.formatPath = function formatPath(path, append) {
	    var isAbsoloute = path.charAt(0) === '/';
	    var prefix = '#' + (this.hashbang ? '!' : '');
	    return isAbsoloute ? prefix + path : prefix + resolvePath(location.hash.replace(/^#!?/, ''), path, append);
	  };
	
	  return HashHistory;
	})();
	
	var AbstractHistory = (function () {
	  function AbstractHistory(_ref) {
	    var onChange = _ref.onChange;
	    babelHelpers.classCallCheck(this, AbstractHistory);
	
	    this.onChange = onChange;
	    this.currentPath = '/';
	  }
	
	  AbstractHistory.prototype.start = function start() {
	    this.onChange('/');
	  };
	
	  AbstractHistory.prototype.stop = function stop() {
	    // noop
	  };
	
	  AbstractHistory.prototype.go = function go(path, replace, append) {
	    path = this.currentPath = this.formatPath(path, append);
	    this.onChange(path);
	  };
	
	  AbstractHistory.prototype.formatPath = function formatPath(path, append) {
	    return path.charAt(0) === '/' ? path : resolvePath(this.currentPath, path, append);
	  };
	
	  return AbstractHistory;
	})();
	
	/**
	 * Determine the reusability of an existing router view.
	 *
	 * @param {Directive} view
	 * @param {Object} handler
	 * @param {Transition} transition
	 */
	
	function canReuse(view, handler, transition) {
	  var component = view.childVM;
	  if (!component || !handler) {
	    return false;
	  }
	  // important: check view.Component here because it may
	  // have been changed in activate hook
	  if (view.Component !== handler.component) {
	    return false;
	  }
	  var canReuseFn = getRouteConfig(component, 'canReuse');
	  return typeof canReuseFn === 'boolean' ? canReuseFn : canReuseFn ? canReuseFn.call(component, {
	    to: transition.to,
	    from: transition.from
	  }) : true; // defaults to true
	}
	
	/**
	 * Check if a component can deactivate.
	 *
	 * @param {Directive} view
	 * @param {Transition} transition
	 * @param {Function} next
	 */
	
	function canDeactivate(view, transition, next) {
	  var fromComponent = view.childVM;
	  var hook = getRouteConfig(fromComponent, 'canDeactivate');
	  if (!hook) {
	    next();
	  } else {
	    transition.callHook(hook, fromComponent, next, {
	      expectBoolean: true
	    });
	  }
	}
	
	/**
	 * Check if a component can activate.
	 *
	 * @param {Object} handler
	 * @param {Transition} transition
	 * @param {Function} next
	 */
	
	function canActivate(handler, transition, next) {
	  resolveAsyncComponent(handler, function (Component) {
	    // have to check due to async-ness
	    if (transition.aborted) {
	      return;
	    }
	    // determine if this component can be activated
	    var hook = getRouteConfig(Component, 'canActivate');
	    if (!hook) {
	      next();
	    } else {
	      transition.callHook(hook, null, next, {
	        expectBoolean: true
	      });
	    }
	  });
	}
	
	/**
	 * Call deactivate hooks for existing router-views.
	 *
	 * @param {Directive} view
	 * @param {Transition} transition
	 * @param {Function} next
	 */
	
	function deactivate(view, transition, next) {
	  var component = view.childVM;
	  var hook = getRouteConfig(component, 'deactivate');
	  if (!hook) {
	    next();
	  } else {
	    transition.callHooks(hook, component, next);
	  }
	}
	
	/**
	 * Activate / switch component for a router-view.
	 *
	 * @param {Directive} view
	 * @param {Transition} transition
	 * @param {Number} depth
	 * @param {Function} [cb]
	 */
	
	function activate(view, transition, depth, cb, reuse) {
	  var handler = transition.activateQueue[depth];
	  if (!handler) {
	    // fix 1.0.0-alpha.3 compat
	    if (view._bound) {
	      view.setComponent(null);
	    }
	    cb && cb();
	    return;
	  }
	
	  var Component = view.Component = handler.component;
	  var activateHook = getRouteConfig(Component, 'activate');
	  var dataHook = getRouteConfig(Component, 'data');
	  var waitForData = getRouteConfig(Component, 'waitForData');
	
	  view.depth = depth;
	  view.activated = false;
	
	  var component = undefined;
	  var loading = !!(dataHook && !waitForData);
	
	  // "reuse" is a flag passed down when the parent view is
	  // either reused via keep-alive or as a child of a kept-alive view.
	  // of course we can only reuse if the current kept-alive instance
	  // is of the correct type.
	  reuse = reuse && view.childVM && view.childVM.constructor === Component;
	
	  if (reuse) {
	    // just reuse
	    component = view.childVM;
	    component.$loadingRouteData = loading;
	  } else {
	    // unbuild current component. this step also destroys
	    // and removes all nested child views.
	    view.unbuild(true);
	    // handle keep-alive.
	    // if the view has keep-alive, the child vm is not actually
	    // destroyed - its nested views will still be in router's
	    // view list. We need to removed these child views and
	    // cache them on the child vm.
	    if (view.keepAlive) {
	      var views = transition.router._views;
	      var i = views.indexOf(view);
	      if (i > 0) {
	        transition.router._views = views.slice(i);
	        if (view.childVM) {
	          view.childVM._routerViews = views.slice(0, i);
	        }
	      }
	    }
	
	    // build the new component. this will also create the
	    // direct child view of the current one. it will register
	    // itself as view.childView.
	    component = view.build({
	      _meta: {
	        $loadingRouteData: loading
	      }
	    });
	    // handle keep-alive.
	    // when a kept-alive child vm is restored, we need to
	    // add its cached child views into the router's view list,
	    // and also properly update current view's child view.
	    if (view.keepAlive) {
	      component.$loadingRouteData = loading;
	      var cachedViews = component._routerViews;
	      if (cachedViews) {
	        transition.router._views = cachedViews.concat(transition.router._views);
	        view.childView = cachedViews[cachedViews.length - 1];
	        component._routerViews = null;
	      }
	    }
	  }
	
	  // cleanup the component in case the transition is aborted
	  // before the component is ever inserted.
	  var cleanup = function cleanup() {
	    component.$destroy();
	  };
	
	  // actually insert the component and trigger transition
	  var insert = function insert() {
	    if (reuse) {
	      cb && cb();
	      return;
	    }
	    var router = transition.router;
	    if (router._rendered || router._transitionOnLoad) {
	      view.transition(component);
	    } else {
	      // no transition on first render, manual transition
	      /* istanbul ignore if */
	      if (view.setCurrent) {
	        // 0.12 compat
	        view.setCurrent(component);
	      } else {
	        // 1.0
	        view.childVM = component;
	      }
	      component.$before(view.anchor, null, false);
	    }
	    cb && cb();
	  };
	
	  // called after activation hook is resolved
	  var afterActivate = function afterActivate() {
	    view.activated = true;
	    // activate the child view
	    if (view.childView) {
	      activate(view.childView, transition, depth + 1, null, reuse || view.keepAlive);
	    }
	    if (dataHook && waitForData) {
	      // wait until data loaded to insert
	      loadData(component, transition, dataHook, insert, cleanup);
	    } else {
	      // load data and insert at the same time
	      if (dataHook) {
	        loadData(component, transition, dataHook);
	      }
	      insert();
	    }
	  };
	
	  if (activateHook) {
	    transition.callHooks(activateHook, component, afterActivate, {
	      cleanup: cleanup
	    });
	  } else {
	    afterActivate();
	  }
	}
	
	/**
	 * Reuse a view, just reload data if necessary.
	 *
	 * @param {Directive} view
	 * @param {Transition} transition
	 */
	
	function reuse(view, transition) {
	  var component = view.childVM;
	  var dataHook = getRouteConfig(component, 'data');
	  if (dataHook) {
	    loadData(component, transition, dataHook);
	  }
	}
	
	/**
	 * Asynchronously load and apply data to component.
	 *
	 * @param {Vue} component
	 * @param {Transition} transition
	 * @param {Function} hook
	 * @param {Function} cb
	 * @param {Function} cleanup
	 */
	
	function loadData(component, transition, hook, cb, cleanup) {
	  component.$loadingRouteData = true;
	  transition.callHooks(hook, component, function (data, onError) {
	    // merge data from multiple data hooks
	    if (Array.isArray(data) && data._needMerge) {
	      data = data.reduce(function (res, obj) {
	        if (isPlainObject(obj)) {
	          Object.keys(obj).forEach(function (key) {
	            res[key] = obj[key];
	          });
	        }
	        return res;
	      }, Object.create(null));
	    }
	    // handle promise sugar syntax
	    var promises = [];
	    if (isPlainObject(data)) {
	      Object.keys(data).forEach(function (key) {
	        var val = data[key];
	        if (isPromise(val)) {
	          promises.push(val.then(function (resolvedVal) {
	            component.$set(key, resolvedVal);
	          }));
	        } else {
	          component.$set(key, val);
	        }
	      });
	    }
	    if (!promises.length) {
	      component.$loadingRouteData = false;
	      cb && cb();
	    } else {
	      promises[0].constructor.all(promises).then(function (_) {
	        component.$loadingRouteData = false;
	        cb && cb();
	      }, onError);
	    }
	  }, {
	    cleanup: cleanup,
	    expectData: true
	  });
	}
	
	function isPlainObject(obj) {
	  return Object.prototype.toString.call(obj) === '[object Object]';
	}
	
	/**
	 * A RouteTransition object manages the pipeline of a
	 * router-view switching process. This is also the object
	 * passed into user route hooks.
	 *
	 * @param {Router} router
	 * @param {Route} to
	 * @param {Route} from
	 */
	
	var RouteTransition = (function () {
	  function RouteTransition(router, to, from) {
	    babelHelpers.classCallCheck(this, RouteTransition);
	
	    this.router = router;
	    this.to = to;
	    this.from = from;
	    this.next = null;
	    this.aborted = false;
	    this.done = false;
	
	    // start by determine the queues
	
	    // the deactivate queue is an array of router-view
	    // directive instances that need to be deactivated,
	    // deepest first.
	    this.deactivateQueue = router._views;
	
	    // check the default handler of the deepest match
	    var matched = to.matched ? Array.prototype.slice.call(to.matched) : [];
	
	    // the activate queue is an array of route handlers
	    // that need to be activated
	    this.activateQueue = matched.map(function (match) {
	      return match.handler;
	    });
	  }
	
	  /**
	   * Abort current transition and return to previous location.
	   */
	
	  RouteTransition.prototype.abort = function abort() {
	    if (!this.aborted) {
	      this.aborted = true;
	      // if the root path throws an error during validation
	      // on initial load, it gets caught in an infinite loop.
	      var abortingOnLoad = !this.from.path && this.to.path === '/';
	      if (!abortingOnLoad) {
	        this.router.replace(this.from.path || '/');
	      }
	    }
	  };
	
	  /**
	   * Abort current transition and redirect to a new location.
	   *
	   * @param {String} path
	   */
	
	  RouteTransition.prototype.redirect = function redirect(path) {
	    if (!this.aborted) {
	      this.aborted = true;
	      if (typeof path === 'string') {
	        path = mapParams(path, this.to.params, this.to.query);
	      } else {
	        path.params = path.params || this.to.params;
	        path.query = path.query || this.to.query;
	      }
	      this.router.replace(path);
	    }
	  };
	
	  /**
	   * A router view transition's pipeline can be described as
	   * follows, assuming we are transitioning from an existing
	   * <router-view> chain [Component A, Component B] to a new
	   * chain [Component A, Component C]:
	   *
	   *  A    A
	   *  | => |
	   *  B    C
	   *
	   * 1. Reusablity phase:
	   *   -> canReuse(A, A)
	   *   -> canReuse(B, C)
	   *   -> determine new queues:
	   *      - deactivation: [B]
	   *      - activation: [C]
	   *
	   * 2. Validation phase:
	   *   -> canDeactivate(B)
	   *   -> canActivate(C)
	   *
	   * 3. Activation phase:
	   *   -> deactivate(B)
	   *   -> activate(C)
	   *
	   * Each of these steps can be asynchronous, and any
	   * step can potentially abort the transition.
	   *
	   * @param {Function} cb
	   */
	
	  RouteTransition.prototype.start = function start(cb) {
	    var transition = this;
	    var daq = this.deactivateQueue;
	    var aq = this.activateQueue;
	    var rdaq = daq.slice().reverse();
	    var reuseQueue = undefined;
	
	    // 1. Reusability phase
	    var i = undefined;
	    for (i = 0; i < rdaq.length; i++) {
	      if (!canReuse(rdaq[i], aq[i], transition)) {
	        break;
	      }
	    }
	    if (i > 0) {
	      reuseQueue = rdaq.slice(0, i);
	      daq = rdaq.slice(i).reverse();
	      aq = aq.slice(i);
	    }
	
	    // 2. Validation phase
	    transition.runQueue(daq, canDeactivate, function () {
	      transition.runQueue(aq, canActivate, function () {
	        transition.runQueue(daq, deactivate, function () {
	          // 3. Activation phase
	
	          // Update router current route
	          transition.router._onTransitionValidated(transition);
	
	          // trigger reuse for all reused views
	          reuseQueue && reuseQueue.forEach(function (view) {
	            reuse(view, transition);
	          });
	
	          // the root of the chain that needs to be replaced
	          // is the top-most non-reusable view.
	          if (daq.length) {
	            var view = daq[daq.length - 1];
	            var depth = reuseQueue ? reuseQueue.length : 0;
	            activate(view, transition, depth, cb);
	          } else {
	            cb();
	          }
	        });
	      });
	    });
	  };
	
	  /**
	   * Asynchronously and sequentially apply a function to a
	   * queue.
	   *
	   * @param {Array} queue
	   * @param {Function} fn
	   * @param {Function} cb
	   */
	
	  RouteTransition.prototype.runQueue = function runQueue(queue, fn, cb) {
	    var transition = this;
	    step(0);
	    function step(index) {
	      if (index >= queue.length) {
	        cb();
	      } else {
	        fn(queue[index], transition, function () {
	          step(index + 1);
	        });
	      }
	    }
	  };
	
	  /**
	   * Call a user provided route transition hook and handle
	   * the response (e.g. if the user returns a promise).
	   *
	   * If the user neither expects an argument nor returns a
	   * promise, the hook is assumed to be synchronous.
	   *
	   * @param {Function} hook
	   * @param {*} [context]
	   * @param {Function} [cb]
	   * @param {Object} [options]
	   *                 - {Boolean} expectBoolean
	   *                 - {Boolean} expectData
	   *                 - {Function} cleanup
	   */
	
	  RouteTransition.prototype.callHook = function callHook(hook, context, cb) {
	    var _ref = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	
	    var _ref$expectBoolean = _ref.expectBoolean;
	    var expectBoolean = _ref$expectBoolean === undefined ? false : _ref$expectBoolean;
	    var _ref$expectData = _ref.expectData;
	    var expectData = _ref$expectData === undefined ? false : _ref$expectData;
	    var cleanup = _ref.cleanup;
	
	    var transition = this;
	    var nextCalled = false;
	
	    // abort the transition
	    var abort = function abort() {
	      cleanup && cleanup();
	      transition.abort();
	    };
	
	    // handle errors
	    var onError = function onError(err) {
	      // cleanup indicates an after-activation hook,
	      // so instead of aborting we just let the transition
	      // finish.
	      cleanup ? next() : abort();
	      if (err && !transition.router._suppress) {
	        warn('Uncaught error during transition: ');
	        throw err instanceof Error ? err : new Error(err);
	      }
	    };
	
	    // advance the transition to the next step
	    var next = function next(data) {
	      if (nextCalled) {
	        warn('transition.next() should be called only once.');
	        return;
	      }
	      nextCalled = true;
	      if (transition.aborted) {
	        cleanup && cleanup();
	        return;
	      }
	      cb && cb(data, onError);
	    };
	
	    // expose a clone of the transition object, so that each
	    // hook gets a clean copy and prevent the user from
	    // messing with the internals.
	    var exposed = {
	      to: transition.to,
	      from: transition.from,
	      abort: abort,
	      next: next,
	      redirect: function redirect() {
	        transition.redirect.apply(transition, arguments);
	      }
	    };
	
	    // actually call the hook
	    var res = undefined;
	    try {
	      res = hook.call(context, exposed);
	    } catch (err) {
	      return onError(err);
	    }
	
	    // handle boolean/promise return values
	    var resIsPromise = isPromise(res);
	    if (expectBoolean) {
	      if (typeof res === 'boolean') {
	        res ? next() : abort();
	      } else if (resIsPromise) {
	        res.then(function (ok) {
	          ok ? next() : abort();
	        }, onError);
	      } else if (!hook.length) {
	        next(res);
	      }
	    } else if (resIsPromise) {
	      res.then(next, onError);
	    } else if (expectData && isPlainOjbect(res) || !hook.length) {
	      next(res);
	    }
	  };
	
	  /**
	   * Call a single hook or an array of async hooks in series.
	   *
	   * @param {Array} hooks
	   * @param {*} context
	   * @param {Function} cb
	   * @param {Object} [options]
	   */
	
	  RouteTransition.prototype.callHooks = function callHooks(hooks, context, cb, options) {
	    var _this = this;
	
	    if (Array.isArray(hooks)) {
	      (function () {
	        var res = [];
	        res._needMerge = true;
	        var onError = undefined;
	        _this.runQueue(hooks, function (hook, _, next) {
	          if (!_this.aborted) {
	            _this.callHook(hook, context, function (r, onError) {
	              if (r) res.push(r);
	              onError = onError;
	              next();
	            }, options);
	          }
	        }, function () {
	          cb(res, onError);
	        });
	      })();
	    } else {
	      this.callHook(hooks, context, cb, options);
	    }
	  };
	
	  return RouteTransition;
	})();
	
	function isPlainOjbect(val) {
	  return Object.prototype.toString.call(val) === '[object Object]';
	}
	
	var internalKeysRE = /^(component|subRoutes)$/;
	
	/**
	 * Route Context Object
	 *
	 * @param {String} path
	 * @param {Router} router
	 */
	
	var Route = function Route(path, router) {
	  var _this = this;
	
	  babelHelpers.classCallCheck(this, Route);
	
	  var matched = router._recognizer.recognize(path);
	  if (matched) {
	    // copy all custom fields from route configs
	    [].forEach.call(matched, function (match) {
	      for (var key in match.handler) {
	        if (!internalKeysRE.test(key)) {
	          _this[key] = match.handler[key];
	        }
	      }
	    });
	    // set query and params
	    this.query = matched.queryParams;
	    this.params = [].reduce.call(matched, function (prev, cur) {
	      if (cur.params) {
	        for (var key in cur.params) {
	          prev[key] = cur.params[key];
	        }
	      }
	      return prev;
	    }, {});
	  }
	  // expose path and router
	  this.path = path;
	  this.router = router;
	  // for internal use
	  this.matched = matched || router._notFoundHandler;
	  // Important: freeze self to prevent observation
	  Object.freeze(this);
	};
	
	function applyOverride (Vue) {
	
	  var _ = Vue.util;
	
	  // override Vue's init and destroy process to keep track of router instances
	  var init = Vue.prototype._init;
	  Vue.prototype._init = function (options) {
	    var root = options._parent || options.parent || this;
	    var route = root.$route;
	    if (route) {
	      route.router._children.push(this);
	      if (!this.$route) {
	        /* istanbul ignore if */
	        if (this._defineMeta) {
	          // 0.12
	          this._defineMeta('$route', route);
	        } else {
	          // 1.0
	          _.defineReactive(this, '$route', route);
	        }
	      }
	    }
	    init.call(this, options);
	  };
	
	  var destroy = Vue.prototype._destroy;
	  Vue.prototype._destroy = function () {
	    if (!this._isBeingDestroyed) {
	      var route = this.$root.$route;
	      if (route) {
	        route.router._children.$remove(this);
	      }
	      destroy.apply(this, arguments);
	    }
	  };
	
	  // 1.0 only: enable route mixins
	  var strats = Vue.config.optionMergeStrategies;
	  var hooksToMergeRE = /^(data|activate|deactivate)$/;
	
	  if (strats) {
	    strats.route = function (parentVal, childVal) {
	      if (!childVal) return parentVal;
	      if (!parentVal) return childVal;
	      var ret = {};
	      _.extend(ret, parentVal);
	      for (var key in childVal) {
	        var a = ret[key];
	        var b = childVal[key];
	        // for data, activate and deactivate, we need to merge them into
	        // arrays similar to lifecycle hooks.
	        if (a && hooksToMergeRE.test(key)) {
	          ret[key] = (_.isArray(a) ? a : [a]).concat(b);
	        } else {
	          ret[key] = b;
	        }
	      }
	      return ret;
	    };
	  }
	}
	
	function View (Vue) {
	
	  var _ = Vue.util;
	  var componentDef =
	  // 0.12
	  Vue.directive('_component') ||
	  // 1.0
	  Vue.internalDirectives.component;
	  // <router-view> extends the internal component directive
	  var viewDef = _.extend({}, componentDef);
	
	  // with some overrides
	  _.extend(viewDef, {
	
	    _isRouterView: true,
	
	    bind: function bind() {
	      var route = this.vm.$route;
	      /* istanbul ignore if */
	      if (!route) {
	        warn('<router-view> can only be used inside a ' + 'router-enabled app.');
	        return;
	      }
	      // force dynamic directive so v-component doesn't
	      // attempt to build right now
	      this._isDynamicLiteral = true;
	      // finally, init by delegating to v-component
	      componentDef.bind.call(this);
	
	      // all we need to do here is registering this view
	      // in the router. actual component switching will be
	      // managed by the pipeline.
	      var router = this.router = route.router;
	      router._views.unshift(this);
	
	      // note the views are in reverse order.
	      var parentView = router._views[1];
	      if (parentView) {
	        // register self as a child of the parent view,
	        // instead of activating now. This is so that the
	        // child's activate hook is called after the
	        // parent's has resolved.
	        parentView.childView = this;
	      }
	
	      // handle late-rendered view
	      // two possibilities:
	      // 1. root view rendered after transition has been
	      //    validated;
	      // 2. child view rendered after parent view has been
	      //    activated.
	      var transition = route.router._currentTransition;
	      if (!parentView && transition.done || parentView && parentView.activated) {
	        var depth = parentView ? parentView.depth + 1 : 0;
	        activate(this, transition, depth);
	      }
	    },
	
	    unbind: function unbind() {
	      this.router._views.$remove(this);
	      componentDef.unbind.call(this);
	    }
	  });
	
	  Vue.elementDirective('router-view', viewDef);
	}
	
	var trailingSlashRE = /\/$/;
	var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	var queryStringRE = /\?.*$/;
	
	// install v-link, which provides navigation support for
	// HTML5 history mode
	function Link (Vue) {
	
	  var _ = Vue.util;
	
	  Vue.directive('link', {
	
	    bind: function bind() {
	      var _this = this;
	
	      var vm = this.vm;
	      /* istanbul ignore if */
	      if (!vm.$route) {
	        warn('v-link can only be used inside a ' + 'router-enabled app.');
	        return;
	      }
	      // no need to handle click if link expects to be opened
	      // in a new window/tab.
	      /* istanbul ignore if */
	      if (this.el.tagName === 'A' && this.el.getAttribute('target') === '_blank') {
	        return;
	      }
	      // handle click
	      var router = vm.$route.router;
	      this.handler = function (e) {
	        // don't redirect with control keys
	        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
	        // don't redirect when preventDefault called
	        if (e.defaultPrevented) return;
	        // don't redirect on right click
	        if (e.button !== 0) return;
	
	        var target = _this.target;
	        var go = function go(target) {
	          e.preventDefault();
	          if (target != null) {
	            router.go(target);
	          }
	        };
	
	        if (_this.el.tagName === 'A' || e.target === _this.el) {
	          // v-link on <a v-link="'path'">
	          go(target);
	        } else {
	          // v-link delegate on <div v-link>
	          var el = e.target;
	          while (el && el.tagName !== 'A' && el !== _this.el) {
	            el = el.parentNode;
	          }
	          if (!el) return;
	          if (el.tagName !== 'A' || !el.href) {
	            // allow not anchor
	            go(target);
	          } else if (sameOrigin(el)) {
	            go({
	              path: el.pathname,
	              replace: target && target.replace,
	              append: target && target.append
	            });
	          }
	        }
	      };
	      this.el.addEventListener('click', this.handler);
	      // manage active link class
	      this.unwatch = vm.$watch('$route.path', _.bind(this.updateClasses, this));
	    },
	
	    update: function update(path) {
	      var router = this.vm.$route.router;
	      var append = undefined;
	      this.target = path;
	      if (_.isObject(path)) {
	        append = path.append;
	        this.exact = path.exact;
	        this.prevActiveClass = this.activeClass;
	        this.activeClass = path.activeClass;
	      }
	      path = this.path = router._stringifyPath(path);
	      this.activeRE = path && !this.exact ? new RegExp('^' + path.replace(/\/$/, '').replace(regexEscapeRE, '\\$&') + '(\\/|$)') : null;
	      this.updateClasses(this.vm.$route.path);
	      var isAbsolute = path.charAt(0) === '/';
	      // do not format non-hash relative paths
	      var href = path && (router.mode === 'hash' || isAbsolute) ? router.history.formatPath(path, append) : path;
	      if (this.el.tagName === 'A') {
	        if (href) {
	          this.el.href = href;
	        } else {
	          this.el.removeAttribute('href');
	        }
	      }
	    },
	
	    updateClasses: function updateClasses(path) {
	      var el = this.el;
	      var router = this.vm.$route.router;
	      var activeClass = this.activeClass || router._linkActiveClass;
	      // clear old class
	      if (this.prevActiveClass !== activeClass) {
	        _.removeClass(el, this.prevActiveClass);
	      }
	      // remove query string before matching
	      var dest = this.path.replace(queryStringRE, '');
	      path = path.replace(queryStringRE, '');
	      // add new class
	      if (this.exact) {
	        if (dest === path ||
	        // also allow additional trailing slash
	        dest.charAt(dest.length - 1) !== '/' && dest === path.replace(trailingSlashRE, '')) {
	          _.addClass(el, activeClass);
	        } else {
	          _.removeClass(el, activeClass);
	        }
	      } else {
	        if (this.activeRE && this.activeRE.test(path)) {
	          _.addClass(el, activeClass);
	        } else {
	          _.removeClass(el, activeClass);
	        }
	      }
	    },
	
	    unbind: function unbind() {
	      this.el.removeEventListener('click', this.handler);
	      this.unwatch && this.unwatch();
	    }
	  });
	
	  function sameOrigin(link) {
	    return link.protocol === location.protocol && link.hostname === location.hostname && link.port === location.port;
	  }
	}
	
	var historyBackends = {
	  abstract: AbstractHistory,
	  hash: HashHistory,
	  html5: HTML5History
	};
	
	// late bind during install
	var Vue = undefined;
	
	/**
	 * Router constructor
	 *
	 * @param {Object} [options]
	 */
	
	var Router = (function () {
	  function Router() {
	    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var _ref$hashbang = _ref.hashbang;
	    var hashbang = _ref$hashbang === undefined ? true : _ref$hashbang;
	    var _ref$abstract = _ref.abstract;
	    var abstract = _ref$abstract === undefined ? false : _ref$abstract;
	    var _ref$history = _ref.history;
	    var history = _ref$history === undefined ? false : _ref$history;
	    var _ref$saveScrollPosition = _ref.saveScrollPosition;
	    var saveScrollPosition = _ref$saveScrollPosition === undefined ? false : _ref$saveScrollPosition;
	    var _ref$transitionOnLoad = _ref.transitionOnLoad;
	    var transitionOnLoad = _ref$transitionOnLoad === undefined ? false : _ref$transitionOnLoad;
	    var _ref$suppressTransitionError = _ref.suppressTransitionError;
	    var suppressTransitionError = _ref$suppressTransitionError === undefined ? false : _ref$suppressTransitionError;
	    var _ref$root = _ref.root;
	    var root = _ref$root === undefined ? null : _ref$root;
	    var _ref$linkActiveClass = _ref.linkActiveClass;
	    var linkActiveClass = _ref$linkActiveClass === undefined ? 'v-link-active' : _ref$linkActiveClass;
	    babelHelpers.classCallCheck(this, Router);
	
	    /* istanbul ignore if */
	    if (!Router.installed) {
	      throw new Error('Please install the Router with Vue.use() before ' + 'creating an instance.');
	    }
	
	    // Vue instances
	    this.app = null;
	    this._views = [];
	    this._children = [];
	
	    // route recognizer
	    this._recognizer = new RouteRecognizer();
	    this._guardRecognizer = new RouteRecognizer();
	
	    // state
	    this._started = false;
	    this._startCb = null;
	    this._currentRoute = {};
	    this._currentTransition = null;
	    this._previousTransition = null;
	    this._notFoundHandler = null;
	    this._notFoundRedirect = null;
	    this._beforeEachHooks = [];
	    this._afterEachHooks = [];
	
	    // feature detection
	    this._hasPushState = typeof window !== 'undefined' && window.history && window.history.pushState;
	
	    // trigger transition on initial render?
	    this._rendered = false;
	    this._transitionOnLoad = transitionOnLoad;
	
	    // history mode
	    this._abstract = abstract;
	    this._hashbang = hashbang;
	    this._history = this._hasPushState && history;
	
	    // other options
	    this._saveScrollPosition = saveScrollPosition;
	    this._linkActiveClass = linkActiveClass;
	    this._suppress = suppressTransitionError;
	
	    // create history object
	    var inBrowser = Vue.util.inBrowser;
	    this.mode = !inBrowser || this._abstract ? 'abstract' : this._history ? 'html5' : 'hash';
	
	    var History = historyBackends[this.mode];
	    var self = this;
	    this.history = new History({
	      root: root,
	      hashbang: this._hashbang,
	      onChange: function onChange(path, state, anchor) {
	        self._match(path, state, anchor);
	      }
	    });
	  }
	
	  /**
	   * Allow directly passing components to a route
	   * definition.
	   *
	   * @param {String} path
	   * @param {Object} handler
	   */
	
	  // API ===================================================
	
	  /**
	  * Register a map of top-level paths.
	  *
	  * @param {Object} map
	  */
	
	  Router.prototype.map = function map(_map) {
	    for (var route in _map) {
	      this.on(route, _map[route]);
	    }
	  };
	
	  /**
	   * Register a single root-level path
	   *
	   * @param {String} rootPath
	   * @param {Object} handler
	   *                 - {String} component
	   *                 - {Object} [subRoutes]
	   *                 - {Boolean} [forceRefresh]
	   *                 - {Function} [before]
	   *                 - {Function} [after]
	   */
	
	  Router.prototype.on = function on(rootPath, handler) {
	    if (rootPath === '*') {
	      this._notFound(handler);
	    } else {
	      this._addRoute(rootPath, handler, []);
	    }
	  };
	
	  /**
	   * Set redirects.
	   *
	   * @param {Object} map
	   */
	
	  Router.prototype.redirect = function redirect(map) {
	    for (var path in map) {
	      this._addRedirect(path, map[path]);
	    }
	  };
	
	  /**
	   * Set aliases.
	   *
	   * @param {Object} map
	   */
	
	  Router.prototype.alias = function alias(map) {
	    for (var path in map) {
	      this._addAlias(path, map[path]);
	    }
	  };
	
	  /**
	   * Set global before hook.
	   *
	   * @param {Function} fn
	   */
	
	  Router.prototype.beforeEach = function beforeEach(fn) {
	    this._beforeEachHooks.push(fn);
	  };
	
	  /**
	   * Set global after hook.
	   *
	   * @param {Function} fn
	   */
	
	  Router.prototype.afterEach = function afterEach(fn) {
	    this._afterEachHooks.push(fn);
	  };
	
	  /**
	   * Navigate to a given path.
	   * The path can be an object describing a named path in
	   * the format of { name: '...', params: {}, query: {}}
	   * The path is assumed to be already decoded, and will
	   * be resolved against root (if provided)
	   *
	   * @param {String|Object} path
	   * @param {Boolean} [replace]
	   */
	
	  Router.prototype.go = function go(path) {
	    var replace = false;
	    var append = false;
	    if (Vue.util.isObject(path)) {
	      replace = path.replace;
	      append = path.append;
	    }
	    path = this._stringifyPath(path);
	    if (path) {
	      this.history.go(path, replace, append);
	    }
	  };
	
	  /**
	   * Short hand for replacing current path
	   *
	   * @param {String} path
	   */
	
	  Router.prototype.replace = function replace(path) {
	    if (typeof path === 'string') {
	      path = { path: path };
	    }
	    path.replace = true;
	    this.go(path);
	  };
	
	  /**
	   * Start the router.
	   *
	   * @param {VueConstructor} App
	   * @param {String|Element} container
	   * @param {Function} [cb]
	   */
	
	  Router.prototype.start = function start(App, container, cb) {
	    /* istanbul ignore if */
	    if (this._started) {
	      warn('already started.');
	      return;
	    }
	    this._started = true;
	    this._startCb = cb;
	    if (!this.app) {
	      /* istanbul ignore if */
	      if (!App || !container) {
	        throw new Error('Must start vue-router with a component and a ' + 'root container.');
	      }
	      this._appContainer = container;
	      var Ctor = this._appConstructor = typeof App === 'function' ? App : Vue.extend(App);
	      // give it a name for better debugging
	      Ctor.options.name = Ctor.options.name || 'RouterApp';
	    }
	    this.history.start();
	  };
	
	  /**
	   * Stop listening to route changes.
	   */
	
	  Router.prototype.stop = function stop() {
	    this.history.stop();
	    this._started = false;
	  };
	
	  // Internal methods ======================================
	
	  /**
	  * Add a route containing a list of segments to the internal
	  * route recognizer. Will be called recursively to add all
	  * possible sub-routes.
	  *
	  * @param {String} path
	  * @param {Object} handler
	  * @param {Array} segments
	  */
	
	  Router.prototype._addRoute = function _addRoute(path, handler, segments) {
	    guardComponent(path, handler);
	    handler.path = path;
	    handler.fullPath = (segments.reduce(function (path, segment) {
	      return path + segment.path;
	    }, '') + path).replace('//', '/');
	    segments.push({
	      path: path,
	      handler: handler
	    });
	    this._recognizer.add(segments, {
	      as: handler.name
	    });
	    // add sub routes
	    if (handler.subRoutes) {
	      for (var subPath in handler.subRoutes) {
	        // recursively walk all sub routes
	        this._addRoute(subPath, handler.subRoutes[subPath],
	        // pass a copy in recursion to avoid mutating
	        // across branches
	        segments.slice());
	      }
	    }
	  };
	
	  /**
	   * Set the notFound route handler.
	   *
	   * @param {Object} handler
	   */
	
	  Router.prototype._notFound = function _notFound(handler) {
	    guardComponent('*', handler);
	    this._notFoundHandler = [{ handler: handler }];
	  };
	
	  /**
	   * Add a redirect record.
	   *
	   * @param {String} path
	   * @param {String} redirectPath
	   */
	
	  Router.prototype._addRedirect = function _addRedirect(path, redirectPath) {
	    if (path === '*') {
	      this._notFoundRedirect = redirectPath;
	    } else {
	      this._addGuard(path, redirectPath, this.replace);
	    }
	  };
	
	  /**
	   * Add an alias record.
	   *
	   * @param {String} path
	   * @param {String} aliasPath
	   */
	
	  Router.prototype._addAlias = function _addAlias(path, aliasPath) {
	    this._addGuard(path, aliasPath, this._match);
	  };
	
	  /**
	   * Add a path guard.
	   *
	   * @param {String} path
	   * @param {String} mappedPath
	   * @param {Function} handler
	   */
	
	  Router.prototype._addGuard = function _addGuard(path, mappedPath, _handler) {
	    var _this = this;
	
	    this._guardRecognizer.add([{
	      path: path,
	      handler: function handler(match, query) {
	        var realPath = mapParams(mappedPath, match.params, query);
	        _handler.call(_this, realPath);
	      }
	    }]);
	  };
	
	  /**
	   * Check if a path matches any redirect records.
	   *
	   * @param {String} path
	   * @return {Boolean} - if true, will skip normal match.
	   */
	
	  Router.prototype._checkGuard = function _checkGuard(path) {
	    var matched = this._guardRecognizer.recognize(path);
	    if (matched) {
	      matched[0].handler(matched[0], matched.queryParams);
	      return true;
	    } else if (this._notFoundRedirect) {
	      matched = this._recognizer.recognize(path);
	      if (!matched) {
	        this.replace(this._notFoundRedirect);
	        return true;
	      }
	    }
	  };
	
	  /**
	   * Match a URL path and set the route context on vm,
	   * triggering view updates.
	   *
	   * @param {String} path
	   * @param {Object} [state]
	   * @param {String} [anchor]
	   */
	
	  Router.prototype._match = function _match(path, state, anchor) {
	    var _this2 = this;
	
	    if (this._checkGuard(path)) {
	      return;
	    }
	
	    var currentRoute = this._currentRoute;
	    var currentTransition = this._currentTransition;
	
	    if (currentTransition) {
	      if (currentTransition.to.path === path) {
	        // do nothing if we have an active transition going to the same path
	        return;
	      } else if (currentRoute.path === path) {
	        // We are going to the same path, but we also have an ongoing but
	        // not-yet-validated transition. Abort that transition and reset to
	        // prev transition.
	        currentTransition.aborted = true;
	        this._currentTransition = this._prevTransition;
	        return;
	      } else {
	        // going to a totally different path. abort ongoing transition.
	        currentTransition.aborted = true;
	      }
	    }
	
	    // construct new route and transition context
	    var route = new Route(path, this);
	    var transition = new RouteTransition(this, route, currentRoute);
	
	    // current transition is updated right now.
	    // however, current route will only be updated after the transition has
	    // been validated.
	    this._prevTransition = currentTransition;
	    this._currentTransition = transition;
	
	    if (!this.app) {
	      // initial render
	      this.app = new this._appConstructor({
	        el: this._appContainer,
	        _meta: {
	          $route: route
	        }
	      });
	    }
	
	    // check global before hook
	    var beforeHooks = this._beforeEachHooks;
	    var startTransition = function startTransition() {
	      transition.start(function () {
	        _this2._postTransition(route, state, anchor);
	      });
	    };
	
	    if (beforeHooks.length) {
	      transition.runQueue(beforeHooks, function (hook, _, next) {
	        if (transition === _this2._currentTransition) {
	          transition.callHook(hook, null, next, {
	            expectBoolean: true
	          });
	        }
	      }, startTransition);
	    } else {
	      startTransition();
	    }
	
	    if (!this._rendered && this._startCb) {
	      this._startCb.call(null);
	    }
	
	    // HACK:
	    // set rendered to true after the transition start, so
	    // that components that are acitvated synchronously know
	    // whether it is the initial render.
	    this._rendered = true;
	  };
	
	  /**
	   * Set current to the new transition.
	   * This is called by the transition object when the
	   * validation of a route has succeeded.
	   *
	   * @param {Transition} transition
	   */
	
	  Router.prototype._onTransitionValidated = function _onTransitionValidated(transition) {
	    // set current route
	    var route = this._currentRoute = transition.to;
	    // update route context for all children
	    if (this.app.$route !== route) {
	      this.app.$route = route;
	      this._children.forEach(function (child) {
	        child.$route = route;
	      });
	    }
	    // call global after hook
	    if (this._afterEachHooks.length) {
	      this._afterEachHooks.forEach(function (hook) {
	        return hook.call(null, {
	          to: transition.to,
	          from: transition.from
	        });
	      });
	    }
	    this._currentTransition.done = true;
	  };
	
	  /**
	   * Handle stuff after the transition.
	   *
	   * @param {Route} route
	   * @param {Object} [state]
	   * @param {String} [anchor]
	   */
	
	  Router.prototype._postTransition = function _postTransition(route, state, anchor) {
	    // handle scroll positions
	    // saved scroll positions take priority
	    // then we check if the path has an anchor
	    var pos = state && state.pos;
	    if (pos && this._saveScrollPosition) {
	      Vue.nextTick(function () {
	        window.scrollTo(pos.x, pos.y);
	      });
	    } else if (anchor) {
	      Vue.nextTick(function () {
	        var el = document.getElementById(anchor.slice(1));
	        if (el) {
	          window.scrollTo(window.scrollX, el.offsetTop);
	        }
	      });
	    }
	  };
	
	  /**
	   * Normalize named route object / string paths into
	   * a string.
	   *
	   * @param {Object|String|Number} path
	   * @return {String}
	   */
	
	  Router.prototype._stringifyPath = function _stringifyPath(path) {
	    if (path && typeof path === 'object') {
	      if (path.name) {
	        var params = path.params || {};
	        if (path.query) {
	          params.queryParams = path.query;
	        }
	        return this._recognizer.generate(path.name, params);
	      } else if (path.path) {
	        var fullPath = path.path;
	        if (path.query) {
	          var query = this._recognizer.generateQueryString(path.query);
	          if (fullPath.indexOf('?') > -1) {
	            fullPath += '&' + query.slice(1);
	          } else {
	            fullPath += query;
	          }
	        }
	        return fullPath;
	      } else {
	        return '';
	      }
	    } else {
	      return path ? path + '' : '';
	    }
	  };
	
	  return Router;
	})();
	
	function guardComponent(path, handler) {
	  var comp = handler.component;
	  if (Vue.util.isPlainObject(comp)) {
	    comp = handler.component = Vue.extend(comp);
	  }
	  /* istanbul ignore if */
	  if (typeof comp !== 'function') {
	    handler.component = null;
	    warn('invalid component for route "' + path + '".');
	  }
	}
	
	/* Installation */
	
	Router.installed = false;
	
	/**
	 * Installation interface.
	 * Install the necessary directives.
	 */
	
	Router.install = function (externalVue) {
	  /* istanbul ignore if */
	  if (Router.installed) {
	    warn('already installed.');
	    return;
	  }
	  Vue = externalVue;
	  applyOverride(Vue);
	  View(Vue);
	  Link(Vue);
	  exports$1.Vue = Vue;
	  Router.installed = true;
	};
	
	// auto install
	/* istanbul ignore if */
	if (typeof window !== 'undefined' && window.Vue) {
	  window.Vue.use(Router);
	}
	
	module.exports = Router;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	(function () {
	  var vue // lazy bind
	
	  var asyncData = {
	    created: function () {
	      if (!vue) {
	        console.warn('[vue-async-data] not installed!')
	        return
	      }
	      if (this.$options.asyncData) {
	        if (this._defineMeta) {
	          // 0.12 compat
	          this._defineMeta('$loadingAsyncData', true)
	        } else {
	          // ^1.0.0-alpha
	          vue.util.defineReactive(this, '$loadingAsyncData', true)
	        }
	      }
	    },
	    compiled: function () {
	      this.reloadAsyncData()
	    },
	    methods: {
	      reloadAsyncData: function () {
	        var load = this.$options.asyncData
	        if (load) {
	          var self = this
	          var resolve = function (data) {
	            if (data) {
	              for (var key in data) {
	                self.$set(key, data[key])
	              }
	            }
	            self.$loadingAsyncData = false
	            self.$emit('async-data')
	          }
	          var reject = function (reason) {
	            var msg = '[vue] async data load failed'
	            if (reason instanceof Error) {
	              console.warn(msg)
	              throw reason
	            } else {
	              console.warn(msg + ': ' + reason)
	            }
	          }
	          this.$loadingAsyncData = true
	          var res = load.call(this, resolve, reject)
	          if (res && typeof res.then === 'function') {
	            res.then(resolve, reject)
	          }
	        }
	      }
	    }
	  }
	
	  var api = {
	    mixin: asyncData,
	    install: function (Vue, options) {
	      vue = Vue
	      Vue.options = Vue.util.mergeOptions(Vue.options, asyncData)
	    }
	  }
	
	  if(true) {
	    module.exports = api
	  } else if(typeof define === 'function' && define.amd) {
	    define(function () { return api })
	  } else if (typeof window !== 'undefined') {
	    window.VueAsyncData = api
	  }
	})()


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(9)
	
	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(10)
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/adrienleloup/Desktop/Cours 3e/Cosmos/prototype/app/app/vues/SignIn.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
	  }
	})()}

/***/ },
/* 9 */
/***/ function(module, exports) {

	// <template src="../html/connect.html">

	// </template>

	// <script type="text/javascript">

	// </script>
	"use strict";

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "<div id=\"view-signin\" class=\"container view\"><div class=\"content\"><div><h1>Welcome to Cosmos</h1><h2>Please sign in</h2><form><div><label for=\"username\">Username</label><input type=\"text\" name=\"username\" id=\"username\"/><label for=\"password\">Password</label><input type=\"password\" name=\"password\" id=\"password\"/><a href=\"jointeam.html\" class=\"submit-btn\">Log in</a><a id=\"signup-link\" href=\"#\" v-link=\"{path: '/signup'}\">Don't have an account?</a><a href=\"forgotpassword.html\">Forgot your password?</a></div></form></div></div></div>";

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(12)
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/adrienleloup/Desktop/Cours 3e/Cosmos/prototype/app/app/vues/SignUp.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
	  }
	})()}

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = "<div id=\"view-signup\" class=\"container view\"><div class=\"content\"><div><h1>Welcome to Cosmos</h1><h2>Please create an account</h2><form><div><label for=\"username\">Username</label><input type=\"text\" name=\"username\" id=\"username\"/><label for=\"email\">E-mail</label><input type=\"email\" name=\"email\" id=\"email\"/><label for=\"password\">Password</label><input type=\"password\" name=\"password\" id=\"password\"/><a href=\"jointeam.html\" class=\"submit-btn\">Log in</a><a id=\"signin-link\" href=\"#\" v-link=\"{path: '/signin'}\">Already have an account?</a><a href=\"forgotpassword.html\">Forgot your password?</a></div></form></div></div></div>";

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(14)
	
	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(15)
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/adrienleloup/Desktop/Cours 3e/Cosmos/prototype/app/app/vues/Tasks.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
	  }
	})()}

/***/ },
/* 14 */
/***/ function(module, exports) {

	var Tasks;
	
	Tasks = {
	  data: function() {
	    return {
	      tasks: [
	        {
	          title: "not loaded yet"
	        }
	      ]
	    };
	  },
	  asyncData: function(resolve, reject) {
	    return socket.emit("task.getAll", function(aReturnedTasks) {
	      return resolve({
	        tasks: aReturnedTasks
	      });
	    });
	  },
	  methods: {
	    addPopup: function(event) {
	      var column;
	      column = event.target.parentNode.id;
	      return console.log(column);
	    }
	  }
	};
	
	module.exports = Tasks;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div id=\"view-projecttasks\" class=\"container view\"><div class=\"content\"><h1 class=\"page-title\">Tasks - Project Name</h1><div class=\"task-items\"><div id=\"todo\" data-section=\"To do\" class=\"task-items__section\"><h2 class=\"task-items__section__title\">To do</h2><a href=\"#\" id=\"add-todo\" v-on:click=\"addPopup\" class=\"add-task-btn\">Add</a><div id=\"todo-column__items\" class=\"task-items__cards\"><div v-for=\"task in tasks\" v-if=\"task.state == 'todo'\" data-id=\"{{ task.id }}\" class=\"task-item\"><p class=\"task-item__name\">{{ task.title }}</p><a href=\"#\" id=\"{{ task.id }}\" class=\"task-item__edit\"></a><a href=\"#\" data-id=\"{{ task.id }}\" class=\"task-item__delete\"></a><date class=\"task-item__deadline\">{{ task.deadline }}</date></div></div></div><div id=\"inprogress\" data-section=\"In progress\" class=\"task-items__section\"><h2 class=\"task-items__section__title\">In progress</h2><a href=\"#\" id=\"add-inprogress\" v-on:click=\"addPopup\" class=\"add-task-btn\">Add</a><div id=\"progress-column__items\" class=\"task-items__cards\"><div v-for=\"task in tasks\" v-if=\"task.state == 'inprogress'\" data-id=\"{{ task.id }}\" class=\"task-item\"><p class=\"task-item__name\">{{ task.title }}</p><a href=\"#\" id=\"{{ task.id }}\" class=\"task-item__edit\"></a><a href=\"#\" data-id=\"{{ task.id }}\" class=\"task-item__delete\"></a><date class=\"task-item__deadline\">{{ task.deadline }}</date></div></div></div><div id=\"finished\" data-section=\"Finished\" class=\"task-items__section\"><h2 class=\"task-items__section__title\">Finished</h2><a href=\"#\" id=\"add-finished\" v-on:click=\"addPopup\" class=\"add-task-btn\">Add</a><div id=\"finished-column__items\" class=\"task-items__cards\"><div v-for=\"task in tasks\" v-if=\"task.state == 'finished'\" data-id=\"{{ task.id }}\" class=\"task-item\"><p class=\"task-item__name\">{{ task.title }}</p><a href=\"#\" id=\"{{ task.id }}\" class=\"task-item__edit\"></a><a href=\"#\" data-id=\"{{ task.id }}\" class=\"task-item__delete\"></a><date class=\"task-item__deadline\">{{ task.deadline }}</date></div></div></div></div><div class=\"deletePopup hidden\"><h2>Are you sure you want to delete this task?</h2><a id=\"confirmDelete\" href=\"#\">Yes, delete it.</a><a id=\"cancelDelete\" href=\"\">No, cancel.</a></div><div class=\"popup-overlay\"></div><div class=\"popup hidden\"><button class=\"close-popup\"></button><form id=\"task-form\"><fieldset class=\"popup-sidebar\"><p class=\"popup-sidebar__title\">Assign</p><div class=\"assign-user__container\"><input type=\"checkbox\" id=\"user1\" class=\"assign-user__check\"/><label for=\"user1\" class=\"assign-user\"><img src=\"" + __webpack_require__(16) + "\" alt=\"Adrien Leloup\" class=\"assign-user__image\"/></label></div><div class=\"assign-user__container\"><input type=\"checkbox\" id=\"user2\" class=\"assign-user__check\"/><label for=\"user2\" class=\"assign-user\"><img src=\"" + __webpack_require__(17) + "\" alt=\"Adrien Leloup\" class=\"assign-user__image\"/></label></div><div class=\"assign-user__container\"><input type=\"checkbox\" id=\"user3\" class=\"assign-user__check\"/><label for=\"user3\" class=\"assign-user\"><img src=\"" + __webpack_require__(18) + "\" alt=\"Adrien Leloup\" class=\"assign-user__image\"/></label></div><div class=\"assign-user__container\"><input type=\"checkbox\" id=\"user4\" class=\"assign-user__check\"/><label for=\"user4\" class=\"assign-user\"><img src=\"" + __webpack_require__(19) + "\" alt=\"Adrien Leloup\" class=\"assign-user__image\"/></label></div></fieldset><fieldset class=\"form-body\"><h2 class=\"popup-title\">New task</h2><div class=\"form-group\"><input id=\"taskID\" type=\"hidden\" value=\"\"/><label for=\"new-task__name\" class=\"form-body__label\">Task</label><input type=\"text\" id=\"newtask__name\" placeholder=\"Task description...\" class=\"form-body__input\"/></div><div class=\"form-group\"><input type=\"checkbox\" id=\"new-task__hasDeadline\" class=\"form-body__input\"/><label for=\"new-task__hasDeadline\" class=\"form-body__label\">Deadline</label><p id=\"currentDate\" class=\"currentDate\">Today is Sept. 6, 2015</p><input type=\"text\" id=\"datepicker\" placeholder=\"Select a date below...\" class=\"form-body__input\"/></div><div class=\"form-group\"><input type=\"radio\" name=\"new-task__state\" id=\"state-todo\" value=\"todo\" class=\"form-body__input\"/><label for=\"state-todo\" class=\"form-body__label\">To do</label><input type=\"radio\" name=\"new-task__state\" id=\"state-inprogress\" value=\"inprogress\" class=\"form-body__input\"/><label for=\"state-inprogress\" class=\"form-body__label\">In progress</label><input type=\"radio\" name=\"new-task__state\" id=\"state-finished\" value=\"finished\" class=\"form-body__input\"/><label for=\"state-finished\" class=\"form-body__label\">Finished</label></div><div class=\"form-group submit-container\"><input type=\"submit\" id=\"new-task__submit\" value=\"Add this task\" class=\"task-submit\"/></div></fieldset></form></div><div class=\"popup-overlay\"></div></div></div>";

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALgAAAC4CAIAAADfUbGQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0iRjc5QjIyODY4QzZFQkYwMUJEQTU0MzMyMDg5Mjk4NDEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTIwMUYyMDQxODY2MTFFNUE0MjZDNTZFQ0JCRkUyRDkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTIwMUYyMDMxODY2MTFFNUE0MjZDNTZFQ0JCRkUyRDkiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDNjI4RTJGOTE4NjUxMUU1OUQ1MEIyNjY1MEUwQUNGMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDNjI4RTJGQTE4NjUxMUU1OUQ1MEIyNjY1MEUwQUNGMCIvPiA8L3JkZjpEZXNjcmlwdGlv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"

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALgAAAC4CAIAAADfUbGQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0iRjc5QjIyODY4QzZFQkYwMUJEQTU0MzMyMDg5Mjk4NDEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTZBNzAzRkE4NTQxMTFFNUEyNkFDRkVGQjZBQTM1QjciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTZBNzAzRjk4NTQxMTFFNUEyNkFDRkVGQjZBQTM1QjciIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5MjAxRjIwMzE4NjYxMUU1QTQyNkM1NkVDQkJGRTJEOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5MjAxRjIwNDE4NjYxMUU1QTQyNkM1NkVDQkJGRTJEOSIvPiA8L3JkZjpEZXNjcmlwdGlv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"

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALgAAAC4CAIAAADfUbGQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0iRjc5QjIyODY4QzZFQkYwMUJEQTU0MzMyMDg5Mjk4NDEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTZBNzAzRkU4NTQxMTFFNUEyNkFDRkVGQjZBQTM1QjciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTZBNzAzRkQ4NTQxMTFFNUEyNkFDRkVGQjZBQTM1QjciIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5MjAxRjIwMzE4NjYxMUU1QTQyNkM1NkVDQkJGRTJEOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5MjAxRjIwNDE4NjYxMUU1QTQyNkM1NkVDQkJGRTJEOSIvPiA8L3JkZjpEZXNjcmlwdGlv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"

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALgAAAC4CAIAAADfUbGQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0iRjc5QjIyODY4QzZFQkYwMUJEQTU0MzMyMDg5Mjk4NDEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzVGODIxREY4NTQyMTFFNUEyNkFDRkVGQjZBQTM1QjciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzVGODIxREU4NTQyMTFFNUEyNkFDRkVGQjZBQTM1QjciIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5MjAxRjIwMzE4NjYxMUU1QTQyNkM1NkVDQkJGRTJEOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5MjAxRjIwNDE4NjYxMUU1QTQyNkM1NkVDQkJGRTJEOSIvPiA8L3JkZjpEZXNjcmlwdGlv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"

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map