/**
 * The `Tutorial` component displays a vertical stepper with instructions and options
 * on how to verify a contract. Tutorial accepts an object array, where each object contains
 * a label, description and an options array. Steps are displayed one on top of the other,
 * with options being nested within the step they belong to.
 *
 * @param steps - The steps to be displayed in the tutorial.
 * Each step object should contain:
 * - label: The title of the step, which will be displayed in the stepper.
 * - description: A description of the step.
 * - options: An optional array containing an object with a label and a description
 * property for each option belonging to the step.
 *
 * Dependencies:
 * React Hook - `useTranslation` (from react-i18next)
 * Material UI components - `Box`, `Grid`, `Step`, `StepContent`, `StepLabel`, `Stepper`, `Typography`, `useTheme`
 */
import { useTranslation } from 'react-i18next'

import { Box, Grid, Step, StepContent, StepLabel, Stepper, Typography, useTheme } from '@mui/material'

import CodeBlock from '../../../widgets/CodeBlock'
import { StepsParams, minimalMetadata } from '../config'

/**
 * `Tutorial` is a functional component that displays a vertical stepper with instructions and options
 * on how to verify a contract. It accepts an object array as a prop, where each object contains
 * a label, description and an options array. Steps are displayed one on top of the other,
 * with options being nested within the step they belong to.
 *
 * @param steps - The steps to be displayed in the tutorial.
 * Each step object should contain:
 * - label: The title of the step, which will be displayed in the stepper.
 * - description: A description of the step.
 * - options: An optional array containing an object with a label and a description
 * property for each option belonging to the step.
 *
 * @returns A JSX element that represents the tutorial.
 */
export const Tutorial = ({ steps }: { steps: StepsParams[] }) => {
  const theme = useTheme()
  const { t } = useTranslation()
  return (
    <Grid container flexDirection={'column'} gap={'1rem'} sx={{ padding: { xs: '2.25rem 2rem', sm: '2.25rem 4rem 2.25rem 4.5rem' } }}>
      <Grid container flexDirection={'column'} width={'100%'} justifyContent={'center'} textAlign={'center'}>
        <Typography variant="h3">{t('How to use')}</Typography>
      </Grid>
      <Box sx={{ maxWidth: 400 }} mb={'2rem'}>
        <Typography variant="body1" mb={1} textAlign={'start'}>
          {t(
            "Verifying a contract means that we'll check for you if the source code provided is matching the bytecode from the blockchain."
          )}
        </Typography>
        <Typography variant="body1" mb={1} textAlign={'start'}>
          {t('Steps to verify a contract:')}
        </Typography>
        <Stepper orientation="vertical">
          {steps.map(step => (
            <Step key={`${step.label}`} active>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                <Typography sx={{ '#bold': { color: theme.palette.text.primary } }}>{step.description}</Typography>
                {step?.options?.map(({ label, description }) => (
                  <Grid container flexDirection={'column'} m={'1rem 0 0 2rem'} gap={'0.5rem'} key={`${label}-${description}`}>
                    <Typography bgcolor="background.level2" sx={{ width: 'max-content', padding: '0px 8px', borderRadius: '8px' }}>
                      {label}
                    </Typography>
                    <Typography ml={'2rem'}>{description}</Typography>
                  </Grid>
                ))}
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Box sx={{ maxWidth: 400 }}>
        <Typography variant="body1" mb={1} textAlign={'start'}>
          {t('Example of metadata file with minimal requirements.')}
        </Typography>
        <CodeBlock readOnly content={minimalMetadata} height={'20rem'} />
      </Box>
    </Grid>
  )
}
