import BigNumber from 'bignumber.js'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { amountFormat } from '@/config/config'
import { useTransactions } from '@/data/beryx'
import { ObjectType } from '@/routes/parsing'
import { useSearchStore } from '@/store/data/search'
import { formatBalance } from '@/utils/format'
import { Tooltip, Typography } from '@mui/material'
import { captureException } from '@sentry/nextjs'
import { FilEthAddress } from '@zondax/izari-filecoin/address'

import { LevelFilter } from 'components/widgets/SearchTables/config'

import { ActorTypeLabel, BeryxLink } from '../../../../../common'
import FilecoinIcon from '../../../../../common/Icons/Filecoin'
import OverviewItem from './OverviewItem'

/**
 * Component providing an overview of an address.
 *
 * @component
 *
 * @returns Component JSX.
 */
const AddressOverview = () => {
  const { t } = useTranslation()
  const searchNetwork = useSearchStore(s => s.searchInputNetwork)

  const searchValue: string = useSearchStore(s => s.searchInputValue)
  const searchType = useSearchStore(s => s.searchType)
  const inputType = useSearchStore(s => s.searchInputType)
  const searchResultJson = useSearchStore(s => s.searchResult.json)

  const [balance, setBalance] = useState<string | undefined>(undefined)
  const [ethAddr, setEthAddr] = useState<string | undefined>(undefined)
  // The input value is completed when searching all transactions is disabled by backend
  const [inputValue, setInputValue] = useState<string>('')

  const queryMainParameters = useMemo(
    () => ({
      input: searchValue,
      network: searchNetwork,
      inputType,
      objectType: searchType,
      method: undefined,
      level: 'main' as LevelFilter,
      evm: false,
      sort: undefined,
      page: { page: 1 },
    }),
    [searchValue, searchNetwork, searchType, inputType]
  )
  /**
   * Request the total number of transactions
   */
  const { data: txsResult, isSuccess: isSuccessTxsResult, error: errorTxsResult } = useTransactions(queryMainParameters)

  /**
   * Request the total number of incoming transactions
   */
  const { data: incomingTxsResult, isSuccess: isSuccessIncomingTxsResult } = useTransactions({
    input: inputValue,
    network: searchNetwork,
    inputType,
    objectType: searchType,
    method: 'receiver',
    level: 'main' as LevelFilter,
    evm: false,
    sort: undefined,
    page: { page: 1 },
  })
  /**
   * Request the total number of outgoing transactions
   */
  const { data: outgoingTxsResult, isSuccess: isSuccessOutgoingTxsResult } = useTransactions({
    input: inputValue,
    network: searchNetwork,
    inputType,
    objectType: searchType,
    method: 'sender',
    level: 'main' as LevelFilter,
    evm: false,
    sort: undefined,
    page: { page: 1 },
  })

  /**
   * Effect hook to format balance.
   */
  useEffect(() => {
    if (errorTxsResult) {
      setInputValue(searchValue)
    }
  }, [errorTxsResult, searchValue])

  /**
   * Total number of transactions if searching all is not possible
   */
  const totalTxs = useMemo(() => {
    if (isSuccessIncomingTxsResult && isSuccessOutgoingTxsResult && outgoingTxsResult && incomingTxsResult) {
      return outgoingTxsResult.total_txs ?? 0 + incomingTxsResult.total_txs ?? 0
    }
    return undefined
  }, [outgoingTxsResult, incomingTxsResult, isSuccessIncomingTxsResult, isSuccessOutgoingTxsResult])

  /**
   * Effect hook to format balance.
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
  }, [searchResultJson])

  useEffect(() => {
    if (!searchResultJson?.eth_address) {
      try {
        const ethAddress = FilEthAddress.fromString(searchValue).toEthAddressHex(true)
        setEthAddr(ethAddress)
      } catch (err) {
        captureException(err)
      }
    }
  }, [searchNetwork, searchValue, searchResultJson?.eth_address])

  return (
    <>
      <OverviewItem
        label={t('Address')}
        description={t('Account address in robust format')}
        content={
          <BeryxLink
            limitCharacters={'auto'}
            disableTooltip
            inputType={ObjectType.ADDRESS}
            network={searchNetwork}
            value={searchValue === searchResultJson?.short ? searchResultJson?.robust : searchValue}
            isColored
          />
        }
        icon={undefined}
      />

      {searchResultJson?.short ? (
        <OverviewItem
          label={t('Address ID')}
          description={t('Address in short format')}
          content={
            <BeryxLink
              limitCharacters={'auto'}
              disableTooltip
              inputType={ObjectType.ADDRESS}
              network={searchNetwork}
              value={searchResultJson?.short}
              isColored
            />
          }
          icon={undefined}
        />
      ) : null}

      {searchResultJson?.eth_address || ethAddr ? (
        <OverviewItem
          label={t('ETH Address')}
          description={t('Address in Ethereum format')}
          content={
            <BeryxLink
              limitCharacters={'auto'}
              disableTooltip
              inputType={ObjectType.ADDRESS}
              network={searchNetwork}
              value={searchResultJson?.eth_address || ethAddr}
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

      {(txsResult?.total_txs && isSuccessTxsResult) || totalTxs ? (
        <OverviewItem
          label={t('Number of Transactions')}
          description={t(
            'Specifies the overall count of transactions sent and received by the address. Internal messages are not accounted for in this total.'
          )}
          content={txsResult?.total_txs ?? totalTxs}
          icon={undefined}
        />
      ) : null}
    </>
  )
}

export default AddressOverview
