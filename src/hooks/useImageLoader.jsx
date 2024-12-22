import { useState } from 'react'
import cv from '@techstark/opencv-js'

export const useImageLoader = (canvasRef) => {
  const [image, setImage] = useState(null)

  const loadImage = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)

        const src = cv.imread(canvas)
        setImage(src)
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  }

  return { image, loadImage }
}
