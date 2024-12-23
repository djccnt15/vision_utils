import styles from './BinaryThreshold.module.css'
import cv from '@techstark/opencv-js'
import { useState } from 'react'
import { useCanvasRef } from '../../hooks/useCanvasRef'
import { useImageLoader } from '../../hooks/useImageLoader'
import { useImageShow } from '../../hooks/useImageShow'
import { checkImage, checkRatio } from '../../utils'

const BinaryThreshold = () => {
  const canvasRef = useCanvasRef()
  const { image, loadImage } = useImageLoader(canvasRef)
  const { showImage } = useImageShow(canvasRef)

  const [thresholdValue, setThresholdSliderValue] = useState(127)
  const [maxValValue, setMaxValSliderValue] = useState(255)
  const [resizeRatio, setResizeRatio] = useState(1)
  const [selectedOption, setSelectedOption] = useState("cv.THRESH_BINARY")
  const [binaryOption, setBinaryOption] = useState(cv.THRESH_BINARY)
  const binaryOptions = [
    "cv.THRESH_BINARY",
    "cv.THRESH_BINARY_INV",
    "cv.THRESH_TRUNC",
    "cv.THRESH_TOZERO",
    "cv.THRESH_TOZERO_INV",
  ]

  const thresholdImg = (mat, thresholdValue, maxValValue, binaryOption) => {
    const grayMat = new cv.Mat()
    cv.cvtColor(mat, grayMat, cv.COLOR_RGBA2GRAY)

    const thresholdedMat = new cv.Mat()
    cv.threshold(grayMat, thresholdedMat, thresholdValue, maxValValue, binaryOption)

    grayMat.delete()
    return thresholdedMat
  }

  const handleResize = () => {
    checkImage(image)
    const thresholdedImage = thresholdImg(image, thresholdValue, maxValValue, binaryOption)
    showImage(thresholdedImage, checkRatio(parseFloat(resizeRatio)))
    thresholdedImage.delete()
  }

  const handleThresholdChange = (event) => {
    checkImage(image)
    const threshold = parseInt(event.target.value, 10)
    setThresholdSliderValue(threshold)

    const thresholdedImage = thresholdImg(image, threshold, maxValValue, binaryOption)
    showImage(thresholdedImage, checkRatio(parseFloat(resizeRatio)))
    thresholdedImage.delete()
  }

  const handleMaxValChange = (event) => {
    checkImage(image)
    const maxVal = parseInt(event.target.value, 10)
    setMaxValSliderValue(maxVal)

    const thresholdedImage = thresholdImg(image, thresholdValue, maxVal, binaryOption)
    showImage(thresholdedImage, checkRatio(parseFloat(resizeRatio)))
    thresholdedImage.delete()
  }

  const handleOptionChange = (event) => {
    checkImage(image)

    let option
    switch (event.target.value) {
      case "cv.THRESH_BINARY_INV":
        option = cv.THRESH_BINARY_INV
        break
      case "cv.THRESH_TRUNC":
        option = cv.THRESH_TRUNC
        break
      case "cv.THRESH_TOZERO":
        option = cv.THRESH_TOZERO
        break
      case "cv.THRESH_TOZERO_INV":
        option = cv.THRESH_TOZERO_INV
        break
      default:
        option = cv.THRESH_BINARY
        break
    }

    setSelectedOption(event.target.value)
    setBinaryOption(option)

    const thresholdedImage = thresholdImg(image, thresholdValue, maxValValue, option)
    showImage(thresholdedImage, checkRatio(parseFloat(resizeRatio)))
    thresholdedImage.delete()
  }

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <canvas ref={canvasRef}></canvas>
      </div>
      <div className={styles.sidebar}>
        <h2>Controls</h2>
        <div>
          <h3>Load Image</h3>
          <label htmlFor="imageInput"></label>
          <input type="file" id="imageInput" accept="image/*" onChange={loadImage} />
        </div>
        <div>
          <h3>Resize</h3>
          <label>
            Ratio: &nbsp;
            <input
              type="number"
              step="0.01"
              value={resizeRatio}
              onChange={(e) => setResizeRatio(e.target.value)}
            />
          </label>
          <button onClick={handleResize}>Resize Image</button>
        </div>
        <div>
          <h3>Threshold</h3>
            <label htmlFor="slider">Threshold: {thresholdValue}</label>
            <input
              type="range"
              id="slider"
              name="slider"
              min="0"
              max="255"
              value={thresholdValue}
              onChange={handleThresholdChange}
            />
            <label htmlFor="slider">MaxVal: {maxValValue}</label>
            <input
              type="range"
              id="slider"
              name="slider"
              min="0"
              max="255"
              value={maxValValue}
              onChange={handleMaxValChange}
            />
        </div>
        <div>
          <h3>Binary Option</h3>
          {binaryOptions.map((option) => (
            <label key={option}>
              <input
                type="radio"
                value={option}
                checked={selectedOption === option}
                onChange={handleOptionChange}
              />
              {option}
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BinaryThreshold
