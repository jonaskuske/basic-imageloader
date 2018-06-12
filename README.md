# basic-imageloader

&nbsp;
> **`basic-imageloader` requires support for `Promise` to run. It does not come with a polyfill, supply your own if you want to support legacy environments!**
&nbsp;

### Arguments
  - `{string | Array} url(s) to load`
  - `{boolean} strict mode`
### Usage

> Takes an image URL or an array of URLs and returns a Promise that resolves when the images are loaded

```javascript
BasicImageloader(['image.jpg', 'image2.jpg']).then(() = > console.log('all images loaded!'));
```

> The Promise resolves to the loaded image or an array of the loaded images, so you can work with them afterwards (see Strict Mode for caveats)

```javascript
BasicImageloader('image1.jpg').then(image =>
  image.height > image.width
    ? enablePortaitMode()
    : enableLandscapeMode();
);
// or with arrays
BasicImageloader(['img1.jpg', 'img2.jpg']).then(images => {
  for (let image of images) {
    console.log(image.width);
  }
});
```

> And since these are Promises, you can of course also use async/await! :)

```javascript
async function loadAndLogImage(img) {
  const loadedImage = await BasicImageloader(img);
  console.log(loadedImage);
}
```
### Strict Mode
The function takes a `boolean` as second argument, which enables or disables **strict mode** for error handling.
By default this is off, which means the Promise will resolve no matter what and if you are loading multiple images and one fails, it will still wait for the others to load before resolving.
> **Careful!** In this case, you can't rely on the array the Promise resolves to to only contain images - it will also contain error events where images failed to load!

If you pass `true` as second argument the Promise immediately rejects if an image fails to load - even if other images are still loading.
This way you can implement your own error handling and safely assume that the resulting array only contains valid images.
