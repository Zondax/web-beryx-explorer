import { useCallback, useEffect, useState } from 'react'

import { Box, Grid, Grow, MobileStepper } from '@mui/material'

import { CalibrationTestnet, InteractUpdate } from './components'

/**
 * Banners is a stateful React component that cycles between display of two banner components.
 * A mobile stepper from the Material UI library provides a visual indicator of the active banner.
 * The banners are switched every 3.5 seconds using a timer.
 * An onClick event handler on the mobile stepper also triggers banner switch.
 */
const Banners = () => {
  /**
   * State to track the active banner via its index. Initialized to 0.
   * @type {number}
   */
  const [activeStep, setActiveStep] = useState(0)

  /**
   * An array of banner components to be displayed.
   * @type {Array<React.Component>}
   */
  const banners = [<CalibrationTestnet key="calibration" />, <InteractUpdate key="interact" />]

  /**
   * Event handler for switching active banner.
   * It increments the activeStep state variable module the banners' length
   * to ensure it remains within valid range.
   */
  const handleNext = useCallback(() => {
    setActiveStep(prevStep => (prevStep + 1) % banners.length)
  }, [banners.length])

  /**
   * Initialize or cleanup timers that control banner switch.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      handleNext()
    }, 3500)

    return () => {
      clearTimeout(timer)
    }
  }, [activeStep, handleNext])

  /**
   * Render the active banner with a mobile stepper.
   */
  return (
    <Grow in>
      <Grid
        container
        width={'100%'}
        sx={{
          margin: { xs: '0 1rem', md: 'unset' },
        }}
      >
        <Box width={'100%'}>
          {/* Display the active banner */}
          {banners[activeStep]}

          <MobileStepper
            variant="dots"
            steps={banners.length}
            position="static"
            activeStep={activeStep}
            sx={{
              background: 'transparent',
              width: '100%',
              justifyContent: 'center',
              '& .MuiMobileStepper-dots': {
                marginTop: '0.5rem',
              },
              '& .MuiMobileStepper-dot': {
                margin: '0 0.5rem',
              },
            }}
            nextButton={null} // Empty elements, because we don't want visible buttons.
            backButton={null}
            onClick={handleNext} // Or integrate your own custom handler here.
          />
        </Box>
      </Grid>
    </Grow>
  )
}

export default Banners
