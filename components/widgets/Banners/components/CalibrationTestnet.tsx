/**
 * @module CalibrationTestnet
 */
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Networks } from '@/config/networks'
import { useAppSettingsStore } from '@/store/ui/settings'
import { Button, Unstable_Grid2 as Grid } from '@mui/material'

import BannerTile from './BannerTile'

/**
 * @function CalibrationTestnet
 * @description A component that displays the Calibration Testnet banner on the home page.
 * @returns A JSX element representing the Calibration Testnet banner.
 */
const CalibrationTestnet = () => {
  const { network, setNetwork } = useAppSettingsStore(state => ({
    network: state.network,
    setNetwork: state.setNetwork,
  }))
  const { t } = useTranslation()

  /**
   * @function handleCalibration
   * @description A function that dispatches an action to set the network to 'calibration'.
   */
  const handleCalibration = useCallback(() => {
    setNetwork(Networks.calibration)
  }, [setNetwork])

  return (
    <BannerTile
      id={'calibration-tesnet'}
      title={'Calibration testnet is now supported in Beryx'}
      description={[
        'At the end of May 2023, Filecoin Hyperspace testnet was discontinued permanently in favor of Calibration testnet.',
        'More info about Calibration testnet can be found in the Filecoin Docs.',
      ]}
      buttons={
        <Grid container justifyContent="flex-start" gap={2}>
          {network.name !== 'calibration' ? (
            <Button variant={'contained'} size="medium" onClick={handleCalibration}>
              {t('Switch network')}
            </Button>
          ) : null}

          <Button
            href="https://docs.filecoin.io/networks/calibration/details/"
            target="_blank"
            variant={network.name === 'calibration' ? 'contained' : 'outlined'}
            size="medium"
          >
            {t('Learn more')}
          </Button>
        </Grid>
      }
      image={'calibration.svg'}
      flag={'news'}
    />
  )
}

export default CalibrationTestnet
