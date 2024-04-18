'use client'
import { useEffect, useState } from 'react'

interface IWindowSize {
  width: number | undefined
  height: number | undefined
}

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<IWindowSize>({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    const handleResizeWindow = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResizeWindow)

    handleResizeWindow()

    return () => window.removeEventListener('resize', handleResizeWindow)
  }, [])

  return windowSize
}

export default useWindowSize
