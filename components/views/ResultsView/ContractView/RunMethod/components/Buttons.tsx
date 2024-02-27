import { FormikProps } from 'formik'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { useContractsStore } from '@/store/ui/contracts'
import useWalletStore, { WalletProvider } from '@/store/wallets/wallet'
import { PlayFilledAlt, Wallet } from '@carbon/icons-react'
import { Button, CircularProgress, Unstable_Grid2 as Grid, Tooltip, useTheme } from '@mui/material'

import { RunMethodFormValues } from '../config'

interface ButtonProps {
  formik: FormikProps<RunMethodFormValues>
  handleOpenTutorial: () => void
  helper?: string
}

const Buttons = ({ formik, handleOpenTutorial, helper }: ButtonProps) => {
  // Global
  const theme = useTheme()
  const { t } = useTranslation()

  const { isConnected, setOpenWallet, provider } = useWalletStore(s => s)
  const formInputs = useContractsStore(s => s.form.inputs)

  /**
   * This function is responsible for showing the wallet connect option.
   * It sets the state of the wallet to open.
   */
  const handleConnectWallet = useCallback(() => {
    setOpenWallet(true)
  }, [setOpenWallet])

  return (
    <Grid container alignItems={'center'} gap={'0.5rem'} justifyContent={'flex-end'} width={'100%'} sx={{ padding: '0.5rem 1.25rem' }}>
      <Button
        id="run-method"
        variant="text"
        onClick={handleOpenTutorial}
        sx={{
          padding: '0.76rem 0.9rem 0.76rem 0.9rem',
          '&.MuiButton-endIcon': {
            paddingLeft: '0.5rem',
          },

          '&.Mui-disabled .MuiButton-endIcon svg': {
            color: 'unset',
          },
        }}
      >
        {t('Read Tutorial')}
      </Button>
      {isConnected && provider !== WalletProvider.VIEW_ONLY ? (
        <Tooltip
          title={helper}
          sx={{ maxWidth: '60xh' }}
          disableHoverListener={Object.keys(formik.errors).length === 0}
          arrow
          disableInteractive
        >
          <span style={{ cursor: Object.keys(formik.errors).length !== 0 ? 'help' : undefined }}>
            <Button
              id="run-method"
              variant="contained"
              disabled={
                Object.keys(formik.errors).length !== 0 || (formInputs?.completed !== formInputs?.total && !formik.values.requestBodyString)
              }
              type="submit"
              endIcon={!formik.isSubmitting ? <PlayFilledAlt size={16} color={theme.palette.success.main} /> : null}
              sx={{
                minWidth: '10.25rem',
                padding: '0.76rem 0.9rem 0.76rem 0.9rem',
                '&.MuiButton-endIcon': {
                  paddingLeft: '0.5rem',
                },
                '&.Mui-disabled .MuiButton-endIcon svg': {
                  color: 'unset',
                },
              }}
            >
              {formik.isSubmitting ? (
                <CircularProgress variant="indeterminate" thickness={8} color="inherit" size="small" />
              ) : (
                t('Run Method')
              )}
            </Button>
          </span>
        </Tooltip>
      ) : (
        <Tooltip
          title={t(
            "You're using the tracking feature and while tracking an address you can't invoke contracts. To interact with contracts please connect a wallet."
          )}
          sx={{ maxWidth: '60xh' }}
          disableHoverListener={!isConnected}
          arrow
          disableInteractive
        >
          <span style={{ cursor: !isConnected ? 'help' : undefined }}>
            <Button
              id="connect-wallet-metamask-faucet"
              onClick={handleConnectWallet}
              variant={'contained'}
              startIcon={<Wallet size={20} />}
              sx={{
                textTransform: 'capitalize',
                padding: '0.76rem 0.9rem 0.76rem 0.9rem',
              }}
            >
              {t('Connect Wallet to Run')}
            </Button>
          </span>
        </Tooltip>
      )}
    </Grid>
  )
}

export default Buttons
