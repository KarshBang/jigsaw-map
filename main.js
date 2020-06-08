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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/index.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/index.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "* {\r\n    padding: 0;\r\n    margin: 0;\r\n    background: #f5f5f5;\r\n    text-align: center;\r\n}\r\n\r\nhtml,\r\nbody {\r\n    width: 100%;\r\n    height: 100%;\r\n}\r\n\r\n#container {\r\n    width: 800px;\r\n    height: 800px;\r\n    overflow: hidden;\r\n    position: absolute;\r\n    margin: auto;\r\n    left: 0;\r\n    right: 0;\r\n    top: 0;\r\n    bottom: 0;\r\n\r\n}\r\n\r\n#mini-map {\r\n    width: 200px;\r\n    height: 200px;\r\n    background-color: red;\r\n    overflow: hidden;\r\n    position: absolute;\r\n    border: 2px;\r\n    border-style: groove;\r\n    border-radius: 50%;\r\n    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.2);\r\n}\r\n\r\n#mask {\r\n    transition-property: transform;\r\n    transition-duration: 200ms;\r\n    transition-timing-function: linear;\r\n}\r\n\r\n#mask.mask-drag {\r\n    transition: none;\r\n}\r\n\r\n\r\n.map-img {\r\n    width: 200px;\r\n    height: 200px;\r\n    font-size: large;\r\n    font-weight: 600;\r\n    text-align: center;\r\n    line-height: 200px;\r\n    background-color: gray;\r\n    box-sizing: content-box;\r\n    /* border: 1px solid brown; */\r\n    position: absolute;\r\n    overflow: hidden;\r\n}\r\n\r\n.map-img>img {\r\n    position: relative;\r\n}\r\n\r\n#eagle {\r\n    width: 200px;\r\n    height: 200px;\r\n    position: absolute;\r\n    margin: auto;\r\n    left: 0;\r\n    right: 0;\r\n    margin-right: calc(50% + 420px);\r\n    bottom: 0;\r\n    top: 0;\r\n    overflow: hidden;\r\n}\r\n\r\n#eagle span {\r\n    position: absolute;\r\n    height: 10px;\r\n    width: 10px;\r\n    background: white;\r\n    box-sizing: border-box;\r\n    border: 3px solid pink;\r\n    opacity: 0.5;\r\n}\r\n\r\n#eagle img {\r\n    width: 200px;\r\n    height: 200px;\r\n}\r\n\r\nimg::after {\r\n    content: \"\";\r\n    height: 100%;\r\n    width: 100%;\r\n    position: absolute;\r\n    left: 0;\r\n    top: 0;\r\n    background: black;\r\n}\r\n\r\n\r\n#container,\r\n#eagle>img {\r\n    box-shadow: 2px 2px 5px #333333;\r\n}\r\n\r\nmain {\r\n    /* position: absolute; */\r\n    top: 0;\r\n    margin: auto;\r\n    bottom: 0;\r\n    left: 0;\r\n    right: 0;\r\n}\r\n\r\n#root {\r\n    display: flex;\r\n    flex-direction: column;\r\n    height: 100%;\r\n}\r\n\r\nfooter {\r\n    font-size: 14px;\r\n    padding: 20px;\r\n    color: rgba(0, 0, 0, 0.65);\r\n}\r\n\r\n\r\n\r\nul {\r\n    list-style-type: none;\r\n    margin: 0;\r\n    padding: 0;\r\n    padding-top: 6px;\r\n    padding-bottom: 6px;\r\n    display: inline;\r\n}\r\n\r\nli {\r\n    display: inline;\r\n    direction: initial;\r\n}\r\n\r\na:link,\r\na:visited {\r\n    font-weight: bold;\r\n    color: #FFFFFF;\r\n    background-color: #409EFF;\r\n    text-align: center;\r\n    padding: 6px;\r\n    text-decoration: none;\r\n    text-transform: uppercase;\r\n}\r\n\r\na:hover,\r\na:active {\r\n    background-color: #3077BF;\r\n}\r\n\r\nh1{\r\n    padding: 20px;\r\n}\r\n\r\nheader{\r\n    margin-top: 15px;\r\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./src/baseMap.ts":
/*!************************!*\
  !*** ./src/baseMap.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(/*! ./util */ "./src/util.ts");
