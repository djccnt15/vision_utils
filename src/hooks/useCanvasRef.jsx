import { useRef } from 'react'

export const useCanvasRef = () => {
  const canvasRef = useRef(null)
  return canvasRef
}
