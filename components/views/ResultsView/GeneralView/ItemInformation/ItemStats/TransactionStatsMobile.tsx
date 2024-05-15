import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { chainDecimals } from '@/config/config'
import { ObjectType } from '@/routes/parsing'
import { useSearchStore } from '@/store/data/search'
import { cellAmount } from '@/utils/conversion'
import { GasStationFilled } from '@carbon/icons-react'
import { Box, Divider, Unstable_Grid2 as Grid, useTheme } from '@mui/material'
import { Transaction } from '@zondax/beryx/dist/filecoin/api/types'

import BeryxLink from '../../../../../common/BeryxLink'
import FilecoinIcon from '../../../../../common/Icons/Filecoin'
import FromToMobile from '../FromToMobile'
import ItemInfoBig from '../ItemInfoBig'

// Define a functional component TransactionStatsMobile
const TransactionStatsMobile = () => {
  // Use hooks to get theme and translations
  const theme = useTheme()
  const { t } = useTranslation()

  // Get state values from redux store using selectors
  const searchResultJson = useSearchStore(s => s.searchResult.json)
  const searchResultTxs = useSearchStore(s => s.searchResult.transactions)
  const searchValue = useSearchStore(s => s.searchInputValue)

  // Use state to store feeTx and addressShortRobust
  const [feeTx, setFeeTx] = useState<Transaction | undefined>(undefined)
  const [_addressShortRobust, setAddressShortRobust] = useState<{ name: string; address: string } | undefined>(undefined)

  // Use effect hook to set the value of feeTx when searchResultTxs changes
  useEffect(() => {
    const feeTx = searchResultTxs?.find((element: { tx_type: string; level: number }) => element.tx_type === 'Fee' && element.level === 0)
    setFeeTx(feeTx)
  }, [searchResultTxs])

  // Use effect hook to set the value of addressShortRobust when searchResultJson or searchValue changes
  useEffect(() => {
    if (!searchResultJson) {
      return
    }

    if (searchValue === searchResultJson.short) {
      setAddressShortRobust({ name: 'Robust Address', address: searchResultJson.robust })
    } else if (searchValue === searchResultJson.robust) {
      setAddressShortRobust({ name: 'Short Address', address: searchResultJson.short })
    }
  }, [searchResultJson, searchValue])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        border: `1px solid ${theme.palette.border?.level0}`,
        borderRadius: '6px',
      }}
    >
      <Grid
        container
        alignItems={'center'}
        justifyContent={'center'}
        sx={{
          borderBottom: `1px solid ${theme.palette.border?.level0}`,
          padding: '0.5rem 0.5rem',
        }}
      >
        <FromToMobile
          from={<BeryxLink inputType={ObjectType.TXS} value={searchResultJson?.tx_from} isColored={false} />}
          to={<BeryxLink inputType={ObjectType.TXS} value={searchResultJson?.tx_to} isColored={false} />}
        />
      </Grid>
      <Grid
        container
        alignItems={'center'}
        justifyContent={'center'}
        sx={{
          padding: '1rem 0.5rem',
        }}
      >
        <Box width={'fit-content'} sx={{ display: 'flex', gap: '1rem' }}>
          <ItemInfoBig
            label={`${t('Amount')} (FIL)`}
            content={
              searchResultJson
                ? cellAmount(BigNumber(searchResultJson?.amount).div(Math.pow(10, chainDecimals.filecoin)).toFixed())
                : undefined
            }
            icon={<FilecoinIcon size={16} />}
            clipFractionalPart
          />
          <Divider orientation="vertical" variant="middle" flexItem />
          <ItemInfoBig
            label={`${t('Gas Used')} (attoFIL)`}
            content={searchResultJson?.gas_used.toString()}
            icon={<GasStationFilled width={16} height={16} color={theme.palette.error.main} />}
          />
          {feeTx ? (
            <>
              <Divider orientation="vertical" variant="middle" flexItem />
              <ItemInfoBig
                label={'Fee (FIL)'}
                content={cellAmount(BigNumber(feeTx.amount).div(Math.pow(10, chainDecimals.filecoin)).toFixed())}
                icon={<FilecoinIcon size={16} />}
                clipFractionalPart
              />
            </>
          ) : null}
        </Box>
      </Grid>
    </Box>
  )
}

export default TransactionStatsMobile