function addDrag(container, dom, map) {
    dom.style.position = 'absolute';
    var x = 0;
    var y = 0;
    var l = 0;
    var t = 0;
    var isDrag = false;
    //todo 双向绑定
    var left = 0;
    var top = 0;
    var mouseDown = function (e) {
        e.stopPropagation();
        e.preventDefault();
        x = e.clientX;
        y = e.clientY;
        // l = dom.offsetLeft
        // t = dom.offsetTop
        l = map.x;
        t = map.y;
        isDrag = true;
        dom.style.cursor = 'move';
        map.isDrag(true);
        // dom.classList.add('mask-drag')
    };
    var mouseMove = function (e) {
        e.stopPropagation();
        if (!isDrag)
            return;
        var clientX = e.clientX;
        var clientY = e.clientY;
        left = clientX - (x - l);
        top = clientY - (y - t);
        map.x = left;
        map.y = top;
        // dom.style.left = left + 'px'
        // dom.style.top = top + 'px'
    };
    var mouseUp = function (e) {
        e.stopPropagation();
        isDrag = false;
        dom.style.cursor = null;
        map.isDrag(false);
        // dom.classList.remove('mask-drag')
    };
    container.onmousemove = mouseMove;
    container.onmousedown = mouseDown;
    container.onmouseup = mouseUp;
    container.oncontextmenu = function (e) {
        e.stopPropagation();
        e.preventDefault();
        console.log(123);
    };
}
function addScroll(container, dom, map, initStep) {
    if (initStep === void 0) { initStep = 0.1; }
    var step = initStep;
    var wheel = function (e) {
        e.stopPropagation();
        e.preventDefault();
        var offsetLeft = util_1.getLeft(container);
        var offsetTop = util_1.getTop(container);
        var x = e.clientX - offsetLeft;
        var y = e.clientY - offsetTop;
        map.mouseX = x;
        map.mouseY = y;
        if (e.deltaY > 0) {
            map.scale -= step;
        }
        else {
            map.scale += step;
        }
    };
    container.addEventListener('wheel', function (e) {
        e.stopPropagation();
    });
    container.addEventListener('wheel', util_1.throttle(wheel, 200));
    // container.onwheel = throttle(wheel, 200)
    return function (newStep) {
        if (newStep === undefined) {
            return step;
        }
        return step = newStep;
    };
}
var AbstractMap = /** @class */ (function () {
    function AbstractMap() {
        //图片数量
        this.rowNum = 4;
        this.colNum = 4;
    }
    return AbstractMap;
}());
var BaseMap = /** @class */ (function (_super) {
    __extends(BaseMap, _super);
    function BaseMap(container, config) {
        var _a, _b, _c, _d;
        var _this = _super.call(this) || this;
        _this.registerDict = new WeakMap();
        _a = config.xRange, _this.minX = _a[0], _this.maxX = _a[1];
        _b = config.yRange, _this.minY = _b[0], _this.maxY = _b[1];
        _c = config.imgSize, _this.imgHeight = _c[0], _this.imgWidth = _c[1];
        _d = config.scaleRange || [2 / 3, 1.5], _this.minScale = _d[0], _this.maxScale = _d[1];
        _this.minX -= 2 * _this.imgWidth;
        _this.maxX += 2 * _this.imgWidth;
        _this.minY -= 2 * _this.imgHeight;
        _this.maxY += 2 * _this.imgHeight;
        var xDomain = _this.maxX - _this.minX;
        var yDomain = _this.maxY - _this.minY;
        try {
            if (xDomain <= 0 || yDomain <= 0) {
                throw 'map range can not be negative';
            }
            if (_this.imgHeight <= 0 || _this.imgWidth <= 0) {
                throw 'img size can not be negative';
            }
        }
        catch (e) {
            console.warn(e);
            return _this;
        }
        _this.colNum = Math.floor(xDomain / _this.imgWidth);
        _this.rowNum = Math.floor(yDomain / _this.imgHeight);
        _this.difX = _this.colNum * _this.imgWidth;
        _this.difY = _this.rowNum * _this.imgHeight;
        _this.rowList = new Array(_this.rowNum).fill(0).map(function () { return []; });
        _this.colList = new Array(_this.colNum).fill(0).map(function () { return []; });
        var mask = document.createElement('div');
        _this.mask = mask;
        _this.container = container;
        mask.id = 'mask';
        container.appendChild(mask);
        return _this;
    }
    BaseMap.prototype.init = function (patchInit) {
        var _a = this, mask = _a.mask, container = _a.container;
        if (patchInit) {
            this.patchInit = patchInit;
        }
        //init
        for (var i = 0; i < this.rowNum; ++i) {
            for (var j = 0; j < this.colNum; ++j) {
                var patch = this.patchInit();
                patch.classList.add('map-img');
                mask.appendChild(patch);
                this.rowList[i].push(patch);
                this.colList[j].push(patch);
            }
        }
        addDrag(container, mask, this);
        var changeScrollStep = addScroll(container, mask, this, 0.5);
        this.createMap(-2, -2);
        //todo 初始时地图居中
        var partialX = ((this.maxX - this.minX) - this.colNum * this.imgWidth) / 2 + this.minX;
        var partialY = ((this.maxY - this.minY) - this.rowNum * this.imgHeight) / 2 + this.minY;
        console.log(partialX, partialY);
        this.x = partialX;
        this.y = partialY;
        return changeScrollStep;
    };
    BaseMap.prototype.patchInit = function () {
        var patch = document.createElement('div');
        var image = new Image();
        patch.appendChild(image);
        return patch;
    };
    BaseMap.prototype.mapSrc = function (func) {
        if (func) {
            this._getUrl = func;
        }
        else {
            return this._getUrl;
        }
    };
    BaseMap.prototype.createMap = function (deltaX, deltaY, level) {
        if (deltaX === void 0) { deltaX = 0; }
        if (deltaY === void 0) { deltaY = 0; }
        if (level === void 0) { level = 0; }
        this._scale = 1;
        this.rowEdge = 0;
        this.colEdge = 0;
        this.rowEdgeIndex = 0;
        this.colEdgeIndex = 0;
        this._xCoordinate = 0;
        this._yCoordinate = 0;
        this.level = level;
        this.baseCol = deltaX;
        this.baseRow = deltaY;
        var _a = this, rowNum = _a.rowNum, colNum = _a.colNum, rowList = _a.rowList, mask = _a.mask;
        mask.style.transform = "translate3d(" + 0 + "px, " + 0 + "px, 0) scale(" + 1 + ")";
        // mask.style.transform = `scale(${1})`
        // mask.style.top = `${0}px`
        // mask.style.left = `${0}px`
        for (var i = 0; i < rowNum; ++i) {
            var row = rowList[i];
            for (var j = 0; j < colNum; ++j) {
                var img = row[j];
                this.getUrl(img, { y: i + deltaY, x: j + deltaX });
                img.style.top = i * 200 + "px";
                img.style.left = j * 200 + "px";
            }
        }
    };
    BaseMap.prototype.isDrag = function (drag) {
        if (drag) {
            this.mask.classList.add('mask-drag');
        }
        else {
            this.mask.classList.remove('mask-drag');
        }
    };
    //todo 修改为操作元素changeElement
    // 添加事件可能通过继承一个新的类,扩展此方法
    BaseMap.prototype.getUrl = function (dom, params) {
        var oldRegister = this.registerDict.get(dom);
        if (oldRegister) {
            oldRegister(dom);
            this.registerDict.delete(dom);
        }
        params.level = this.level;
        var register = this._getUrl(dom, params);
        if (register) {
            this.registerDict.set(dom, register);
        }
    };
    BaseMap.prototype._getUrl = function (dom, params) {
        // (<HTMLImageElement>dom).src = `http://127.0.0.1:8081/${params.level+1}-${params.x}-${params.y}.png`
    };
    BaseMap.prototype._setScale = function (newScale) {
        this.mask.classList.remove('mask-drag');
        var _a = this, mask = _a.mask, mouseX = _a.mouseX, mouseY = _a.mouseY, oldScale = _a._scale;
        var oldTop = this.y;
        var oldLeft = this.x;
        var top = mouseY * (oldScale - newScale) / oldScale + oldTop * newScale / oldScale;
        var left = mouseX * (oldScale - newScale) / oldScale + oldLeft * newScale / oldScale;
        //done: 调整缩放的原点
        // mask.style.transform = `scale(${newScale})`
        // mask.style.top = `${top}px`
        // mask.style.left = `${left}px`
        mask.style.transform = "translate3d(" + left + "px, " + top + "px, 0) scale(" + newScale + ")";
        this._scale = newScale;
        this._xCoordinate = left;
        this._yCoordinate = top;
        return [left, top];
    };
    BaseMap.prototype._setX = function (newX) {
        var _this = this;
        var _a = this, minX = _a.minX, maxX = _a.maxX, dif = _a.difX;
        var upBound = (newX - minX) / this._scale - this.imgWidth;
        var lowBonud = (newX - maxX) / this._scale + dif + this.imgWidth;
        var round;
        if (this.colEdge < upBound) {
            round = Math.floor((upBound - this.colEdge) / (this.colNum * this.imgWidth * this._scale));
            if (round > 0) {
                newX -= this.colNum * this.imgWidth * round * this._scale;
                this.baseCol -= round * this.colNum;
                upBound -= this.imgWidth * round * this.colNum;
                this.refresh();
            }
        }
        var _loop_1 = function () {
            this_1.colEdgeIndex--;
            var paramX = this_1.colEdgeIndex + this_1.baseCol;
            var col = util_1.posRemainer(this_1.colEdgeIndex, this_1.colNum);
            var startRow = util_1.posRemainer(this_1.rowEdgeIndex, this_1.rowNum);
            // 改成let key in的形式会比较好
            this_1.colList[col].forEach(function (img, index) {
                var partialRow = util_1.posRemainer(index - startRow, _this.rowNum);
                var left = parseInt(img.style.left) - dif;
                img.style.left = left + 'px';
                _this.getUrl(img, { x: paramX, y: _this.rowEdgeIndex + partialRow + _this.baseRow });
            });
            this_1.colEdge += this_1.imgWidth;
        };
        var this_1 = this;
        while (this.colEdge < upBound) {
            _loop_1();
        }
        if (this.colEdge > lowBonud) {
            round = Math.floor((this.colEdge - lowBonud) / (this.colNum * this.imgWidth * this._scale));
            if (round > 0) {
                newX += this.colNum * this.imgWidth * round * this._scale;
                this.baseCol += round * this.colNum;
                lowBonud += this.imgWidth * round * this.colNum;
                this.refresh();
            }
        }
        var _loop_2 = function () {
            var paramX = this_2.colEdgeIndex + this_2.colNum + this_2.baseCol;
            var col = util_1.posRemainer(this_2.colEdgeIndex, this_2.colNum);
            var startRow = util_1.posRemainer(this_2.rowEdgeIndex, this_2.rowNum);
            this_2.colList[col].forEach(function (img, index) {
                var partialRow = util_1.posRemainer(index - startRow, _this.rowNum);
                var left = parseInt(img.style.left) + dif;
                img.style.left = left + 'px';
                _this.getUrl(img, { x: paramX, y: _this.rowEdgeIndex + partialRow + _this.baseRow });
            });
            this_2.colEdgeIndex++;
            this_2.colEdge -= this_2.imgWidth;
        };
        var this_2 = this;
        while (this.colEdge > lowBonud) {
            _loop_2();
        }
        this._xCoordinate = newX;
        this.mask.style.transform = "translate3d(" + newX + "px, " + this.y + "px, 0) scale(" + this.scale + ")";
    };
    BaseMap.prototype._setY = function (newY) {
        var _this = this;
        var _a = this, minY = _a.minY, maxY = _a.maxY, dif = _a.difY;
        var upBound = (newY - minY) / this._scale - this.imgHeight;
        var lowBonud = (newY - maxY) / this._scale + dif + this.imgHeight;
        var round;
        if (this.rowEdge < upBound) {
            round = Math.floor((upBound - this.rowEdge) / (this.rowNum * this.imgHeight));
            if (round > 0) {
                newY -= this.rowNum * this.imgHeight * round * this._scale;
                this.baseCol -= round * this.rowNum;
                upBound -= this.imgHeight * round * this.rowNum;
                this.refresh();
            }
        }
        var _loop_3 = function () {
            this_3.rowEdgeIndex--;
            var paramY = this_3.rowEdgeIndex + this_3.baseRow;
            var row = util_1.posRemainer(this_3.rowEdgeIndex, this_3.rowNum);
            var startCol = util_1.posRemainer(this_3.colEdgeIndex, this_3.colNum);
            this_3.rowList[row].forEach(function (img, index) {
                var partialCol = util_1.posRemainer(index - startCol, _this.colNum);
                var top = parseInt(img.style.top) - dif;
                img.style.top = top + 'px';
                _this.getUrl(img, { x: _this.colEdgeIndex + partialCol + _this.baseCol, y: paramY });
            });
            this_3.rowEdge += this_3.imgHeight;
        };
        var this_3 = this;
        while (this.rowEdge < upBound) {
            _loop_3();
        }
        if (this.rowEdge > lowBonud) {
            round = Math.floor((this.rowEdge - lowBonud) / (this.rowNum * this.imgHeight));
            if (round > 0) {
                newY += this.rowNum * this.imgHeight * round * this._scale;
                this.baseCol += round * this.rowNum;
                lowBonud += this.imgHeight * round * this.rowNum;
                this.refresh();
            }
        }
        var _loop_4 = function () {
            var paramY = this_4.rowEdgeIndex + this_4.rowNum + this_4.baseRow;
            var row = util_1.posRemainer(this_4.rowEdgeIndex, this_4.rowNum);
            var startCol = util_1.posRemainer(this_4.colEdgeIndex, this_4.colNum);
            this_4.rowList[row].forEach(function (img, index) {
                var partialCol = util_1.posRemainer(index - startCol, _this.colNum);
                var top = parseInt(img.style.top) + dif;
                img.style.top = top + 'px';
                _this.getUrl(img, { x: _this.colEdgeIndex + partialCol + _this.baseCol, y: paramY });
            });
            this_4.rowEdgeIndex++;
            this_4.rowEdge -= this_4.imgHeight;
        };
        var this_4 = this;
        while (this.rowEdge > lowBonud) {
            _loop_4();
        }
        this._yCoordinate = newY;
        this.mask.style.transform = "translate3d(" + this.x + "px, " + newY + "px, 0) scale(" + this.scale + ")";
    };
    Object.defineProperty(BaseMap.prototype, "scale", {
        get: function () {
            return this._scale;
        },
        set: function (newScale) {
            if (!this.level && newScale < 1)
                return;
            if (newScale < this.minScale) {
                if (this._scale > this.minScale) {
                    newScale = this.minScale;
                }
                else {
                    return;
                }
            }
            if (newScale > this.maxScale) {
                if (this._scale < this.maxScale) {
                    newScale = this.maxScale;
                }
                else {
                    return;
                }
            }
            this._setScale(newScale);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseMap.prototype, "x", {
        get: function () {
            return this._xCoordinate;
        },
        //todo 改造setx set y
        //到边界禁止移动
        set: function (newX) {
            this._setX(newX);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseMap.prototype, "y", {
        get: function () {
            return this._yCoordinate;
        },
        set: function (newY) {
            this._setY(newY);
        },
        enumerable: true,
        configurable: true
    });
    BaseMap.prototype.refresh = function () {
        var _this = this;
        console.log('refresh');
        var startRow = util_1.posRemainer(this.rowEdgeIndex, this.rowNum);
        var startCol = util_1.posRemainer(this.colEdgeIndex, this.colNum);
        this.rowList.forEach(function (rowList, rowIndex) {
            var partialRow = util_1.posRemainer(rowIndex - startRow, _this.rowNum);
            rowList.forEach(function (img, colIndex) {
                var partialCol = util_1.posRemainer(colIndex - startCol, _this.colNum);
                _this.getUrl(img, { x: _this.colEdgeIndex + partialCol + _this.baseCol, y: _this.rowEdgeIndex + partialRow + _this.baseRow });
            });
        });
    };
    return BaseMap;
}(AbstractMap));
exports.default = BaseMap;


/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!./index.css */ "./node_modules/css-loader/dist/cjs.js!./src/index.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var map_1 = __webpack_require__(/*! ./map */ "./src/map.ts");
var util_1 = __webpack_require__(/*! ./util */ "./src/util.ts");
__webpack_require__(/*! ./index.css */ "./src/index.css");
var onhashchange = function () {
    location.reload();
};
window.onhashchange = onhashchange;
window.onload = function () {
    if (location.hash.length === 0 || location.hash === '#institutional-migration') {
        return acemap('/institutional-migration');
    }
    else if (location.hash === '#seminal-papers') {
        return acemap('/seminal-papers');
    }
    else if (location.hash === '#skeleton') {
        return showSkeleton();
    }
    var querySet = getUrlQuery(location.hash);
    if (querySet.random) {
        return showOneImg(querySet.src);
    }
    if (querySet.src) {
        if (querySet.src === 'null') {
            return showOneImg('https://api.ixiaowai.cn/gqapi/gqapi.php');
        }
        return showOneImg(querySet.src);
    }
    else {
        window.onhashchange = null;
        var url = prompt('input a image url');
        location.hash = "#img?src=" + url;
        showOneImg(querySet.src);
        window.onhashchange = onhashchange;
    }
};
function getUrlQuery(url) {
    var res = {};
    var split = url.split('?');
    if (split.length < 2) {
        return res;
    }
    var list = split[1].split('&');
    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
        var q = list_1[_i];
        var _a = q.split('='), key = _a[0], value = _a[1];
        res[key] = value;
    }
    return res;
}
function acemap(filepath) {
    if (filepath === void 0) { filepath = ''; }
    var container = document.getElementById('container');
    var baseUrl = "./img" + filepath;
    var range = [0, 800];
    var a = new map_1.default(container, {
        xRange: range,
        yRange: range,
        imgSize: [200, 200],
        levelLimit: 4,
        scaleRange: [0.5, 2],
        miniMap: {
            xRange: range,
            yRange: range,
        }
    });
    var eagleContainer = document.getElementById('eagle');
    var b = new map_1.EagleEye(eagleContainer, { mapRange: [900, 900], mapCanvasSize: [800, 800], eagleSize: [200, 200] });
    b.linkToMap(a, function (dom) {
        var img = new Image();
        img.src = baseUrl + '/0.png';
        img.width = 200;
        img.height = 200;
        dom.appendChild(img);
    });
    a.mapSrc(function (dom, params) {
        var x = params.x, y = params.y;
        var max = Math.pow(4, this.level + 1);
        if (0 > x || max <= x || 0 > y || max <= y) {
            dom.src = baseUrl + "/-1.png";
            return;
        }
        dom.src = baseUrl + ("/" + (this.level + 1) + "-" + x + "-" + y + ".png");
    });
    a.init(function () {
        var image = new Image();
        return image;
    });
}
function showOneImg(imgUrl) {
    var container = document.getElementById('container');
    var range = [0, 800];
    var a = new map_1.default(container, {
        xRange: range,
        yRange: range,
        imgSize: [200, 200],
        levelLimit: 4,
        scaleRange: [0.5, 2],
        miniMap: {
            xRange: range,
            yRange: range,
        }
    });
    var eagleContainer = document.getElementById('eagle');
    var b = new map_1.EagleEye(eagleContainer, { mapRange: [900, 900], mapCanvasSize: [800, 800], eagleSize: [200, 200] });
    b.linkToMap(a, function (dom) {
        var img = new Image();
        img.src = imgUrl;
        img.width = 200;
        img.height = 200;
        dom.appendChild(img);
    });
    a.mapSrc(function (dom, params) {
        var img = dom.firstElementChild;
        var round = Math.pow(this.maxScale, this.level);
        var size = round * 800;
        if (!img.src) {
            img.src = imgUrl;
        }
        img.height = size;
        img.width = size;
        img.style.left = -util_1.posRemainer(params.x, 4 * round) * 200 + "px";
        img.style.top = -util_1.posRemainer(params.y, 4 * round) * 200 + "px";
        // console.log(params.x, params.y, 'in')
        // return (dom2) => {
        //     console.log(params.x, params.y, 'out')
        // }
    });
    a.init(function () {
        var patch = document.createElement('div');
        var image = new Image();
        patch.style.border = '1px solid brown';
        patch.appendChild(image);
        return patch;
    });
}
function showSkeleton() {
    var container = document.getElementById('container');
    var range = [0, 800];
    var a = new map_1.default(container, {
        xRange: range,
        yRange: range,
        imgSize: [200, 200],
        levelLimit: 4,
        scaleRange: [0.5, 2],
        miniMap: {
            xRange: range,
            yRange: range,
        }
    });
    var eagleContainer = document.getElementById('eagle');
    var b = new map_1.EagleEye(eagleContainer, { mapRange: [900, 900], mapCanvasSize: [800, 800], eagleSize: [200, 200] });
    b.linkToMap(a, function (dom) {
        var img = new Image();
        // img.src = imgUrl
        img.style.width = '200px';
        img.style.height = '200px';
        dom.appendChild(img);
    });
    a.mapSrc(function (dom, params) {
        dom.innerText = this.level + "+" + params.x + "+" + params.y;
    });
    a.init(function () {
        var patch = document.createElement('div');
        patch.style.border = '1px solid brown';
        return patch;
    });
}


/***/ }),

/***/ "./src/map.ts":
/*!********************!*\
  !*** ./src/map.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var baseMap_1 = __webpack_require__(/*! ./baseMap */ "./src/baseMap.ts");
