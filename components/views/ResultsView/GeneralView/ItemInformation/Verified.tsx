import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { Networks } from '@/config/networks'
import { useContractIPFS, useContractVerified } from '@/data/beryx'
import { useSearchStore } from '@/store/data/search'
import { useContractsStore } from '@/store/ui/contracts'
import { FileSystemObject } from '@/utils/serialize'
import { Checkmark, WarningAlt } from '@carbon/icons-react'
import { Unstable_Grid2 as Grid, Typography, alpha, useTheme } from '@mui/material'

/**
 * Verified Component
 * @description Functional React component that uses hooks to handle data fetching and state.
 * @returns a JSX.Element if the verification data has been successfully fetched and is available (true), else returns an empty fragment.
 */
const Verified = () => {
  const theme = useTheme()
  const { t } = useTranslation()

  const searchValue = useSearchStore(s => s.searchInputValue)
  const network = useSearchStore(s => s.searchInputNetwork)

  const setSourceCode = useContractsStore.getState().setSourceCode

  const { data: verificationData } = useContractVerified(network ?? Networks.mainnet, searchValue)
  const {
    data: ipfsData,
    isSuccess: ipfsDataIsSuccess,
    isFetching: ipfsDataIsFetching,
  } = useContractIPFS(network ?? Networks.mainnet, verificationData?.sourceCID)

  /**
   * useEffect hook to set source code if IPFS code fetch is successful
   */
  useEffect(() => {
    if (ipfsDataIsSuccess && ipfsData) {
      const files = ipfsData?.files

      if (!files) {
        return
      }

      const code: Record<string, FileSystemObject> = { 'Source Code': { type: 'folder', children: JSON.parse(files) } }
      setSourceCode(code)
    }
  }, [setSourceCode, ipfsData, ipfsDataIsSuccess, ipfsDataIsFetching])

  if (!verificationData) {
    return (
      <Grid
        container
        alignItems={'center'}
        sx={{
          gap: '0.25rem',
          padding: '3px 6px 3px 5px',
          borderRadius: '4px',
          background: alpha(theme.palette.warning.light, theme.palette.mode === 'dark' ? 0.35 : 0.75),
        }}
      >
        <WarningAlt style={{ color: theme.palette.warning.main }} />
        <Typography variant="subtitle2" color={theme.palette.warning.main} fontWeight={600}>
          {t('Not Verified')}
        </Typography>
      </Grid>
    )
  }

  // render tooltip with success icon upon successful verification
  return (
    <Grid
      container
      alignItems={'center'}
      sx={{
        gap: '0.25rem',
        padding: '3px 6px 3px 5px',
        borderRadius: '4px',
        background: alpha(theme.palette.success.light, theme.palette.mode === 'dark' ? 0.35 : 0.75),
      }}
    >
      <Checkmark style={{ color: theme.palette.success.main }} />
      <Typography variant="subtitle2" color={theme.palette.success.main} fontWeight={600}>
        {t('Source Code Verified')}
      </Typography>
    </Grid>
  )
}

export default Verified
