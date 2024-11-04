import BigNumber from 'bignumber.js'
import Link from 'next/link'

import { TokenHolding } from '@/api-client/beryx.types'
import { ObjectType } from '@/routes/parsing'
import { useSearchStore } from '@/store/data/search'
import { formatBalanceBasedOnValue } from '@/utils/balance'
import { formatOneBalance } from '@/utils/format'
import { Box, Tooltip, Typography, useTheme } from '@mui/material'

import FilecoinIcon from './Icons/Filecoin'

interface TokenHoldingsProps {
  /** Array of token holdings */
  tokenHoldings: TokenHolding[]
}

/**
 * `TokenHoldings` component displays a list of token holdings with formatted balances
 * and tooltips showing detailed balance information. It uses Material-UI for styling.
 *
 * @component
 * @param {TokenHolding[]} tokenHoldings - Array of token holdings to display
 * @example
 * const tokenHoldings = [
 *   { contract_address: '0x...', balance: '1000000000000000000', decimals: 18, ticker: 'ETH' },
 * ]
 * return <TokenHoldings tokenHoldings={tokenHoldings} />
 */
const TokenHoldings: React.FC<TokenHoldingsProps> = ({ tokenHoldings }) => {
  const theme = useTheme()
  const network = useSearchStore(s => s.searchInputNetwork)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {tokenHoldings.map((holding: TokenHolding) => {
        return (
          <Box display="flex" alignItems="center" key={`balances-for-${holding.contract_address}`}>
            <Tooltip title={formatOneBalance(holding.balance, holding.decimals)} arrow>
              <Box display="flex" alignItems="center">
                <FilecoinIcon size={16} color1={theme.palette.border.level0} color2={theme.palette.text.tertiary} />
                <Typography variant="caption" component={'p'} color={'text.primary'} lineHeight={'100%'} ml={'0.5rem'}>
                  {formatBalanceBasedOnValue(BigNumber(formatOneBalance(holding.balance, holding.decimals)))}{' '}
                </Typography>
              </Box>
            </Tooltip>
            <Typography variant="caption" component={'p'} color={'text.primary'} lineHeight={'100%'} ml={'0.5rem'}>
              <Box component={'span'} sx={{ color: 'text.secondary' }}>
                <Link href={`/fil/${network?.name}/${ObjectType.ADDRESS}/${holding.contract_address}`}>({holding.ticker})</Link>
              </Box>
            </Typography>
          </Box>
        )
      })}
    </Box>
  )
}

export default TokenHoldings
