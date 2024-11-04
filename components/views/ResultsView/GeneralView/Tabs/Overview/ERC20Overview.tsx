import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { amountFormat } from '@/config/config'
import { ObjectType } from '@/routes/parsing'
import { useSearchStore } from '@/store/data/search'
import { newDateFormat } from '@/utils/dates'
import { formatBalance, formatOneBalance } from '@/utils/format'
import { Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material'

import TokenHoldings from 'components/common/TokenHoldings'
import TokenName from 'components/common/TokenName/TokenName'

import { ActorTypeLabel, BeryxLink } from '../../../../../common'
import FilecoinIcon from '../../../../../common/Icons/Filecoin'
import OverviewDropdownItem from './OverviewDropdownItem'
import OverviewItem from './OverviewItem'

/**
 * ContractOverview component.
 *
 * This component provides an overview of a contract.
 *
 * @returns The ContractOverview component.
 */
const ERC20Overview = () => {
  const searchValue: string = useSearchStore(s => s.searchInputValue)
  const searchResultJson = useSearchStore(s => s.searchResult.json)
  const network = useSearchStore(s => s.searchInputNetwork)

  const { totalCount } = useSearchStore(s => s.searchResult.transactionsCount)

  const [balance, setBalance] = useState<string | undefined>(undefined)
  const [totalSupply, setTotalSupply] = useState<string | undefined>(undefined)

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
      const balance = BigNumber(formatBalance(searchResultJson?.balances))

      if (balance.isLessThan(BigNumber(0.01))) {
        setBalance(balance.toFormat(amountFormat))
      } else {
        setBalance(balance.dp(2, BigNumber.ROUND_DOWN).toFormat(2, amountFormat))
      }
    }

    if (searchResultJson?.state?.total_supply !== undefined && Number.isInteger(parseInt(searchResultJson?.state?.total_supply))) {
      const totalSupply = BigNumber(formatOneBalance(searchResultJson?.state.total_supply, searchResultJson?.state?.decimals))
      if (totalSupply.isLessThan(BigNumber(0.01))) {
        setTotalSupply(totalSupply.toFormat(amountFormat))
      } else {
        setTotalSupply(totalSupply.dp(2, BigNumber.ROUND_DOWN).toFormat(2, amountFormat))
      }
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

      {balance ? (
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

      {searchResultJson?.state?.description && searchResultJson?.state?.ticker ? (
        <OverviewDropdownItem
          label={t('Token Information')}
          description={t('Token information like icon, name and ticker')}
          content={<TokenName description={searchResultJson?.state.description} ticker={searchResultJson?.state.ticker} />}
          icon={undefined}
          total_subitems={3}
          subitems={
            <>
              {searchResultJson?.state?.decimals !== undefined ? (
                <OverviewItem
                  label={t('Token Decimals')}
                  description={t('This is the number of decimals the token uses')}
                  content={
                    <Typography variant="caption" component={'p'} color={'text.primary'} lineHeight={'100%'}>
                      {searchResultJson?.state.decimals}
                    </Typography>
                  }
                  icon={undefined}
                  subitem
                />
              ) : null}

              {searchResultJson?.state?.total_supply !== undefined ? (
                <OverviewItem
                  label={t(`Total Supply (${searchResultJson?.state?.ticker})`)}
                  description={t(`Total supply of the token (${searchResultJson?.state?.ticker})`)}
                  content={
                    <Tooltip title={formatOneBalance(searchResultJson?.state.total_supply, searchResultJson?.state?.decimals)} arrow>
                      <Typography variant="caption" component={'p'} color={'text.primary'} lineHeight={'100%'}>
                        {totalSupply ?? '-'}
                      </Typography>
                    </Tooltip>
                  }
                  icon={undefined}
                  subitem
                />
              ) : null}

              {searchResultJson?.state?.holders_count !== undefined ? (
                <OverviewItem
                  label={t('Token Users Count')}
                  description={t('This is the number of users the token has')}
                  content={
                    <Typography variant="caption" component={'p'} color={'text.primary'} lineHeight={'100%'}>
                      {BigNumber(searchResultJson.state.holders_count).toFormat(0, amountFormat)}
                    </Typography>
                  }
                  icon={undefined}
                  subitem
                />
              ) : null}
            </>
          }
        />
      ) : null}

      {totalCount ? (
        <OverviewItem
          label={t('Number of Transactions')}
          description={t(
            'Represents the overall count of transactions associated with the contract. This count excludes internal messages.'
          )}
          content={totalCount.toString()}
          icon={undefined}
        />
      ) : null}
    </>
  )
}

export default ERC20Overview
