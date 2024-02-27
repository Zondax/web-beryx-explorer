import BigNumber from 'bignumber.js'
import { throttle } from 'lodash'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { fetchTransactionParams } from '@/api-client/beryx'
import { fetchMetadata } from '@/components/metaData'
import { LoadingStatus, amountFormat, chainDecimals } from '@/config/config'
import { NetworkType } from '@/config/networks'
import { useTransactions } from '@/data/beryx'
import { searchValue as repeatSearch } from '@/refactor/search'
import { ObjectType } from '@/routes/parsing'
import { useMempoolStore } from '@/store/data/mempool'
import { useSearchStore } from '@/store/data/search'
import { useContractsStore } from '@/store/ui/contracts'
import { newDateFormat } from '@/utils/dates'
import { downloadTxtFile, getContentType } from '@/utils/download'
import { copyContent } from '@/utils/text'
import { Copy, Download, GasStationFilled } from '@carbon/icons-react'
import { Box, Button, Tooltip, Typography, useTheme } from '@mui/material'

import { LevelFilter } from 'components/widgets/SearchTables/config'

import BeryxLink from '../../../../../../common/BeryxLink'
import CanonicalLabel from '../../../../../../common/CanonicalLabel'
import FilecoinIcon from '../../../../../../common/Icons/Filecoin'
import TransactionStatus from '../../../../../../common/TransactionStatus/TransactionStatus'
import TxTypeLabel from '../../../../../../common/TransactionTypeLabel/TxTypeLabel'
import CodeBlock from '../../../../../../widgets/CodeBlock'
import OverviewCodeBlockTile from '../../../../../../widgets/OverviewCodeBlockTile'
import OverviewItem from '../OverviewItem'

/**
 * TransactionOverview component.
 * This component is responsible for displaying an overview of a transaction.
 * It fetches and manages various pieces of data related to a transaction, such as its status, amount, gas used, etc.
 * It also handles the fetching and updating of mempool data.
 * @returns The rendered JSX element.
 */
