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
export const hoverEffect = (
  el: HTMLDivElement,
  cardHalo: HTMLElement,
  height: number,
  width: number,
  theme: Theme,
  rotationAmount?: number,
  scaleAmount?: number,
  disableClick?: boolean,
  cardHaloIridecent?: HTMLElement
) => {
  const halfWidth = width / 2
  const halfHeight = height / 2
  let rotation = 8
  let scale = 1.05

  el.style.border = `1px solid ${theme.palette.border?.level0}`
  el.style.background = theme.palette.background.level0
  el.style.boxShadow = `0 4px 8px ${theme.palette.mode === 'dark' ? theme.palette.background.level1 : theme.palette.background.level2}`

  if (rotationAmount) {
    rotation = rotationAmount
  }
  if (scaleAmount) {
    scale = scaleAmount
  }

  function getValueFromPercentage(a: number, b: number, p: number): number {
    return a + (p / 100) * (b - a)
  }

  /**
   * Handles the mouse move event.
   * @param e - The mouse event.
   */
  const handleMove = (e: MouseEvent) => {
    const cardRect = el.getBoundingClientRect()
    const xVal = e.clientX - cardRect.left // x position within the card
    const yVal = e.clientY - cardRect.top // y position within the card

    const yRotation = rotation * ((xVal - halfWidth) / width)
    const xRotation = -rotation * ((yVal - halfHeight) / height)
    el.style.transform = `perspective(900px) scale(${scale}) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`

    if (cardHalo) {
      const xPercent = Math.round((xVal / width) * 100)
      const yPercent = Math.round((yVal / height) * 100)

      el.style.background = 'transparent'
      el.style.backgroundImage = `linear-gradient(90deg, ${theme.palette.background.level0}, ${theme.palette.background.level0}), radial-gradient(circle at ${100 - xPercent}% ${100 - yPercent}%, ${theme.palette.border?.level2} 0%, ${theme.palette.border?.level0}${theme.palette.mode === 'dark' ? '33' : 'AA'} 80%)`
      el.style.backgroundClip = 'padding-box, border-box'
      el.style.backgroundOrigin = 'border-box'
      el.style.border = '1px solid transparent'
      el.style.borderRadius = '16px'

      const dynamicBoxShadow =
        theme.palette.mode === 'dark'
          ? `rgba(0, 0, 0, 0.25) ${getValueFromPercentage(-24, 44, 100 - xPercent)}px ${getValueFromPercentage(-24, 44, 100 - yPercent)}px 55px, rgba(0, 0, 0, 0.12) ${getValueFromPercentage(-12, 12, 100 - xPercent)}px ${getValueFromPercentage(-12, 12, 100 - yPercent)}px 30px, rgba(0, 0, 0, 0.18) ${getValueFromPercentage(-6, 6, 100 - xPercent)}px ${getValueFromPercentage(-6, 6, 100 - yPercent)}px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.1) 0px -3px 5px`
          : `rgba(23, 25, 30, 0.03) ${getValueFromPercentage(-4, 24, 100 - xPercent)}px ${getValueFromPercentage(-4, 24, 100 - yPercent)}px 55px, rgba(23, 21, 28, 0.03) ${getValueFromPercentage(-15, 18, 100 - xPercent)}px ${getValueFromPercentage(-15, 18, 100 - yPercent)}px 18px 0px, rgba(17, 12, 15, 0.01) ${getValueFromPercentage(-4, 4, 100 - xPercent)}px ${getValueFromPercentage(-4, 4, 100 - yPercent)}px 6px, rgba(5, 12, 56, 0.01) 0px 12px 13px, rgba(10, 12, 56, 0.01) 0px -3px 5px`
      el.style.boxShadow = dynamicBoxShadow

      cardHalo.style.background =
        theme.palette.mode === 'light'
          ? `radial-gradient(circle at ${100 - xPercent}% ${100 - yPercent}%, rgba(255,255,255,0.15) 10%, rgba(0,0,15,0.02) 120%)`
          : `radial-gradient(circle at ${100 - xPercent}% ${100 - yPercent}%, rgba(220,220,235,0.04) 15%, rgba(0,0,0,0.2) 150%)`

      if (cardHaloIridecent) {
        cardHaloIridecent.style.background =
          theme.palette.mode === 'dark'
            ? `radial-gradient(
              circle at ${100 - xPercent}% ${100 - yPercent}%, 
              rgba(255, 154, 158, 0.4) 0%,
              rgba(250, 208, 196, 0.4) 4%, 
              rgba(255, 239, 186, 0.4) 8%, 
              rgba(212, 231, 233, 0.7) 12%, 
              rgba(187, 233, 255, 0.4) 16%, 
              rgba(180, 192, 255, 0.4) 20%, 
              rgba(210, 145, 255, 0.4) 24%, 
              rgba(255, 154, 158, 0.7) 28%, 
              rgba(250, 208, 196, 0.4) 32%,
              
              rgba(255, 154, 158, 0.4) 34%,
              rgba(250, 208, 196, 0.7) 36%, 
              rgba(255, 239, 186, 0.4) 38%, 
            
              rgba(255,255,255,0) 55%,
              rgba(255,255,255,0) 100%)`
            : `linear-gradient(
              ${(xPercent + yPercent) / 200}turn,
              rgba(255, 0, 0, 0.015) 0%, 
              rgba(255, 154, 0, 0.015) 10%, 
              rgba(208, 222, 33, 0.015) 20%, 
              rgba(79, 220, 74, 0.015) 30%, 
              rgba(63, 218, 216, 0.015) 40%, 
              rgba(47, 201, 226, 0.015) 50%, 
              rgba(28, 127, 238, 0.015) 60%, 
              rgba(95, 21, 242, 0.015) 70%, 
              rgba(186, 12, 248, 0.015) 80%, 
              rgba(251, 7, 217, 0.015) 90%, 
              rgba(255, 0, 0, 0.015) 100%)`

        cardHaloIridecent.style.mixBlendMode = theme.palette.mode === 'dark' ? 'darken' : 'multiply'
      }
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
    el.style.border = `1px solid ${theme.palette.border?.level0}`
    el.style.background = theme.palette.background.level0
    el.style.boxShadow = `0 4px 8px ${theme.palette.mode === 'dark' ? theme.palette.background.level1 : theme.palette.background.level2}`

    if (cardHalo) {
      cardHalo.style.background = 'none'
    }
    if (cardHaloIridecent) {
      cardHaloIridecent.style.background = 'none'
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
    if (cardHaloIridecent) {
      cardHaloIridecent.style.background = 'none'
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
    if (cardHaloIridecent) {
      cardHaloIridecent.style.background = 'none'
    }
  }

  const events: Array<keyof HTMLElementEventMap> = ['mousemove', 'mouseover', 'mouseout']
  const handlers = [handleMove, handleMouseOver, handleMouseOut]

  if (!disableClick) {
    events.push('mousedown', 'mouseup')
    handlers.push(handleMouseDown, handleMouseUp)
  }

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
    : 'rgba(17, 12, 46, 0.08) 0px 8px 18px 0px'
}

/**
 * Returns a horizontal fading border style based on the theme.
 * @param theme - The theme of the application.
 * @returns The horizontal fading border style.
 */
export const horizontalFadingBorder = (theme: Theme, direction?: 'left' | 'right') => {
  return {
    backgroundColor: theme.palette.background?.level1,
    borderRadius: '12px',
    backgroundImage: 'unset',
    outline: 'none',
    border: 'solid 1px transparent',
    background:
      theme.palette.mode === 'light'
        ? `linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), linear-gradient(to ${direction ?? 'right'}, ${theme.palette.background.level1} 80%,  ${theme.palette.border?.level1} 100%)`
        : `linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), linear-gradient(to ${direction ?? 'right'}, ${theme.palette.background.level1} 80%, ${theme.palette.border?.level1} 100%)`,
    backgroundOrigin: 'border-box',
    backgroundClip: 'content-box, border-box',
    boxShadow: `inset 1px 100lvh 1px ${theme.palette.background.level1}`,
  }
}