var util_1 = __webpack_require__(/*! ./util */ "./src/util.ts");
//todo 修改为 HTMLImageElement
function addContext(container, map) {
    var context = function (e) {
        console.log('asd');
        e.stopPropagation();
        e.preventDefault();
        var offsetLeft = util_1.getLeft(container);
        var offsetTop = util_1.getTop(container);
        var x = e.clientX - offsetLeft;
        var y = e.clientY - offsetTop;
        map.mouseX = x;
        map.mouseY = y;
        console.log(x, y);
        map.magnifier = true;
    };
    container.oncontextmenu = context;
}
var LayerMap = /** @class */ (function (_super) {
    __extends(LayerMap, _super);
    function LayerMap(container, config) {
        var _this = _super.call(this, container, config) || this;
        _this.moveListeners = [];
        _this.levelLimit = config.levelLimit >= 1 ? config.levelLimit : 1;
        _this.scaleUnitBase = config.scaleUnitBase || 225;
        return _this;
    }
    LayerMap.prototype.createMap = function (deltaX, deltaY, level) {
        if (deltaX === void 0) { deltaX = 0; }
        if (deltaY === void 0) { deltaY = 0; }
        if (level === void 0) { level = 0; }
        _super.prototype.createMap.call(this, deltaX, deltaY, level);
        this.scaleUnit = this.scaleUnitBase / Math.pow(this.maxScale, level);
        this.emitMove();
    };
    LayerMap.prototype.init = function (patchInit) {
        this.scrollStep = _super.prototype.init.call(this, patchInit);
        return this.scrollStep;
    };
    Object.defineProperty(LayerMap.prototype, "scale", {
        get: function () {
            return this._scale;
        },
        set: function (newScale) {
            var _this = this;
            if (!this.level && newScale < 1)
                return;
            if (newScale < this.minScale) {
                if (this._scale > this.minScale) {
                    newScale = this.minScale;
                }
                else {
                    return;
                }
            }
            if (newScale > this.maxScale) {
                if (this._scale < this.maxScale) {
                    newScale = this.maxScale;
                }
                else {
                    return;
                }
            }
            var _a = this._setScale(newScale), left = _a[0], top = _a[1];
            //todo 判断当scale到达一定程度之后刷新图层
            if (newScale >= this.maxScale || newScale <= this.minScale) {
                var newLevel_1 = newScale > 1 ? this.level + 1 : this.level - 1;
                if (newLevel_1 < 0 || newLevel_1 >= this.levelLimit) {
                    return;
                }
                //BUG: 这个式子可能有问题 miny 应该也应该*newScale,亦或是miny不应参与计算
                // const newLeft = (left - minX) - this.colEdge * newScale
                var newLeft_1 = left - this.colEdge * newScale;
                var newTop_1 = top - this.rowEdge * newScale;
                var _b = this, scaleUnit = _b.scaleUnit, baseCol = _b.baseCol, baseRow = _b.baseRow;
                //todo: 加入baserow
                //todo: 坐标越界直接取余
                var mapX = (baseCol + this.colEdgeIndex) * scaleUnit;
                var mapY = (baseRow + this.rowEdgeIndex) * scaleUnit;
                console.log(mapX, mapY);
                var newScaleUnit = newScale > 1 ? scaleUnit / this.maxScale : scaleUnit * this.maxScale;
                //计算起始图片的序号
                var deltaX_1 = Math.floor(mapX / newScaleUnit);
                var deltaY_1 = Math.floor(mapY / newScaleUnit);
                //计算还需要偏移的坐标
                var partialX_1 = (deltaX_1 - mapX / newScaleUnit) * this.imgWidth;
                var partialY_1 = (deltaY_1 - mapY / newScaleUnit) * this.imgHeight;
                console.log(partialX_1, partialY_1);
                setTimeout(function () {
                    _this.mask.classList.add('mask-drag');
                    _this.createMap(deltaX_1, deltaY_1, newLevel_1);
                    _this.x = newLeft_1 + partialX_1;
                    _this.y = newTop_1 + partialY_1;
                }, 200);
                // return
                // this.scaleUnit = newScaleUnit
            }
            this.emitMove();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerMap.prototype, "x", {
        get: function () {
            return this._xCoordinate;
        },
        set: function (newX) {
            this._setX(newX);
            this.emitMove();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerMap.prototype, "y", {
        get: function () {
            return this._yCoordinate;
        },
        set: function (newY) {
            this._setY(newY);
            this.emitMove();
        },
        enumerable: true,
        configurable: true
    });
    LayerMap.prototype.addMoveListener = function (func) {
        this.moveListeners.push(func);
    };
    LayerMap.prototype.removeMoveListener = function (func) {
        this.moveListeners = this.moveListeners.filter(function (i) { return i !== func; });
    };
    LayerMap.prototype.emitMove = function () {
        if (!this.moveListeners.length)
            return;
        var orgin = this._getMouseMap();
        var PixelSize = this.getPixelSize();
        this.moveListeners.forEach(function (func) {
            func(orgin, PixelSize);
        });
        // console.log('emitMove', orgin, PixelSize)
    };
    //获取地图
    LayerMap.prototype.setOriginPostion = function (mapX, mapY, partialX, partialY) {
        if (partialX === void 0) { partialX = 0; }
        if (partialY === void 0) { partialY = 0; }
        var _a = this, scaleUnit = _a.scaleUnit, baseCol = _a.baseCol, baseRow = _a.baseRow, x = _a.x, y = _a.y, imgHeight = _a.imgHeight, imgWidth = _a.imgWidth, _scale = _a._scale;
        //获得当前原点的经纬坐标
        var a = (baseCol - x / _scale / imgWidth) * scaleUnit;
        var b = (baseRow - y / _scale / imgHeight) * scaleUnit;
        var deltaX = (mapX - a) * _scale * imgWidth / scaleUnit;
        var deltaY = (mapY - b) * _scale * imgHeight / scaleUnit;
        this.x -= deltaX - partialX;
        this.y -= deltaY - partialX;
    };
    LayerMap.prototype._getMouseMap = function () {
        var _a = this, scaleUnit = _a.scaleUnit, baseCol = _a.baseCol, baseRow = _a.baseRow, x = _a.x, y = _a.y, imgHeight = _a.imgHeight, imgWidth = _a.imgWidth, _scale = _a._scale;
        var mapX = (baseCol + (0 - x) / _scale / imgWidth) * scaleUnit;
        var mapY = (baseRow + (0 - y) / _scale / imgHeight) * scaleUnit;
        return [mapX, mapY];
    };
    LayerMap.prototype.getPixelSize = function () {
        //每个像素代表的地图单位
        var unit = this.scaleUnit / this.scale;
        return [unit / this.imgWidth, unit / this.imgHeight];
    };
    return LayerMap;
}(baseMap_1.default));
var MagnifierMap = /** @class */ (function (_super) {
    __extends(MagnifierMap, _super);
    function MagnifierMap(container, config) {
        var _this = _super.call(this, container, config) || this;
        if (config.miniMap) {
            var miniContainer = document.createElement('div');
            miniContainer.id = 'mini-map';
            _this.container.appendChild(miniContainer);
            _this.miniMap = new LayerMap(miniContainer, {
                xRange: [0, 200],
                yRange: [0, 200],
                imgSize: [200, 200],
                levelLimit: 10,
                scaleRange: config.scaleRange,
            });
            _this.miniContainer = miniContainer;
            _this.magnifier = false;
        }
        return _this;
    }
    MagnifierMap.prototype.init = function (patchInit) {
        var _this = this;
        this.scrollStep = _super.prototype.init.call(this, patchInit);
        this.miniMap.mapSrc(this.mapSrc());
        this.miniMap && this.miniMap.init(patchInit);
        addContext(this.container, this);
        this.container.addEventListener('mousedown', function () {
            _this.magnifier = false;
        });
        return this.scrollStep;
    };
    Object.defineProperty(MagnifierMap.prototype, "magnifier", {
        get: function () {
            return this._magnifier;
        },
        set: function (newMagnifier) {
            if (newMagnifier && this.level === this.levelLimit - 1)
                return;
            this._magnifier = newMagnifier;
            if (!this.miniContainer)
                return;
            this.miniContainer.style.display = newMagnifier ? 'block' : 'none';
            this.miniContainer.style.left = this.mouseX - 100 + "px";
            this.miniContainer.style.top = this.mouseY - 100 + "px";
            //todo 目前用transform会导致
            // this.miniContainer.style.transform = `translate3d(${this.mouseX}px,${this.mouseY}px,0)`
            if (newMagnifier)
                this.getMousePositon();
        },
        enumerable: true,
        configurable: true
    });
    MagnifierMap.prototype.getMousePositon = function () {
        var _a = this, scaleUnit = _a.scaleUnit, baseCol = _a.baseCol, baseRow = _a.baseRow, x = _a.x, y = _a.y, imgHeight = _a.imgHeight, imgWidth = _a.imgWidth, _scale = _a._scale, maxScale = _a.maxScale;
        var mapX = (baseCol + (this.mouseX - x) / _scale / imgWidth) * scaleUnit;
        var mapY = (baseRow + (this.mouseY - y) / _scale / imgHeight) * scaleUnit;
        var newScaleUnit = scaleUnit / maxScale;
        this.miniMap.scaleUnit = newScaleUnit;
        var deltaX = Math.floor(mapX / newScaleUnit);
        var deltaY = Math.floor(mapY / newScaleUnit);
        this.miniMap.createMap(deltaX, deltaY, this.level + 1);
        console.log(mapX, mapY);
        //todo 100换成参数
        this.miniMap.setOriginPostion(mapX, mapY, 100, 100);
        //todo调整放大镜生成后的位置
    };
    return MagnifierMap;
}(LayerMap));
var EagleEye = /** @class */ (function () {
    function EagleEye(container, config) {
        var eye = document.createElement('span');
        container.appendChild(eye);
        this.container = container;
        this.eye = eye;
        this.mapRange = config.mapRange;
        this.mapCanvasSize = config.mapCanvasSize;
        this.eagleSize = config.eagleSize;
        this._ismove = false;
        this.beMoved = this.beMoved.bind(this);
        this.addEvent();
    }
    EagleEye.prototype.addEvent = function () {
        var _this = this;
        var _a = this, container = _a.container, eye = _a.eye;
        var isDrag = false;
        var mouseMove = function (e) {
            if (!isDrag)
                return;
            var eagleSize = _this.eagleSize;
            var maxW = eagleSize[0] - eye.offsetWidth;
            var maxH = eagleSize[0] - eye.offsetHeight;
            var nLeft = e.clientX - container.offsetLeft - eye.offsetWidth / 2;
            var nTop = e.clientY - container.offsetTop - eye.offsetHeight / 2;
            // 设置遮罩层永远显示在小显示区域内部 也就是判断nLeft、nTop值
            nLeft = Math.min(maxW, Math.max(0, nLeft));
            nTop = Math.min(maxH, Math.max(0, nTop));
            // 遮罩层位置
            eye.style.transform = "translate3d(" + nLeft + "px," + nTop + "px,0)";
            _this.move(nLeft, nTop);
        };
        container.addEventListener('mousedown', function (e) {
            e.preventDefault();
            e.stopPropagation();
            isDrag = true;
            _this.isMove = true;
            mouseMove(e);
        });
        container.addEventListener('mouseup', function (e) {
            e.preventDefault();
            e.stopPropagation();
            isDrag = false;
            _this.isMove = false;
        });
        container.addEventListener('mouseleave', function () {
            isDrag = false;
            _this.isMove = false;
        });
        container.addEventListener('mousemove', mouseMove);
    };
    Object.defineProperty(EagleEye.prototype, "isMove", {
        get: function () {
            return this._ismove;
        },
        set: function (move) {
            this._ismove = move;
            if (!this.map)
                return;
            this.map.isDrag(move);
        },
        enumerable: true,
        configurable: true
    });
    EagleEye.prototype.linkToMap = function (map, initFunc) {
        this.map = map;
        initFunc && initFunc(this.container);
        map.addMoveListener(this.beMoved);
        // 225 * 
    };
    EagleEye.prototype.move = function (x, y) {
        if (!this.map)
            return;
        var _a = this, mapRange = _a.mapRange, eagleSize = _a.eagleSize;
        this.map.setOriginPostion(x * mapRange[0] / eagleSize[0], y * mapRange[1] / eagleSize[1]);
    };
    EagleEye.prototype.beMoved = function (orgin, pixelSize) {
        //如果移动是由eagle发起的
        if (this.isMove)
            return;
        var _a = this, eye = _a.eye, mapRange = _a.mapRange, eagleSize = _a.eagleSize, mapCanvasSize = _a.mapCanvasSize;
        var nLeft = orgin[0] / mapRange[0] * eagleSize[0];
        var nTop = orgin[1] / mapRange[1] * eagleSize[1];
        eye.style.transform = "translate3d(" + nLeft + "px," + nTop + "px,0)";
        console.log();
        eye.style.width = pixelSize[0] * mapCanvasSize[0] * eagleSize[0] / mapRange[0] + "px";
        eye.style.height = pixelSize[1] * mapCanvasSize[1] * eagleSize[1] / mapRange[1] + "px";
    };
    return EagleEye;
}());
exports.EagleEye = EagleEye;
exports.default = MagnifierMap;


/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.throttle = function (func, time) {
    var timeout = null;
    return function () {
        if (timeout !== null)
            return;
        var context = this;
        var args = arguments;
        func.apply(context, args);
        timeout = setTimeout(function () {
            timeout = null;
        }, time);
    };
};
function posRemainer(a, b) {
    var res = a % b;
    return res < 0 ? res + b : res;
}
exports.posRemainer = posRemainer;
function getTop(e) {
    if (e.offsetTop === undefined) {
        return 0;
    }
    var offset = e.offsetTop;
    if (e.offsetParent)
        offset += getTop(e.offsetParent);
    return offset;
}
exports.getTop = getTop;
function getLeft(e) {
    if (e.offsetLeft === undefined) {
        return 0;
    }
    var offset = e.offsetLeft;
    if (e.offsetParent)
        offset += getLeft(e.offsetParent);
    return offset;
}
exports.getLeft = getLeft;


/***/ })

/******/ });
//# sourceMappingURL=main.js.map