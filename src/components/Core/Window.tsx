import React, { useRef, useState, useEffect } from 'react'
import Draggable from 'react-draggable'
import useWindowSize from '../../hooks/useWindowSize'

const WINDOW_DIMENSIONS_WIDTH = 1920
const WINDOW_DIMENSIONS_HEIGHT = 1080

interface WindowProps {
  children: React.ReactNode
  className?: string
}

/**
 * @name Window
 *
 * @description
 * A general purpose window used to display things like programs,
 * prompts, alerts, etc.
 *
 * @param props
 * @returns
 */
const Window = (props: WindowProps) => {
  const windowRef = useRef<any>(null)

  const { children, className } = props
  const { width, height } = useWindowSize()

  const [windowHeight, setWindowHeight] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)

  const OFFSET = 5

  useEffect(() => {
    setWindowHeight(windowRef.current?.clientHeight + OFFSET)
    setWindowWidth(windowRef.current?.clientWidth + OFFSET)
  }, [])

  /**
   * Just an approximation for 1920x1080 screens
   */
  const defaultPosition = {
    x: WINDOW_DIMENSIONS_WIDTH / 2 - 280,
    y: WINDOW_DIMENSIONS_HEIGHT / 6
  }

  return (
    <Draggable
      defaultPosition={defaultPosition}
      handle=".handle"
      bounds={{
        bottom: height! - windowHeight,
        right: width! - windowWidth,
        top: 0,
        left: 0
      }}
    >
      <div
        ref={windowRef}
        className={`absolute bg-wgray border-r-black border-b-black border-l-[#E7E7E7] border-t-[#E7E7E7] p-[2px] border-2 ${className}`}
      >
        {children}
      </div>
    </Draggable>
  )
}

export default Window
