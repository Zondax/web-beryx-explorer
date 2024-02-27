import { RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { truncateMiddleOfString } from '@/utils/text'

/**
 * DisplayValue is a component that renders the display value for the BeryxLink.
 * @param props - The properties that define the component's behavior and display.
 * @param props.value - The value to be displayed.
 * @param props.maxStringLength - The maximum length of the string to be displayed.
 * It can be undefined (the value is not truncated), 'auto' (the value is truncated depending of the space)
 * or number (the value is truncated by the indicated number of characters)
 * @param props.parentContainerRef - The reference to the parent container.
 * @returns - A React component that displays the value.
 */
export const DynamicTextValue = (props: {
  value: string
  maxStringLength?: number | 'auto'
  parentContainerRef: RefObject<HTMLDivElement>
}) => {
  const { value, maxStringLength, parentContainerRef } = props
  const textRef = useRef<HTMLHeadingElement | null>(null)
  const [dynamicMaxStringLength, setDynamicMaxStringLength] = useState<number>(50)

  /**
   * This function adjusts the maximum string length based on the container and text widths.
   * It uses a callback to ensure that the function does not change on every render.
   * @function
   * @returns - Returns nothing.
   */
  const adjustDynamicMaxStringLength = useCallback(() => {
    if (!textRef.current || !parentContainerRef.current) {
      return
    }

    const containerWidth = parentContainerRef.current.getBoundingClientRect().width
    const textWidth = textRef.current.getBoundingClientRect().width + 32

    const tolerance = 40
    if (textWidth > containerWidth) {
      const newLength = Math.max(dynamicMaxStringLength - 2, 10)
      setDynamicMaxStringLength(newLength)
    } else if (textWidth < containerWidth - tolerance && dynamicMaxStringLength < value.length) {
      const newLength = Math.min(dynamicMaxStringLength + 2, value.length)
      setDynamicMaxStringLength(newLength)
    }
  }, [value, dynamicMaxStringLength, parentContainerRef])

  /**
   * This is a memoized instance of the ResizeObserver class.
   * It is used to observe changes in the size of the parent container.
   */
  const observer = useMemo(() => new ResizeObserver(adjustDynamicMaxStringLength), [adjustDynamicMaxStringLength])

  /**
   * This effect is responsible for observing changes in the size of the parent container.
   * It starts observing when the component is mounted and stops observing when the component is unmounted.
   * @effect
   */
  useEffect(() => {
    if (parentContainerRef.current) {
      observer.observe(parentContainerRef.current)
    }
    return () => {
      if (parentContainerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(parentContainerRef.current)
      }
    }
  }, [parentContainerRef, observer])

  /**
   * This effect is responsible for adjusting the maximum string length when the value changes.
   * @effect
   */
  useEffect(() => {
    adjustDynamicMaxStringLength()
  }, [value, adjustDynamicMaxStringLength])

  if (!maxStringLength) {
    return value
  }
  if (maxStringLength !== 'auto') {
    return truncateMiddleOfString(value.toString(), maxStringLength)
  }

  return <span ref={textRef}>{truncateMiddleOfString(value.toString(), dynamicMaxStringLength)}</span>
}
