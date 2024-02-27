import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { useContractsStore } from '@/store/ui/contracts'
import { downloadSourceCode } from '@/utils/download'
import { Box, Button, Grid, Grow, useTheme } from '@mui/material'

import { VerificationContent } from '../../../../views/ResultsView/VerificationBadgeContent'
import { StatusResponseProps } from '../../config'
import { getStyleSecondaryButton } from '../../utils'
import { VerificationFailed } from './VerificationFailed'

/**
 * The ResultsView component displays the results of...
 *
 * @param props - The properties that define the ResultsView component.
 * @param [props.response=undefined] - ...
 * @param props.cleanForm - ...
 * @returns The JSX Code for the ResultsView component
 */
const ResultsView = ({ response, cleanForm }: { response: StatusResponseProps | undefined; cleanForm: () => void }) => {
  const router = useRouter()
  const theme = useTheme()
  const { t } = useTranslation()

  const handleForm = useContractsStore(state => state.handleForm)
  const sourceCode = useContractsStore(state => state.contractCode.sourceCode)

  /**
   * Close the popup and reload the page
   */
  const closePopup = useCallback(() => {
    cleanForm()
    handleForm(false)
    router.reload()
  }, [cleanForm, handleForm, router])

  /**
   * Download the source code from IPFS
   */
  const getIpfs = useCallback(async () => {
    await downloadSourceCode(sourceCode, 'SourceCode')
  }, [sourceCode])

  return (
    <Box
      height={response?.error?.isError || !response?.data?.constructorParams ? '25rem' : '40rem'}
      position={'relative'}
      display={'flex'}
      alignItems={'center'}
    >
      <Grow in={response?.error?.isError}>
        <Box position={'absolute'} width={'100%'}>
          <VerificationFailed error={response?.error?.description} />
          <Grid container justifyContent={'center'} mt={'2rem'}>
            <Button onClick={cleanForm} size="medium" color="primary" variant="text" sx={getStyleSecondaryButton(theme)}>
              {t('Try again')}
            </Button>
          </Grid>
        </Box>
      </Grow>

      <Grow in={response?.data !== undefined}>
        <Box position={'absolute'} width={'100%'}>
          <VerificationContent verifiedData={response?.data} />

          <Grid container gap={'0.5rem'} m={'2rem 0'} justifyContent={'center'}>
            <Button onClick={getIpfs} color="primary" variant="text" sx={getStyleSecondaryButton(theme)}>
              {t('Download IPFS')}
            </Button>
            <Button onClick={closePopup} color="primary" variant="text" sx={getStyleSecondaryButton(theme)}>
              {t('Done')}
            </Button>
          </Grid>
        </Box>
      </Grow>
    </Box>
  )
}

/**
 * @exports Component
 */
export default ResultsView
