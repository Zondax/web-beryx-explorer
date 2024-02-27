import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

import { Typography } from '@mui/material'

/**
 * Component to handle dynamic font sizes
 */
export const DynamicFontSizeText = ({
  text,
  fontSize,
  setFontSize,
  refContainer,
}: {
  text: string | number
  fontSize: string
  setFontSize: (size: string) => void
  refContainer: React.RefObject<HTMLDivElement>
}) => {
  const fontSizeRef = useRef<number>(parseFloat(fontSize))
  const textRef = useRef<HTMLHeadingElement | null>(null)

  /**
   * Callback to adjust the font size to fit the container.
   *
   */
  const adjustFontSize = useCallback(() => {
    if (!textRef.current || !refContainer.current) {
      return
    }

    const containerWidth = refContainer.current.getBoundingClientRect().width
    const textWidth = textRef.current.getBoundingClientRect().width

    const tolerance = 30
    if (textWidth > containerWidth) {
      const newSize = Math.max(fontSizeRef.current - 0.125, 0.75)
      fontSizeRef.current = newSize
      setFontSize(`${newSize}rem`)
    } else if (textWidth < containerWidth - tolerance && fontSizeRef.current < 3) {
      const newSize = Math.min(fontSizeRef.current + 0.125, 3)
      fontSizeRef.current = newSize
      setFontSize(`${newSize}rem`)
    }
  }, [refContainer, setFontSize])

  const observer = useMemo(() => new ResizeObserver(adjustFontSize), [adjustFontSize])

  useEffect(() => {
    if (refContainer.current) {
      observer.observe(refContainer.current)
    }
    return () => {
      if (refContainer.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(refContainer.current)
      }
    }
  }, [refContainer, observer])

  useEffect(() => {
    adjustFontSize()
  }, [text, adjustFontSize])

  return (
    <Typography variant="h1" style={{ fontSize, width: 'fit-content' }} ref={textRef}>
      {text}
    </Typography>
  )
}
