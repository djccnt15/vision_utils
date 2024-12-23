/**
 * @param {cv.Mat} image
 */
export function checkImage(image) {
  if (!image) {
    alert('Please load an image first.')
    return
  }
}

/**
 * @param {Number} ratio
 */
export function checkRatio(ratio) {
  if (isNaN(ratio)) {
    return 1
  }
  return ratio
}
