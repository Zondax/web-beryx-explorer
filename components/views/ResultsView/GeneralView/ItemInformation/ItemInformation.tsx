import { ObjectType } from '@/routes/parsing'
import { Box, Unstable_Grid2 as Grid, useMediaQuery, useTheme } from '@mui/material'

import ItemIdentifier from './ItemIdentifier'
import ItemStats from './ItemStats/ItemStats'

/**
 * Type for the props of the ItemInformation component
 */
interface ItemInformationProps {
  /**
   * The type of the item to display information for
   */
  searchItemType: ObjectType
}

/**
 * A component that displays information about a specific item
 * @param searchItemType The type of the item to display information for
 * @returns A JSX element containing the item's information
 */
const ItemInformation = ({ searchItemType }: ItemInformationProps) => {
  // media query for responsiveness
  const upMd = useMediaQuery(useTheme().breakpoints.up('md'))

  return (
    <Grid
      container
      height={upMd ? '6rem' : 'fit-content'}
      justifyContent={'space-between'}
      padding={upMd ? '1rem 1rem 1rem 1rem' : '1rem 0.5rem 1rem 0.5rem'}
      alignItems={'center'}
      gap={'1rem'}
    >
      {/* Box for item information */}
      <Box
        sx={{
          width: upMd ? 'fit-content' : '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        {/* Component to show item identifier */}
        <ItemIdentifier searchItemType={searchItemType} />
      </Box>

      {/* Component to display the item stats */}
      <ItemStats searchItemType={searchItemType} />
    </Grid>
  )
}

export default ItemInformation
