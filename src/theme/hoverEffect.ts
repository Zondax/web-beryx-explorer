import { Theme } from '@mui/material'

/**
 * Applies a hover effect to an HTML element.
 * @param el - The HTML element to apply the hover effect to.
 * @param cardHalo - The halo effect of the card.
 * @param height - The height of the HTML element.
 * @param width - The width of the HTML element.
 * @param theme - The theme of the application.
 * @returns A function to remove the event listeners.
 */
export const hoverEffect = (el: HTMLDivElement, cardHalo: HTMLElement, height: number, width: number, theme: 'light' | 'dark') => {
  const halfWidth = width / 2
  const halfHeight = height / 2

  /**
   * Handles the mouse move event.
   * @param e - The mouse event.
   */
  const handleMove = (e: MouseEvent) => {
    const { offsetX: xVal, offsetY: yVal } = e
    const yRotation = 10 * ((xVal - halfWidth) / width)
    const xRotation = -10 * ((yVal - halfHeight) / height)
    el.style.transform = `perspective(500px) scale(1.05) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`

    if (cardHalo) {
      const xPercent = Math.round((1 - xVal / width) * 100)
      const yPercent = Math.round((1 - yVal / height) * 100)
      cardHalo.style.background =
        theme === 'light'
          ? `radial-gradient(circle at ${xPercent}% ${yPercent}%, rgba(255,255,255,0.1) 10%, rgba(0,0,0,0.02) 120%)`
          : `radial-gradient(circle at ${xPercent}% ${yPercent}%, rgba(220,220,240,0.04) 15%, rgba(0,0,0,0.2) 120%)`
    }
  }

  /**
   * Handles the mouse over event.
   */
  const handleMouseOver = () => {
    el.style.zIndex = '9999'
  }

  /**
   * Handles the mouse out event.
   */
  const handleMouseOut = () => {
    el.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)'
    el.style.zIndex = 'auto'
    el.style.filter = 'brightness(1)'
    if (cardHalo) {
      cardHalo.style.background = 'none'
    }
  }

  /**
   * Handles the mouse down event.
   */
  const handleMouseDown = () => {
    el.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)'
    el.style.filter = 'brightness(0.9)'
    if (cardHalo) {
      cardHalo.style.background = 'none'
    }
  }

  /**
   * Handles the mouse up event.
   */
  const handleMouseUp = () => {
    el.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)'
    el.style.filter = 'brightness(1)'
    if (cardHalo) {
      cardHalo.style.background = 'none'
    }
  }

  const events: Array<keyof HTMLElementEventMap> = ['mousemove', 'mouseover', 'mouseout', 'mousedown', 'mouseup']
  const handlers = [handleMove, handleMouseOver, handleMouseOut, handleMouseDown, handleMouseUp]

  events.forEach((event, index) => el.addEventListener(event, handlers[index] as EventListener))

  return () => {
    events.forEach((event, index) => el.removeEventListener(event, handlers[index] as EventListener))
  }
}

/**
 * Returns a box shadow style based on the theme.
 * @param theme - The theme of the application.
 * @returns The box shadow style.
 */
export const boxShadow = (theme: 'light' | 'dark') => {
  return theme === 'dark'
    ? 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.18) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.1) 0px -3px 5px'
    : 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px'
}

/**
 * Returns a horizontal fading border style based on the theme.
 * @param theme - The theme of the application.
 * @returns The horizontal fading border style.
 */
export const horizontalFadingBorder = (theme: Theme) => {
  return {
    backgroundColor: theme.palette.background?.level1,
    borderRadius: '6px',
    backgroundImage: 'unset',
    outline: 'none',
    border: 'solid 1px transparent',
    background:
      theme.palette.mode === 'light'
        ? `linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), linear-gradient(90deg, ${theme.palette.background.level1} 80%,  ${theme.palette.tableBorder} 100%)`
        : `linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), linear-gradient(90deg, ${theme.palette.background.level1} 80%, ${theme.palette.tableBorder} 100%)`,
    backgroundOrigin: 'border-box',
    backgroundClip: 'content-box, border-box',
    boxShadow: `inset 1px 100lvh 1px ${theme.palette.background.level1}`,
  }
}
