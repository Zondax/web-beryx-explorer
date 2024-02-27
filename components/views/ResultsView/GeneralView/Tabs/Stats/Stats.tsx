import { useCallback } from 'react'

import { useSearchStore } from '@/store/data/search'
import { Grid } from '@mui/material'

import { statsComponentsMap } from '../../../../../../src/config/tabs'

/**
 * The Stats component
 */
const Stats = () => {
  /**
   * State and selectors
   */
  const searchItemType = useSearchStore(s => s.searchItemType)

  /**
   * Render the body dependends on the input type
   */
  const renderComponent = useCallback(() => {
    return statsComponentsMap[searchItemType]
  }, [searchItemType])

  return (
    <Grid
      container
      gap={'2rem'}
      height={'100%'}
      sx={{
        zIndex: 1,
        padding: { md: '2rem 0.5rem' },
        overflowY: 'auto',
      }}
    >
      {renderComponent()}
    </Grid>
  )
}

export default Stats
