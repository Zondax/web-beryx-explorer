import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Networks } from '@/config/networks'
import { useContractVerified } from '@/data/beryx'
import { useSearchStore } from '@/store/data/search'
import { useContractsStore } from '@/store/ui/contracts'
import { downloadSourceCode } from '@/utils/download'
import { Download } from '@carbon/icons-react'
import { Backdrop, Button, Unstable_Grid2 as Grid, Modal, Tooltip, useMediaQuery, useTheme } from '@mui/material'

import ContractVerifier from 'components/common/ContractVerifier'

import VerifyContractIcon from '../../../../common/Icons/VerifyContractIcon'

/**
 * @function ContractActions
 * @description This component provides actions related to a contract such as downloading the source code and verifying the contract.
 * @returns Rendered component
 */
const ContractActions = () => {
  const theme = useTheme()
  const { t } = useTranslation()

  const searchValue = useSearchStore(s => s.searchInputValue)
  const searchNetwork = useSearchStore(s => s.searchInputNetwork)

  const { data: verificationData } = useContractVerified(searchNetwork ?? Networks.mainnet, searchValue)

  const handleForm = useContractsStore.getState().handleForm
  const {
    form,
    contractCode: { sourceCode },
  } = useContractsStore()

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  /**
   * @function openVerifyContract
   * @description Opens the contract verification form
   */
  const openVerifyContract = useCallback(
    function () {
      if (!form.isOpen) {
        handleForm(true)
      }
    },
    [handleForm, form.isOpen]
  )

  /**
   * @function closeVerifyContract
   * @description Closes the contract verification form
   */
  const closeVerifyContract = useCallback(
    function () {
      if (form.isOpen) {
        handleForm(false)
      }
    },
    [handleForm, form.isOpen]
  )

  /**
   * @function getIpfs
   * @description Downloads the source code of the contract
   */
  const getIpfs = useCallback(
    async function () {
      await downloadSourceCode(sourceCode, 'SourceCode')
    },
    [sourceCode]
  )

  const shouldShowDownloadCodeTooltip = Boolean(verificationData?.sourceCID)

  return (
    <Grid container alignSelf={'flex-start'} alignItems={'center'} justifyContent="flex-start" gap={1}>
      <Tooltip
        title={
          verificationData
            ? t('Source code not available')
            : t('In order to visualize or download the source code, the contract needs to be verified.')
        }
        placement={'bottom-start'}
        disableHoverListener={shouldShowDownloadCodeTooltip}
        arrow
        disableInteractive
      >
        <span>
          <Button
            id={'upload-ipfs'}
            onClick={getIpfs}
            variant="inputType"
            size="medium"
            disabled={!shouldShowDownloadCodeTooltip}
            startIcon={<Download />}
            sx={{
              textTransform: 'capitalize',
              padding: '0.76rem 0.9rem 0.76rem 0.9rem',
            }}
          >
            {t('Download Code')}
          </Button>
        </span>
      </Tooltip>
      <Button
        id={'open-verify-contract'}
        onClick={openVerifyContract}
        variant={'contained'}
        size="medium"
        disabled={!isDesktop}
        startIcon={<VerifyContractIcon size={22} />}
        sx={{
          textTransform: 'capitalize',
          padding: '0.75rem 0.9rem 0.75rem 0.9rem',
          '.MuiButton-startIcon': {
            paddingRight: '0.5rem',
          },
        }}
      >
        {t('Verify contract')}
      </Button>
      <Modal
        open={form.isOpen}
        onClose={closeVerifyContract}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Grid
          container
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 'min-content',
            maxHeight: '85vh',
            overflowY: 'hidden',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <ContractVerifier address={searchValue} />
        </Grid>
      </Modal>
    </Grid>
  )
}

export default ContractActions
