import styles from './GetCoordinate.module.css'
import cv from '@techstark/opencv-js'
import { useState } from 'react'
import { useCanvasRef } from '../../hooks/useCanvasRef'
import { useImageLoader } from '../../hooks/useImageLoader'
import { useImageShow } from '../../hooks/useImageShow'
import { checkImage, checkRatio } from '../../utils'

const GetCoordinate = () => {
  const canvasRef = useCanvasRef()
  const { image, loadImage } = useImageLoader(canvasRef)
  const { showImage } = useImageShow(canvasRef)

  const [resizeRatio, setResizeRatio] = useState(1)
  const [rectangle, setRectangle] = useState({ x1: '', y1: '', x2: '', y2: '', thickness: '10' })

  const drawRectangle = () => {
    const { x1, y1, x2, y2, thickness } = rectangle
    const x1num = parseInt(x1, 10)
    const x2num = parseInt(x2, 10)
    const y1num = parseInt(y1, 10)
    const y2num = parseInt(y2, 10)
    const thicknessNum = parseInt(thickness, 10)

    if (x1num > x2num || y1num > y2num) {
      alert('Please enter valid coordinates.')
      return
    }
    if (x2num > image.cols || y2num > image.rows) {
      alert('Input coordinate is out of image size.')
      return
    }

    const rectangleImg = image.clone()
    const color = new cv.Scalar(0, 255, 0, 255)
    cv.rectangle(
      rectangleImg,
      new cv.Point(x1num, y1num),
      new cv.Point(x2num, y2num),
      color,
      thicknessNum
    )
    return rectangleImg
  }

  const handleResize = () => {
    checkImage(image)
    const rectangleImg = drawRectangle()
    showImage(rectangleImg, checkRatio(parseFloat(resizeRatio)))
    rectangleImg.delete() // Free memory after use
  }

  const handleDrawing = () => {
    checkImage(image)

    const { x1, y1, x2, y2 } = rectangle
    if (!x1 || !y1 || !x2 || !y2) {
      alert('Please enter valid coordinates.')
      return
    }

    const rectangleImg = drawRectangle()
    showImage(rectangleImg, checkRatio(parseFloat(resizeRatio)))
    rectangleImg.delete() // Free memory after use
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
          <h3>Draw Rectangle</h3>
          <label>
            X1: &nbsp;
            <input
              type="number"
              value={rectangle.x1}
              onChange={(e) => setRectangle({ ...rectangle, x1: e.target.value })}
            />
          </label>
          <label>
            Y1: &nbsp;
            <input
              type="number"
              value={rectangle.y1}
              onChange={(e) => setRectangle({ ...rectangle, y1: e.target.value })}
            />
          </label>
          <label>
            X2: &nbsp;
            <input
              type="number"
              value={rectangle.x2}
              onChange={(e) => setRectangle({ ...rectangle, x2: e.target.value })}
            />
          </label>
          <label>
            Y2: &nbsp;
            <input
              type="number"
              value={rectangle.y2}
              onChange={(e) => setRectangle({ ...rectangle, y2: e.target.value })}
            />
          </label>
          <label>
            thickness: &nbsp;
            <input
              type="number"
              value={rectangle.thickness}
              onChange={(e) => setRectangle({ ...rectangle, thickness: e.target.value })}
            />
          </label>
          <button onClick={handleDrawing}>Draw Rectangle</button>
        </div>
      </div>
    </div>
  )
}

export default GetCoordinate
