import { NetworkType } from '@/config/networks'
import { TABLE_TYPE } from '@/config/tables'
import { useTokens } from '@/data/beryx'
import useAppSettingsStore from '@/store/ui/settings'
import { Analyze } from '@carbon/pictograms-react'
import { Box } from '@mui/material'

import Table from 'components/widgets/Table'

/**
 * TokensList component.
 * Represents the table of tokens on the selected network.
 */
const TokensList = () => {
  const { network } = useAppSettingsStore((state: { network: NetworkType }) => ({ network: state.network }))

  const { data: tokens, isFetching: tokensIsFetching, isSuccess: tokensIsSuccess } = useTokens(network)

  return (
    <Box height={'100%'}>
      <Table
        rowData={tokensIsSuccess && Array.isArray(tokens.tickers) ? tokens.tickers : []}
        mode="normal"
        tableType={TABLE_TYPE.TOKENS}
        hideBorder
        loading={tokensIsFetching}
        noRowsText={`No ERC20 Tokens were found on ${network.name}`}
        noRowsIcon={<Analyze />}
        rowWatch
      />
    </Box>
  )
}

export default TokensList
