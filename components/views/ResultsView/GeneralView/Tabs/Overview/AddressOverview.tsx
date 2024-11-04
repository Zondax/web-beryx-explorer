import BigNumber from 'bignumber.js'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { amountFormat } from '@/config/config'
import { useTransactions } from '@/data/beryx'
import { ObjectType } from '@/routes/parsing'
import { useSearchStore } from '@/store/data/search'
import { formatBalanceBasedOnValue } from '@/utils/balance'
import { formatBalance } from '@/utils/format'
import { Box, Tooltip, Typography } from '@mui/material'
import { captureException } from '@sentry/nextjs'
import { FilEthAddress } from '@zondax/izari-filecoin/address'

import TokenHoldings from 'components/common/TokenHoldings'
import { LevelFilter } from 'components/widgets/SearchTables/config'
import UnlockedBalance from 'components/widgets/UnlockedBalance'

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
      const rawBalance = BigNumber(formatBalance(searchResultJson?.balances))
      setBalance(formatBalanceBasedOnValue(rawBalance))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const displayMultisigInfo = useMemo(() => searchResultJson?.actor_type === 'multisig' && searchResultJson?.state, [searchResultJson])

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

      {searchResultJson?.tokenHoldings ? (
        <OverviewItem
          label={t('Token Holdings')}
          content={<TokenHoldings tokenHoldings={searchResultJson?.tokenHoldings} />}
          icon={undefined}
        />
      ) : null}

      {(txsResult?.total_txs && isSuccessTxsResult) || totalTxs ? (
        <OverviewItem
          label={t('Number of Transactions')}
          description={t(
            'Specifies the overall count of transactions sent and received by the address. Internal messages are not accounted for in this total.'
          )}
          content={BigNumber(txsResult?.total_txs ?? totalTxs).toFormat(0, amountFormat)}
          icon={undefined}
        />
      ) : null}

      {displayMultisigInfo ? (
        <OverviewItem
          label={t('Signers')}
          description={t('Addresses authorized to sign transactions in a multisig wallet.')}
          content={
            searchResultJson?.state.signers ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {searchResultJson?.state.signers.map((signer: string) => (
                  <BeryxLink
                    key={signer}
                    limitCharacters={'auto'}
                    disableTooltip
                    inputType={ObjectType.ADDRESS}
                    network={searchNetwork}
                    value={signer}
                    isColored
                  />
                ))}
              </Box>
            ) : (
              '-'
            )
          }
          icon={undefined}
        />
      ) : null}

      {displayMultisigInfo && searchNetwork ? (
        <OverviewItem
          label={t('Locked Balance')}
          description={t(
            'The amount of funds restricted in a multisig wallet that cannot be spent until certain conditions are met. The specific block when funds are locked is called lock epoch.'
          )}
          content={searchResultJson?.state.locked_balance ? <UnlockedBalance lockedBalance={searchResultJson.state.locked_balance} /> : '-'}
          icon={undefined}
        />
      ) : null}

      {displayMultisigInfo ? (
        <OverviewItem
          label={t('Last Tipset Processed')}
          description={t('Last seen activity.')}
          content={
            searchResultJson?.state.last_tipset_processed !== undefined ? (
              <BeryxLink
                limitCharacters={'auto'}
                disableTooltip
                inputType={ObjectType.TIPSET}
                network={searchNetwork}
                value={searchResultJson?.state.last_tipset_processed.toString()}
              />
            ) : (
              '-'
            )
          }
          icon={undefined}
        />
      ) : null}

      {displayMultisigInfo ? (
        <OverviewItem
          label={t('Approvals Threshold')}
          description={t('The minimum number of signers required to approve a transaction for it to be valid.')}
          content={
            searchResultJson?.state.num_approvals_threshold ? (
              <BeryxLink
                limitCharacters={'auto'}
                disableTooltip
                inputType={ObjectType.TIPSET}
                network={searchNetwork}
                value={searchResultJson?.state.num_approvals_threshold.toString()}
              />
            ) : (
              '-'
            )
          }
          icon={undefined}
        />
      ) : null}
    </>
  )
}

export default AddressOverview
