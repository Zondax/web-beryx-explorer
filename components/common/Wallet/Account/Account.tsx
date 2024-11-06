/**
 * @file This module renders account information including the account data and transactions.
 */
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useWindowSize } from 'usehooks-ts'

import { ObjectType } from '@/routes/parsing'
import useWalletStore from '@/store/wallets/wallet'
import { Box } from '@mui/material'

import Panel from '../../../widgets/Panel'
import AccountData from './AccountData'
import IncomingTransactions from './IncomingTransactions'
import MempoolTransactions from './MempoolTransactions'
import OutgoingTransactions from './OutgoingTransactions'

/**
 * Account Component
 *
 * This functional component renders the account page. It uses the window height to calculate number of
 * transactions to display. The function `handleSeeMore` handles the click event on the "See More"
 * button by redirecting the user to a detailed view page.
 *
 */
const Account = () => {
  const router = useRouter()
  const { filAddr, network } = useWalletStore(s => s.walletInfo)
  const [visibleTxNumber, setVisibleTxNumber] = useState<number>(3)
  const { height } = useWindowSize()

  const { t } = useTranslation()

  useEffect(() => {
    const calculatedTxNumber = Math.floor((height - 600) / 88)
    setVisibleTxNumber(Math.max(calculatedTxNumber, 1))
  }, [height])

  /**
   * Handles the Click event on the "See More" button.
   *
   * This function takes in a MouseEvent and a string representing the transaction type,
   * and it navigates the user to a detailed view page.
   *
   * @param e - The MouseEvent from clicking on the "See More" button.
   * @param type - The type of transaction, used to determine which page to navigate to.
   */
  const handleSeeMore = useCallback(
    (e: React.MouseEvent, type: string) => {
      e.preventDefault()
      return router.push(`/fil/${network?.name.toLowerCase()}/${ObjectType.ADDRESS}/${filAddr}?type=${type}&tab=transactions`, undefined, {
        shallow: true,
      })
    },
    [router, network, filAddr]
  )

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
      }}
    >
      <AccountData />

      <Panel tabs={[{ name: t('Incoming Txs') }, { name: t('Outgoing Txs') }, { name: t('Mempool Txs') }]}>
        {[
          <IncomingTransactions handleSeeMore={handleSeeMore} visibleTxNumber={visibleTxNumber} key={'incoming-transactions'} />,
          <OutgoingTransactions handleSeeMore={handleSeeMore} visibleTxNumber={visibleTxNumber} key={'outgoing-transactions'} />,
          <MempoolTransactions visibleTxNumber={visibleTxNumber} key={'mempool-transactions'} />,
        ]}
      </Panel>
    </Box>
  )
}

export default Account
