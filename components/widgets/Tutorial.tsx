/**
 * Use this module to implement a tutorial popup with steps.
 * This module uses the next/image for images, @carbon/icons-react for icons,
 * and @mui/material for styled components.
 * Tutorial dynamically shows the steps defined in the "steps" prop
 */
import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { themePath } from '@/theme/utils'
import { Close } from '@carbon/icons-react'
import { Box, Button, Unstable_Grid2 as Grid2, IconButton, MobileStepper, Tooltip, Typography, useTheme } from '@mui/material'

/**
 *Interface for steps data of tutorial
 *
 *@property image - Source of the image to be used in every step
 *@property title - Title text for step
 *@property {React.ReactNode} description - Description component for step
 *
 */
export interface StepsInterface {
  image: string
  title: string
  description: React.ReactNode
}

/**
 * `Tutorial` is a React component that displays a tutorial with steps.
 *
 * @param props - The properties that define the `Tutorial` component.
 * @param props.steps - An array of objects that define the steps of the tutorial.
 * @param props.handleCloseTutorial - A function that handles the closing of the tutorial.
 *
 * @returns A React node that represents the tutorial.
 */
const Tutorial = ({ steps, handleCloseTutorial }: { steps: StepsInterface[]; handleCloseTutorial: () => void }) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const [activeStep, setActiveStep] = useState<number>(0)

  /**
   * `handleNext` is a function that increments the active step.
   * It sets the active step to the next step in the tutorial.
   */
  const handleNext = useCallback(() => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }, [])

  /**
   * `handleBack` is a function that decrements the active step.
   * It sets the active step to the previous step in the tutorial.
   */
  const handleBack = useCallback(() => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }, [])

  return (
    <Grid2
      container
      bgcolor="background.level1"
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '460px',
        border: `1px solid ${theme.palette.background.level2}`,
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.24), 0px 1px 3px rgba(0, 0, 0, 0.12)',
        borderRadius: theme.spacing(1),
        filter: `drop-shadow(${theme.palette.mode === 'light' ? theme.shadows[2] : theme.shadows[3]})`,
      }}
    >
      <Grid2
        container
        width={'100%'}
        height={'200px'}
        bgcolor="background.level2"
        sx={{
          position: 'relative',
          borderRadius: `${theme.spacing(1)} ${theme.spacing(1)} 0 0`,
        }}
        alignItems="flex-start"
        justifyContent="center"
      >
        <Box
          display={'flex'}
          justifyContent={'flex-end'}
          width={'100%'}
          sx={{
            position: 'relative',
            zIndex: 150,
          }}
        >
          <Tooltip title={t('Close')} placement="bottom" key={'close popup'}>
            <IconButton color="info" sx={{ width: '2.5rem', padding: '0.25rem', borderRadius: '8px' }} onClick={handleCloseTutorial}>
              <Close size={24} />
            </IconButton>
          </Tooltip>
        </Box>
        <Box display={'flex'} sx={{ width: '100%', height: '100%', position: 'absolute', justifySelf: 'center', alignItems: 'center' }}>
          <Image
            src={themePath(steps[activeStep].image)}
            alt="interact example"
            quality={100}
            fill
            sizes={'100vh'}
            style={{
              maxWidth: '100%',
            }}
          />
        </Box>
      </Grid2>
      <Grid2
        container
        flexDirection={'column'}
        justifyContent={'space-between'}
        height={'300px'}
        sx={{
          margin: '3rem',
        }}
      >
        <Box display={'flex'} flexDirection={'column'}>
          <Typography variant="h4" sx={{ marginBottom: '1rem', fontWeight: 700 }}>
            {steps[activeStep].title}
          </Typography>
          {steps[activeStep].description}
        </Box>
        <Box display={'flex'} alignItems={'flex-end'}>
          <MobileStepper
            variant="dots"
            steps={steps.length}
            position="static"
            activeStep={activeStep}
            sx={{
              flexGrow: 1,
              backgroundColor: 'transparent',
              boxShadow: 'none',
              padding: 0,
              '.MuiMobileStepper-dots': { gap: '0.5rem' },
              '.MuiMobileStepper-dotActive': { backgroundColor: theme.palette.text.primary },
            }}
            nextButton={
              <Box display={'flex'} gap={'0.5rem'}>
                {activeStep !== 0 && (
                  <Button size="large" onClick={handleBack}>
                    {t('Previous')}
                  </Button>
                )}
                {activeStep !== steps.length - 1 ? (
                  <Button
                    onClick={handleNext}
                    variant="contained"
                    size="large"
                    sx={{
                      padding: { xs: '6px 32px !important', sm: '6px 16px !important' },
                    }}
                  >
                    {t('Next')}
                  </Button>
                ) : (
                  <Button
                    onClick={handleCloseTutorial}
                    variant="contained"
                    size="large"
                    color="inherit"
                    sx={{
                      padding: { xs: '6px 32px !important', sm: '6px 14px !important' },
                    }}
                  >
                    {t('Close tutorial')}
                  </Button>
                )}
              </Box>
            }
            backButton={null}
          />
        </Box>
      </Grid2>
    </Grid2>
  )
}

export default Tutorial
