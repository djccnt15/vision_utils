import cv from '@techstark/opencv-js'

export const useImageShow = (canvasRef) => {
  const showImage = (image, ratio) => {
    const newWidth = Math.round(image.cols * ratio)
    const newHeight = Math.round(image.rows * ratio)

    const dst = new cv.Mat()
    const dsize = new cv.Size(newWidth, newHeight)
    cv.resize(image, dst, dsize, 0, 0, cv.INTER_LINEAR)

    const canvas = canvasRef.current
    canvas.width = newWidth
    canvas.height = newHeight
    cv.imshow(canvas, dst)

    dst.delete() // Free memory after use
  }

  return { showImage }
}
