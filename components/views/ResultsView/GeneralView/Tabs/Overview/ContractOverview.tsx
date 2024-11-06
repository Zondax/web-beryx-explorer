import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { amountFormat } from '@/config/config'
import { ObjectType } from '@/routes/parsing'
import { useSearchStore } from '@/store/data/search'
import { formatBalanceBasedOnValue } from '@/utils/balance'
import { newDateFormat } from '@/utils/dates'
import { formatBalance } from '@/utils/format'
import { Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material'

import TokenHoldings from 'components/common/TokenHoldings'

import { ActorTypeLabel, BeryxLink } from '../../../../../common'
import FilecoinIcon from '../../../../../common/Icons/Filecoin'
import OverviewItem from './OverviewItem'

/**
 * ContractOverview component.
 *
 * This component provides an overview of a contract.
 *
 * @returns The ContractOverview component.
 */
const ContractOverview = () => {
  const searchValue: string = useSearchStore(s => s.searchInputValue)
  const searchResultJson = useSearchStore(s => s.searchResult.json)
  const network = useSearchStore(s => s.searchInputNetwork)
  const { totalCount } = useSearchStore(s => s.searchResult.transactionsCount)

  const [balance, setBalance] = useState<string | undefined>(undefined)
  const theme = useTheme()
  const upMd = useMediaQuery(theme.breakpoints.up('md'))
  const { t } = useTranslation()

  /**
   * useEffect hook to set the balance state.
   *
   * This hook is triggered when the searchResultJson changes. If the searchResultJson has a balances property,
   * it formats the balance and sets it to the balance state.
   *
   * @returns {void}
   */
  useEffect(() => {
    if (searchResultJson?.balances) {
      const rawBalance = BigNumber(formatBalance(searchResultJson?.balances))
      setBalance(formatBalanceBasedOnValue(rawBalance))
    }
  }, [searchResultJson])

  return (
    <>
      <OverviewItem
        label={t('Address')}
        description={t('Contract address in robust format')}
        content={
          <BeryxLink
            limitCharacters={'auto'}
            disableTooltip
            inputType={ObjectType.ADDRESS}
            network={network}
            value={searchValue === searchResultJson?.short ? searchResultJson?.robust : searchValue}
            isColored
          />
        }
        icon={undefined}
      />

      {searchResultJson?.eth_address ? (
        <OverviewItem
          label={t('ETH Address')}
          description={t('Contract address in Ethereum format')}
          content={
            <BeryxLink
              limitCharacters={'auto'}
              disableTooltip
              inputType={ObjectType.ADDRESS}
              network={network}
              value={searchResultJson?.eth_address}
              isColored
            />
          }
          icon={undefined}
        />
      ) : null}

      {searchResultJson?.short ? (
        <OverviewItem
          label={t('Address ID')}
          description={t('Contract address in short format')}
          content={
            <BeryxLink
              limitCharacters={'auto'}
              disableTooltip
              inputType={ObjectType.ADDRESS}
              network={network}
              value={searchResultJson?.short}
              isColored
            />
          }
          icon={undefined}
        />
      ) : null}

      {searchResultJson?.actor_type ? (
        <OverviewItem
          label={t('Actor')}
          description={t('Actor type of the account')}
          content={<ActorTypeLabel label={searchResultJson?.actor_type ?? '-'} level={2} />}
          icon={undefined}
        />
      ) : null}

      {balance !== undefined ? (
        <OverviewItem
          label={`${t('Balance')} (FIL)`}
          content={
            <Tooltip title={formatBalance(searchResultJson?.balances)} arrow>
              <Typography variant="caption" component={'p'} color={'text.primary'} lineHeight={'100%'}>
                {balance}
              </Typography>
            </Tooltip>
          }
          icon={<FilecoinIcon size={16} />}
        />
      ) : null}

      {searchResultJson?.tokenHoldings ? (
        <OverviewItem
          label={t('Token Holdings')}
          content={<TokenHoldings tokenHoldings={searchResultJson?.tokenHoldings} />}
          icon={undefined}
        />
      ) : null}

      {searchResultJson?.created_at ? (
        <OverviewItem
          label={t('Created at')}
          content={
            <Tooltip title={`${newDateFormat(searchResultJson?.created_at, 'UTC', true)}`} arrow disableInteractive>
              <Typography variant="caption">{`${newDateFormat(searchResultJson?.created_at, undefined, false)}`}</Typography>
            </Tooltip>
          }
          icon={undefined}
        />
      ) : null}

      {searchResultJson?.creator_address ? (
        <OverviewItem
          label={t('Creator Address')}
          content={
            <BeryxLink
              limitCharacters={upMd ? 0 : undefined}
              disableTooltip
              inputType={ObjectType.ADDRESS}
              network={network}
              value={searchResultJson?.creator_address}
              isColored
            />
          }
          icon={undefined}
        />
      ) : null}

      {totalCount ? (
        <OverviewItem
          label={t('Number of Transactions')}
          description={t(
            'Represents the overall count of transactions associated with the contract. This count excludes internal messages.'
          )}
          content={BigNumber(totalCount).toFormat(0, amountFormat)}
          icon={undefined}
        />
      ) : null}
    </>
  )
}

export default ContractOverview
