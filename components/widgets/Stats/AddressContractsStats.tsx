import { useMemo } from 'react'

import { useContractInvokesByAddress, useContractsCreatesByAddress } from '@/data/beryx'
import { useSearchStore } from '@/store/data/search'
import { getLoadingStatus } from '@/utils/loadingStatus'
import { Grid } from '@mui/material'

import { ItemTile, StatsTile } from 'components/widgets/Charts'

/**
 * The ContractsStats component
 */
const ContractsStats = () => {
  const inputValue = useSearchStore(s => s.searchInputValue)
  const network = useSearchStore(s => s.searchInputNetwork)

  const {
    data: contractsCreates,
    isLoading: isLoadingContractsCreates,
    isSuccess: isSuccessContractsCreates,
  } = useContractsCreatesByAddress(inputValue, network, 'monthly', true)

  const {
    data: contractsInvokes,
    isLoading: isLoadingContractsInvokes,
    isSuccess: isSuccessContractsInvokes,
  } = useContractInvokesByAddress(inputValue, network, 'monthly', true)

  const contractsCreatesTotal = useMemo(() => {
    if (isSuccessContractsCreates) {
      if (contractsCreates.length >= 1) {
        return contractsCreates.reduce((prev, current) => prev + current.count, 0)
      }
      return 0
    }
    return undefined
  }, [contractsCreates, isSuccessContractsCreates])

  const contractsInvokesTotal = useMemo(() => {
    if (isSuccessContractsInvokes) {
      if (contractsInvokes.length >= 1) {
        return contractsInvokes.reduce((prev, current) => prev + current.count, 0)
      }
      return 0
    }
    return undefined
  }, [contractsInvokes, isSuccessContractsInvokes])

  return (
    <Grid container xs={12} spacing={'1rem'}>
      <Grid item xs={6} md={3} data-testid={'contracts-creates'}>
        <ItemTile
          title={'Number of Contracts Creates'}
          loading={getLoadingStatus(isLoadingContractsCreates, isSuccessContractsCreates)}
          size="medium"
          hasBorder
        >
          {contractsCreatesTotal !== undefined ? (
            <StatsTile
              data={{
                value: contractsCreatesTotal,
              }}
            />
          ) : null}
        </ItemTile>
      </Grid>

      <Grid item xs={6} md={3} data-testid={'contracts-invokes'}>
        <ItemTile
          title={'Number of Contract Invokes'}
          loading={getLoadingStatus(isLoadingContractsInvokes, isSuccessContractsInvokes)}
          size="medium"
          hasBorder
        >
          {contractsInvokesTotal !== undefined ? (
            <StatsTile
              data={{
                value: contractsInvokesTotal,
              }}
            />
          ) : null}
        </ItemTile>
      </Grid>

      {/* <Grid item xs={6} md={3} data-testid={'unique-contracts-invokes'}>
        <ItemTile
          title={'Number of Unique Contract Invokes'}
          loading={getLoadingStatus(isLoadingUniqueContractsInvokes, isSuccessUniqueContractsInvokes)}
          size="medium"
          hasBorder
        >
          {uniqueContractsInvokesTotal !== undefined ? (
            <StatsTile
              data={{
                value: uniqueContractsInvokesTotal,
              }}
            />
          ) : null}
        </ItemTile>
      </Grid> */}
    </Grid>
  )
}

export default ContractsStats
