"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Waits for an image or multiple images to load before resolving, then resolves to the loaded image(s).
 * @param {string|Array.<string>} images A single image URI as string or multiple URIs in an Array.
 * @param {boolean} strict Pass {true} to enable strict mode -> Promise rejects if there's an error while loading an image.
 * @returns {Promise.<Image|Array.<Image>>} The loaded Image or an Array containing all loaded Images.
 * Can also contain Errors, if strict mode is off!
 */
var imageLoader = function imageLoader(images) {
  var strict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return new Promise(function (resolve, reject) {
    if (typeof images === 'undefined') return resolve();
    typeof images === 'string' ? loadImage(images, strict).then(resolve, reject) : loadAllImages(images, strict).then(resolve, reject);
  });
};

var loadAllImages = function loadAllImages(imageList, strict) {
  var imageLoadPromises = imageList.map(function (img) {
    return loadImage(img, strict);
  });
  return Promise.all(imageLoadPromises);
};

var loadImage = function loadImage(img, strict) {
  return new Promise(function (resolve, reject) {
    var el = new Image();

    el.onload = function () {
      return resolve(el);
    };

    el.onerror = function (e) {
      return strict ? reject(e) : resolve(e);
    };

    el.src = img;
  });
};

(function (global, indexFn) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = indexFn : global.BasicImageloader = indexFn;
})(void 0, imageLoader);
