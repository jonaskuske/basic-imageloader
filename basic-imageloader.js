/**
 * Waits for an image or multiple images to load before resolving, then resolves to the loaded image(s).
 * @param {string|Array.<string>} images A single image URI as string or multiple URIs in an Array.
 * @param {boolean} strict Pass {true} to enable strict mode -> Promise rejects if there's an error while loading an image.
 * @returns {Promise.<Image|Array.<Image>>} The loaded Image or an Array containing all loaded Images.
 * Can also contain Errors, if strict mode is off!
 */
const BasicImageloader = (images, strict = false) => new Promise((res, rej) => {
  if (typeof images === 'undefined') return res();
  typeof images === 'string'
    ? loadImage(images, strict).then(res, rej)
    : loadAllImages(images, strict).then(res, rej);
});

const loadAllImages = (imageList, strict) => {
  const imageLoadPromises = imageList.map(img => loadImage(img, strict));
  return Promise.all(imageLoadPromises);
}

const loadImage = (img, strict) => {
  return new Promise((resolve, reject) => {
    const el = new Image();
    el.onload = () => resolve(el);
    el.onerror = e => strict ? reject(e) : resolve(e);
    el.src = img;
  });
}

(function (global, indexFn) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? module.exports = indexFn
    : global.BasicImageloader = indexFn
})(this, BasicImageloader)