const TransactionOverview = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const router = useRouter()

  // API data
  const searchValue: string = useSearchStore(s => s.searchInputValue)
  const searchResultJson = useSearchStore(s => s.searchResult.json)
  const searchType = useSearchStore(s => s.searchType)
  const searchInputType = useSearchStore(s => s.searchInputType)
  const searchResultMempoolJson = useSearchStore(s => s.searchResult.mempoolJson)
  const network = useSearchStore(s => s.searchInputNetwork)
  const jsonLoadingStatus = useSearchStore(s => s.searchResult.jsonLoadingStatus)
  const ethAddress = useContractsStore(state => state.ethAddress)
  const txMetadata = useSearchStore(s => s.searchResult.metadata)

  const setSearchResultMempoolJson = useSearchStore(s => s.setSearchResultMempoolJson)
  const setSearchResultMetadata = useSearchStore(s => s.setSearchResultMetadata)

  // Mempool data
  const mempoolTransactionsRef = useRef(useMempoolStore.getState().transactions)

  // Local state
  const [amount, setAmount] = useState<string | undefined>(undefined)
  const [gas, setGas] = useState<string | undefined>(undefined)
  const [gasFeeCap, setGasFeeCap] = useState<string | undefined>(undefined)
  const [gasLimit, setGasLimit] = useState<string | undefined>(undefined)
  const [gasPremium, setGasPremium] = useState<string | undefined>(undefined)
  const [params, setParams] = useState<{ loadingStatus: LoadingStatus; data: any }>({ loadingStatus: LoadingStatus.Idle, data: undefined })

  const queryParameters = useMemo(
    () => ({
      input: searchValue,
      network,
      type: searchType,
      method: undefined,
      level: 'all' as LevelFilter,
      evm: false,
      sort: undefined,
      page: { page: 1 },
    }),
    [searchValue, network, searchType]
  )

  /**
   * Request the transactions to get the total number of transactions
   */
  const { data: txsResult, isSuccess: isSuccessTxsResult, isLoading: isLoadingTxsResult } = useTransactions(queryParameters)

  /**
   * This function updates the mempool transaction data.
   * It is called periodically to ensure that the displayed data is up-to-date.
   * @returns {Promise<void>}
   */
  const updateMempoolTx = useCallback(async () => {
    if (!searchResultJson && searchResultMempoolJson && mempoolTransactionsRef.current.length > 0) {
      const tx = mempoolTransactionsRef.current.find(item => item.tx_cid === searchValue)
      if (tx) {
        setSearchResultMempoolJson(tx)
        return
      }
      if (!network) {
        return
      }
      const { error } = await repeatSearch(network, searchValue, searchInputType, searchType)
      setSearchResultMempoolJson(undefined)
      if (error) {
        await router.push('/404')
      }
    }
  }, [searchResultJson, searchResultMempoolJson, network, searchValue, searchType, searchInputType, setSearchResultMempoolJson, router])

  const getMetadata = useCallback(fetchMetadata, [setSearchResultMetadata])

  /**
   * This function allows to download a file.
   * @returns {Promise<void>}
   */
  const handleDownloadButton = useCallback(() => {
    downloadTxtFile(params.data, `Beryx_Transaction_${searchValue}_Parameters`, 'application/json', '.json')
  }, [params, searchValue])

  /**
   * This function allows to download a file.
   * @returns {Promise<void>}
   */
  const handleCopyButton = useCallback(() => {
    copyContent(JSON.stringify(params.data, null, 2))
  }, [params])

  /**
   * This effect is responsible for updating the mempool transaction data periodically.
   */
  useEffect(() => {
    if (searchResultMempoolJson) {
      const unsubscribe = useMempoolStore.subscribe(state => (mempoolTransactionsRef.current = state.transactions))

      const throttleUpdate = throttle(updateMempoolTx, 3000)
      const interval = setInterval(throttleUpdate, 3000)

      return () => {
        unsubscribe()
        clearInterval(interval)
        throttleUpdate.cancel()
      }
    }
    return () => {}
  }, [updateMempoolTx, searchResultMempoolJson])

  /**
   * This effect is responsible for setting the state variables based on the search result JSON.
   */
  useEffect(() => {
    if (searchResultJson?.amount !== undefined) {
      setAmount(
        BigNumber(searchResultJson?.amount)
          .div(Math.pow(10, chainDecimals.filecoin))
          .toFormat(2, amountFormat)
      )
    }

    /**
     * This function fetches the transaction parameters.
     * @param hash - The hash of the transaction.
     * @param tx_network - The network type of the transaction.
     * @returns
     */
    const fetchParams = async (hash: string, tx_network: NetworkType): Promise<void> => {
      try {
        setParams({ loadingStatus: LoadingStatus.Loading, data: undefined })

        const res = await fetchTransactionParams(hash, tx_network)
        if (res !== 'error') {
          setParams({ loadingStatus: LoadingStatus.Success, data: res })
        } else {
          setParams({ loadingStatus: LoadingStatus.Error, data: undefined })
        }
      } catch {
        setParams({ loadingStatus: LoadingStatus.Error, data: undefined })
      }
    }

    if (searchResultJson?.gas_used !== undefined) {
      setGas(BigNumber(searchResultJson?.gas_used).toFormat(0, amountFormat))
    }
    if (searchResultJson?.search_id !== undefined && network) {
      getMetadata(searchResultJson?.search_id, network)
    }
    if (searchResultJson?.tx_cid !== undefined && network) {
      fetchParams(searchResultJson?.tx_cid, network)
    }
  }, [getMetadata, network, searchResultJson])

  /**
   * This effect is responsible for setting the state variables based on the mempool search result JSON.
   */
  useEffect(() => {
    // mempool
    if (searchResultMempoolJson?.amount !== undefined) {
      setAmount(
        BigNumber(searchResultMempoolJson?.amount)
          .div(Math.pow(10, chainDecimals.filecoin))
          .toFormat(2, amountFormat)
      )
    }
    if (searchResultMempoolJson?.gas_fee_cap !== undefined) {
      setGasFeeCap(BigNumber(searchResultMempoolJson?.gas_fee_cap).toFormat(2, amountFormat))
    }
    if (searchResultMempoolJson?.gas_limit !== undefined) {
      setGasLimit(BigNumber(searchResultMempoolJson?.gas_limit).toFormat(0, amountFormat))
    }
    if (searchResultMempoolJson?.gas_premium !== undefined) {
      setGasPremium(BigNumber(searchResultMempoolJson?.gas_premium).toFormat(0, amountFormat))
    }
  }, [searchResultMempoolJson])

  let methodContent

  if (searchResultJson?.tx_type) {
    methodContent = <TxTypeLabel label={searchResultJson.tx_type} height="1.65rem" />
  } else if (searchResultMempoolJson) {
    methodContent = <TxTypeLabel label={searchResultMempoolJson.method_name} height="1.65rem" />
  }

  /**
   * This function returns the status of the transaction.
   * @returns The status of the transaction.
   */
  const status = useMemo(() => {
    if (searchResultJson?.status) {
      return searchResultJson?.status
    }

    if (searchResultMempoolJson) {
      return searchResultMempoolJson.last_seen ? 'Pending' : 'Mempool'
    }
    return '-'
  }, [searchResultJson, searchResultMempoolJson])

  // Create an object to store repetitive data for OverviewItems
  const overviewItemsData = [
    {
      isLoading: jsonLoadingStatus === LoadingStatus.Loading,
      label: t('Transaction'),
      description: undefined,
      content: (
        <BeryxLink
          limitCharacters={'auto'}
          disableTooltip
          inputType={ObjectType.TXS}
          network={network}
          value={searchResultJson?.tx_cid || searchValue}
          isColored
        />
      ),
      icon: undefined,
    },
    {
      isLoading: jsonLoadingStatus === LoadingStatus.Loading,
      label: t('ETH Transaction ID'),
      description: undefined,
      content: ethAddress ? (
        <BeryxLink disableTooltip inputType={ObjectType.TXS} network={network} value={ethAddress} limitCharacters={'auto'} isColored />
      ) : (
        '-'
      ),
      icon: undefined,
    },
    {
      isLoading: jsonLoadingStatus === LoadingStatus.Loading,
      label: t('Status'),
      description: t('This string describes the status of the transaction, indicating whether it is confirmed, failed or in mempool') ?? '',
      content: status,
      icon: searchResultJson?.status || searchResultMempoolJson ? <TransactionStatus status={status} /> : undefined,
    },
    {
      isLoading: jsonLoadingStatus === LoadingStatus.Loading,
      label: t('Time'),
      description: undefined,
      content:
        searchResultJson?.tx_timestamp || searchResultMempoolJson?.first_seen
          ? newDateFormat(searchResultJson?.tx_timestamp ?? searchResultMempoolJson?.first_seen, 'UTC', true)
          : '-',
      icon: undefined,
    },
    {
      isLoading: jsonLoadingStatus === LoadingStatus.Loading,
      label: t('Tipset Height'),
      description: undefined,
      content: searchResultJson?.height ? (
        <Box display={'flex'} gap={'0.5rem'}>
          <BeryxLink disableTooltip inputType={ObjectType.TIPSET} network={network} value={searchResultJson?.height} isColored />
          {searchResultJson?.canonical !== undefined ? (
            <CanonicalLabel isCanonical={searchResultJson?.canonical} type={'canonical'} />
          ) : null}
        </Box>
      ) : undefined,
      icon: undefined,
    },
    {
      isLoading: jsonLoadingStatus === LoadingStatus.Loading,
      label: t('Block'),
      description: undefined,
      content: searchResultJson?.block_cid ? (
        <BeryxLink
          disableTooltip
          limitCharacters={'auto'}
          inputType={ObjectType.BLOCK}
          network={network}
          value={searchResultJson.block_cid}
          isColored
        />
      ) : undefined,
      icon: undefined,
    },
    {
      isLoading: jsonLoadingStatus === LoadingStatus.Loading,
      label: t('From'),
      description: undefined,
      content:
        searchResultJson?.tx_from || searchResultMempoolJson?.tx_from ? (
          <BeryxLink
            disableTooltip
            inputType={ObjectType.ADDRESS}
            network={network}
            limitCharacters={'auto'}
            value={searchResultJson?.tx_from ?? searchResultMempoolJson?.tx_from}
            isColored={false}
          />
        ) : undefined,
      icon: undefined,
    },
    {
      isLoading: jsonLoadingStatus === LoadingStatus.Loading,
      label: t('To'),
      description: undefined,
      content:
        searchResultJson?.tx_to || searchResultMempoolJson?.tx_to ? (
          <BeryxLink
            disableTooltip
            inputType={ObjectType.ADDRESS}
            network={network}
            limitCharacters={'auto'}
            value={searchResultJson?.tx_to ?? searchResultMempoolJson?.tx_to}
            isColored={false}
          />
        ) : undefined,
      icon: undefined,
    },
    {
      isLoading: jsonLoadingStatus === LoadingStatus.Loading,
      label: `${t('Value')} (FIL)`,
      description: undefined,
      content:
        amount !== undefined ? (
          <Tooltip
            title={BigNumber(searchResultJson?.amount)
              .div(Math.pow(10, chainDecimals.filecoin))
              .toFixed()}
            arrow
            disableInteractive
          >
            <Typography variant="caption" component={'p'} color={'text.primary'}>
              {amount}
            </Typography>
          </Tooltip>
        ) : undefined,
      icon: amount !== undefined ? <FilecoinIcon size={16} /> : undefined,
    },
    {
      isLoading: jsonLoadingStatus === LoadingStatus.Loading,
      label: t('Method'),
      description: t('Specifies the type/category/method of the transaction') ?? '',
      content: methodContent,
      icon: undefined,
    },
    {
      isLoading: jsonLoadingStatus === LoadingStatus.Loading,
      label: `${t('Gas Used')} (attoFIL)`,
      description: t('The value that represents the amount of gas used (attoFIL) in the transaction') ?? '',
      content: gas,
      icon: gas ? <GasStationFilled width={16} height={16} color={theme.palette.text.secondary} /> : undefined,
      display: !searchResultMempoolJson,
    },
    {
      isLoading: jsonLoadingStatus === LoadingStatus.Loading,
      label: `${t('Gas Fee Cap')} (attoFIL/gas unit)`,
      description: t('Is the maximum price that the message sender is willing to pay per unit of gas (measured in attoFIL/gas unit)') ?? '',
      content: gasFeeCap,
      icon: gasFeeCap ? <GasStationFilled width={16} height={16} color={theme.palette.text.secondary} /> : undefined,
      display: Boolean(searchResultMempoolJson),
    },
    {
      isLoading: jsonLoadingStatus === LoadingStatus.Loading,
      label: `${t('Gas Limit')} (gas units)`,
      description:
        t(
          "Is measured in units of gas and set by the message sender. It imposes a hard limit on the amount of gas (i.e., number of units of gas) that a message's execution should be allowed to consume on chain"
        ) ?? '',
      content: gasLimit,
      icon: gasLimit ? <GasStationFilled width={16} height={16} color={theme.palette.text.secondary} /> : undefined,
      display: Boolean(searchResultMempoolJson),
    },
    {
      isLoading: jsonLoadingStatus === LoadingStatus.Loading,
      label: `${t('Gas Premium')} (attoFIL/gas unit)`,
      description:
        t(
          'Is the price per unit of gas (measured in attoFIL/gas) that the message sender is willing to pay (on top of the BaseFee) to “tip” the miner that will include this message in a block'
        ) ?? '',
      content: gasPremium,
      icon: gasPremium ? <GasStationFilled width={16} height={16} color={theme.palette.text.secondary} /> : undefined,
      display: Boolean(searchResultMempoolJson),
    },
    {
      isLoading: txMetadata.loadingStatus === LoadingStatus.Loading,
      label: `${t('Transaction Metadata')}`,
      description: undefined,
      content:
        txMetadata.loadingStatus === LoadingStatus.Error || txMetadata.loadingStatus === LoadingStatus.Idle ? (
          '-'
        ) : (
          <OverviewCodeBlockTile data={txMetadata.data} label={searchValue} height={'20rem'} />
        ),
      icon: undefined,
      verticalInMobile: txMetadata.loadingStatus !== LoadingStatus.Error,
    },
    {
      isLoading: params.loadingStatus === LoadingStatus.Loading,
      label: `${t('Transaction Parameters')}`,
      description: undefined,
      content:
        params.loadingStatus === LoadingStatus.Error || params.loadingStatus === LoadingStatus.Idle ? (
          '-'
        ) : (
          <Box
            sx={{
              gap: '0.5rem',
              width: '100%',
              height: '20rem',
              borderRadius: '8px',
              border: `1px solid ${theme.palette.background.level2}`,
              contain: 'paint',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: '0.5rem',
                position: 'absolute',
                right: '0.5rem',
                bottom: '0.5rem',
                zIndex: '400',
              }}
            >
              <Button
                variant={'inputType'}
                onClick={handleCopyButton}
                sx={{
                  minWidth: 'unset',
                  paddingX: '1rem',
                  backgroundColor: theme.palette.tableParentRowBackgroundFocused,
                }}
              >
                <Copy />
              </Button>
              <Button
                variant={'inputType'}
                onClick={handleDownloadButton}
                sx={{
                  minWidth: 'unset',
                  paddingX: '1rem',
                  backgroundColor: theme.palette.tableParentRowBackgroundFocused,
                }}
              >
                <Download />
              </Button>
            </Box>

            <CodeBlock
              key={`contract file ${name}`}
              readOnly
              content={params.data}
              contentType={getContentType(typeof params.data)}
              noContentText="No Parameters"
              fillResizablePanel
              wordWrap="off"
            />
          </Box>
        ),
      icon: undefined,
      verticalInMobile: params.loadingStatus !== LoadingStatus.Error,
    },
    {
      isLoading: isLoadingTxsResult,
      label: t('Number of Internal Messages'),
      description: t('Indicates the total number of internal messages.') ?? '',
      content: txsResult !== undefined && isSuccessTxsResult ? (txsResult.total_txs - 1).toString() : undefined,
      icon: undefined,
    },
  ]

  return (
    <>
      {overviewItemsData.map(item => {
        if (item.display !== false) {
          return (
            <OverviewItem
              key={`${item.label}-${item.description}`}
              isLoading={jsonLoadingStatus === LoadingStatus.Loading}
              label={item.label}
              description={item.description}
              content={item.content}
              icon={item.icon}
              verticalInMobile={item.verticalInMobile}
            />
          )
        }
        return null
      })}
    </>
  )
}

export default TransactionOverview
