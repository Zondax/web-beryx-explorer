// Importing necessary libraries and components
import { useTranslation } from 'react-i18next'

import { MisuseOutline } from '@carbon/icons-react'
import { Button, Grid, Typography, useTheme } from '@mui/material'

/**
 * Component to display an error message when a faucet error occurs
 * @param props - Component properties
 * @param props.faucetError - The faucet error message
 * @param props.resetSteps - Function to reset steps when error occurs
 * @return React node to render to DOM
 */
const FaucetErrorContent = ({ faucetError, resetSteps }: { faucetError?: string; resetSteps: () => void }) => {
  // Extract theme from context to handle styling
  const theme = useTheme()

  // Extract translation function from useTranslation hook
  const { t } = useTranslation()

  return (
    <>
      <Grid item container xs={12} justifyContent={'center'}>
        <MisuseOutline size="32" style={{ color: theme.palette.error.main, marginBottom: '1rem' }} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" textAlign={'center'}>
          {faucetError}
        </Typography>
      </Grid>
      <Grid item mt={4} xs={12}>
        <Button
          onClick={resetSteps}
          variant="contained"
          size="large"
          fullWidth
          sx={{
            height: 'fit-content',
            padding: '0.5rem 1rem',
            minWidth: '12rem',
          }}
        >
          <Typography variant="body1" fontFamily={'Sora'} fontWeight={500} sx={{ color: '#E2E4EC' }}>
            {t('Try again')}
          </Typography>
        </Button>
      </Grid>
    </>
  )
}

// Export the component as default
export default FaucetErrorContent
