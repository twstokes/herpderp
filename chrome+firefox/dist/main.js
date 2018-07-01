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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _herp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


const checkComment = commentNode => {
  const c = commentNode;
  // if everything is fine, return
  if (
    (c.clicked && c.textContent === c.derpOriginal) ||
    (!c.clicked && c.textContent === c.derpString)
  )
    return;

  // otherwise, fix the comment
  // the only case of malformed comment encountered so far are these two cases:
  if (c.textContent.indexOf(c.derpString) !== -1) {
    // in the case of the new comment being appended after the derp string,
    // just grab it and put it in the derpOriginal variable
    const idx = c.derpString.length;
    c.derpOriginal = c.textContent.substring(idx);
    c.textContent = c.textContent.substring(0, idx);
    c.clicked = false;
    return;
  }

  if (c.textContent.indexOf(c.derpOriginal) !== -1) {
    // Same issue but the comment was appended after derpOriginal
    const idx = c.derpOriginal.length;
    c.derpOriginal = c.textContent.substring(idx);
    c.textContent = c.derpString;
    c.clicked = false;
  }
};

const init = commentsSection => {
  // selectors for comments
  const selectors = ["#content-text"];
  // build the full selector string
  const derpSelectorString = selectors
    .map(sel => `${sel}:not(.derped)`)
    .join(", ");
  const checkSelectorString = selectors.map(sel => `${sel}.derped`).join(", ");

  // Only watch for child list changes, as we're watching the comments container
  const mutationConfig = { attributes: false, childList: true, subtree: true };

  // Create a MutationObserver
  // This object will monitor the comments for DOM changes
  const observer = new MutationObserver(() => {
    // Check that everything's fine with the already derped comments
    // This is necessary because youtube does a lot of wizardry with comments in-between videos
    document.querySelectorAll(checkSelectorString).forEach(checkComment);
    // Derp all un-derped comments
    document.querySelectorAll(derpSelectorString).forEach(_herp__WEBPACK_IMPORTED_MODULE_0__["default"]);
  });

  observer.observe(commentsSection, mutationConfig);
};

// Check every 1s if comments are loaded or not. Once they are, the timeout stops until the user leaves youtube or reloads the page.
// This needs to be done since comments are added in the DOM through js at an undetermined point through Youtube's execution.
const checkCommentsLoaded = () => {
  setTimeout(() => {
    // This selector is awful, but Youtube re-uses a lot of the DOM (the selector for the comments is re-used across a bunch of pages) so we need the exact path to the comments to match
    const commentsSection = document.querySelector(
      "html body ytd-app div#content.style-scope.ytd-app ytd-page-manager#page-manager.style-scope.ytd-app ytd-watch.style-scope.ytd-page-manager.hide-skeleton div#top.style-scope.ytd-watch div#container.style-scope.ytd-watch div#main.style-scope.ytd-watch ytd-comments#comments.style-scope.ytd-watch ytd-item-section-renderer#sections.style-scope.ytd-comments div#contents.style-scope.ytd-item-section-renderer"
    );
    if (commentsSection != null) init(commentsSection);
    else checkCommentsLoaded();
  }, 1000);
};

checkCommentsLoaded();


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// returns a random int from 1 to max
const randomInt = max => Math.floor(Math.random() * max);

// builds a string with random herps and derps
const derpString = (length = 20) => {
  const randomLength = randomInt(length) + 1;
  const randomDerp = randomInt(2) ? "herp" : "derp";

  return Array.from({ length: randomLength }, () => randomDerp).join(" ");
};

// derps a comment
const derpComment = element => {
  const c = element;
  // preserve the original contents
  c.derpOriginal = c.textContent;
  // swap between the two when clicked
  c.onclick = () => {
    c.clicked = !c.clicked;
    c.textContent = c.clicked ? c.derpOriginal : c.derpString;
  };

  // add derped class
  c.classList.add("derped");
  // create a derp string for this comment
  c.derpString = derpString();
  // change the contents
  c.textContent = c.derpString;
  c.clicked = false;
};

/* harmony default export */ __webpack_exports__["default"] = (derpComment);


/***/ })
/******/ ]);